import { ChevronRight, Home, MapPin, Sparkles, BookOpen, UtensilsCrossed, Image, MailCheck, ShieldAlert } from "lucide-react";
import { motion } from "motion/react";

interface BreadcrumbProps {
  currentPage: string;
  onPageChange: (pageId: string) => void;
}

const PAGE_METADATA: Record<string, { label: string; icon: any; desc: string }> = {
  home: { label: "Home", icon: Home, desc: "Welcome to Spice Haven" },
  about: { label: "Our Story", icon: BookOpen, desc: "A Bombay love story on a plate" },
  menu: { label: "The Menu", icon: UtensilsCrossed, desc: "Authentic Bombay café dishes" },
  locations: { label: "Locations", icon: MapPin, desc: "Find us in your neighbourhood" },
  reservations: { label: "Reservations", icon: Sparkles, desc: "Secure your table in our dining room" },
  gallery: { label: "Gallery", icon: Image, desc: "Visual snippets of spice and stories" },
  contact: { label: "Contact & FAQ", icon: MailCheck, desc: "Get in touch or browse questions" },
  privacy: { label: "Privacy Protocol", icon: ShieldAlert, desc: "Data protection rules & guidelines" }
};

export default function Breadcrumb({ currentPage, onPageChange }: BreadcrumbProps) {
  // Hide breadcrumb on home page to keep the home landing screen completely focused and minimal
  if (currentPage === "home") return null;

  const currentMeta = PAGE_METADATA[currentPage] || { label: currentPage, icon: BookOpen, desc: "" };
  const CurrentIcon = currentMeta.icon;

  return (
    <div className="w-full bg-brand-cream/80 dark:bg-brand-charcoal/80 border-b border-vintage/20 backdrop-blur-sm sticky top-[68px] sm:top-[80px] z-30 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        
        {/* Breadcrumb Links */}
        <nav aria-label="Breadcrumb" className="flex items-center space-x-2.5 text-[11px] font-mono tracking-widest uppercase text-brand-muted">
          <button
            onClick={() => onPageChange("home")}
            className="flex items-center gap-1 hover:text-brand-gold transition-colors duration-200 cursor-pointer focus:outline-none focus:ring-1 focus:ring-brand-gold/50 rounded px-1 py-0.5"
          >
            <Home className="w-3.5 h-3.5 -mt-0.5" />
            <span>Home</span>
          </button>
          
          <ChevronRight className="w-3 h-3 text-brand-gold/50 flex-shrink-0" />
          
          <motion.div 
            key={currentPage}
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-1.5 font-medium text-brand-charcoal dark:text-brand-gold"
          >
            <CurrentIcon className="w-3.5 h-3.5 text-brand-gold" />
            <span>{currentMeta.label}</span>
          </motion.div>
        </nav>

        {/* Dynamic Context Description */}
        <motion.div 
          key={`desc-${currentPage}`}
          initial={{ opacity: 0, y: 3 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="hidden md:flex items-center gap-2"
        >
          <span className="h-1 w-1 rounded-full bg-brand-gold/60" />
          <span className="text-[11px] font-sans italic text-brand-muted">
            {currentMeta.desc}
          </span>
        </motion.div>

      </div>
    </div>
  );
}
