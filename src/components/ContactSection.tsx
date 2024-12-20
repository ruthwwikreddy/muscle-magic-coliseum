import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Button } from "./ui/button";

const ContactSection = () => {
  return (
    <section className="py-20 bg-white" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-black mb-4">Contact Us</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Get in touch with us for any questions about our services
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <MapPin className="w-6 h-6 text-muscle-red flex-shrink-0" />
              <div>
                <h3 className="font-bold mb-1">Address</h3>
                <p className="text-gray-600">
                  Level 4, Pavani Equinox, Road Number 10, Jubilee Hills
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <Phone className="w-6 h-6 text-muscle-red flex-shrink-0" />
              <div>
                <h3 className="font-bold mb-1">Phone</h3>
                <p className="text-gray-600">+91-9281151518</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <Mail className="w-6 h-6 text-muscle-red flex-shrink-0" />
              <div>
                <h3 className="font-bold mb-1">Email</h3>
                <p className="text-gray-600">admin@mwthefitnesscoliseum.in</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <Clock className="w-6 h-6 text-muscle-red flex-shrink-0" />
              <div>
                <h3 className="font-bold mb-1">Working Hours</h3>
                <p className="text-gray-600">
                  Monday - Saturday: 6:00 AM - 10:00 PM
                  <br />
                  Sunday: 7:00 AM - 8:00 PM
                </p>
              </div>
            </div>
          </div>
          
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-muscle-red focus:border-muscle-red"
                placeholder="Your name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-muscle-red focus:border-muscle-red"
                placeholder="Your email"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-muscle-red focus:border-muscle-red"
                placeholder="Your message"
              />
            </div>
            
            <Button className="w-full bg-muscle-red hover:bg-muscle-red/90">
              Send Message
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;