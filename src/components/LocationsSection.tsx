import { RESTAURANT_LOCATIONS } from "../data";
import { MapPin, Phone, Mail, Clock, ExternalLink } from "lucide-react";

export default function LocationsSection() {
  return (
    <div className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-brand-gold font-semibold">Our Parlours</span>
        <h2 className="font-display font-bold text-3xl sm:text-4xl tracking-tight text-brand-charcoal dark:text-brand-cream mt-2 uppercase">
          VISIT THE HAVENS
        </h2>
        <p className="font-sans text-sm text-brand-muted leading-relaxed mt-4">
          Each of our locations is individually architected, carrying salvage antiques and vintage artwork selected specifically to reflect its neighborhood history.
        </p>
      </div>

      {/* Locations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {RESTAURANT_LOCATIONS.map((loc) => (
          <div
            key={loc.id}
            className="bg-white dark:bg-brand-charcoal border border-vintage rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
          >
            {/* Location banner */}
            <div className="h-48 relative overflow-hidden bg-brand-burgundy/10">
              <img
                src={
                  loc.id === "loc-covent"
                    ? "https://images.unsplash.com/photo-1585938338990-21f1685eaa5c?auto=format&fit=crop&w=600&q=80"
                    : loc.id === "loc-kings"
                    ? "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80"
                    : "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=600&q=80"
                }
                alt={`Spice Haven ${loc.name}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/85 via-brand-charcoal/20 to-transparent flex items-end p-5">
                <div>
                  <span className="block font-mono text-[9px] uppercase tracking-widest text-brand-gold font-bold">
                    London Wing
                  </span>
                  <h3 className="font-display font-semibold text-lg text-white uppercase tracking-wide">
                    {loc.name}
                  </h3>
                </div>
              </div>
            </div>

            {/* Location Info */}
            <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <p className="text-xs text-brand-muted leading-relaxed font-sans">
                  {loc.description}
                </p>

                <div className="space-y-2.5 font-sans text-xs">
                  <div className="flex gap-2.5">
                    <MapPin className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                    <span className="text-brand-charcoal dark:text-brand-cream">
                      {loc.address}, {loc.city}
                    </span>
                  </div>

                  <div className="flex gap-2.5">
                    <Phone className="w-4 h-4 text-brand-gold shrink-0" />
                    <a href={`tel:${loc.phone}`} className="text-brand-muted hover:text-brand-gold hover:underline">
                      {loc.phone}
                    </a>
                  </div>

                  <div className="flex gap-2.5">
                    <Mail className="w-4 h-4 text-brand-gold shrink-0" />
                    <a href={`mailto:${loc.email}`} className="text-brand-muted hover:text-brand-gold hover:underline">
                      {loc.email}
                    </a>
                  </div>
                </div>
              </div>

              {/* Hours Grid */}
              <div className="pt-4 border-t border-vintage/30 space-y-3">
                <h4 className="font-mono text-[10px] uppercase tracking-wider text-brand-muted font-bold flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-brand-gold" />
                  <span>Opening Hours</span>
                </h4>
                <div className="grid grid-cols-2 gap-2 text-[11px] font-sans text-brand-muted">
                  <div>
                    <span className="block font-semibold text-brand-charcoal dark:text-brand-cream">Mon - Fri</span>
                    <span>{loc.hours.weekdays}</span>
                  </div>
                  <div>
                    <span className="block font-semibold text-brand-charcoal dark:text-brand-cream">Sat - Sun</span>
                    <span>{loc.hours.weekends}</span>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="pt-2">
                <a
                  href={loc.directionsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-2 bg-brand-cream/10 hover:bg-brand-gold/15 text-brand-charcoal dark:text-brand-cream hover:text-brand-gold border border-vintage rounded text-xs uppercase tracking-wider font-semibold transition-colors"
                >
                  <span>Get Directions</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
