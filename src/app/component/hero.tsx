'use client';
import { useState, useEffect } from "react";
import { client } from "@/sanity/lib/client"; // Ensure this import path is correct

interface Hero {
  _id: string;
  image: {
    asset: {
      url: string;
    };
  };
}

export default function Hero() {
  const [heroData, setHeroData] = useState<Hero[]>([]); // State to store multiple hero data
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0); // Track the current image index

  useEffect(() => {
    const fetchHeroData = async () => {
      // Fetching all hero images
      const res: Hero[] = await client.fetch(
        '*[_type == "hero"]{_id, image {asset -> {url}}}'
      );
      setHeroData(res); // Save the fetched hero data into state
    };

    fetchHeroData(); // Fetch the hero data once when the component mounts

    // Change the image every 10 seconds
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroData.length);
    }, 10000); // 10000ms = 10 seconds

    // Cleanup the interval when the component unmounts
    return () => clearInterval(interval);
  }, [heroData.length]); // Dependency on heroData.length to trigger interval when images are fetched

  // Loading state
  if (heroData.length === 0) return <p>Loading...</p>;

  // Get the current image based on the index
  const currentImage = heroData[currentImageIndex];

  return (
    <div className="hero-section-container px-6 py-2 bg-white text-black">
      {/* Right side with image */}
      <div className="image-section w-full h-[400px] ">
        <img
          src={currentImage.image?.asset?.url || ""}
          alt={`Hero Image ${currentImage._id}`}
          className="hero-image w-full h-full object-cover rounded-lg"
        />
      </div>
    </div>
  );
}
