'use client'
import { Card } from "@/components/ui/card";
import {  useRouter} from "next/router";

export default function About() {
   
  const offers = [
    {
      imgSrc: "/24-hours-support 1.png",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      imgSrc: "/free-delivery 1.png",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      imgSrc: "/cashback 1.png",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      imgSrc: "/premium-quality 1.png",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center px-6 py-10">
        <img
          src="/client.png"
          alt="About Image"
          className="w-full h-auto md:w-[50%] mx-auto"
        />
        <div className="text-center md:text-left">
          <h1 className="text-3xl font-extrabold text-[#151875] mb-4">
            Know About Our E-commerce Business
          </h1>
          <p className="text-[#8A8FB9] mb-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mattis neque ultrices mattis aliquam, malesuada
            diam est. Malesuada sem tristique amet erat vitae eget dolor lobortis. Accumsan faucibus vitae lobortis
            quis bibendum quam.
          </p>
          <a href="/pages/contact">
          <button className="bg-[#FB2E86] text-white px-6 py-3 rounded-full hover:bg-[#e20073]" >
            Contact Us
          </button>
          </a>
        </div>
      </div>

      <h1 className="text-center text-3xl font-extrabold text-[#151875] mb-8">Our Features</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-6">
        {offers.map((offer, index) => (
          <Card key={index} className="shadow-lg px-4 py-6 text-center">
            <img src={offer.imgSrc} alt={`Offer ${index + 1}`} className="mx-auto mb-4" />
            <p className="text-[#8A8FB9] text-sm">{offer.text}</p>
          </Card>
        ))}
      </div>

      <div className="text-center mt-16">
        <h1 className="text-3xl font-extrabold text-[#151875] mb-4">What Our Clients Say</h1>
        <img src="/comment.png" alt="Client Image" className="mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-[#151875]">Selina Gomez</h3>
        <p className="text-[#8A8FB9] mt-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mattis neque ultrices mattis aliquam, malesuada
          diam est. Malesuada sem tristique amet erat vitae eget dolor lobortis. Accumsan faucibus vitae lobortis
          quis bibendum quam.
        </p>
      </div>
    </div>
  );
}
