'use client';

import { FaTh, FaList, FaStar, FaCircle, FaBars } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { client } from '@/sanity/lib/client';
import Link from 'next/link';

interface Product {
  slug: any;
  _id: string;
  name: string;
  price: number;
  image: {
    asset: {
      url: string;
    };
  };
  code: string;
  stock: number;
  category: string;
  description: string;
}

interface PriceFilterProps {
  onFilterChange: (filteredProducts: Product[]) => void; // Function to notify parent of changes
  products: Product[]; // List of products
}

export default function Page() {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sortBy, setSortBy] = useState('alphabetical');
  const [perPage, setPerPage] = useState(6);
  const [product, setProduct] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const handlePriceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedPrice = e.target.value;
    let newFilteredProducts = [...product];

    if (selectedPrice) {
      if (selectedPrice === 'under 200') {
        newFilteredProducts = newFilteredProducts.filter((prod) => prod.price < 200);
      } else if (selectedPrice === '200-500') {
        newFilteredProducts = newFilteredProducts.filter((prod) => prod.price >= 200 && prod.price <= 500);
      } else if (selectedPrice === '500-1000') {
        newFilteredProducts = newFilteredProducts.filter((prod) => prod.price >= 500 && prod.price <= 1000);
      } else if (selectedPrice === 'above 1000') {
        newFilteredProducts = newFilteredProducts.filter((prod) => prod.price > 1000);
      }
    }

    setFilteredProducts(newFilteredProducts);
  };

  const applyDiscount = (price: number) => {
    const discount = 0.10; // 10% discount
    return price - price * discount; // returns the price after applying 10% discount
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const result = await client.fetch('*[_type == "product"]{_id, name, price,slug, image {asset -> {url}}, description, category}');
      setProduct(result);
      setFilteredProducts(result); // Set the initial products
    };

    fetchProducts();
  }, []);

  const handleGridView = () => setView('grid');
  const handleListView = () => setView('list');

  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
  };

  const handlePerPageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPerPage(Number(e.target.value));
  };

  // Sorting logic
  const sortedProducts = () => {
    let sortedArray = [...filteredProducts];

    if (sortBy === 'alphabetical') {
      sortedArray.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'price') {
      sortedArray.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'category') {
      sortedArray.sort((a, b) => a.category.localeCompare(b.category));
    }

    return sortedArray;
  };

  // Paginate products based on "Per Page"
  const paginatedProduct = () => {
    const startIndex = 0;
    const sortedData = sortedProducts();
    return sortedData.slice(startIndex, perPage);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    let newFilteredProducts = [...product];

    if (category) {
      newFilteredProducts = newFilteredProducts.filter((prod) => prod.category === category);
    }

    setFilteredProducts(newFilteredProducts);
  };

  return (
    <div className="flex flex-col lg:flex-row">
      {/* Sidebar for Mobile */}
      <div
        className={`lg:w-1/4 p-4 bg-white shadow-md space-y-6 transition-transform transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed inset-0 z-50 lg:static`}
      >
        <button
          className="lg:hidden p-4 absolute top-4 right-4 text-black"
          onClick={toggleSidebar}
        >
          <FaBars size={24} />
        </button>

        {/* Sidebar Filters (Brands, Discount, Rating, Categories, etc.) */}
        <div>
          <h3 className="text-lg font-bold">Product Brands</h3>
          <label className="block">
            <input type="checkbox" /> Brand A
          </label>
          <label className="block">
            <input type="checkbox" /> Brand B
          </label>
          <label className="block">
            <input type="checkbox" /> Brand C
          </label>
        </div>

        <div>
          <h3 className="text-lg font-bold">Discount Offer</h3>
          <label className="block">
            <input type="checkbox" /> 10% Off
          </label>
          <label className="block">
            <input type="checkbox" /> 20% Off
          </label>
          <label className="block">
            <input type="checkbox" /> 50% Off
          </label>
        </div>

        <div>
          <h3 className="text-lg font-bold">Rating</h3>
          <div className="flex gap-2">
            {[5, 4, 3, 2, 1].map((star) => (
              <FaStar key={star} className="text-yellow-500" />
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold">Item Categories</h3>
          <div className="space-y-2">
            <button
              onClick={() => handleCategoryChange('Chair')}
              className={`block p-2 w-full text-left ${selectedCategory === 'Chair' ? 'bg-blue-100' : ''}`}
            >
              Chair
            </button>
            <button
              onClick={() => handleCategoryChange('Sofa')}
              className={`block p-2 w-full text-left ${selectedCategory === 'Sofa' ? 'bg-blue-100' : ''}`}
            >
              Sofa
            </button>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold">Price Filter</h3>
          <select onChange={handlePriceChange}>
            <option value="">Select Price Range</option>
            <option value="under 200">Under $200</option>
            <option value="200-500">$200 - $500</option>
            <option value="500-1000">$500 - $1000</option>
            <option value="above 1000">Above $1000</option>
          </select>
        </div>

        <div>
          <h3 className="text-lg font-bold">Filter By Color</h3>
          <div className="grid grid-cols-3 gap-2">
            {['red', 'green', 'blue', 'yellow', 'purple', 'pink'].map((color, index) => (
              <FaCircle key={index} className={`text-${color}-500`} size={24} />
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full lg:w-3/4 p-4">
        <div className="flex justify-between px-6 py-2">
          <div>
            <h1 className="text-[#151875] font-extrabold text-xl md:text-2xl">
              Ecommerce Accessories & Fashion Items
            </h1>
            <p className="text-[#8A8FB9]">About {filteredProducts.length} results</p>
          </div>
          <div className="flex gap-4">
            <form>
              <label htmlFor="quantity">Per Page:</label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                min="1"
                max="100"
                step="1"
                value={perPage}
                onChange={handlePerPageChange}
                className="ml-2 w-20"
              />
            </form>
            <form>
              <label htmlFor="product">Sort By:</label>
              <select
                id="product"
                name="product"
                value={sortBy}
                onChange={handleSortChange}
                className="ml-2"
              >
                <option value="alphabetical">Alphabetical</option>
                <option value="price">Price</option>
                <option value="category">Category</option>
              </select>
            </form>
            <div className="flex gap-2 items-center">
              <p>View</p>
              <FaTh
                size={24}
                className={`cursor-pointer ${view === 'grid' ? 'text-blue-600' : ''}`}
                onClick={handleGridView}
              />
              <FaList
                size={24}
                className={`cursor-pointer ${view === 'list' ? 'text-blue-600' : ''}`}
                onClick={handleListView}
              />
            </div>
          </div>
        </div>

        {/* Products List/Grid */}
        <div className={view === 'grid' ? 'grid grid-cols-3 gap-6' : 'space-y-6'}>
          {paginatedProduct().map((product) => (
            <div key={product._id} className={`border p-4 cursor-pointer ${view === 'list' ? 'flex items-center' : ''}`}>
              {view === 'grid' ? (
                <Link href={`/pages/products/${product.slug.current}`}>
                  <div className="flex flex-col items-center">
                    <img
                      src={product.image.asset.url}
                      alt={product.name}
                      className="w-[150px] h-[150px] mb-4 object-cover"
                    />
                    <h3 className="text-lg font-semibold">{product.name}</h3>
                    <div className="flex gap-2">
                      <p className="text-sm text-gray-600 line-through">${product.price}</p>
                      <p className="text-sm text-pink-900 font-semibold">${applyDiscount(product.price)}</p>
                    </div>
                  </div>
                </Link>
              ) : (
                <Link href={`/pages/products/${product.slug.current}`}>
                  <div className="flex items-center space-x-4">
                    <img
                      src={product.image.asset.url}
                      alt={product.name}
                      className="w-[100px] h-[100px] object-cover"
                    />
                    <div>
                      <div className="flex gap-6">
                        <h3 className="text-lg font-semibold">{product.name}</h3>
                      </div>
                      <div className="flex gap-2">
                        <p className="text-sm text-gray-600 line-through">${product.price}</p>
                        <p className="text-sm text-pink-900">${applyDiscount(product.price)}</p>
                      </div>
                      <p className="text-sm text-gray-600">{product.description}</p>
                    </div>
                  </div>
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
