import React, { useState, useEffect } from "react";
import { ArrowRight, Star, Quote, Heart, MessageSquare, Plus, Sparkles, Send, Instagram } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Testimonial } from "../types";
import { useAuth } from "../context/AuthContext";

interface HomeSectionProps {
  onPageChange: (page: string) => void;
  onOpenAssistant: () => void;
  onAddNotification: (message: string, type: "success" | "error" | "info") => void;
}

export default function HomeSection({ onPageChange, onOpenAssistant, onAddNotification }: HomeSectionProps) {
  const [reviewsList, setReviewsList] = useState<Testimonial[]>([]);
  const [newReviewForm, setNewReviewForm] = useState({ name: "", rating: "5", text: "" });
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  
  const { user } = useAuth();

  useEffect(() => {
    if (user && showReviewModal && !newReviewForm.name) {
      setNewReviewForm(prev => ({ ...prev, name: user.name }));
    }
  }, [user, showReviewModal]);

  // Fetch reviews from our database API
  const fetchReviews = async () => {
    try {
      const res = await fetch("/api/reviews");
      const data = await res.json();
      setReviewsList(data);
    } catch (err) {
      console.error("Error fetching reviews:", err);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewForm.name || !newReviewForm.text) {
      onAddNotification("Kindly write a name and review description.", "error");
      return;
    }

    setIsSubmittingReview(true);
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newReviewForm.name,
          rating: parseInt(newReviewForm.rating),
          text: newReviewForm.text
        })
      });

      if (!res.ok) throw new Error("Review submission failed.");

      onAddNotification("Thank you! Your testimonial has been saved to the archives.", "success");
      setNewReviewForm({ name: "", rating: "5", text: "" });
      setShowReviewModal(false);
      fetchReviews();
    } catch (err: any) {
      console.error(err);
      onAddNotification(err.message || "Failed to save review.", "error");
    } finally {
      setIsSubmittingReview(false);
    }
  };

  const featuredDishes = [
    {
      name: "House Black Daal",
      category: "Our Masterpiece",
      price: "£12.00",
      description: "Our signature dish. Dark, rich, deeply deeply smoky, and incredibly velvety. Simmered over a gentle coal flame for over twenty-four hours.",
      img: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=500&q=80"
    },
    {
      name: "Spicy Lamb Chops",
      category: "The Crowning Glory",
      price: "£24.50",
      description: "Tender lamb chops steeped overnight in fresh ginger, crushed garlic, and black cardamom, seared pink over glowing wood coals.",
      img: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=500&q=80"
    },
    {
      name: "Jackfruit Biryani",
      category: "Sealed Clay Pot",
      price: "£16.00",
      description: "Layered premium Basmati rice, slow-cooked with tender jackfruit chunks, caramelised onions, and fresh mint leaves.",
      img: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=500&q=80"
    }
  ];

  const instagramPosts = [
    { id: 1, img: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=300&q=80" },
    { id: 2, img: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=300&q=80" },
    { id: 3, img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=300&q=80" },
    { id: 4, img: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=300&q=80" },
    { id: 5, img: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=300&q=80" },
    { id: 6, img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=300&q=80" },
  ];

  return (
    <div className="space-y-24">
      {/* 1. Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-brand-charcoal text-white pt-20">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1920&q=80"
            alt="Hero Background"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        
        {/* Clean overlay for text readability without blur */}
        <div className="absolute inset-0 bg-black/50 z-10" />

        <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-4"
          >
            <span className="font-mono text-xs sm:text-sm uppercase tracking-[0.3em] text-brand-gold font-bold">
              ESTABLISHED IN LONDON &bull; BOMBAY LEGACY
            </span>
            <h1 className="font-display font-bold text-4xl sm:text-6xl md:text-7xl tracking-wider uppercase leading-none">
              SPICE HAVEN
            </h1>
            <p className="font-sans text-sm sm:text-lg text-brand-cream/90 max-w-2xl mx-auto leading-relaxed">
              An affectionate, coal-fired celebration of Bombay's grand mid-century Irani cafés. Recreated with hand-churned masalas, slow-simmered curries, and botanical cocktails.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button
              onClick={() => onPageChange("reservations")}
              className="px-8 py-3.5 bg-brand-burgundy hover:bg-brand-gold text-white hover:text-brand-charcoal font-display text-xs uppercase tracking-widest font-semibold rounded transition-all shadow-lg w-full sm:w-auto"
            >
              Reserve a Table
            </button>
            <button
              onClick={() => onPageChange("menu")}
              className="px-8 py-3.5 bg-transparent hover:bg-white/10 text-white font-display text-xs uppercase tracking-widest font-semibold rounded border border-white/30 hover:border-white transition-all w-full sm:w-auto"
            >
              Explore the Menu
            </button>
          </motion.div>
        </div>
      </section>

      {/* --- NEW SECTIONS BEGIN --- */}
      {/* Special Offers Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-6 ">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Today's <span className="text-orange-500">Special Offers</span></h2>
          <p className="text-sm text-gray-500 mt-1">Limited time deals on your favourite menu items. Don't miss out!</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 bg-gradient-to-r from-orange-500 to-orange-400 rounded-2xl p-8 text-white flex flex-col justify-center relative overflow-hidden h-64">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3"></div>
            <div className="absolute bottom-0 right-1/4 w-32 h-32 bg-white/10 rounded-full translate-y-1/2"></div>
            
            <div className="relative z-10">
              <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm inline-block mb-4">🔥 HOT DEAL</span>
              <h3 className="text-3xl sm:text-4xl font-bold mb-2">Up to 40% OFF<br/>Signature Dishes</h3>
              <p className="text-white/80 text-sm mb-6">Valid today only on all curries, biryanis & tandoori</p>
              <button onClick={() => onPageChange("menu")} className="bg-white text-orange-500 px-6 py-2 rounded-full text-sm font-bold w-max hover:bg-gray-50 transition-colors">View Menu &rarr;</button>
            </div>
          </div>
          
          <div className="flex flex-col gap-4 h-64">
            <div className="flex-1 bg-[#2b2d42] rounded-2xl p-6 text-white relative overflow-hidden flex items-center">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4"></div>
              <div className="relative z-10 flex gap-4 items-center">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-2xl">🍗</div>
                <div>
                  <span className="text-[10px] bg-red-500 text-white px-2 py-0.5 rounded font-bold mb-1 inline-block">15% OFF</span>
                  <h4 className="font-bold text-lg">Coal-Fired Grills</h4>
                  <p className="text-xs text-white/60">Marinated & smoked to perfection</p>
                </div>
              </div>
            </div>
            
            <div className="flex-1 bg-teal-500 rounded-2xl p-6 text-white relative overflow-hidden flex items-center">
               <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/4"></div>
               <div className="relative z-10 flex gap-4 items-center">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-2xl">🍨</div>
                <div>
                  <span className="text-[10px] bg-white text-teal-600 px-2 py-0.5 rounded font-bold mb-1 inline-block">FLAT 20%</span>
                  <h4 className="font-bold text-lg">House Desserts</h4>
                  <p className="text-xs text-white/80">Sweet conclusions to your feast</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* --- NEW SECTIONS END --- */}

      {/* 2. Restaurant Story Sneak-Peek */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-brand-gold font-semibold">The Chronicle</span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl tracking-tight text-brand-charcoal dark:text-brand-cream uppercase">
              THE NOSTALGIA OF IRANI CAFÉS
            </h2>
            <p className="font-sans text-sm text-brand-muted leading-relaxed">
              In South Bombay during the 1950s, the bustling streets were lined with elegant, high-ceilinged cafés. These democratic institutions stood as welcoming sanctuaries where poets debated next to commuters, and actors shared kababs with taxi drivers.
            </p>
            <p className="font-sans text-sm text-brand-muted leading-relaxed">
              At Spice Haven, we preserve that generous spirit. From original vintage portraiture to Belgian mirrors and slow coal ovens, every visual accent and robust recipe tells a warm piece of that rich history.
            </p>
            <div className="pt-2">
              <button
                onClick={() => onPageChange("about")}
                className="inline-flex items-center gap-2 font-display text-xs uppercase tracking-widest font-bold text-brand-burgundy dark:text-brand-gold hover:underline"
              >
                <span>Read Our Full Story</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="border border-vintage p-1.5 rounded-lg bg-white dark:bg-brand-charcoal shadow-md">
              <img
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=400&q=80"
                alt="Spice Haven booths"
                className="rounded object-cover w-full h-48"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="border border-vintage p-1.5 rounded-lg bg-white dark:bg-brand-charcoal shadow-md translate-y-6">
              <img
                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=400&q=80"
                alt="Plating cuisine"
                className="rounded object-cover w-full h-48"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Featured Dishes Carousel/List */}
      <section className="bg-brand-burgundy/5 dark:bg-brand-charcoal/40 py-20 border-y border-vintage/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-brand-gold font-semibold">Gourmet Pleasures</span>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-brand-charcoal dark:text-brand-cream uppercase mt-1">
              RECOGNIZED SIGNATURES
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredDishes.map((dish, index) => (
              <div
                key={index}
                className="bg-white dark:bg-brand-charcoal border border-vintage rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div className="h-48 relative overflow-hidden">
                  <img
                    src={dish.img}
                    alt={dish.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 bg-brand-burgundy text-white font-mono text-[9px] uppercase tracking-wider px-2.5 py-1 rounded">
                    {dish.category}
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="font-display font-semibold text-sm text-brand-charcoal dark:text-brand-cream">
                        {dish.name}
                      </h3>
                      <span className="font-mono text-xs text-brand-burgundy dark:text-brand-gold font-bold">
                        {dish.price}
                      </span>
                    </div>
                    <p className="text-xs text-brand-muted leading-relaxed mt-2.5">
                      {dish.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-vintage/20">
                    <button
                      onClick={() => onPageChange("menu")}
                      className="text-brand-burgundy dark:text-brand-gold text-xs font-bold uppercase tracking-wider hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <span>Find in menu</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Chef Rohan Mehta Spotlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="border border-vintage p-2 rounded bg-white dark:bg-brand-charcoal shadow-xl order-last lg:order-first">
            <img
              src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=1000&q=80"
              alt="Executive Chef Rohan Mehta"
              className="rounded object-cover w-full h-[420px]"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="space-y-6">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-brand-gold font-semibold">The Alchemist</span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-brand-charcoal dark:text-brand-cream uppercase mt-1">
              CHEF ROHAN MEHTA
            </h2>
            <p className="font-sans text-sm text-brand-muted leading-relaxed">
              Executive Chef Rohan Mehta spent over two decades in high-end culinary kitchens in both New Delhi and Mumbai, perfecting the delicate, slow-simmering processes of Indian charcoal cuisine.
            </p>
            <blockquote className="border-l-2 border-brand-gold pl-4 italic text-brand-muted text-xs leading-relaxed py-1">
              \"Indian cooking is not about masks or heavy spice coverings. It is an art of patience—allowing local mutton bone marrow, whole cardamom pods, and charcoal smoke to slow-cook for hours to express their authentic, aromatic stories.\"
            </blockquote>
            <p className="font-sans text-sm text-brand-muted leading-relaxed">
              Every blend of Spice Haven's signature masalas is roasted, ground, and evaluated under Rohan’s direct supervision each sunrise.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Live Reviews Testimonials Section */}
      <section className="bg-brand-cream/10 dark:bg-brand-charcoal/20 py-20 border-y border-vintage/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-brand-gold font-bold">Patron Voices</span>
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-brand-charcoal dark:text-brand-cream uppercase mt-1">
                TESTIMONIALS & RELISH
              </h2>
            </div>
            <button
              onClick={() => setShowReviewModal(true)}
              className="flex items-center gap-1.5 px-4 py-2 bg-brand-burgundy text-white hover:bg-brand-gold hover:text-brand-charcoal font-sans text-xs uppercase tracking-widest font-semibold rounded shadow transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Write a Review</span>
            </button>
          </div>

          {/* Testimonial Cards Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviewsList.slice(0, 3).map((rev) => (
              <div
                key={rev.id}
                className="bg-white dark:bg-brand-charcoal p-6 rounded-lg border border-vintage shadow-sm relative flex flex-col justify-between"
              >
                <Quote className="absolute top-5 right-5 w-8 h-8 text-brand-gold/15 shrink-0" />
                <div className="space-y-4">
                  {/* Rating Stars */}
                  <div className="flex text-brand-gold">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-brand-gold text-brand-gold" />
                    ))}
                  </div>
                  <p className="text-xs font-sans text-brand-muted leading-relaxed italic">
                    "{rev.text}"
                  </p>
                </div>

                <div className="pt-4 border-t border-vintage/30 mt-6 flex items-center justify-between text-[11px] font-sans">
                  <strong className="text-brand-charcoal dark:text-brand-cream uppercase tracking-wide">
                    {rev.name}
                  </strong>
                  <span className="text-brand-muted font-mono">{rev.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Action Reservations CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-brand-burgundy text-white rounded-lg p-8 sm:p-16 border border-brand-gold text-center space-y-6 relative overflow-hidden shadow-xl bg-[radial-gradient(#c5a880_1px,transparent_1px)] [background-size:16px_16px]">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-brand-gold font-bold">
            The Shared Feast
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-5xl uppercase tracking-wider">
            AN IMMERSIVE GATHERING
          </h2>
          <p className="font-sans text-xs sm:text-sm text-brand-cream/80 max-w-xl mx-auto leading-relaxed">
            All tables are held for 15 minutes. To inquire about special celebrations, high-table private dinners, or to construct custom menus, engage Anwar or secure your slot.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onPageChange("reservations")}
              className="px-8 py-3 bg-brand-gold hover:bg-white text-brand-charcoal font-sans text-xs uppercase tracking-widest font-semibold rounded shadow transition-all w-full sm:w-auto"
            >
              Secure Table Booking
            </button>
            <button
              onClick={onOpenAssistant}
              className="px-8 py-3 bg-transparent hover:bg-white/10 text-brand-gold hover:text-white font-sans text-xs uppercase tracking-widest font-semibold rounded border border-brand-gold/45 hover:border-white transition-all w-full sm:w-auto flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Consult Anwar</span>
            </button>
          </div>
        </div>
      </section>

      {/* 7. Instagram Feed Mockup */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center">
          <span className="font-mono text-xs uppercase tracking-widest text-brand-gold font-bold">Social Canvas</span>
          <h2 className="font-display font-semibold text-xl text-brand-charcoal dark:text-brand-cream uppercase mt-1">
            @SPICEHAVENLONDON
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {instagramPosts.map((post) => (
            <div
              key={post.id}
              className="border border-vintage p-1 rounded bg-white dark:bg-brand-charcoal shadow-sm overflow-hidden group cursor-pointer relative aspect-square"
            >
              <img
                src={post.img}
                alt="Instagram food snap"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-brand-charcoal/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Instagram className="w-5 h-5 text-white" />
              </div>
            </div>
          ))}
        </div>
      </section>


       {/* Partner Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-[#1a1c23] rounded-3xl p-8 md:p-12 text-white flex flex-col md:flex-row items-center gap-8 overflow-hidden">
          <div className="flex-1 space-y-6">
            <h2 className="text-3xl font-bold">Host Your Event with Spice Haven</h2>
            <p className="text-gray-400 text-sm">With our exclusive catering, you can delight your guests with authentic Bombay flavors.</p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-lg border border-white/10 w-max">
                <div className="w-5 h-5 rounded-full bg-teal-500/20 flex items-center justify-center text-teal-400 text-xs">✓</div>
                <span className="text-xs font-semibold">Custom Menus</span>
              </div>
              <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-lg border border-white/10 w-max">
                <div className="w-5 h-5 rounded-full bg-teal-500/20 flex items-center justify-center text-teal-400 text-xs">✓</div>
                <span className="text-xs font-semibold">Full Service Catering</span>
              </div>
            </div>
            
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors w-max">
              Inquire About Catering <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          
          <div className="flex-1 relative h-64 md:h-80 w-full">
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4/5 h-4/5 bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col">
              <div className="h-12 border-b border-gray-100 flex items-center px-4 justify-between">
                <div className="flex items-center gap-2"><div className="w-6 h-6 bg-orange-500 rounded text-[10px] text-white flex items-center justify-center font-bold">S</div><div className="w-16 h-3 bg-gray-200 rounded"></div></div>
              </div>
              <div className="flex-1 p-6 flex gap-6 bg-gray-50">
                <div className="flex-1 space-y-4 pt-4">
                   <div className="w-full h-8 bg-gray-200 rounded"></div>
                   <div className="w-3/4 h-8 bg-gray-200 rounded"></div>
                   <div className="w-1/3 h-10 bg-orange-500 rounded mt-6"></div>
                </div>
                <div className="w-1/3 bg-gray-200 rounded-lg"></div>
              </div>
            </div>
            <div className="absolute right-8 bottom-0 w-32 h-64 bg-white rounded-[2rem] shadow-2xl border-[6px] border-gray-800 overflow-hidden flex flex-col">
               <div className="h-4 w-1/2 bg-gray-800 mx-auto rounded-b-xl"></div>
               <div className="flex-1 p-3 space-y-3 mt-2">
                  <div className="w-full h-24 bg-gray-100 rounded-lg"></div>
                  <div className="w-3/4 h-2 bg-gray-200 rounded"></div>
                  <div className="w-1/2 h-2 bg-gray-200 rounded"></div>
                  <div className="w-full h-8 bg-orange-500 rounded mt-4"></div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Write a Testimonial Modal */}
      <AnimatePresence>
        {showReviewModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-brand-charcoal/80 backdrop-blur-sm p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-brand-cream dark:bg-brand-charcoal p-6 sm:p-8 border border-vintage rounded-lg shadow-2xl max-w-md w-full relative"
            >
              <h3 className="font-display font-semibold text-base text-brand-charcoal dark:text-brand-cream uppercase tracking-wider mb-6">
                SHARE YOUR FEAST STORY
              </h3>

              <form onSubmit={handleReviewSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-brand-muted mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={newReviewForm.name}
                    onChange={(e) => setNewReviewForm({ ...newReviewForm, name: e.target.value })}
                    placeholder="e.g. Lady Margarete"
                    className="w-full text-xs p-3 bg-white dark:bg-brand-charcoal border border-vintage rounded focus:outline-none focus:border-brand-gold dark:text-brand-cream"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-brand-muted mb-1">
                    Star Rating
                  </label>
                  <select
                    value={newReviewForm.rating}
                    onChange={(e) => setNewReviewForm({ ...newReviewForm, rating: e.target.value })}
                    className="w-full text-xs p-3 bg-white dark:bg-brand-charcoal border border-vintage rounded focus:outline-none focus:border-brand-gold dark:text-brand-cream"
                  >
                    <option value="5">★★★★★ (Spectacular)</option>
                    <option value="4">★★★★☆ (Delightful)</option>
                    <option value="3">★★★☆☆ (Pleasant)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-brand-muted mb-1">
                    Your Experience
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={newReviewForm.text}
                    onChange={(e) => setNewReviewForm({ ...newReviewForm, text: e.target.value })}
                    placeholder="Describe the textures of our slow Black Daal, spices, or hospitality..."
                    className="w-full text-xs p-3 bg-white dark:bg-brand-charcoal border border-vintage rounded focus:outline-none focus:border-brand-gold dark:text-brand-cream"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowReviewModal(false)}
                    className="flex-1 py-2 border border-vintage hover:bg-brand-gold/10 text-brand-charcoal dark:text-brand-cream text-xs uppercase tracking-wider font-semibold rounded"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmittingReview}
                    className="flex-1 py-2 bg-brand-burgundy text-white hover:bg-brand-gold hover:text-brand-charcoal text-xs uppercase tracking-wider font-semibold rounded flex items-center justify-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{isSubmittingReview ? "Recording..." : "Record Story"}</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
