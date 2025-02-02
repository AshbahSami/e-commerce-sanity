'use client';
import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { client } from '@/sanity/lib/client';  // Adjust path as necessary
import Link from 'next/link';

interface Product {
  _id: string;
  name: string;
  slug: { current: string };
  image: { asset: { url: string } };
}

interface SearchBarProps {
  closeMenu: () => void; // Added closeMenu function to close the menu when a search is made
}

const SearchBar = ({ closeMenu }: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);

  const handleSearch = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);

    // Only search when there is a query
    if (query.length > 2) {
      const data = await client.fetch(
        `*[_type == "product" && name match "${query}*"]{
          _id,
          name,
          slug,
          image { asset { url } }
        }`
      );
      setResults(data);
    } else {
      setResults([]);
    }
  };

  const handleResultClick = () => {
    closeMenu(); // Close the menu when a result is clicked
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearch}
        placeholder="Search for a product"
        className="search-input pl-3 pr-10 py-2 border border-gray-300 rounded-md w-full"
      />
      {results.length > 0 && (
        <ul className="search-results mt-2 p-2 bg-white border border-gray-300 rounded-md shadow-lg">
          {results.map((result) => (
            <li key={result._id} className="py-1 px-2 hover:bg-gray-200">
              {/* Use Link correctly, passing href directly to it */}
              <Link href={`/pages/products/${result.slug.current}`}>
                <span onClick={handleResultClick}>{result.name}</span> {/* Use span inside Link */}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
