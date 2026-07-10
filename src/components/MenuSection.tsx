import { useState, useMemo } from "react";
import { Search, Flame, ShieldAlert, Sparkles, SlidersHorizontal, Heart } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { MENU_ITEMS } from "../data";
import { MenuItem } from "../types";

export default function MenuSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [filterVegOnly, setFilterVegOnly] = useState(false);
  const [filterVeganOnly, setFilterVeganOnly] = useState(false);
  const [filterSpicyOnly, setFilterSpicyOnly] = useState(false);
  const [maxPrice, setMaxPrice] = useState(25);
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    { label: "All Items", id: "all" },
    { label: "Small Plates", id: "small-plates" },
    { label: "Charcoal Grills", id: "grills" },
    { label: "Curries & Pots", id: "curries" },
    { label: "Breads & Rice", id: "breads-rice" },
    { label: "Beverages", id: "beverages" },
    { label: "Desserts", id: "desserts" }
  ];

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // Search Query
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            (item.tamilName && item.tamilName.includes(searchQuery));
      
      // Category
      const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;

      // Veg Toggles
      const matchesVeg = !filterVegOnly || item.isVegetarian || item.isVegan;
      const matchesVegan = !filterVeganOnly || item.isVegan;

      // Spicy
      const matchesSpicy = !filterSpicyOnly || item.isSpicy;

      // Price
      const matchesPrice = item.price <= maxPrice;

      return matchesSearch && matchesCategory && matchesVeg && matchesVegan && matchesSpicy && matchesPrice;
    });
  }, [searchQuery, selectedCategory, filterVegOnly, filterVeganOnly, filterSpicyOnly, maxPrice]);

  return (
    <div className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-brand-gold font-semibold">Gourmet Curation</span>
        <h2 className="font-display font-bold text-3xl sm:text-4xl tracking-tight text-brand-charcoal dark:text-brand-cream mt-2 uppercase">
          THE SPICE HAVEN MENU
        </h2>
        <p className="font-sans text-sm text-brand-muted leading-relaxed mt-4">
          Deeply authentic delicacies prepared with freshly roasted masalas, hand-ground chutneys, and premium seasonal meats. Shareable plates reflecting Bombay's rich culinary migration.
        </p>
      </div>

      {/* Search & Filter Trigger Bar */}
      <div className="flex flex-col md:flex-row items-center gap-4 mb-8">
        <div className="relative w-full md:flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-muted" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search our legendary Black Daal, Tikka, Lamb Chops..."
            className="w-full text-sm pl-10 pr-4 py-3 bg-white dark:bg-brand-charcoal border border-vintage rounded shadow-sm focus:border-brand-gold focus:outline-none dark:text-brand-cream"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center justify-center gap-2 px-5 py-3 bg-white dark:bg-brand-charcoal border border-vintage rounded shadow-sm text-sm font-medium text-brand-charcoal dark:text-brand-cream hover:text-brand-gold hover:border-brand-gold transition-colors w-full sm:w-auto cursor-pointer"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Refine Selection</span>
          </button>
        </div>
      </div>

      {/* Advanced Filter Panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden mb-10 p-5 bg-white dark:bg-brand-charcoal border border-vintage rounded shadow-inner"
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {/* Dietary checkboxes */}
              <div>
                <h4 className="font-mono text-xs uppercase tracking-wider text-brand-muted mb-3 font-semibold">Dietary Restrictions</h4>
                <div className="space-y-2.5">
                  <label className="flex items-center gap-2.5 text-xs text-brand-charcoal dark:text-brand-cream cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filterVegOnly}
                      onChange={(e) => setFilterVegOnly(e.target.checked)}
                      className="rounded border-vintage text-brand-gold focus:ring-brand-gold"
                    />
                    <span>Vegetarian Items Only</span>
                  </label>

                  <label className="flex items-center gap-2.5 text-xs text-brand-charcoal dark:text-brand-cream cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filterVeganOnly}
                      onChange={(e) => setFilterVeganOnly(e.target.checked)}
                      className="rounded border-vintage text-brand-gold focus:ring-brand-gold"
                    />
                    <span>Vegan Items Only</span>
                  </label>

                  <label className="flex items-center gap-2.5 text-xs text-brand-charcoal dark:text-brand-cream cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filterSpicyOnly}
                      onChange={(e) => setFilterSpicyOnly(e.target.checked)}
                      className="rounded border-vintage text-brand-gold focus:ring-brand-gold"
                    />
                    <span>Spicy Items Only</span>
                  </label>
                </div>
              </div>

              {/* Price Range Slider */}
              <div className="sm:col-span-2">
                <h4 className="font-mono text-xs uppercase tracking-wider text-brand-muted mb-3 font-semibold">Max Plate Price</h4>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="4"
                    max="25"
                    step="0.5"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(parseFloat(e.target.value))}
                    className="w-full accent-brand-gold bg-brand-cream dark:bg-brand-charcoal h-1 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-xs font-mono text-brand-muted mt-1.5">
                    <span>Min: £4.00</span>
                    <span className="font-semibold text-brand-charcoal dark:text-brand-gold">Limit: £{maxPrice.toFixed(2)}</span>
                    <span>Max: £25.00</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Category Tab Selector */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-12 pb-4 border-b border-vintage">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold rounded transition-colors cursor-pointer ${
              selectedCategory === cat.id
                ? "bg-brand-burgundy text-white shadow"
                : "bg-white dark:bg-brand-charcoal text-brand-charcoal dark:text-brand-cream hover:bg-brand-gold/15 hover:text-brand-gold border border-vintage"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Food Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence>
          {filteredItems.map((item) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              key={item.id}
              className="bg-white dark:bg-brand-charcoal rounded-lg border border-vintage overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group h-full relative"
            >
              {/* Category-Badge-Stripe */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      {/* English & traditional sub-labels */}
                      <h3 className="font-display font-semibold text-base text-brand-charcoal dark:text-brand-cream group-hover:text-brand-gold transition-colors">
                        {item.name}
                      </h3>
                      {item.tamilName && (
                        <span className="block font-sans text-xs italic text-brand-gold font-medium mt-0.5">
                          {item.tamilName}
                        </span>
                      )}
                    </div>
                    <span className="font-mono text-sm font-semibold text-brand-burgundy dark:text-brand-gold whitespace-nowrap">
                      £{item.price.toFixed(2)}
                    </span>
                  </div>

                  <p className="text-xs font-sans text-brand-muted leading-relaxed mt-3.5">
                    {item.description}
                  </p>
                </div>

                {/* Dietary Tags, Spicy details */}
                <div className="mt-5 pt-4 border-t border-vintage/30 flex flex-wrap items-center gap-1.5">
                  {item.isVegetarian && (
                    <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-[9px] uppercase tracking-wider font-semibold rounded">
                      Vegetarian
                    </span>
                  )}
                  {item.isVegan && (
                    <span className="px-2 py-0.5 bg-teal-500/10 text-teal-700 dark:text-teal-400 text-[9px] uppercase tracking-wider font-semibold rounded">
                      Vegan (VG)
                    </span>
                  )}
                  {item.isPopular && (
                    <span className="px-2 py-0.5 bg-brand-gold/15 text-brand-gold dark:text-brand-gold text-[9px] uppercase tracking-wider font-semibold rounded">
                      Popular
                    </span>
                  )}
                  {item.isChefRecommendation && (
                    <span className="px-2 py-0.5 bg-brand-burgundy/10 text-brand-burgundy dark:bg-brand-gold/20 dark:text-brand-gold text-[9px] uppercase tracking-wider font-semibold rounded flex items-center gap-1">
                      <Sparkles className="w-2.5 h-2.5" />
                      Chef Pick
                    </span>
                  )}
                  {item.isSpicy && (
                    <span className="px-2 py-0.5 bg-rose-500/10 text-rose-600 dark:text-rose-400 text-[9px] uppercase tracking-wider font-semibold rounded flex items-center gap-0.5">
                      <Flame className="w-2.5 h-2.5 fill-rose-600 dark:fill-rose-400" />
                      Spicy
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Empty Search State */}
        {filteredItems.length === 0 && (
          <div className="col-span-full py-16 text-center">
            <ShieldAlert className="w-12 h-12 text-brand-muted mx-auto mb-4" />
            <h3 className="font-display font-medium text-lg text-brand-charcoal dark:text-brand-cream uppercase tracking-wide">
              No Dishes Found
            </h3>
            <p className="text-xs text-brand-muted max-w-sm mx-auto mt-2">
              We couldn't find any dishes matching those filters. Try clearing your search queries or easing your dietary selectors.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
