import React, { useState, useRef, useEffect } from "react";
import { Sparkles, Send, Bot, User, Utensils, CalendarDays, X, ChefHat, HelpCircle, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { ChatMessage, RecommendationResult, MealPlanResult } from "../types";

interface AIAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToReservations: () => void;
  onNavigateToMenu: () => void;
}

export default function AIAssistant({ isOpen, onClose, onNavigateToReservations, onNavigateToMenu }: AIAssistantProps) {
  const [activeTab, setActiveTab] = useState<"chat" | "recommend" | "planner">("chat");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Namaste! A most warm and poetic welcome to Spice Haven. I am Anwar, your humble Maitre D' and Sommelier. I was born and raised near the bustling cafés of South Bombay, and I would be deeply honoured to assist you. Shall I recommend a fine wine, describe our 24-hour slow-cooked Black Daal, or perhaps plan a magnificent feast for your table?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<{ message: string; isKeyMissing: boolean } | null>(null);

  // Recommendation states
  const [mood, setMood] = useState("adventurous");
  const [diet, setDiet] = useState("none");
  const [spice, setSpice] = useState("medium");
  const [recommendations, setRecommendations] = useState<RecommendationResult[] | null>(null);

  // Meal Planner states
  const [occasion, setOccasion] = useState("Romantic Date Night");
  const [groupSize, setGroupSize] = useState(2);
  const [preference, setPreference] = useState("Chef Choice");
  const [mealPlan, setMealPlan] = useState<MealPlanResult | null>(null);

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);
    setApiError(null);

    try {
      const response = await fetch("/api/gemini/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMsg.content,
          chatHistory: messages.map(m => ({ role: m.role, content: m.content }))
        })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || data.error || "An error occurred");
      }

      setMessages(prev => [...prev, {
        id: `ai-${Date.now()}`,
        role: "assistant",
        content: data.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } catch (err: any) {
      console.error(err);
      setApiError({
        message: err.message || "Failed to reach Anwar.",
        isKeyMissing: err.message.includes("GEMINI_API_KEY") || err.message.includes("not configured")
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGetRecommendations = async () => {
    setIsLoading(true);
    setRecommendations(null);
    setApiError(null);
    try {
      const response = await fetch("/api/gemini/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mood, diet, spiceTolerance: spice })
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || data.error || "Recommendation error");
      }
      setRecommendations(data.recommendations);
    } catch (err: any) {
      console.error(err);
      setApiError({
        message: err.message || "Failed to fetch recommendations.",
        isKeyMissing: err.message.includes("GEMINI_API_KEY") || err.message.includes("not configured")
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGetMealPlan = async () => {
    setIsLoading(true);
    setMealPlan(null);
    setApiError(null);
    try {
      const response = await fetch("/api/gemini/meal-planner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ occasion, groupSize, preference })
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || data.error || "Meal plan error");
      }
      setMealPlan(data.planner);
    } catch (err: any) {
      console.error(err);
      setApiError({
        message: err.message || "Failed to generate meal plan.",
        isKeyMissing: err.message.includes("GEMINI_API_KEY") || err.message.includes("not configured")
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-brand-charcoal/80 backdrop-blur-sm p-2 sm:p-6"
      onClick={onClose}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3 }}
        className="relative w-full max-w-2xl h-[95dvh] sm:h-[80vh] sm:max-h-[700px] bg-brand-cream dark:bg-brand-charcoal rounded-xl shadow-2xl border border-vintage flex flex-col overflow-hidden"
      >
        {/* Header */}
        <div className="bg-brand-burgundy text-white px-5 py-4 flex items-center justify-between border-b border-vintage">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-brand-gold/30 flex items-center justify-center border border-brand-gold">
              <ChefHat className="w-5 h-5 text-brand-gold" />
            </div>
            <div>
              <h3 className="font-display font-semibold text-base tracking-wider">ANWAR | THE AI SOMMELIER</h3>
              <p className="font-mono text-[9px] tracking-widest text-brand-gold uppercase">Spice Haven Maitre D' & Host</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex items-center gap-1 px-3 py-1.5 rounded-full text-white/90 hover:text-white hover:bg-white/20 transition-colors focus:outline-none text-xs font-semibold uppercase tracking-wider bg-white/10"
            aria-label="Close Assistant"
          >
            <span>Close</span>
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Controls */}
        <div className="bg-brand-cream/90 dark:bg-brand-charcoal/90 px-4 py-2 border-b border-vintage flex items-center justify-around gap-2 z-10 shadow-sm">
          <button
            onClick={() => setActiveTab("chat")}
            className={`flex items-center gap-1.5 px-3 py-2 text-xs uppercase tracking-wider font-semibold rounded-md transition-colors cursor-pointer ${
              activeTab === "chat"
                ? "text-brand-burgundy dark:text-brand-gold bg-brand-gold/15"
                : "text-brand-muted hover:text-brand-charcoal dark:hover:text-brand-cream"
            }`}
          >
            <Bot className="w-4 h-4" />
            <span>Chat</span>
          </button>
          <button
            onClick={() => setActiveTab("recommend")}
            className={`flex items-center gap-1.5 px-3 py-2 text-xs uppercase tracking-wider font-semibold rounded-md transition-colors cursor-pointer ${
              activeTab === "recommend"
                ? "text-brand-burgundy dark:text-brand-gold bg-brand-gold/15"
                : "text-brand-muted hover:text-brand-charcoal dark:hover:text-brand-cream"
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Recommendations</span>
          </button>
          <button
            onClick={() => setActiveTab("planner")}
            className={`flex items-center gap-1.5 px-3 py-2 text-xs uppercase tracking-wider font-semibold rounded-md transition-colors cursor-pointer ${
              activeTab === "planner"
                ? "text-brand-burgundy dark:text-brand-gold bg-brand-gold/15"
                : "text-brand-muted hover:text-brand-charcoal dark:hover:text-brand-cream"
            }`}
          >
            <Utensils className="w-4 h-4" />
            <span>Meal Planner</span>
          </button>
        </div>

        {/* Display Error Panel if Gemini API Key not present */}
        {apiError && (
          <div className="bg-rose-500/10 border-b border-rose-500/20 px-5 py-3 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
            <div className="text-xs">
              <p className="font-semibold text-rose-800 dark:text-rose-300">Anwar's Voice is Muted</p>
              <p className="text-rose-700 dark:text-rose-400 mt-0.5">
                {apiError.isKeyMissing 
                  ? "The GEMINI_API_KEY is not configured in this assessment space. Please add your key in Settings > Secrets to unlock genuine AI predictions!" 
                  : apiError.message}
              </p>
            </div>
          </div>
        )}

        {/* Tab Content Panels */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 bg-brand-cream/40 dark:bg-brand-charcoal/30">
          {activeTab === "chat" && (
            <div className="space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 max-w-[85%] ${msg.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"}`}
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center border text-[10px] shrink-0 font-bold ${
                      msg.role === "user"
                        ? "bg-brand-burgundy border-brand-burgundy text-white"
                        : "bg-brand-gold/20 border-brand-gold text-brand-charcoal dark:text-brand-gold"
                    }`}
                  >
                    {msg.role === "user" ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                  </div>
                  <div
                    className={`p-3.5 rounded-lg text-sm leading-relaxed border ${
                      msg.role === "user"
                        ? "bg-brand-burgundy/5 border-brand-burgundy/10 text-brand-charcoal dark:text-brand-cream"
                        : "bg-white dark:bg-brand-charcoal border-vintage text-brand-charcoal dark:text-brand-cream shadow-sm"
                    }`}
                  >
                    <p className="font-sans whitespace-pre-line">{msg.content}</p>
                    <span className="block text-[9px] text-brand-muted mt-1.5 text-right font-mono">
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-3 max-w-[80%]">
                  <div className="w-7 h-7 rounded-full bg-brand-gold/20 border border-brand-gold flex items-center justify-center shrink-0">
                    <Bot className="w-3.5 h-3.5 text-brand-gold animate-bounce" />
                  </div>
                  <div className="p-3.5 rounded-lg bg-white dark:bg-brand-charcoal border border-vintage shadow-sm flex items-center gap-1.5 py-4">
                    <span className="w-2 h-2 rounded-full bg-brand-gold animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 rounded-full bg-brand-gold animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 rounded-full bg-brand-gold animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>
          )}

          {activeTab === "recommend" && (
            <div className="space-y-6">
              {!recommendations ? (
                <div className="p-4 bg-white dark:bg-brand-charcoal rounded-lg border border-vintage space-y-4 shadow-sm">
                  <h4 className="font-display font-medium text-sm uppercase tracking-wider text-brand-burgundy dark:text-brand-gold">
                    Find Your Culinary Match
                  </h4>
                  <p className="text-xs text-brand-muted leading-relaxed">
                    Allow Anwar to match your mood and diet with our exquisite signature dishes and tandoor grills.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider font-semibold text-brand-muted mb-1.5">Mood</label>
                      <select
                        value={mood}
                        onChange={(e) => setMood(e.target.value)}
                        className="w-full text-xs p-2 rounded bg-brand-cream dark:bg-brand-charcoal border border-vintage focus:border-brand-gold focus:outline-none dark:text-brand-cream"
                      >
                        <option value="adventurous">Adventurous</option>
                        <option value="comforting">Comforting</option>
                        <option value="refreshing">Light & Refreshing</option>
                        <option value="prestige">Prestige Feast</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase tracking-wider font-semibold text-brand-muted mb-1.5">Diet</label>
                      <select
                        value={diet}
                        onChange={(e) => setDiet(e.target.value)}
                        className="w-full text-xs p-2 rounded bg-brand-cream dark:bg-brand-charcoal border border-vintage focus:border-brand-gold focus:outline-none dark:text-brand-cream"
                      >
                        <option value="none">No Restrictions</option>
                        <option value="vegetarian">Vegetarian</option>
                        <option value="vegan">Vegan Only</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase tracking-wider font-semibold text-brand-muted mb-1.5">Spice Level</label>
                      <select
                        value={spice}
                        onChange={(e) => setSpice(e.target.value)}
                        className="w-full text-xs p-2 rounded bg-brand-cream dark:bg-brand-charcoal border border-vintage focus:border-brand-gold focus:outline-none dark:text-brand-cream"
                      >
                        <option value="mild">Mild (Gentle glow)</option>
                        <option value="medium">Medium (Classic Bombay)</option>
                        <option value="hot">Intense (Fire-cooked)</option>
                      </select>
                    </div>
                  </div>

                  <button
                    onClick={handleGetRecommendations}
                    disabled={isLoading}
                    className="w-full mt-4 py-2 bg-brand-burgundy hover:bg-brand-gold text-white hover:text-brand-charcoal font-sans text-xs uppercase tracking-widest font-semibold rounded transition-colors disabled:opacity-50"
                  >
                    {isLoading ? "Consulting Archives..." : "Ask Anwar For Selection"}
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-display font-medium text-sm uppercase tracking-wider text-brand-burgundy dark:text-brand-gold">
                      Anwar's Bespoke Selections
                    </h4>
                    <button
                      onClick={() => setRecommendations(null)}
                      className="text-xs text-brand-burgundy hover:text-brand-gold dark:text-brand-gold dark:hover:text-brand-cream font-medium"
                    >
                      Change Preferences
                    </button>
                  </div>

                  {recommendations.map((rec, idx) => (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      key={idx}
                      className="p-4 bg-white dark:bg-brand-charcoal rounded-lg border border-vintage shadow-sm"
                    >
                      <div className="flex items-start justify-between">
                        <span className="font-display font-semibold text-sm text-brand-charcoal dark:text-brand-cream">
                          {rec.dishName}
                        </span>
                        <span className="px-2 py-0.5 bg-brand-gold/15 text-brand-muted text-[10px] uppercase tracking-wider rounded font-medium">
                          Match #{idx + 1}
                        </span>
                      </div>
                      <p className="text-xs text-brand-muted leading-relaxed mt-2">{rec.reason}</p>
                      
                      <div className="mt-3 pt-3 border-t border-vintage/50 flex items-center justify-between text-[11px]">
                        <span className="text-brand-muted">
                          Recommended Drink: <strong className="text-brand-charcoal dark:text-brand-gold">{rec.beverage}</strong>
                        </span>
                        <button
                          onClick={() => {
                            onClose();
                            onNavigateToMenu();
                          }}
                          className="text-brand-burgundy dark:text-brand-gold font-semibold hover:underline"
                        >
                          Find in Menu
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "planner" && (
            <div className="space-y-6">
              {!mealPlan ? (
                <div className="p-4 bg-white dark:bg-brand-charcoal rounded-lg border border-vintage space-y-4 shadow-sm">
                  <h4 className="font-display font-medium text-sm uppercase tracking-wider text-brand-burgundy dark:text-brand-gold">
                    Bespoke Feast Planner
                  </h4>
                  <p className="text-xs text-brand-muted leading-relaxed">
                    Set the scene for your gathering. Anwar will structure a perfectly sequenced set menu program of starters, mains, and desserts for your table.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider font-semibold text-brand-muted mb-1.5">Occasion</label>
                      <input
                        type="text"
                        value={occasion}
                        onChange={(e) => setOccasion(e.target.value)}
                        placeholder="e.g. Wedding Anniversary"
                        className="w-full text-xs p-2 rounded bg-brand-cream dark:bg-brand-charcoal border border-vintage focus:border-brand-gold focus:outline-none dark:text-brand-cream"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase tracking-wider font-semibold text-brand-muted mb-1.5">Group Size</label>
                      <select
                        value={groupSize}
                        onChange={(e) => setGroupSize(parseInt(e.target.value))}
                        className="w-full text-xs p-2 rounded bg-brand-cream dark:bg-brand-charcoal border border-vintage focus:border-brand-gold focus:outline-none dark:text-brand-cream"
                      >
                        <option value="2">2 Guests (Intimate)</option>
                        <option value="4">4 Guests (Social)</option>
                        <option value="6">6 Guests (Gathering)</option>
                        <option value="12">12+ Guests (Grand Feast)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase tracking-wider font-semibold text-brand-muted mb-1.5">Theme Focus</label>
                      <select
                        value={preference}
                        onChange={(e) => setPreference(e.target.value)}
                        className="w-full text-xs p-2 rounded bg-brand-cream dark:bg-brand-charcoal border border-vintage focus:border-brand-gold focus:outline-none dark:text-brand-cream"
                      >
                        <option value="Chef Choice">Maitre D' Choice</option>
                        <option value="Vegetarian Feast">Vegetarian Feast</option>
                        <option value="Seafood & Grill">Charcoal Grills Focus</option>
                      </select>
                    </div>
                  </div>

                  <button
                    onClick={handleGetMealPlan}
                    disabled={isLoading}
                    className="w-full mt-4 py-2 bg-brand-burgundy hover:bg-brand-gold text-white hover:text-brand-charcoal font-sans text-xs uppercase tracking-widest font-semibold rounded transition-colors disabled:opacity-50"
                  >
                    {isLoading ? "Designing Feast..." : "Design Bespoke Course Plan"}
                  </button>
                </div>
              ) : (
                <div className="p-5 bg-white dark:bg-brand-charcoal rounded-lg border border-vintage shadow-sm space-y-4">
                  <div className="flex justify-between items-center pb-3 border-b border-vintage">
                    <div>
                      <span className="block font-mono text-[9px] uppercase tracking-widest text-brand-gold">Bespoke Gastronomic Program</span>
                      <h4 className="font-display font-semibold text-base text-brand-burgundy dark:text-brand-gold uppercase">
                        {mealPlan.theme}
                      </h4>
                    </div>
                    <button
                      onClick={() => setMealPlan(null)}
                      className="text-xs text-brand-burgundy hover:text-brand-gold dark:text-brand-gold font-medium"
                    >
                      Reset Plan
                    </button>
                  </div>

                  <div className="space-y-4 pt-1">
                    <div>
                      <h5 className="font-mono text-[10px] uppercase tracking-wider font-bold text-brand-muted">Appetisers & Small Plates</h5>
                      <ul className="list-disc pl-4 mt-1 space-y-1.5 text-xs text-brand-charcoal dark:text-brand-cream">
                        {mealPlan.starters.map((star, sIdx) => <li key={sIdx}>{star}</li>)}
                      </ul>
                    </div>

                    <div>
                      <h5 className="font-mono text-[10px] uppercase tracking-wider font-bold text-brand-muted">Main Course Splendour</h5>
                      <ul className="list-disc pl-4 mt-1 space-y-1.5 text-xs text-brand-charcoal dark:text-brand-cream">
                        {mealPlan.mains.map((main, mIdx) => <li key={mIdx}>{main}</li>)}
                      </ul>
                    </div>

                    <div>
                      <h5 className="font-mono text-[10px] uppercase tracking-wider font-bold text-brand-muted">Bespoke Sweet Finale</h5>
                      <p className="text-xs text-brand-charcoal dark:text-brand-cream mt-1 pl-1">
                        {mealPlan.dessert}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-vintage/50">
                      <h5 className="font-mono text-[10px] uppercase tracking-wider font-bold text-brand-muted">Anwar's Service Notes</h5>
                      <p className="text-xs italic text-brand-muted mt-1 leading-relaxed pl-1">
                        {mealPlan.notes}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 flex gap-3">
                    <button
                      onClick={() => {
                        onClose();
                        onNavigateToReservations();
                      }}
                      className="flex-1 py-2 bg-brand-burgundy hover:bg-brand-gold text-white hover:text-brand-charcoal font-sans text-xs uppercase tracking-widest font-semibold rounded text-center transition-colors"
                    >
                      Book Table For This Feast
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Input Bar for Chat Mode */}
        {activeTab === "chat" && (
          <form
            onSubmit={handleSendMessage}
            className="p-4 bg-white dark:bg-brand-charcoal border-t border-vintage flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Anwar about dishes, beverages, ingredients, or hours..."
              className="flex-1 text-sm px-4 py-2 rounded bg-brand-cream dark:bg-brand-charcoal border border-vintage focus:border-brand-gold focus:outline-none dark:text-brand-cream font-sans"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="p-2 bg-brand-burgundy hover:bg-brand-gold text-white hover:text-brand-charcoal rounded transition-colors disabled:opacity-40"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
}
