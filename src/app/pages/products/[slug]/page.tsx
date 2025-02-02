'use client';
import { Product } from "@/type/product";
import { handleAddToCart } from '@/app/actions/handdler';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { FaHeart } from 'react-icons/fa';

export default function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [selected, setSelected] = useState(false);
  const [slug, setSlug] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string>(''); // To track the active section

  useEffect(() => {
    // Resolve the params slug
    params.then((resolvedParams) => setSlug(resolvedParams.slug));
  }, [params]);

  useEffect(() => {
    if (slug) {
      const fetchProduct = async () => {
        const query = `*[_type == "product" && slug.current == $slug][0]`;
        const data: Product | null = await client.fetch(query, { slug });
        setProduct(data);
      };
      fetchProduct();
    }
  }, [slug]);

  const calculateDiscountedPrice = (price: number, discountPercentage: number) => {
    return (price - (price * discountPercentage) / 100).toFixed(2);
  };

  const toggleSelect = () => {
    setSelected(!selected);
  };

  const toggleSection = (section: string) => {
    setActiveSection((prev) => (prev === section ? '' : section));
  };

  if (!slug) {
    return <div>Loading...</div>; // Wait for slug to resolve
  }

  if (!product) {
    return <div>Product not found.</div>;
  }


  return (
    <div className="p-6">
      <div className="grid-cols-2 flex gap-4 p-6">
        <div>
          <Image
            src={urlFor(product.image).url()}
            alt={product.name}
            width={300}
            height={300}
            className="my-4"
          />
        </div>
        <div className="gap-4">
          <h1 className="text-3xl font-bold text-[#0D134E]">{product.name}</h1>
          <div className="flex gap-4">
            <p className="text-lg font-semibold text-[#151875]">
              ${calculateDiscountedPrice(product.price, product.discountPercentage)}
            </p>
            <p className="text-lg font-semibold text-[#FB2E86] line-through">
              ${product.price}
            </p>
          </div>

          <h3 className="text-[#0D134E] text-3xl font-light py-2">Color</h3>
          <div className="flex gap-2">
            <div
              className={`place-content-center w-20 h-10 text-xl rounded-lg text-center hover:font-semibold ${
                selected ? 'bg-red-500' : 'bg-slate-200'
              }`}
              onClick={toggleSelect}
            >
              Red
            </div>
            <div
              className={`place-content-center w-20 h-10 text-xl rounded-lg text-center hover:font-semibold ${
                selected ? 'bg-blue-500 text-white' : 'bg-slate-200'
              }`}
              onClick={toggleSelect}
            >
              Blue
            </div>
            <div
              className={`place-content-center w-20 h-10 text-xl rounded-lg text-center hover:font-semibold ${
                selected ? 'bg-yellow-500' : 'bg-slate-200'
              }`}
              onClick={toggleSelect}
            >
              Yellow
            </div>
          </div>
          <p className="py-2 text-slate-500">{product.description}</p>
          <div className="flex gap-6">
            <button
              className="text-[#0D134E] text-xl bg-slate-100 rounded-lg hover:bg-slate-200 w-40 h-14 snipcart-add-item"
              onClick={(e)=>handleAddToCart(e,product)
              }
              
            >
              Add To Cart
            </button>
            <div className="place-content-center text-xl">
              <FaHeart className="cursor-pointer" />
            </div>
          </div>
        </div>
      </div>

      {/* Section Tabs */}
      <div className="py-6 ">
        <div className="flex gap-4 border-b pb-2">
          <button
            className={`text-xl ${activeSection === 'description' ? 'font-bold text-[#151875]' : ''}`}
            onClick={() => toggleSection('description')}
          >
            Description
          </button>
          <button
            className={`text-xl ${activeSection === 'vision' ? 'font-bold text-[#151875]' : ''}`}
            onClick={() => toggleSection('vision')}
          >
            Vision
          </button>
          <button
            className={`text-xl ${activeSection === 'video' ? 'font-bold text-[#151875]' : ''}`}
            onClick={() => toggleSection('video')}
          >
            Video
          </button>
          <button
            className={`text-xl ${activeSection === 'comments' ? 'font-bold text-[#151875]' : ''}`}
            onClick={() => toggleSection('comments')}
          >
            Comments
          </button>
        </div>

        {/* Section Content */}
        <div className="py-4 ">
          {activeSection === 'description' && (
            <div className="text-slate-600">
              <p>{product.description}</p>
            </div>
          )}
          {activeSection === 'vision' && (
            <div className="text-slate-600">
              <p>Our vision is to provide high-quality, sustainable, and affordable products.</p>
            </div>
          )}
          {activeSection === 'video' && (
            <div>
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="Product Video"
                className="w-full rounded-lg"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          )}
          {activeSection === 'comments' && (
            <div className="text-slate-600">
              <p>Customer comments will appear here.</p>
            </div>
          )}
        </div>
      </div>
      {/* Related Products */}
      <div></div>
    </div>
  );
}
