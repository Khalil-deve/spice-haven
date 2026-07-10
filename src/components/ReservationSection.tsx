import React, { useState } from "react";
import { Calendar, Clock, Users, MapPin, Sparkles, Send, CheckCircle2, AlertCircle, RefreshCw, Lock } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { RESTAURANT_LOCATIONS } from "../data";
import { useAuth } from "../context/AuthContext";

interface ReservationSectionProps {
  onAddNotification: (message: string, type: "success" | "error" | "info") => void;
}

export default function ReservationSection({ onAddNotification }: ReservationSectionProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "19:00",
    guests: "2",
    location: "Covent Garden",
    specialRequests: "",
  });

  const { user } = useAuth();
  
  // Pre-fill name and email if user is logged in
  React.useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.name,
        email: user.email,
      }));
    }
  }, [user]);

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [bookingDetails, setBookingDetails] = useState<any>(null);

  const times = [
    "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", 
    "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.date || !formData.time) {
      onAddNotification("Please fill in all mandatory booking fields.", "error");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/reservations", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user?.token}`
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          date: formData.date,
          time: formData.time,
          guests: parseInt(formData.guests),
          location: formData.location,
          specialRequests: formData.specialRequests,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Reservation failed");
      }

      setBookingDetails(data.reservation);
      setIsSuccess(true);
      onAddNotification("Table reservation confirmed successfully!", "success");
    } catch (err: any) {
      console.error(err);
      onAddNotification(err.message || "Something went wrong.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      date: "",
      time: "19:00",
      guests: "2",
      location: "Covent Garden",
      specialRequests: "",
    });
    setIsSuccess(false);
    setBookingDetails(null);
  };

  return (
    <div className="py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-brand-gold font-semibold">Elegant Dining</span>
        <h2 className="font-display font-bold text-3xl sm:text-4xl tracking-tight text-brand-charcoal dark:text-brand-cream mt-2 uppercase">
          SECURE YOUR TABLE
        </h2>
        <p className="font-sans text-sm text-brand-muted leading-relaxed mt-4">
          All slots are opened 30 days in advance. We keep ample space reserved for walk-ins, but reserve below to guarantee your high-table, booth, or private hall seating.
        </p>
      </div>

      <AnimatePresence mode="wait">
        {!isSuccess ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="bg-white dark:bg-brand-charcoal border border-vintage rounded-lg shadow-xl overflow-hidden"
          >
            <div className="bg-brand-burgundy text-white p-6 sm:p-8">
              <h3 className="font-display font-bold text-lg tracking-wide uppercase">Table Inquiry</h3>
              <p className="font-sans text-xs text-brand-gold mt-1.5 leading-relaxed">
                Complete details below. For private parties over 12 guests, kindly email events@spicehaven.co.uk.
              </p>
            </div>

            {!user ? (
              <div className="p-12 text-center">
                <Lock className="w-12 h-12 mx-auto text-brand-muted mb-4 opacity-50" />
                <h3 className="font-display font-bold text-xl uppercase tracking-widest text-brand-charcoal dark:text-brand-cream">
                  Authentication Required
                </h3>
                <p className="text-sm text-brand-muted mt-2 max-w-sm mx-auto">
                  To ensure the highest quality of service and prevent spam, we require all our guests to sign in before booking a table.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Full Name */}
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-brand-muted mb-2">
                    Your Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Sterling Cooper"
                    className="w-full text-sm px-4 py-3 bg-brand-cream/30 dark:bg-brand-charcoal border border-vintage rounded focus:outline-none focus:border-brand-gold dark:text-brand-cream"
                  />
                </div>

                {/* Email address */}
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-brand-muted mb-2">
                    Email Address <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. cooperative@sterling.com"
                    className="w-full text-sm px-4 py-3 bg-brand-cream/30 dark:bg-brand-charcoal border border-vintage rounded focus:outline-none focus:border-brand-gold dark:text-brand-cream"
                  />
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-brand-muted mb-2">
                    Phone Number <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="e.g. +44 7911 123456"
                    className="w-full text-sm px-4 py-3 bg-brand-cream/30 dark:bg-brand-charcoal border border-vintage rounded focus:outline-none focus:border-brand-gold dark:text-brand-cream"
                  />
                </div>

                {/* Location Picker */}
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-brand-muted mb-2">
                    Restaurant Location <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full text-sm px-4 py-3 bg-brand-cream/30 dark:bg-brand-charcoal border border-vintage rounded focus:outline-none focus:border-brand-gold dark:text-brand-cream"
                  >
                    {RESTAURANT_LOCATIONS.map((loc) => (
                      <option key={loc.id} value={`${loc.name} (${loc.city.split(" ")[0]})`}>
                        Spice Haven {loc.name} ({loc.city.split(" ")[0]})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Guest Count Selector */}
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-brand-muted mb-2">
                    Number of Guests <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                    className="w-full text-sm px-4 py-3 bg-brand-cream/30 dark:bg-brand-charcoal border border-vintage rounded focus:outline-none focus:border-brand-gold dark:text-brand-cream"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? "Guest" : "Guests"}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Date Picker */}
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-brand-muted mb-2">
                    Dining Date <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="date"
                    required
                    min={new Date().toISOString().split("T")[0]}
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full text-sm px-4 py-3 bg-brand-cream/30 dark:bg-brand-charcoal border border-vintage rounded focus:outline-none focus:border-brand-gold dark:text-brand-cream"
                  />
                </div>
              </div>

              {/* Time Slots */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-brand-muted mb-3">
                  Preferred Arrival Time <span className="text-rose-500">*</span>
                </label>
                <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-2">
                  {times.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setFormData({ ...formData, time: t })}
                      className={`py-2 text-xs font-mono font-medium rounded border transition-all cursor-pointer ${
                        formData.time === t
                          ? "bg-brand-burgundy border-brand-burgundy text-white shadow"
                          : "bg-brand-cream/10 dark:bg-brand-charcoal/20 border-vintage hover:border-brand-gold text-brand-charcoal dark:text-brand-cream"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Special Requests */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-brand-muted mb-2">
                  Dietary Notes / Special Occasions
                </label>
                <textarea
                  value={formData.specialRequests}
                  onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                  placeholder=" celebrating a birthday, highchair requirements, wheel-chair accessibility, or dietary adjustments..."
                  rows={4}
                  className="w-full text-sm px-4 py-3 bg-brand-cream/30 dark:bg-brand-charcoal border border-vintage rounded focus:outline-none focus:border-brand-gold dark:text-brand-cream"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 bg-brand-burgundy hover:bg-brand-gold text-white hover:text-brand-charcoal font-sans text-xs uppercase tracking-widest font-semibold rounded transition-all duration-300 shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Engaging Registry...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Dining Request</span>
                  </>
                )}
              </button>
            </form>
            )}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white dark:bg-brand-charcoal border border-vintage rounded-lg shadow-2xl p-8 sm:p-12 text-center relative overflow-hidden"
          >
            {/* Stamp Detail */}
            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full border-4 border-dashed border-brand-gold/30 flex items-center justify-center -rotate-12">
              <span className="font-mono text-[10px] uppercase font-bold text-brand-gold/50 tracking-widest">
                APPROVED
              </span>
            </div>

            <CheckCircle2 className="w-16 h-16 text-brand-gold mx-auto mb-6" />
            
            <span className="font-mono text-[9px] uppercase tracking-widest text-brand-gold font-bold">
              BRONZE RESERVATION DECREE
            </span>
            <h3 className="font-display font-semibold text-2xl tracking-wider text-brand-charcoal dark:text-brand-cream mt-2 uppercase">
              RESERVATION SECURED
            </h3>
            
            <p className="font-sans text-xs text-brand-muted leading-relaxed max-w-md mx-auto mt-4">
              A bespoke dining pass has been dispatched to <strong className="text-brand-charcoal dark:text-brand-gold">{bookingDetails?.email}</strong>. We look forward to welcoming you at our vintage parlor hall.
            </p>

            {/* Old Vintage Invitation Slip Card details */}
            <div className="max-w-md mx-auto bg-brand-cream/30 dark:bg-brand-charcoal border border-dashed border-vintage p-6 rounded-lg text-left mt-8 space-y-3.5 font-sans text-xs">
              <div className="flex justify-between border-b border-vintage/50 pb-2">
                <span className="text-brand-muted font-medium">PASSENGER NAME</span>
                <strong className="text-brand-charcoal dark:text-brand-cream uppercase">{bookingDetails?.name}</strong>
              </div>
              <div className="flex justify-between border-b border-vintage/50 pb-2">
                <span className="text-brand-muted font-medium">RESTAURANT WING</span>
                <strong className="text-brand-charcoal dark:text-brand-cream uppercase">{bookingDetails?.location}</strong>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center border-b border-vintage/50 pb-2">
                <div>
                  <span className="text-brand-muted block font-mono text-[9px]">GUESTS</span>
                  <strong className="text-brand-charcoal dark:text-brand-cream text-sm">{bookingDetails?.guests} Seated</strong>
                </div>
                <div>
                  <span className="text-brand-muted block font-mono text-[9px]">DATE</span>
                  <strong className="text-brand-charcoal dark:text-brand-cream text-sm">{bookingDetails?.date}</strong>
                </div>
                <div>
                  <span className="text-brand-muted block font-mono text-[9px]">ARRIVAL TIME</span>
                  <strong className="text-brand-charcoal dark:text-brand-cream text-sm font-mono">{bookingDetails?.time}</strong>
                </div>
              </div>
              <div className="flex justify-between pt-1">
                <span className="text-brand-muted font-medium">BOOKING ID</span>
                <span className="font-mono text-brand-gold font-bold uppercase">{bookingDetails?._id || bookingDetails?.id}</span>
              </div>
            </div>

            <button
              onClick={handleReset}
              className="mt-10 px-8 py-3 bg-brand-charcoal text-brand-cream hover:bg-brand-gold hover:text-brand-charcoal font-sans text-xs uppercase tracking-widest font-semibold rounded border border-vintage transition-colors"
            >
              Book Another Table
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
