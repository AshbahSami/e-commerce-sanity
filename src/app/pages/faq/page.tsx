export default function FAQPage() {
    return (
      <div className="max-w-7xl mx-auto p-6 text-gray-500">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            <div className="py-6">
            <h1 className="text-3xl font-bold text-center mb-12 text-[#1D3178]">General Information</h1>
  
              <h2 className="text-2xl font-semibold">What is the return policy?</h2>
              <p>Learn about our return policy and how to initiate returns.</p>
            </div>
  
            <div>
              <h2 className="text-2xl font-semibold">How do I track my order?</h2>
              <p>Track your order with the tracking number provided after shipping.</p>
            </div>
  
            <div>
              <h2 className="text-2xl font-semibold">Do you offer international shipping?</h2>
              <p>Yes, we ship worldwide. Shipping costs may vary.</p>
            </div>
  
            <div>
              <h2 className="text-2xl font-semibold">How can I contact customer support?</h2>
              <p>Contact our support team via email or phone for assistance.</p>
            </div>
          </div>
  
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold text-center mb-12 text-[#1D3178]">Ask a Question</h1>
  
            <form>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                <input
                  type="text"
                  placeholder="Subject"
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                <textarea
                  placeholder="Type Your Message"
                  className="w-full p-2 border border-gray-300 rounded-md h-32"
                ></textarea>
                <button
                  type="submit"
                  className="px-2 py-1 bg-pink-600 text-white "
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
  