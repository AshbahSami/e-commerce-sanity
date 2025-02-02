import { FaCircle } from "react-icons/fa";

export default function ContactUs() {
  return (
    <div className="min-h-screen py-10 px-6 bg-gray-100">
      {/* Top Section: Information About Us & Contact Way */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {/* Left: Information About Us */}
        <div className="space-y-6">
          <h1 className="text-3xl font-semibold text-[#151875]">Information About Us</h1>
          <p className="text-lg text-gray-500">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mattis neque ultrices mattis aliquam, malesuada
            diam est. Malesuada sem tristique amet erat vitae eget dolor lobortis. Accumsan faucibus vitae lobortis
            quis bibendum quam.
          </p>
          <div className="flex">
          <FaCircle className="text-[#5726DF] size-16  p-4"  />
          <FaCircle className="text-pink-700 size-16  p-4"  />
          <FaCircle className="text-[#37DAF3] size-16  p-4"  />
          </div>
        </div>

        {/* Right: Contact Way */}
        <div className="space-y-6">
          <h1 className="text-3xl font-semibold text-[#151875]">Contact Way</h1>
          <ul className="grid grid-cols-2 gap-6 text-gray-500">
            {/* Contact Method 1 */}
            <li className="flex items-center gap-4">
              <FaCircle className="text-[#5726DF] size-20 rounded-full p-4" size={40} />
              <div>
                <p className="font-medium">On all orders.</p>
                <p className="text-sm ">Free standard shipping</p>
              </div>
            </li>

            {/* Contact Method 2 */}
            <li className="flex items-center gap-4">
              <FaCircle className="text-[#FFB265] size-20 rounded-full p-4" size={40} />
              <div>
                <p className="font-medium">On all orders.</p>
                <p className="text-sm ">Free standard shipping</p>
              </div>
            </li>

            {/* Contact Method 3 */}
            <li className="flex items-center gap-4 ">
              <FaCircle className="text-pink-700 size-20 p-4" size={40} />
              <div>
                <p className="font-medium">On all orders.</p>
                <p className="text-sm ">Free standard shipping</p>
              </div>
            </li>

            {/* Contact Method 4 */}
            <li className="flex items-center gap-4">
              <FaCircle className="text-[#1BE982] size-20 p-4" size={40} />
              <div>
                <p className="font-medium">On all orders.</p>
                <p className="text-sm ">Free standard shipping</p>
              </div>
            </li>
          </ul>
        </div>
      </div>


      <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1 space-y-6">
          <h1 className="text-3xl font-semibold text-[#151875]">Get In Touch</h1>
          <p className="text-lg text-gray-500">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mattis neque ultrices mattis aliquam, malesuada
            diam est. Malesuada sem tristique amet erat vitae eget dolor lobortis. Accumsan faucibus vitae lobortis
            quis bibendum quam.
          </p>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm text-gray-600">Your Name</label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm text-gray-600">Your Email</label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="Your Email"
                />
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm text-gray-600">Subject</label>
              <input
                type="text"
                id="subject"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="Subject"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm text-gray-600">Your Message</label>
              <textarea
                id="message"
                className="w-full px-4 py-6 border border-gray-300 rounded-lg"
                placeholder="Type your message"
                rows={6}
              ></textarea>
            </div>
          </form>
          <button className="bg-[#FB2E86] text-white px-6 py-2 rounded-lg">Send Mail</button>
        </div>

        <div className="flex-1">
          <img src="/contact.png" alt="Get in Touch Image" className="sm:w- rounded-lg shadow-md" />
        </div>
      </div>
    </div>
  );
}
