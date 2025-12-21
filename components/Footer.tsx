
import React from 'react';
import { Phone, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="py-16 border-t border-white/5 bg-[#050505] text-center md:text-left">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
          
          <div>
            <h3 className="text-xl font-bold text-white tracking-widest uppercase mb-4">Solar Gear Ltd.</h3>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              Providing premium <strong>Solar Backup in Nairobi</strong> and expert installation services across Kenya. Empowering homeowners with energy independence since 2024.
            </p>
            <div className="mt-6 flex flex-col gap-4 text-sm text-gray-400">
               <a href="tel:+254722371250" className="flex items-center gap-2 hover:text-gold transition-colors justify-center md:justify-start">
                  <Phone size={16} /> +254 722 371 250
               </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-4">Service Areas</h4>
            <ul className="text-gray-500 text-sm space-y-2 grid grid-cols-2">
              <li className="flex items-center gap-2"><div className="w-1 h-1 bg-gold rounded-full"></div> Westlands</li>
              <li className="flex items-center gap-2"><div className="w-1 h-1 bg-gold rounded-full"></div> Karen</li>
              <li className="flex items-center gap-2"><div className="w-1 h-1 bg-gold rounded-full"></div> Lavington</li>
              <li className="flex items-center gap-2"><div className="w-1 h-1 bg-gold rounded-full"></div> Runda</li>
              <li className="flex items-center gap-2"><div className="w-1 h-1 bg-gold rounded-full"></div> Muthaiga</li>
              <li className="flex items-center gap-2"><div className="w-1 h-1 bg-gold rounded-full"></div> Kilimani</li>
              <li className="flex items-center gap-2"><div className="w-1 h-1 bg-gold rounded-full"></div> Syokimau</li>
              <li className="flex items-center gap-2"><div className="w-1 h-1 bg-gold rounded-full"></div> Lang'ata</li>
            </ul>
          </div>

          <div className="flex flex-col md:items-end">
            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-4">Solar Installers Kenya</h4>
            <div className="flex gap-6 text-sm text-gray-500 mb-6">
              <span className="hover:text-gold transition-colors cursor-pointer">Privacy Policy</span>
              <span className="hover:text-gold transition-colors cursor-pointer">Terms of Service</span>
            </div>
            <div className="text-xs text-gray-700">
              &copy; {new Date().getFullYear()} Solar Gear Ltd. All Rights Reserved. <br/>
              Nairobi, Kenya.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
