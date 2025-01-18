'use client'
import { useState, useEffect } from "react";
import { client } from '@/sanity/lib/client';
import { FaPenNib } from 'react-icons/fa';


interface Post {
  id: string;
  heading: string;
  image: string;
  writer: string;
  blog: any[]; 
}

export default function Blog() {

    const [isSelected, setIsSelected] = useState(false);

  // Function to toggle the selected state
  const handleClick = () => {
    setIsSelected(!isSelected);
  }
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [expandedPost, setExpandedPost] = useState<string | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    async function fetchPosts() {
      const data = await client.fetch(`
        *[_type == "blog"] {
          _id,
          heading,
          image {
            asset -> {
              _id,
              url
            }
          },
          writer,
          blog
        }
      `);
      setPosts(data.map((post: any) => ({
        id: post._id,
        heading: post.heading,
        image: post.image?.asset?.url || '',
        writer: post.writer,
        blog: post.blog || [],
      })));
    }
    fetchPosts();
  }, []);

  const filteredPosts = posts.filter((post) =>
    post.heading.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleReadMore = (id: string) => {
    setExpandedPost(expandedPost === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
        <div className="md:col-span-1 space-y-6 order-1 md:order-2">
          {/* Search */}
          <div className="bg-white p-6 shadow-lg rounded-lg">
            <h2 className="text-xl font-bold text-[#151875]">Search</h2>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-3 border rounded-md text-sm"
              placeholder="Search blog posts..."
            />
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#151875]">Categories</h2>
            <div>
            <button
      onClick={handleClick}
      // Conditionally apply the styles based on isSelected
      style={{
        backgroundColor: isSelected ? "" : "white",
        color:"black",
        padding: "10px 20px",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        transition: "background-color 0.3s",
      }}
    >
      {isSelected ? "Selected" : "Select Me"}
    </button>
            </div>
          </div>
          {/* Categories and other sections */}
        </div>

        {/* Main Blog Posts */}
        <div className="md:col-span-2 space-y-8 order-2 md:order-1">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <div key={post.id} className="bg-white p-6 shadow-lg rounded-lg">
                <img
                  src={post.image}
                  alt={post.heading}
                  className="w-full h-64 object-cover rounded-lg mb-4"
                />
                <h2 className="text-2xl font-bold text-[#151875]">{post.heading}</h2>
               <div className="flex gap-6 place-items-center py-2">
               <FaPenNib className="text-[#FB2E86] justify-"/>
                <p className="text-[#151875] mt-2">  {post.writer}</p>
               </div>
                {/* Read More button */}
                <a
                  onClick={() => handleReadMore(post.id)}
                  className="px-2 underline cursor-pointer text-[#151875] "
                >
                  {expandedPost === post.id ? "Read Less" : "Read More"}
                </a>

                {/* Full content */}
                {expandedPost === post.id && (
                  <div className="mt-6 text-[#8A8FB9]">
                    {/* Iterate through the 'blog' content array (which can contain both text and images) */}
                    {post.blog.map((content, index) => {
                      if (content._type === "block") {
                        // Render rich text blocks (including bold, italic, etc.)
                        return (
                          <div key={index} className="text-lg">
                            {/* Render rich text here, assuming PortableText is used for rich text */}
                            <p>{content.children?.map((child: { text: any; }) => child.text).join(" ")}</p>
                          </div>
                        );
                      } else if (content._type === "image" && content.asset?._ref) {
                        // Render images
                        return (
                          <div key={index} className="mt-4">
                            <img
                              src={`https://cdn.sanity.io/images/YOUR_PROJECT_ID/YOUR_DATASET/${content.asset._ref}.jpg`}
                              alt={`Image in ${post.heading}`}
                              className="w-full h-64 object-cover rounded-lg"
                            />
                          </div>
                        );
                      }
                      return null;
                    })}
                  </div>
                )}
              </div>
            ))
          ) : (
            <p>No posts found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
