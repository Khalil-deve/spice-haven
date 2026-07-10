import { useState, useEffect } from "react";
import { Menu, X, Sun, Moon, Sparkles, CalendarDays, User as UserIcon, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useAuth } from "../context/AuthContext";

interface NavbarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  onOpenAssistant: () => void;
}

export default function Navbar({ currentPage, onPageChange, onOpenAssistant }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") === "dark" || 
             (!localStorage.getItem("theme") && window.matchMedia("(prefers-color-scheme: dark)").matches);
    }
    return false;
  });
  const [scrollProgress, setScrollProgress] = useState(0);

  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Scroll progress logic
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  const navLinks = [
    { name: "Home", id: "home" },
    { name: "The Menu", id: "menu" },
    { name: "Reservations", id: "reservations" },
    { name: "Gallery", id: "gallery" }
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? "py-3 bg-brand-cream/95 dark:bg-brand-charcoal/95 shadow-md border-b border-vintage backdrop-blur-md" 
          : "py-6 bg-transparent"
      }`}
    >
      {/* Scroll Progress Bar */}
      <div 
        className="absolute top-0 left-0 h-[3px] bg-brand-gold transition-all duration-100"
        style={{ width: `${scrollProgress}%` }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <button 
          onClick={() => { onPageChange("home"); setIsMobileMenuOpen(false); }}
          className="text-left group cursor-pointer focus:outline-none"
        >
          <span className="font-display font-semibold text-xl sm:text-2xl tracking-widest text-brand-charcoal dark:text-brand-cream group-hover:text-brand-gold transition-colors block">
            SPICE HAVEN
          </span>
          <span className="font-mono text-[9px] tracking-[0.25em] text-brand-muted dark:text-brand-gold block uppercase -mt-1 font-medium">
            Bombay Café & Kitchen
          </span>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => onPageChange(link.id)}
              className={`font-sans font-medium text-xs uppercase tracking-wider relative py-1 cursor-pointer focus:outline-none transition-colors ${
                currentPage === link.id
                  ? "text-brand-gold"
                  : "text-brand-charcoal hover:text-brand-gold dark:text-brand-cream dark:hover:text-brand-gold"
              }`}
            >
              {link.name}
              {currentPage === link.id && (
                <motion.div 
                  layoutId="activeNavLine" 
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-gold"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          ))}
        </nav>

        {/* Controls (Theme, AI, CTA) */}
        <div className="hidden sm:flex items-center gap-4">
          {/* Theme Selector */}
          <button
            onClick={() => setIsDark(!isDark)}
            className="p-2 text-brand-charcoal hover:text-brand-gold dark:text-brand-cream dark:hover:text-brand-gold transition-colors focus:outline-none"
            aria-label="Toggle visual theme"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* AI Companion Trigger */}
          <button
            onClick={onOpenAssistant}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-brand-charcoal hover:bg-brand-gold text-brand-cream hover:text-brand-charcoal dark:bg-brand-cream dark:hover:bg-brand-gold dark:text-brand-charcoal font-sans text-xs uppercase tracking-widest font-semibold rounded-full transition-all border border-vintage"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Anwar</span>
          </button>

          {/* Auth/Profile Button */}
          {user ? (
            <button
              onClick={() => onPageChange("profile")}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-brand-charcoal hover:text-brand-gold dark:text-brand-cream dark:hover:text-brand-gold font-sans text-xs uppercase tracking-widest font-semibold transition-all"
              title={`Logged in as ${user.name}`}
            >
              <UserIcon className="w-4 h-4" />
              <span>My Bookings</span>
            </button>
          ) : (
            <button
              onClick={() => onPageChange("auth")}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-brand-charcoal hover:text-brand-gold dark:text-brand-cream dark:hover:text-brand-gold font-sans text-xs uppercase tracking-widest font-semibold transition-all"
            >
              <UserIcon className="w-4 h-4" />
              <span>Sign In</span>
            </button>
          )}

          {/* Immediate Reservation CTA */}
          {user && (
            <button
              onClick={() => onPageChange("reservations")}
              className="flex items-center gap-1.5 px-4 py-2 bg-brand-burgundy text-white hover:bg-brand-gold hover:text-brand-charcoal font-display text-xs uppercase tracking-wider font-semibold rounded transition-all border border-transparent shadow-md"
            >
              <CalendarDays className="w-3.5 h-3.5" />
              <span>Book Table</span>
            </button>
          )}
        </div>

        {/* Mobile Menu Controls */}
        <div className="flex items-center gap-3 lg:hidden">
          <button
            onClick={() => setIsDark(!isDark)}
            className="p-2 text-brand-charcoal hover:text-brand-gold dark:text-brand-cream dark:hover:text-brand-gold transition-colors focus:outline-none"
            aria-label="Toggle Theme"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-brand-charcoal hover:text-brand-gold dark:text-brand-cream dark:hover:text-brand-gold transition-colors focus:outline-none"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden border-t border-vintage bg-brand-cream dark:bg-brand-charcoal"
          >
            <div className="px-4 pt-4 pb-6 space-y-3">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => {
                    onPageChange(link.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`block w-full text-left py-2 font-display text-sm uppercase tracking-wider font-medium ${
                    currentPage === link.id
                      ? "text-brand-gold pl-2 border-l-2 border-brand-gold"
                      : "text-brand-charcoal dark:text-brand-cream pl-0"
                  }`}
                >
                  {link.name}
                </button>
              ))}

              <div className="pt-4 border-t border-vintage flex flex-col gap-3">
                <button
                  onClick={() => {
                    onOpenAssistant();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center justify-center gap-2 w-full py-2 bg-brand-charcoal text-brand-cream dark:bg-brand-cream dark:text-brand-charcoal text-xs uppercase tracking-widest font-semibold rounded-full border border-vintage"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Consult Anwar (AI Sommelier)</span>
                </button>

                {/* Book Table Mobile CTA */}
                {user && (
                  <button
                    onClick={() => {
                      onPageChange("reservations");
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center justify-center gap-2 w-full py-2 bg-brand-burgundy text-white text-xs uppercase tracking-widest font-semibold rounded shadow"
                  >
                    <CalendarDays className="w-4 h-4" />
                    <span>Reserve a Table</span>
                  </button>
                )}

                {user ? (
                  <button
                    onClick={() => {
                      onPageChange("profile");
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center justify-center gap-2 w-full py-2 bg-transparent border border-brand-charcoal/20 dark:border-brand-cream/20 text-brand-charcoal dark:text-brand-cream text-xs uppercase tracking-widest font-semibold rounded"
                  >
                    <UserIcon className="w-4 h-4" />
                    <span>My Bookings</span>
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      onPageChange("auth");
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center justify-center gap-2 w-full py-2 bg-transparent border border-brand-charcoal/20 dark:border-brand-cream/20 text-brand-charcoal dark:text-brand-cream text-xs uppercase tracking-widest font-semibold rounded"
                  >
                    <UserIcon className="w-4 h-4" />
                    <span>Sign In / Register</span>
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
