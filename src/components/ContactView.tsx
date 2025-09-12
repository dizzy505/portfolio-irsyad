import ChatbotWidget from "./ChatbotWidget";
import { Mail, Phone, MapPin, Github, Linkedin } from "lucide-react";

export const ContactView = () => {

  // Page content + Floating Chatbot Widget
  return (
    <div className="relative">
      {/* Contact Section (visible page content) */}
      <section id="contact" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold">Contact</h1>
          <p className="text-gray-600 mt-2">Feel free to reach out for collaboration or opportunities.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Contact Information</h2>
            <div className="space-y-3">
              <a href="mailto:irsyad3254@gmail.com" className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition-colors">
                <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-blue-50 text-blue-600"><Mail className="w-5 h-5" /></span>
                <div>
                  <p className="text-xs text-gray-500">Email</p>
                  <p className="text-sm">irsyad3254@gmail.com</p>
                </div>
              </a>
              <a href="https://wa.me/6287775439677" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition-colors">
                <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-green-50 text-green-600"><Phone className="w-5 h-5" /></span>
                <div>
                  <p className="text-xs text-gray-500">WhatsApp</p>
                  <p className="text-sm">+62 877-7543-9677</p>
                </div>
              </a>
              <div className="flex items-center gap-3 text-gray-700">
                <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-purple-50 text-purple-600"><MapPin className="w-5 h-5" /></span>
                <div>
                  <p className="text-xs text-gray-500">Location</p>
                  <p className="text-sm">Jakarta, Indonesia</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Find me online</h2>
            <div className="flex items-center gap-3">
              <a href="https://github.com/dizzy505" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors" aria-label="GitHub">
                <Github className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com/in/IrsyadFaruqArdiansyah" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors" aria-label="LinkedIn">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
            <p className="text-xs text-gray-500 mt-3">I usually reply within 24–48 hours.</p>
          </div>
        </div>
      </section>

      {/* Floating Chatbot */}
      <ChatbotWidget />
    </div>
  );
};
