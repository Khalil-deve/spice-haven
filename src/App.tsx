import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, CalendarDays, ArrowUp, ArrowRight, ShieldCheck } from "lucide-react";

// Reusable Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Notification from "./components/Notification";
import AIAssistant from "./components/AIAssistant";
import Breadcrumb from "./components/Breadcrumb";
import PageTransitionOverlay from "./components/PageTransitionOverlay";

// Page Section Modules
import HomeSection from "./components/HomeSection";
import AboutSection from "./components/AboutSection";
import MenuSection from "./components/MenuSection";
import LocationsSection from "./components/LocationsSection";
import ReservationSection from "./components/ReservationSection";
import GallerySection from "./components/GallerySection";
import ContactSection from "./components/ContactSection";
import AuthSection from "./components/AuthSection";
import ProfileSection from "./components/ProfileSection";

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>("home");
  const [pageKey, setPageKey] = useState<number>(0);
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [notifications, setNotifications] = useState<{ id: string; message: string; type: "success" | "error" | "info" }[]>([]);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Transition and Loading Coordination States
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionText, setTransitionText] = useState("");
  const [loadProgress, setLoadProgress] = useState(0);

  // Custom Cursor coordinates
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);

  // Monitor scroll for ScrollToTop button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Tracking mouse movement for premium retro custom cursor
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    // Tracking hovers over buttons/links to animate cursor scaling
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "BUTTON" || 
        target.tagName === "A" || 
        target.closest("button") || 
        target.closest("a")
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  const addNotification = (message: string, type: "success" | "error" | "info") => {
    const newNotif = { id: `notif-${Date.now()}`, message, type };
    setNotifications((prev) => [...prev, newNotif]);
  };

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const handlePageChange = (pageId: string) => {
    if (pageId === currentPage && !isTransitioning) {
      // If we are already on this page, just increment the key to reset its state
      setPageKey(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    // Gourmet-themed micro-copies to show in transition screens
    const messages: Record<string, string[]> = {
      home: [
        "Returning to the grand lounge...",
        "Steeping fresh cardamom Nilgiri tea...",
        "Polishing our brass table ornaments..."
      ],
      about: [
        "Sifting grandma's hand-drawn spice journal...",
        "Tracing our Bombay heritage pathways to London...",
        "Unfolding family culinary archives from 1953..."
      ],
      menu: [
        "Grinding premium cardamom, cloves, and star anise...",
        "Sizzling the tandoori clay ovens to 400°C...",
        "Brewing our signature 24-hour slow infusion chai..."
      ],
      locations: [
        "Lighting our classic neighborhood brass lanterns...",
        "Tracing the aromatic map of Soho & Covent Garden...",
        "Draping our veranda dining zones..."
      ],
      reservations: [
        "Polishing the vintage dining-room silverware...",
        "Arranging fresh marigold blossoms on tables...",
        "Preparing our leather reservation ledger books..."
      ],
      gallery: [
        "Plating slow-churned saffron and pistachio kulfi...",
        "Developing vintage monochrome Bombay archives...",
        "Polishing glass museum jars of exotic masalas..."
      ],
      contact: [
        "Unlocking our hand-beaten copper postbox...",
        "Filling our heavy fountain pens with indigo ink...",
        "Setting out our heavy parchment stationery sheets..."
      ],
      privacy: [
        "Securing Spice Haven dining ledgers...",
        "Applying security wax seals to database parchments..."
      ],
      auth: [
        "Consulting our private guest registry...",
        "Polishing the brass keys to your personal dining account..."
      ],
      profile: [
        "Retrieving your dining ledger...",
        "Dusting off your personal reservation scrolls..."
      ]
    };

    const choices = messages[pageId] || ["Blending premium spices..."];
    const chosenText = choices[Math.floor(Math.random() * choices.length)];

    setTransitionText(chosenText);
    setIsTransitioning(true);
    setLoadProgress(0);

    // Increment progress elegantly
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.floor(Math.random() * 15) + 10;
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(interval);
      }
      setLoadProgress(Math.min(currentProgress, 100));
    }, 50);

    // Halfway through the loader, swap the active page content behind the cover
    setTimeout(() => {
      setCurrentPage(pageId);
      window.scrollTo({ top: 0, behavior: "instant" });
    }, 380);

    // After 750ms, fade the screen reveal back to user
    setTimeout(() => {
      clearInterval(interval);
      setLoadProgress(100);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 150);
    }, 750);
  };

  return (
    <div className="min-h-screen bg-brand-cream dark:bg-brand-charcoal text-brand-charcoal dark:text-brand-cream transition-colors duration-300 relative flex flex-col justify-between selection:bg-brand-gold selection:text-brand-charcoal overflow-hidden font-sans">
      
      {/* 1. Custom Ambient Vintage Cursor (Hidden on touch screens) */}
      <div 
        className="hidden md:block fixed pointer-events-none z-50 transition-transform duration-100 ease-out -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand-gold/60"
        style={{
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`,
          width: isHovered ? "40px" : "18px",
          height: isHovered ? "40px" : "18px",
          backgroundColor: isHovered ? "rgba(197, 168, 128, 0.15)" : "transparent",
        }}
      />

      {/* 2. Global Sticky Header */}
      <Navbar 
        currentPage={currentPage} 
        onPageChange={handlePageChange} 
        onOpenAssistant={() => setIsAssistantOpen(true)} 
      />

      {/* 3. Main Dynamic Canvas Area */}
      <main className="flex-grow pt-16 sm:pt-20">
        <Breadcrumb currentPage={currentPage} onPageChange={handlePageChange} />
        <AnimatePresence mode="wait">
          <motion.div
            key={`${currentPage}-${pageKey}`}
            initial={{ opacity: 0, scale: 0.985, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.985, y: -15 }}
            transition={{ duration: 0.45, ease: [0.25, 1, 0.5, 1] }}
          >
            {currentPage === "home" && (
              <HomeSection 
                onPageChange={handlePageChange} 
                onOpenAssistant={() => setIsAssistantOpen(true)}
                onAddNotification={addNotification}
              />
            )}

            {currentPage === "about" && (
              <AboutSection />
            )}

            {currentPage === "menu" && (
              <MenuSection />
            )}

            {currentPage === "locations" && (
              <LocationsSection />
            )}

            {currentPage === "reservations" && (
              <ReservationSection onAddNotification={addNotification} />
            )}

            {currentPage === "gallery" && (
              <GallerySection />
            )}

            {currentPage === "contact" && (
              <ContactSection onAddNotification={addNotification} />
            )}

            {currentPage === "privacy" && (
              <div className="py-24 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                <div className="text-center">
                  <ShieldCheck className="w-12 h-12 text-brand-gold mx-auto mb-4" />
                  <h2 className="font-display font-bold text-3xl uppercase text-brand-charcoal dark:text-brand-cream">
                    PRIVACY COMPLIANCE & PROTOCOLS
                  </h2>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-brand-gold mt-1">
                    Effective: July 2026
                  </p>
                </div>

                <div className="space-y-6 text-sm text-brand-muted leading-relaxed font-sans pt-6 border-t border-vintage/30">
                  <p>
                    Welcome to <strong>Spice Haven</strong> (operated by Spice Haven Restaurants Ltd). We are deeply committed to respecting the digital privacy of our visitors, patrons, and reservation holders. This protocol details how we handle information acquired through our website and interactive dining tools.
                  </p>

                  <h3 className="font-display font-semibold text-base text-brand-charcoal dark:text-brand-cream uppercase">
                    1. COLLECTION OF BOOKING METADATA
                  </h3>
                  <p>
                    When committing a reservation or inquiry via our online reservation form, we record metadata including your full name, digital mail, telephone coordinates, and dining seating preferences. This information is stored securely in our active server memory specifically to validate and fulfill your dining table booking.
                  </p>

                  <h3 className="font-display font-semibold text-base text-brand-charcoal dark:text-brand-cream uppercase">
                    2. ENCRYPTED AI ASSISTANCE LOGS
                  </h3>
                  <p>
                    Any interactions, diet queries, or wine inquiries submitted to Anwar (our AI Maitre D' Sommelier) are routed server-side through our secure Express API endpoint using the Google Gemini model. These logs do not store your IP coordinates or browser identifiers, and they are treated with complete confidentiality.
                  </p>

                  <h3 className="font-display font-semibold text-base text-brand-charcoal dark:text-brand-cream uppercase">
                    3. RETENTION & RIGHT TO ERASURE
                  </h3>
                  <p>
                    You have an absolute right to request the complete erasure of your reservation history or testimonials from our database ledger at any time. Kindly direct your digital mail to <strong className="text-brand-charcoal dark:text-brand-gold">compliance@spicehaven.co.uk</strong>, and our hosts will complete your request within 24 business hours.
                  </p>
                </div>
              </div>
            )}

            {currentPage === "auth" && (
              <AuthSection onAddNotification={addNotification} onPageChange={handlePageChange} />
            )}

            {currentPage === "profile" && (
              <ProfileSection onAddNotification={addNotification} onPageChange={handlePageChange} />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* 4. Interactive Floating AI Maitre D' Anwar Widget */}
      <div className="fixed bottom-6 left-6 z-30 hidden sm:block">
        <button
          onClick={() => setIsAssistantOpen(true)}
          className="flex items-center gap-2 px-5 py-3.5 bg-brand-burgundy text-white hover:bg-brand-gold hover:text-brand-charcoal font-display text-xs uppercase tracking-widest font-bold rounded-full shadow-2xl transition-all border border-brand-gold animate-pulse-glow"
          aria-label="Open AI Assistant Anwar"
        >
          <Sparkles className="w-4 h-4" />
          <span>Consult Sommelier</span>
        </button>
      </div>

      {/* 5. Scroll to Top Indicator */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-6 right-6 z-30 p-3 bg-brand-cream dark:bg-brand-charcoal text-brand-charcoal dark:text-brand-cream hover:text-brand-gold border border-vintage rounded-full shadow-xl transition-all focus:outline-none cursor-pointer"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4.5 h-4.5" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* 6. Dynamic Toast Stack Container */}
      <AnimatePresence>
        {notifications.map((notif) => (
          <Notification
            key={notif.id}
            message={notif.message}
            type={notif.type}
            onClose={() => removeNotification(notif.id)}
          />
        ))}
      </AnimatePresence>

      {/* 7. Fullscreen Interactive Assistant Modal */}
      <AnimatePresence>
        {isAssistantOpen && (
          <AIAssistant
            isOpen={isAssistantOpen}
            onClose={() => setIsAssistantOpen(false)}
            onNavigateToReservations={() => handlePageChange("reservations")}
            onNavigateToMenu={() => handlePageChange("menu")}
          />
        )}
      </AnimatePresence>

      {/* 8. Elegant Global Footer */}
      <Footer onPageChange={handlePageChange} onAddNotification={addNotification} />

      {/* 9. Premium Gourmet Transition Overlay */}
      <PageTransitionOverlay isVisible={isTransitioning} text={transitionText} progress={loadProgress} />
    </div>
  );
}
