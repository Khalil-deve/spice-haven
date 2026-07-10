import React, { useState } from "react";
import { Mail, ArrowRight, Instagram, Facebook, Twitter, MapPin } from "lucide-react";

interface FooterProps {
  onPageChange: (page: string) => void;
  onAddNotification: (message: string, type: "success" | "error" | "info") => void;
}

export default function Footer({ onPageChange, onAddNotification }: FooterProps) {
  const [emailInput, setEmailInput] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim()) return;
    onAddNotification("Subscription confirmed! Welcome to Spice Haven's inner circle.", "success");
    setEmailInput("");
  };

  return (
    <footer className="bg-brand-charcoal text-brand-cream pt-20 pb-10 border-t border-vintage/20 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12 pb-16 border-b border-vintage/10">
        {/* Brand Column */}
        <div className="space-y-4">
          <button 
            onClick={() => onPageChange("home")}
            className="text-left group cursor-pointer focus:outline-none"
          >
            <span className="font-display font-semibold text-xl tracking-widest text-white group-hover:text-brand-gold transition-colors">
              SPICE HAVEN
            </span>
            <span className="block font-mono text-[9px] tracking-[0.25em] text-brand-gold uppercase -mt-0.5 font-medium">
              Bombay Café & Kitchen
            </span>
          </button>
          <p className="text-xs text-brand-muted leading-relaxed">
            Preserving and celebrating the nostalgic culinary memories and grand hospitality of South Bombay cafés. Built with integrity, heritage spices, and live wood coals.
          </p>
          <div className="flex gap-3 text-brand-muted pt-2">
            <a href="#instagram" className="hover:text-brand-gold transition-colors" aria-label="Instagram"><Instagram className="w-4.5 h-4.5" /></a>
            <a href="#facebook" className="hover:text-brand-gold transition-colors" aria-label="Facebook"><Facebook className="w-4.5 h-4.5" /></a>
            <a href="#twitter" className="hover:text-brand-gold transition-colors" aria-label="Twitter"><Twitter className="w-4.5 h-4.5" /></a>
          </div>
        </div>

        {/* Navigation Quick Links */}
        <div className="space-y-4">
          <h4 className="font-mono text-[10px] uppercase tracking-widest text-brand-gold font-bold">Quick Links</h4>
          <ul className="space-y-2.5 text-xs text-brand-muted">
            <li>
              <button onClick={() => onPageChange("home")} className="hover:text-brand-gold hover:underline cursor-pointer">
                Return Home
              </button>
            </li>
            <li>
              <button onClick={() => onPageChange("about")} className="hover:text-brand-gold hover:underline cursor-pointer">
                Our Story & Legacy
              </button>
            </li>
            <li>
              <button onClick={() => onPageChange("menu")} className="hover:text-brand-gold hover:underline cursor-pointer">
                The Menu & Grills
              </button>
            </li>
            <li>
              <button onClick={() => onPageChange("locations")} className="hover:text-brand-gold hover:underline cursor-pointer">
                Our London Parlours
              </button>
            </li>
            <li>
              <button onClick={() => onPageChange("reservations")} className="hover:text-brand-gold hover:underline cursor-pointer font-semibold text-white">
                Book a Table
              </button>
            </li>
            <li>
              <button onClick={() => onPageChange("contact")} className="hover:text-brand-gold hover:underline cursor-pointer">
                FAQ & Contact
              </button>
            </li>
          </ul>
        </div>

        {/* Operating hours preview */}
        <div className="space-y-4">
          <h4 className="font-mono text-[10px] uppercase tracking-widest text-brand-gold font-bold">Flagship Hours</h4>
          <div className="space-y-2.5 text-xs text-brand-muted">
            <p>
              <strong className="text-white block font-sans">Covent Garden (Flagship)</strong>
              12 Upper St. Martin's Lane, London WC2H
            </p>
            <div className="pt-2">
              <span className="block">Mon – Fri: 08:00 AM – 11:30 PM</span>
              <span className="block">Sat – Sun: 09:00 AM – Midnight</span>
            </div>
          </div>
        </div>

        {/* Newsletter subscription */}
        <div className="space-y-4">
          <h4 className="font-mono text-[10px] uppercase tracking-widest text-brand-gold font-bold">The Haven Dispatch</h4>
          <p className="text-xs text-brand-muted leading-relaxed">
            Subscribe to our seasonal newsletters, special feast invitations, and exclusive Bombay historical journals.
          </p>
          <form onSubmit={handleSubscribe} className="relative mt-2">
            <input
              type="email"
              required
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              placeholder="Your email address"
              className="w-full text-xs p-3 pr-10 bg-brand-charcoal border border-vintage/30 rounded focus:outline-none focus:border-brand-gold text-brand-cream font-sans"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-brand-gold hover:text-white transition-colors"
              aria-label="Subscribe"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>

      {/* Compliance / Footer Bottom */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-brand-muted gap-4">
        <div>
          <span>&copy; {new Date().getFullYear()} Spice Haven Restaurants Ltd. All Rights Reserved.</span>
        </div>
        <div className="flex gap-4">
          <button onClick={() => onPageChange("privacy")} className="hover:text-brand-gold hover:underline cursor-pointer">
            Privacy Policy
          </button>
          <span>&bull;</span>
          <a href="#terms" className="hover:text-brand-gold hover:underline">
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
}
