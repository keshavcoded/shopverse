const Footer = () => {
  return (
    <footer className="bg-gray-50 mt-12">
      <div className="max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center md:text-left">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start">
            <h2 className="text-xl font-bold text-gray-900 mb-2">Shopverse</h2>
            <p className="text-sm text-gray-500 max-w-xs">
              Curated, high-quality fashion to refresh your wardrobe with style.
            </p>
          </div>

          {/* Company */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              Company
            </h2>
            <ul className="space-y-1 text-sm text-gray-500">
              <li className="hover:cursor-pointer hover:underline">About Us</li>
              <li className="hover:cursor-pointer hover:underline">Contact</li>
              <li className="hover:cursor-pointer hover:underline">
                Affiliates
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              Support
            </h2>
            <ul className="space-y-1 text-sm text-gray-500">
              <li className="hover:cursor-pointer hover:underline">FAQs</li>
              <li className="hover:cursor-pointer hover:underline">
                Cookie Policy
              </li>
              <li className="hover:cursor-pointer hover:underline">
                Terms of Use
              </li>
            </ul>
          </div>

          {/* Payment Methods */}
          <div className="flex flex-col items-center md:items-start">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              Payments
            </h2>
            <img
              src="./payments.png"
              alt="Accepted payment methods"
              className="h-auto max-w-[180px]"
              draggable="false"
            />
          </div>
        </div>

        {/* Bottom footer */}
        <div className="mt-10 border-t pt-6 text-center text-sm text-gray-400">
          &copy; {new Date().getFullYear()} Shopverse. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
