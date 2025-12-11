import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send } from 'lucide-react';

const Contact: React.FC = () => {
  const [msg, setMsg] = useState({ name: '', phone: '', text: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fullMessage = `Hello Anjeet Book Dealer, my name is ${msg.name} (${msg.phone}). ${msg.text}`;
    const url = `https://wa.me/919891172140?text=${encodeURIComponent(fullMessage)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold font-poppins text-primary">Get in Touch</h2>
        <p className="text-gray-500 mt-2">We are here to help you with your educational needs.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 max-w-5xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Info Side */}
        <div className="lg:w-2/5 bg-primary text-white p-10 flex flex-col justify-between">
          <div>
            <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <MapPin className="text-secondary mt-1" />
                <p>Khasra No 69, Galli 19, Govindpuri Extension, Govindpuri, Delhi 110019</p>
              </div>
              <div className="flex items-center gap-4">
                <Phone className="text-secondary" />
                <p>+91 98911 72140</p>
              </div>
              <div className="flex items-center gap-4">
                <Mail className="text-secondary" />
                <p>anjeetsingh390@gmail.com</p>
              </div>
            </div>
          </div>
          <div className="mt-12">
            <div className="w-20 h-1 bg-secondary rounded mb-4"></div>
            <p className="text-sm opacity-80">Visit us during store hours: <br/>Mon - Sat: 10:00 AM - 9:00 PM</p>
          </div>
        </div>

        {/* Form Side */}
        <div className="lg:w-3/5 p-10">
          <h3 className="text-xl font-bold mb-6 text-gray-800">Send us a Message</h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Your Name</label>
                <input 
                  required
                  type="text" 
                  className="w-full border border-gray-300 rounded-lg p-3 focus:border-primary outline-none transition"
                  placeholder="John Doe"
                  value={msg.name}
                  onChange={e => setMsg({...msg, name: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Phone Number</label>
                <input 
                  required
                  type="tel" 
                  className="w-full border border-gray-300 rounded-lg p-3 focus:border-primary outline-none transition"
                  placeholder="+91..."
                  value={msg.phone}
                  onChange={e => setMsg({...msg, phone: e.target.value})}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Message</label>
              <textarea 
                required
                className="w-full border border-gray-300 rounded-lg p-3 focus:border-primary outline-none transition h-32"
                placeholder="I am looking for..."
                value={msg.text}
                onChange={e => setMsg({...msg, text: e.target.value})}
              ></textarea>
            </div>
            <button 
              type="submit" 
              className="bg-secondary hover:bg-secondary-dark text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-all w-full md:w-auto flex items-center justify-center gap-2"
            >
              <Send size={18} /> Send to WhatsApp
            </button>
          </form>
        </div>
      </div>
      
      {/* Map Embed */}
      <div className="mt-12 max-w-5xl mx-auto h-64 bg-gray-200 rounded-xl overflow-hidden shadow-md">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3504.666494801123!2d77.2568!3d28.5492!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce3c5b5b5b5b5%3A0x5b5b5b5b5b5b5b5b!2sGovindpuri%20Extension%2C%20Govindpuri%2C%20New%20Delhi%2C%20Delhi%20110019!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen={true} 
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
};

export default Contact;