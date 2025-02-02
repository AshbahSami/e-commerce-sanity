'use client';

import { useEffect, useState } from 'react';
import { client } from '@/sanity/lib/client';
import { Card } from '@/components/ui/card';
import Hero from '@/app/component/hero';
import { FaCircle, FaPenNib } from 'react-icons/fa';

interface Blog {
  _id: string;
  heading: string;
  image: {
    asset: {
      url: string;
    };
  };
  writer: string;
  blog: any[];
}

interface Product {
  slug: any;
  _id: string;
  name: string;
  price: string;
  image: {
    asset: {
      url: string;
    };
  };
  stockLevel: number;
  isFeaturedProduct: boolean;
  category: string;
}

export default function Home() {
  const offerings = [
    {
      imageUrl: '/free-delivery 1.png',
    },
    {
      imageUrl: '/cashback 1.png',
    },
    {
      imageUrl: '/premium-quality 1.png',
    },
    {
      imageUrl: '/24-hours-support 1.png',
    },
  ];

  const [blog, setBlog] = useState<Blog[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [latestProducts, setLatestProducts] = useState<Product[]>([]);
  const [trendyProducts, setTrendyProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Add loading state
  const [showMoreLatest, setShowMoreLatest] = useState<boolean>(false); // Track 'More' button visibility

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        // Fetch Featured Products
        const featured = await client.fetch(
          `*[_type == "product" && isFeaturedProduct == true]{
            _id, name, price,discountPercentage,  image { asset -> { url } }, stockLevel, category, slug
          }`
        );

        // Fetch Latest Products
        const latest = await client.fetch(
          `*[_type == "product"] | order(_createdAt desc)[0...8]{
            _id, name, price,discountPercentage, image { asset -> { url } }, stockLevel, category, slug
          }`
        );

        // Fetch Trendy Products (Sample query for products with high stock)
        const trendy = await client.fetch(
          `*[_type == "product" && stockLevel > 20]{
            _id, name, price, discountPercentage, image { asset -> { url } }, stockLevel, category ,slug
          }`
        );

        // Fetch Blogs
        const blogs = await client.fetch(
          `*[_type == "blog"]{
            _id, heading, image { asset -> { url } }, writer, blog
          }`
        );

        setFeaturedProducts(featured);
        setLatestProducts(latest);
        setTrendyProducts(trendy);
        setBlog(blogs);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    const calculateDiscountedPrice = (price: number, discountPercentage: number) => {
      return (price - (price * discountPercentage) / 100).toFixed(2);
    };

    
    fetchProducts();
  }, []);
  
  // Show more products for the latest products section
  const handleShowMoreLatest = () => {
    setShowMoreLatest(true);
  };

  if (loading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  return (
    <div>
      <Hero />
      
      {/* Featured Products */}
      <div className="my-8">
        <h2 className="text-3xl font-bold text-[#1A0B5B] mb-4 text-center">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {featuredProducts.map((product) => (
            <a href={`/pages/products/${product.slug.current}`} key={product._id}>
              <Card className="product-card p-4 flex flex-col bg-white shadow-md rounded-lg gap-2">
                <img
                  src={product.image.asset.url || "/placeholder.svg"}
                  alt={product.name}
                  className="w-[250px] h-[250px] object-cover mb-4"
                />
                <div className="flex flex-col flex-grow justify-end gap-2">
                  <h3 className="text-lg font-semibold text-[#F701A8] text-center">{product.name}</h3>
                  <p className="text-sm text-[#151875] text-center">{product.category}</p>
                  <p className="text-xl mt-2 text-center text-[#151875]">${product.price}</p>
                </div>
              </Card>
            </a>
          ))}
        </div>
      </div>

      {/* Latest Products */}
      <div className="my-8">
        <h2 className="text-3xl font-bold text-[#1A0B5B] mb-4 text-center">Latest Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4">
          {latestProducts.slice(0, showMoreLatest ? latestProducts.length : 4).map((product) => (
            <a href={`/pages/product-s/${product.slug.current}`} key={product._id}>
              <Card className="product-card p-4 flex flex-col bg-white shadow-md rounded-lg h-full">
                <img
                  src={product.image.asset.url || "/placeholder.svg"}
                  alt={product.name}
                  className="w-[250px] h-[250px] object-cover mb-4"
                />
                <div className="flex justify-between items-end mt-auto">
                  <h3 className="text-[#1A0B5B]">{product.name}</h3>
                  <p className="text-sm text-[#151875]">{product.category}</p>
                  <p className="text-[#1A0B5B] font-semibold">${product.price}</p>
                </div>
              </Card>
            </a>
          ))}
        </div>
        {!showMoreLatest && (
          <button
            onClick={handleShowMoreLatest}
            className="bg-[#1A0B5B] text-white py-2 px-4 mt-4 rounded-md"
          >
            Show More
          </button>
        )}
      </div>

      {/* What Shopex Offers */}
      <div className="my-8 place-items-center">
        <h2 className="text-3xl font-bold text-[#1A0B5B] mb-4 text-center">What Shopex Offers!</h2>
        <div className="flex space-x-4">
          {offerings.map((item, index) => (
            <Card key={index} className="w-64 p-4 bg-white shadow-md rounded-lg">
              <div className="flex justify-center items-center mb-4">
                <img src={item.imageUrl || "/placeholder.svg"} alt="Offering" className="justify-center object-cover mb-4 rounded-lg" />
              </div>
              <div className="text-center gap-2">
                <h1 className="font-semibold text-[#1A0B5B]">24/7 Support</h1>
                <p className="text-slate-500">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa purus gravida.
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Trendy Products */}
      <div className="my-8">
        <h2 className="text-3xl font-bold text-[#1A0B5B] mb-4 text-center">Trendy Products</h2>
        <div className="flex overflow-x-auto gap-4">
          {trendyProducts.map((product) => (
            <a href={`/pages/products/${product.slug.current}`} key={product._id}>
              <Card className="product-card p-4 flex flex-col bg-white shadow-md rounded-lg gap-2">
                <img
                  src={product.image.asset.url || "/placeholder.svg"}
                  alt={product.name}
                  className="w-[250px] h-[250px] object-cover mb-4"
                />
                <div className="flex flex-col flex-grow justify-end gap-2">
                  <h3 className="text-lg font-semibold text-[#151875] text-center">{product.name}</h3>
                  <p className="text-sm text-[#151875] text-center">{product.category}</p>
                  <p className="text-xl mt-2 text-center text-[#151875]">${product.price}</p>            
                </div>
              </Card> 
            </a>
          ))}
        </div>
      </div>

      {/* Discount Item */}
      <div className='place-content-center py-6 px-4'>
        <h1 className='text-3xl text-[#151875] text-center font-bold'>Discount Item</h1>
        <img src="/discount sofa (1).png" alt="Discount Sofa" />
      </div>

      {/* Top Categories */}
      <div className='mt-8 '>
        <h1 className='text-3xl text-[#151875] text-center font-bold py-4'>Top Categories</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {featuredProducts.map((product) => (
            <a href={`/pages/products/${product.slug}`} key={product._id}>
              <Card className="product-card p-4 flex flex-col bg-white shadow-md rounded-lg gap-2">
                <img
                  src={product.image.asset.url || "/placeholder.svg"}
                  alt={product.name}
                  className="w-[250px] h-[250px] object-cover mb-4"
                />
                <div className="flex flex-col flex-grow justify-end gap-2">
                  <h3 className="text-lg font-semibold text-[#F701A8] text-center">{product.name}</h3>
                  <img src="/Group 141.png" className="mx-auto  " alt="Product Icon" />
                  <p className="text-xl mt-2 text-center text-[#151875]">${product.price}</p>
                </div>
              </Card>
            </a>
          ))}
        </div>
      </div>

      {/* Subscribe */}
      <div className="bg-[url('/1.png')] bg-cover bg-center h-64 w-full place-content-center">
        <h1 className='text-3xl text-[#151875] text-center font-bold'>Get Latest Update By Subscribe Our Newsletter</h1>
        <button className='bg-[#FB2E86] text-white px-6 py-2 '>Shop Now</button>
      </div>

      {/* Footer Image */}
      <div className='place-content-center'>
        <img src="/image 1174.png" alt="Footer Image" />
      </div>

      {/* Latest Blog */}
      <div>
        <h1 className='text-3xl text-[#151875] text-center font-bold'>Latest Blog</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4 place-content-center">
          {blog.slice(0, showMoreLatest ? blog.length : 3).map((blogItem) => (
            <a href={`/pages/blog`} key={blogItem._id}>
              <Card className="product-card p-4 flex flex-col bg-white shadow-md rounded-lg h-full">
                <img
                  src={blogItem.image?.asset?.url || "/placeholder.svg"}
                  alt={blogItem.heading}
                  className="w-[300px] h-[150px] object-cover mb-4"
                />
                <h2 className="text-2xl font-bold text-[#151875]">{blogItem.heading}</h2>
                <div className="flex gap-6 place-items-center py-2">
                  <FaPenNib className="text-[#FB2E86]" />
                  <p className="text-[#151875] mt-2">{blogItem.writer}</p>
                </div>
              </Card>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
