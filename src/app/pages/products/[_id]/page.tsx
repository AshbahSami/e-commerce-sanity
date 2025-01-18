'use client';

import { client } from '@/sanity/lib/client';
import { useState, useEffect } from 'react';
import { FaFacebook, FaHeart, FaInstagram, FaTwitter } from 'react-icons/fa';

interface Product {
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
}

export default function ProductPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('description');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const query = '*[_type == "product"]{_id, name, price, code, stock, "image": image.asset->}';
        const result = await client.fetch(query);
        console.log('Fetched products:', result);
        setProducts(result);
        if (result.length > 0) {
          setSelectedProduct(result[0]);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Failed to fetch products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = () => {
    if (typeof window !== 'undefined' && selectedProduct) {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      cart.push({
        id: selectedProduct._id,
        name: selectedProduct.name,
        price: selectedProduct.price,
        quantity: 1,
        image: selectedProduct.image?.asset?.url,
      });
      localStorage.setItem('cart', JSON.stringify(cart));
      alert('Product added to cart!');
    }
  };

  const content = {
    description: selectedProduct
      ? `Description: ${selectedProduct.name} is a high-quality product available at an affordable price.`
      : 'Select a product to view its description.',
    additionalInfo: selectedProduct
      ? `Additional information for ${selectedProduct.name}.`
      : 'Select a product to view additional information.',
    reviews: 'This is the reviews section. Customers can leave feedback.',
    video: 'This is where the product video will go.',
  };

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
  };

  if (error) {
    return <div className="p-4 text-red-500">{error}</div>;
  }

  return (
    <div className="p-4">
      <div className="flex flex-col md:flex-row p-8 gap-8">
        {/* Product Details */}
        <div className="w-full md:w-3/4">
          {loading ? (
            <div className="w-full h-64 bg-gray-200 animate-pulse"></div>
          ) : selectedProduct ? (
            <div className="flex flex-col md:flex-row gap-8">
              {/* Product Image */}
              <div className="w-full md:w-1/2">
                <img
                  src={selectedProduct.image?.asset?.url || "/placeholder.svg"}
                  alt={selectedProduct.name}
                  className="w-full max-w-md"
                />
              </div>

              {/* Product Info */}
              <div className="w-full md:w-1/2">
                <h1 className="font-bold text-3xl text-[#0D134E]">{selectedProduct.name}</h1>
                <div className="flex gap-4 mt-2">
                  <p className="text-[#151875] text-sm line-through">
                    ${(selectedProduct.price * 1.2).toFixed(2)}
                  </p>
                  <p className="text-sm text-pink-900">${selectedProduct.price}</p>
                </div>
                <h3 className="text-[#0D134E] text-xl mt-4">Color</h3>
                <p>{selectedProduct.code}</p>
                <div className="flex gap-4 mt-4">
                  <button
                    className="underline text-lg py-1 px-2 text-[#151875] hover:bg-slate-200 border"
                    onClick={handleAddToCart}
                  >
                    Add to cart
                  </button>
                  <FaHeart className="text-[#535399] hover:text-pink-800 text-2xl cursor-pointer" />
                </div>
                <h3 className="text-lg mt-4">Categories:</h3>
                <h3 className="text-lg">Tags:</h3>
                <div className="flex gap-2">
                  <h3 className="text-lg">Shares:</h3>
                  <div className="flex gap-2 py-2">
                    <FaFacebook className="text-blue-900" />
                    <FaInstagram className="text-pink-600" />
                    <FaTwitter className="text-blue-900" />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500">Select a product to view details</div>
          )}

          {/* Tabs */}
          <div className="tabs flex gap-8 text-lg text-[#535399] p-4 mt-8">
            {Object.keys(content).map((tab) => (
              <div
                key={tab}
                className={`hover:text-blue-900 cursor-pointer ${
                  activeTab === tab ? 'font-bold text-blue-900' : ''
                }`}
                onClick={() => handleTabClick(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </div>
            ))}
          </div>

          {/* Active Tab Content */}
          <div className="tab-content text-[#535399] p-4">
            {content[activeTab as keyof typeof content]}
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      <div className="p-4">
        <h1 className="font-bold text-3xl text-[#151875] p-4">Related Products</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {products.filter(p => p._id !== selectedProduct?._id).slice(0, 3).map(product => (
            <div key={product._id} className="border p-4 rounded">
              <img
                src={product.image?.asset?.url || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-48 object-cover mb-2"
              />
              <h3 className="font-bold">{product.name}</h3>
              <p>${product.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

