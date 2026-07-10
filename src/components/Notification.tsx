import { useEffect } from "react";
import { CheckCircle2, AlertCircle, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface NotificationProps {
  key?: string;
  message: string;
  type: "success" | "error" | "info";
  onClose: () => void;
  duration?: number;
}

export default function Notification({ message, type, onClose, duration = 4000 }: NotificationProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const bgStyle = {
    success: "bg-brand-cream border-emerald-500/30 text-emerald-800 dark:bg-brand-charcoal dark:text-emerald-300",
    error: "bg-brand-cream border-rose-500/30 text-rose-800 dark:bg-brand-charcoal dark:text-rose-300",
    info: "bg-brand-cream border-brand-gold/30 text-brand-charcoal dark:bg-brand-charcoal dark:text-brand-cream",
  }[type];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-4 rounded-lg shadow-xl border border-vintage max-w-sm ${bgStyle}`}
    >
      {type === "success" && <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />}
      {type === "error" && <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />}
      {type === "info" && <CheckCircle2 className="w-5 h-5 text-brand-gold shrink-0" />}
      
      <p className="text-sm font-medium font-sans leading-relaxed flex-1">{message}</p>
      
      <button 
        onClick={onClose} 
        className="text-brand-muted hover:text-brand-gold p-1 rounded-full transition-colors"
        aria-label="Close notification"
      >
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  );
}
