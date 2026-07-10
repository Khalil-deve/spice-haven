import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { LogIn, UserPlus } from "lucide-react";
import { motion } from "motion/react";

interface AuthSectionProps {
  onAddNotification: (message: string, type: "success" | "error" | "info") => void;
  onPageChange: (pageId: string) => void;
}

export default function AuthSection({ onAddNotification, onPageChange }: AuthSectionProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const endpoint = isLogin ? "/api/auth/login" : "/api/auth/register";
      const payload = isLogin ? { email, password } : { name, email, password };

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Authentication failed");
      }

      login(data);
      onAddNotification(`Welcome${!isLogin ? " to Spice Haven" : " back"}, ${data.name}!`, "success");
      onPageChange("home");
    } catch (error: any) {
      onAddNotification(error.message, "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-10 dark:opacity-5"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-brand-cream/80 to-brand-cream dark:from-brand-charcoal/80 dark:to-brand-charcoal backdrop-blur-[2px]"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-white/70 dark:bg-black/40 backdrop-blur-xl border border-brand-gold/30 p-8 sm:p-10 shadow-2xl rounded-sm">
          <div className="text-center mb-8">
            <h2 className="font-display text-3xl font-bold tracking-widest uppercase text-brand-charcoal dark:text-brand-cream">
              {isLogin ? "Welcome Back" : "Join the Family"}
            </h2>
            <p className="mt-2 text-sm font-sans text-brand-muted tracking-wider">
              {isLogin ? "Access your reservation history & preferences." : "Create an account for seamless bookings."}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div>
                <label className="block text-xs font-semibold text-brand-charcoal dark:text-brand-cream uppercase tracking-widest mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-brand-cream/50 dark:bg-brand-charcoal/50 border border-vintage/50 px-4 py-3 text-sm focus:outline-none focus:border-brand-gold transition-colors text-brand-charcoal dark:text-brand-cream"
                  placeholder="e.g., Eleanor Sterling"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-brand-charcoal dark:text-brand-cream uppercase tracking-widest mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-brand-cream/50 dark:bg-brand-charcoal/50 border border-vintage/50 px-4 py-3 text-sm focus:outline-none focus:border-brand-gold transition-colors text-brand-charcoal dark:text-brand-cream"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-brand-charcoal dark:text-brand-cream uppercase tracking-widest mb-1.5">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-brand-cream/50 dark:bg-brand-charcoal/50 border border-vintage/50 px-4 py-3 text-sm focus:outline-none focus:border-brand-gold transition-colors text-brand-charcoal dark:text-brand-cream"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 bg-brand-burgundy hover:bg-brand-gold text-white hover:text-brand-charcoal px-6 py-4 font-display font-bold uppercase tracking-[0.2em] text-sm transition-all shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="animate-pulse">Processing...</span>
              ) : isLogin ? (
                <>
                  <LogIn className="w-5 h-5" />
                  <span>Sign In</span>
                </>
              ) : (
                <>
                  <UserPlus className="w-5 h-5" />
                  <span>Create Account</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-xs font-sans text-brand-muted hover:text-brand-gold uppercase tracking-widest transition-colors focus:outline-none"
            >
              {isLogin ? "Don't have an account? Register here." : "Already have an account? Sign in."}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
