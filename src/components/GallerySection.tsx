import React, { useState } from "react";
import { Maximize2, X, ChevronLeft, ChevronRight, Eye } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { GALLERY_IMAGES } from "../data";

export default function GallerySection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filterTabs = [
    { label: "All Archives", id: "all" },
    { label: "Our Food", id: "dishes" },
    { label: "Atmosphere", id: "interior" },
    { label: "Bombay History", id: "historical" },
    { label: "The Kitchen", id: "behind-the-scenes" }
  ];

  const filteredImages = GALLERY_IMAGES.filter(
    (img) => selectedCategory === "all" || img.category === selectedCategory
  );

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev! === 0 ? filteredImages.length - 1 : prev! - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev! === filteredImages.length - 1 ? 0 : prev! + 1));
  };

  return (
    <div className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-brand-gold font-semibold">Visual Archive</span>
        <h2 className="font-display font-bold text-3xl sm:text-4xl tracking-tight text-brand-charcoal dark:text-brand-cream mt-2 uppercase">
          CHRONICLES & PLATINGS
        </h2>
        <p className="font-sans text-sm text-brand-muted leading-relaxed mt-4">
          A visual chronicle of Spice Haven. From archival portraits of mid-century South Bombay, to our active tandoors and the warm copper glow of our Soho booths.
        </p>
      </div>

      {/* Category Tab Filters */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
        {filterTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setSelectedCategory(tab.id);
              setLightboxIndex(null);
            }}
            className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold rounded transition-colors cursor-pointer ${
              selectedCategory === tab.id
                ? "bg-brand-burgundy text-white shadow"
                : "bg-white dark:bg-brand-charcoal text-brand-charcoal dark:text-brand-cream hover:bg-brand-gold/15 hover:text-brand-gold border border-vintage"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Masonry-Style Column Layout */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
        <AnimatePresence>
          {filteredImages.map((img, index) => {
            // Find the index of this image in the filtered array for lightbox navigation
            return (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                key={img.id}
                onClick={() => setLightboxIndex(index)}
                className="break-inside-avoid bg-white dark:bg-brand-charcoal border border-vintage rounded-lg overflow-hidden group shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer relative"
              >
                {/* Image element with required referrerPolicy */}
                <div className="relative overflow-hidden">
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-brand-charcoal/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-brand-cream/90 flex items-center justify-center shadow">
                      <Eye className="w-5 h-5 text-brand-charcoal" />
                    </div>
                  </div>
                </div>

                <div className="p-4 border-t border-vintage/50 bg-white dark:bg-brand-charcoal">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[9px] uppercase tracking-wider text-brand-gold font-bold">
                      {img.category}
                    </span>
                    {img.date && (
                      <span className="font-mono text-[9px] text-brand-muted">{img.date}</span>
                    )}
                  </div>
                  <h4 className="font-display font-medium text-sm text-brand-charcoal dark:text-brand-cream mt-1 group-hover:text-brand-gold transition-colors">
                    {img.alt}
                  </h4>
                  <p className="text-[11px] text-brand-muted mt-1.5 leading-relaxed">{img.caption}</p>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Dynamic Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxIndex(null)}
            className="fixed inset-0 z-50 flex flex-col justify-center items-center bg-brand-charcoal/95 backdrop-blur-md p-4"
          >
            {/* Close button */}
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer"
              aria-label="Close Lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Navigation controls */}
            <button
              onClick={handlePrev}
              className="absolute left-4 sm:left-8 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer"
              aria-label="Previous Image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-4 sm:right-8 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer"
              aria-label="Next Image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Lightbox main panel */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="max-w-3xl w-full flex flex-col justify-center items-center text-center"
            >
              <motion.img
                key={filteredImages[lightboxIndex].id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                src={filteredImages[lightboxIndex].src}
                alt={filteredImages[lightboxIndex].alt}
                className="max-h-[60vh] max-w-full object-contain rounded border border-vintage/20 shadow-2xl"
                referrerPolicy="no-referrer"
              />

              <div className="mt-6 text-white max-w-xl">
                <span className="font-mono text-[10px] uppercase tracking-widest text-brand-gold font-bold">
                  {filteredImages[lightboxIndex].category}
                </span>
                <h3 className="font-display font-semibold text-lg tracking-wide uppercase mt-1">
                  {filteredImages[lightboxIndex].alt}
                </h3>
                <p className="text-xs text-white/80 leading-relaxed mt-2.5">
                  {filteredImages[lightboxIndex].caption}
                </p>
                {filteredImages[lightboxIndex].date && (
                  <span className="inline-block mt-4 text-[10px] font-mono text-brand-gold/60 border border-brand-gold/20 px-2 py-0.5 rounded">
                    {filteredImages[lightboxIndex].date}
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
