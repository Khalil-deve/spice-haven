import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useAuth } from "../context/AuthContext";
import { LogOut, Calendar, MapPin, Users, Clock, History, CheckCircle2, X } from "lucide-react";

interface ProfileSectionProps {
  onPageChange: (pageId: string) => void;
  onAddNotification: (message: string, type: "success" | "error" | "info") => void;
}

export default function ProfileSection({ onPageChange, onAddNotification }: ProfileSectionProps) {
  const { user, logout } = useAuth();
  const [reservations, setReservations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState<any | null>(null);

  useEffect(() => {
    const fetchReservations = async () => {
      if (!user) return;
      try {
        const response = await fetch("/api/reservations", {
          headers: {
            "Authorization": `Bearer ${user.token}`,
          },
        });
        const data = await response.json();
        if (response.ok) {
          setReservations(data);
        } else {
          throw new Error(data.error || "Failed to fetch reservations");
        }
      } catch (error: any) {
        onAddNotification(error.message, "error");
      } finally {
        setIsLoading(false);
      }
    };

    fetchReservations();
  }, [user]);

  const handleLogout = () => {
    logout();
    onPageChange("home");
    onAddNotification("You have been securely signed out.", "success");
  };

  if (!user) return null;

  return (
    <div className="py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Profile Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 bg-brand-cream/30 dark:bg-brand-charcoal border border-vintage rounded-xl p-8 mb-12 shadow-sm">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-widest text-brand-gold font-bold">
            Guest Profile
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl tracking-tight text-brand-charcoal dark:text-brand-cream uppercase mt-1">
            {user.name}
          </h2>
          <p className="font-sans text-sm text-brand-muted mt-2">{user.email}</p>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-6 py-3 bg-brand-charcoal text-brand-cream hover:bg-brand-burgundy font-sans text-xs uppercase tracking-widest font-semibold rounded transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>

      {/* Booking History */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 mb-8">
          <History className="w-6 h-6 text-brand-gold" />
          <h3 className="font-display font-semibold text-2xl text-brand-charcoal dark:text-brand-cream uppercase tracking-wide">
            Your Booking History
          </h3>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <span className="font-mono text-xs text-brand-muted animate-pulse">Retrieving Ledgers...</span>
          </div>
        ) : reservations.length === 0 ? (
          <div className="text-center py-16 bg-white/50 dark:bg-brand-charcoal/50 border border-dashed border-vintage rounded-lg">
            <Calendar className="w-12 h-12 text-brand-muted/50 mx-auto mb-4" />
            <p className="font-sans text-sm text-brand-muted">You have no recorded dining reservations.</p>
            <button
              onClick={() => onPageChange("reservations")}
              className="mt-6 px-6 py-2.5 bg-brand-burgundy text-white font-sans text-xs uppercase tracking-widest font-semibold rounded shadow-md hover:bg-brand-gold transition-colors"
            >
              Book a Table
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reservations.map((booking, index) => (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                key={booking._id}
                onClick={() => setSelectedBooking(booking)}
                className="bg-white dark:bg-brand-charcoal border border-vintage rounded-lg shadow-sm p-6 relative overflow-hidden cursor-pointer hover:shadow-md transition-shadow group"
              >
                {/* Decorative border */}
                <div className="absolute top-0 left-0 w-1.5 h-full bg-brand-gold/60"></div>
                
                <div className="flex justify-between items-start mb-4">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-brand-gold font-bold">
                    ID: {booking._id.slice(-6)}
                  </span>
                  <span className="text-[10px] bg-brand-cream dark:bg-black/30 px-2 py-1 rounded text-brand-muted border border-vintage/50 font-mono">
                    {new Date(booking.date) >= new Date() ? 'UPCOMING' : 'PAST'}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-y-4 gap-x-2 text-sm mt-2">
                  <div className="flex items-center gap-2 text-brand-charcoal dark:text-brand-cream">
                    <Calendar className="w-4 h-4 text-brand-muted shrink-0" />
                    <span className="font-semibold">{booking.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-brand-charcoal dark:text-brand-cream">
                    <Clock className="w-4 h-4 text-brand-muted shrink-0" />
                    <span className="font-mono">{booking.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-brand-charcoal dark:text-brand-cream">
                    <Users className="w-4 h-4 text-brand-muted shrink-0" />
                    <span>{booking.guests} Guests</span>
                  </div>
                  <div className="flex items-center gap-2 text-brand-charcoal dark:text-brand-cream">
                    <MapPin className="w-4 h-4 text-brand-muted shrink-0" />
                    <span className="truncate" title={booking.location}>{booking.location}</span>
                  </div>
                </div>

                {booking.specialRequests && (
                  <div className="mt-4 pt-4 border-t border-vintage/30">
                    <p className="text-xs text-brand-muted italic flex items-start gap-2">
                      <span className="font-semibold uppercase not-italic text-[10px] tracking-wider mt-0.5">Notes:</span>
                      {booking.specialRequests}
                    </p>
                  </div>
                )}
                
                <div className="mt-4 pt-4 border-t border-vintage/30 flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-[10px] uppercase tracking-widest font-semibold text-brand-gold">View Decree &rarr;</span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Modal for detailed decree */}
      <AnimatePresence>
        {selectedBooking && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-brand-charcoal/80 backdrop-blur-sm p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="bg-white dark:bg-brand-charcoal border border-vintage rounded-lg shadow-2xl p-8 sm:p-12 text-center relative overflow-hidden max-w-lg w-full"
            >
              <button
                onClick={() => setSelectedBooking(null)}
                className="absolute top-4 right-4 p-2 text-brand-muted hover:text-brand-charcoal dark:hover:text-brand-cream transition-colors focus:outline-none"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Stamp Detail */}
              <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full border-4 border-dashed border-brand-gold/30 flex items-center justify-center -rotate-12 pointer-events-none">
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
                A bespoke dining pass was dispatched to <strong className="text-brand-charcoal dark:text-brand-gold">{user.email}</strong>. We look forward to welcoming you at our vintage parlor hall.
              </p>

              {/* Old Vintage Invitation Slip Card details */}
              <div className="max-w-md mx-auto bg-brand-cream/30 dark:bg-brand-charcoal border border-dashed border-vintage p-6 rounded-lg text-left mt-8 space-y-3.5 font-sans text-xs">
                <div className="flex justify-between border-b border-vintage/50 pb-2">
                  <span className="text-brand-muted font-medium">PASSENGER NAME</span>
                  <strong className="text-brand-charcoal dark:text-brand-cream uppercase">{user.name}</strong>
                </div>
                <div className="flex justify-between border-b border-vintage/50 pb-2">
                  <span className="text-brand-muted font-medium">RESTAURANT WING</span>
                  <strong className="text-brand-charcoal dark:text-brand-cream uppercase">{selectedBooking.location}</strong>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center border-b border-vintage/50 pb-2">
                  <div>
                    <span className="text-brand-muted block font-mono text-[9px]">GUESTS</span>
                    <strong className="text-brand-charcoal dark:text-brand-cream text-sm">{selectedBooking.guests} Seated</strong>
                  </div>
                  <div>
                    <span className="text-brand-muted block font-mono text-[9px]">DATE</span>
                    <strong className="text-brand-charcoal dark:text-brand-cream text-sm">{selectedBooking.date}</strong>
                  </div>
                  <div>
                    <span className="text-brand-muted block font-mono text-[9px]">ARRIVAL TIME</span>
                    <strong className="text-brand-charcoal dark:text-brand-cream text-sm font-mono">{selectedBooking.time}</strong>
                  </div>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-brand-muted font-medium">BOOKING ID</span>
                  <span className="font-mono text-brand-gold font-bold uppercase">{selectedBooking._id}</span>
                </div>
              </div>

              {selectedBooking.specialRequests && (
                <div className="max-w-md mx-auto mt-6 text-left">
                  <p className="text-xs text-brand-muted italic flex items-start gap-2">
                    <span className="font-semibold uppercase not-italic text-[10px] tracking-wider mt-0.5">Notes:</span>
                    {selectedBooking.specialRequests}
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
