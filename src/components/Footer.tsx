import React from 'react';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  const footerSections = [
    {
      title: 'Customer Service',
      links: ['Contact', 'Shipping', 'Returns', 'Size Guide', 'Gift Cards']
    },
    {
      title: 'About',
      links: ['Our Story', 'Sustainability', 'Careers', 'Press', 'Investors']
    },
    {
      title: 'Legal',
      links: ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Accessibility']
    }
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Youtube, href: '#', label: 'YouTube' }
  ];

  return (
    <footer className="bg-zara-light-gray border-t border-zara-medium-gray" role="contentinfo">
      <div className="max-w-[1280px] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Footer Sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold text-zara-near-black mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link}>
                    <a 
                      href="#" 
                      className="text-sm text-zara-charcoal hover:text-zara-near-black transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter & Social */}
          <div>
            <h3 className="font-semibold text-zara-near-black mb-4">Stay Updated</h3>
            <p className="text-sm text-zara-charcoal mb-4">
              Subscribe to get the latest news and exclusive offers.
            </p>
            <form className="space-y-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 border border-zara-gray bg-zara-white focus:outline-none focus:ring-1 focus:ring-zara-near-black focus:border-transparent"
              />
              <button
                type="submit"
                className="w-full bg-zara-near-black text-zara-white py-2 font-medium hover:bg-zara-deep-gray transition-colors duration-200"
              >
                Subscribe
              </button>
            </form>
            
            <div className="mt-6">
              <h4 className="font-medium text-zara-near-black mb-3">Follow Us</h4>
              <div className="flex space-x-4">
                {socialLinks.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    className="text-zara-charcoal hover:text-zara-near-black transition-colors duration-200"
                    aria-label={label}
                  >
                    <Icon size={20} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-zara-medium-gray mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-zara-charcoal">
            © {new Date().getFullYear()} Alterd — All rights reserved.
          </p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <span className="text-sm text-zara-charcoal">Payment Methods:</span>
            <div className="flex space-x-2">
              <div className="w-8 h-5 bg-zara-gray text-xs flex items-center justify-center font-bold text-zara-near-black">
                VISA
              </div>
              <div className="w-8 h-5 bg-zara-gray text-xs flex items-center justify-center font-bold text-zara-near-black">
                MC
              </div>
              <div className="w-8 h-5 bg-zara-gray text-xs flex items-center justify-center font-bold text-zara-near-black">
                AE
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;