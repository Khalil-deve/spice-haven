import { motion } from "motion/react";
import { Sparkles } from "lucide-react";

interface PageTransitionOverlayProps {
  isVisible: boolean;
  text: string;
  progress: number;
}

export default function PageTransitionOverlay({ isVisible, text, progress }: PageTransitionOverlayProps) {
  return (
    <div
      className={`fixed inset-0 z-50 pointer-events-none flex flex-col items-center justify-center transition-all duration-500 ${
        isVisible 
          ? "opacity-100 pointer-events-auto bg-brand-cream/95 dark:bg-brand-charcoal/95 backdrop-blur-md" 
          : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Decorative Traditional Vintage Borders */}
      <div className="absolute inset-4 sm:inset-6 border border-vintage/30 dark:border-brand-gold/20 pointer-events-none flex flex-col justify-between p-4">
        <div className="flex justify-between">
          <span className="w-3 h-3 border-t border-l border-brand-gold" />
          <span className="w-3 h-3 border-t border-r border-brand-gold" />
        </div>
        <div className="flex justify-between">
          <span className="w-3 h-3 border-b border-l border-brand-gold" />
          <span className="w-3 h-3 border-b border-r border-brand-gold" />
        </div>
      </div>

      <div className="relative text-center px-6 max-w-md mx-auto space-y-6">
        {/* Glowing Spinning Star Anise / Spice mandala emblem */}
        <div className="relative mx-auto w-20 h-20 flex items-center justify-center">
          {/* Pulsing glow ring */}
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
            className="absolute inset-0 rounded-full border border-brand-gold/30"
          />
          <motion.div
            animate={{ scale: [1.08, 0.95, 1.08], opacity: [0.15, 0.4, 0.15] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="absolute -inset-2 rounded-full border border-vintage/20"
          />
          
          {/* Beautiful spinning logo icon */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
            className="text-brand-gold relative z-10"
          >
            <Sparkles className="w-10 h-10 stroke-[1.25]" />
          </motion.div>
        </div>

        {/* Brand Header */}
        <div className="space-y-1">
          <h3 className="font-display font-semibold text-lg tracking-[0.2em] text-brand-charcoal dark:text-brand-cream uppercase">
            SPICE HAVEN
          </h3>
          <p className="font-mono text-[9px] tracking-[0.3em] text-brand-gold uppercase font-medium">
            Est. 1953 • London & Bombay
          </p>
        </div>

        {/* Dynamic Gourmet Activity Text */}
        <div className="h-10 flex items-center justify-center">
          <motion.p
            key={text}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="font-sans italic text-sm text-brand-muted dark:text-brand-gold/90 font-light tracking-wide text-center"
          >
            {text}
          </motion.p>
        </div>

        {/* Precision Progress Bar */}
        <div className="w-48 mx-auto space-y-2">
          <div className="h-[2px] w-full bg-vintage/20 dark:bg-brand-cream/10 rounded-full overflow-hidden relative">
            <motion.div
              className="h-full bg-brand-gold"
              style={{ width: `${progress}%` }}
              transition={{ ease: "easeInOut" }}
            />
          </div>
          <div className="flex justify-between items-center text-[9px] font-mono tracking-widest text-brand-muted uppercase">
            <span>PREPARING</span>
            <span>{progress}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
