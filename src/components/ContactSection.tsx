import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, HelpCircle, ChevronDown, Clock, MessageSquare, Instagram, Facebook, Twitter } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { FAQS } from "../data";

interface ContactSectionProps {
  onAddNotification: (message: string, type: "success" | "error" | "info") => void;
}

export default function ContactSection({ onAddNotification }: ContactSectionProps) {
  const [openFAQIndex, setOpenFAQIndex] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "Inquiry",
    message: ""
  });

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.message) {
      onAddNotification("Kindly fill in all mandatory feedback fields.", "error");
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      onAddNotification("Message successfully delivered! Our concierge team will reach out within 24 hours.", "success");
      setContactForm({
        name: "",
        email: "",
        subject: "Inquiry",
        message: ""
      });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto">
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-brand-gold font-semibold">Concierge Desk</span>
        <h2 className="font-display font-bold text-3xl sm:text-4xl tracking-tight text-brand-charcoal dark:text-brand-cream mt-2 uppercase">
          FAQ & CONNECT
        </h2>
        <p className="font-sans text-sm text-brand-muted leading-relaxed mt-4">
          Have queries about dietary bounds, private banquet halls, or booking timings? Drop us a line below or browse our archives.
        </p>
      </div>

      {/* Main Content Split: Form and Info */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Form */}
        <div className="bg-white dark:bg-brand-charcoal p-8 border border-vintage rounded-lg shadow-sm">
          <h3 className="font-display font-semibold text-lg uppercase tracking-wide text-brand-charcoal dark:text-brand-cream mb-6">
            SEND AN INQUIRY
          </h3>
          <form onSubmit={handleContactSubmit} className="space-y-5">
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-brand-muted mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                required
                value={contactForm.name}
                onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                placeholder="e.g. Eleanor Vance"
                className="w-full text-xs p-3 rounded bg-brand-cream/30 dark:bg-brand-charcoal border border-vintage focus:outline-none focus:border-brand-gold dark:text-brand-cream"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-brand-muted mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                required
                value={contactForm.email}
                onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                placeholder="e.g. eleanor@vance.com"
                className="w-full text-xs p-3 rounded bg-brand-cream/30 dark:bg-brand-charcoal border border-vintage focus:outline-none focus:border-brand-gold dark:text-brand-cream"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-brand-muted mb-1.5">
                Inquiry Subject
              </label>
              <select
                value={contactForm.subject}
                onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                className="w-full text-xs p-3 rounded bg-brand-cream/30 dark:bg-brand-charcoal border border-vintage focus:outline-none focus:border-brand-gold dark:text-brand-cream"
              >
                <option value="Inquiry">General Inquiry</option>
                <option value="PrivateDining">Private Hall Hire</option>
                <option value="Allergens">Allergen Consultation</option>
                <option value="Press">Media & Press</option>
              </select>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-brand-muted mb-1.5">
                Your Message
              </label>
              <textarea
                required
                rows={5}
                value={contactForm.message}
                onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                placeholder="Write your note to Anwar and our host team..."
                className="w-full text-xs p-3 rounded bg-brand-cream/30 dark:bg-brand-charcoal border border-vintage focus:outline-none focus:border-brand-gold dark:text-brand-cream"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-brand-burgundy hover:bg-brand-gold text-white hover:text-brand-charcoal font-sans text-xs uppercase tracking-widest font-semibold rounded transition-colors flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>{isSubmitting ? "Dispatching..." : "Dispatch Message"}</span>
            </button>
          </form>
        </div>

        {/* Info roster & FAQ accordion */}
        <div className="space-y-10">
          {/* Contacts Details Panel */}
          <div className="bg-white dark:bg-brand-charcoal border border-vintage p-8 rounded-lg shadow-sm space-y-6">
            <h3 className="font-display font-semibold text-sm uppercase tracking-wider text-brand-charcoal dark:text-brand-cream">
              CENTRAL CONCIERGE OFFICE
            </h3>

            <div className="space-y-4 font-sans text-xs">
              <div className="flex gap-3">
                <MapPin className="w-4.5 h-4.5 text-brand-gold shrink-0 mt-0.5" />
                <div>
                  <span className="block font-semibold text-brand-charcoal dark:text-brand-cream">Spice Haven Corporate HQ</span>
                  <span className="text-brand-muted">33 Golden Square, Soho, London W1F 9JT</span>
                </div>
              </div>

              <div className="flex gap-3">
                <Phone className="w-4.5 h-4.5 text-brand-gold shrink-0" />
                <div>
                  <span className="block font-semibold text-brand-charcoal dark:text-brand-cream">Corporate Desk</span>
                  <span className="text-brand-muted">+44 20 7946 0880</span>
                </div>
              </div>

              <div className="flex gap-3">
                <Mail className="w-4.5 h-4.5 text-brand-gold shrink-0" />
                <div>
                  <span className="block font-semibold text-brand-charcoal dark:text-brand-cream">Concierge Enquiries</span>
                  <span className="text-brand-muted">hello@spicehaven.co.uk</span>
                </div>
              </div>
            </div>

            <div className="pt-5 border-t border-vintage/30 flex items-center gap-4">
              <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-brand-muted">Join Our Circle:</span>
              <div className="flex items-center gap-3 text-brand-muted">
                <a href="#instagram" className="hover:text-brand-gold transition-colors"><Instagram className="w-4 h-4" /></a>
                <a href="#facebook" className="hover:text-brand-gold transition-colors"><Facebook className="w-4 h-4" /></a>
                <a href="#twitter" className="hover:text-brand-gold transition-colors"><Twitter className="w-4 h-4" /></a>
              </div>
            </div>
          </div>

          {/* Maps Area / Visual Framing */}
          <div className="bg-brand-charcoal/10 rounded-lg overflow-hidden border border-vintage h-44 relative flex items-center justify-center text-center p-6 bg-[radial-gradient(#c5a880_1px,transparent_1px)] [background-size:16px_16px]">
            <div className="max-w-xs">
              <span className="font-mono text-[9px] uppercase tracking-widest text-brand-gold font-bold">Interactive Cartography</span>
              <h4 className="font-display font-medium text-sm text-brand-charcoal dark:text-brand-cream mt-1 uppercase">LOCATE THE COVENT GARDEN FLAGSHIP</h4>
              <p className="text-[10px] text-brand-muted mt-2">
                12 Upper St. Martin's Lane, London WC2H 9FB
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Accordion Section */}
      <div className="pt-8">
        <div className="text-center max-w-xl mx-auto mb-12">
          <HelpCircle className="w-8 h-8 text-brand-gold mx-auto mb-3" />
          <h3 className="font-display font-semibold text-xl text-brand-charcoal dark:text-brand-cream uppercase">
            RESERVATIONS & POLICY FAQ
          </h3>
          <p className="text-xs text-brand-muted mt-2 leading-relaxed">
            Our hosts answered some of the most frequent inquiries from customers.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openFAQIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white dark:bg-brand-charcoal border border-vintage rounded overflow-hidden"
              >
                <button
                  onClick={() => setOpenFAQIndex(isOpen ? null : idx)}
                  className="w-full px-5 py-4 flex items-center justify-between text-left focus:outline-none cursor-pointer"
                >
                  <span className="font-display font-medium text-xs sm:text-sm text-brand-charcoal dark:text-brand-cream uppercase tracking-wide">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-brand-gold shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="border-t border-vintage/30 bg-brand-cream/15 dark:bg-brand-charcoal/40"
                    >
                      <p className="px-5 py-4 text-xs sm:text-sm text-brand-muted leading-relaxed">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
