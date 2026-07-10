import { motion } from "motion/react";
import { Award, Heart, Shield, Sparkles, BookOpen } from "lucide-react";

export default function AboutSection() {
  const timelineEvents = [
    {
      year: "1953",
      title: "The South Bombay Café",
      description: "Our grandfather opens 'The Royal Cafe' near Victoria Terminus, Bombay. It becomes a sanctuary for poets, lawyers, and commuters sharing hot chai and Keema Pau."
    },
    {
      year: "2021",
      title: "Crossing the Oceans",
      description: "Carrying the handwritten masala journals of our family, we open Spice Haven Covent Garden in London, recreating the nostalgic, warm mid-century atmosphere."
    },
    {
      year: "2023",
      title: "The Soho Parlour",
      description: "Our Wardour location opens, embracing the late-night jazz culture, botanical infused punches, and deep-cooked tandoor specialties."
    },
    {
      year: "2025",
      title: "Michelin Bib Gourmand",
      description: "Recognized for high-quality culinary craft at an approachable price. Our signature 24-hour Black Daal is designated a city masterpiece."
    }
  ];

  const coreValues = [
    {
      icon: Heart,
      title: "Absolute Hospitality",
      description: "Inspired by the Sanskrit ethos 'Atithi Devo Bhava'—the guest is indeed a divine visitor. Anwar and our hosts treat everyone like dear family."
    },
    {
      icon: Shield,
      title: "Unrivalled Integrity",
      description: "We source our lamb, chicken, and organic grains from certified ethical farms. We support local butchers and sustainable British agriculture."
    },
    {
      icon: Sparkles,
      title: "Culinary Legacy",
      description: "No powdered shortcut spices are ever tolerated in our kitchens. Every garam masala, cumin paste, and mango relish is hand-churned daily."
    }
  ];

  return (
    <div className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Intro section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
        <div>
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-brand-gold font-semibold">Our Heritage</span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl tracking-tight text-brand-charcoal dark:text-brand-cream mt-2 uppercase">
            A COAL-FIRED LOVE LETTER TO BOMBAY
          </h2>
          
          <div className="mt-6 space-y-4 text-sm text-brand-muted leading-relaxed">
            <p>
              In the mid-20th century, the South Bombay Cafés (mostly opened by Persian and Zoroastrian immigrants) were the beating heart of a magnificent metropolis. They were democratic melting pots where taxi drivers, writers, stars of the Hindi cinema, and students sat side by side, sharing tables and arguing politics over cutting chai.
            </p>
            <p>
              These cafés had a beautiful, distinctive aesthetic: towering dark wood partition screens, massive mirrors imported from Belgium, ceiling fans turning lazily, and marble tables topped with plates of bun maska and spicy skewers.
            </p>
            <p>
              <strong>Spice Haven</strong> is our passionate, original recreation of that romantic epoch. Every salvaged brass fixture, old film print, and recipe in our kitchen holds a piece of that rich history.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 mt-8 pt-6 border-t border-vintage/50">
            <div>
              <span className="font-display font-semibold text-2xl text-brand-burgundy dark:text-brand-gold">24+ HOURS</span>
              <span className="block text-[10px] uppercase font-mono tracking-wider text-brand-muted mt-1">Slow Cooked Daal</span>
            </div>
            <div>
              <span className="font-display font-semibold text-2xl text-brand-burgundy dark:text-brand-gold">100% certified</span>
              <span className="block text-[10px] uppercase font-mono tracking-wider text-brand-muted mt-1">Halal & Ethical</span>
            </div>
          </div>
        </div>

        <div className="relative">
          {/* Main frame image */}
          <div className="border border-vintage p-2 rounded-lg bg-white dark:bg-brand-charcoal shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=1000&q=80"
              alt="Plating fine Indian dining"
              className="rounded object-cover w-full h-[400px]"
              referrerPolicy="no-referrer"
            />
          </div>
          
          {/* Overlay card */}
          <div className="absolute -bottom-6 -left-6 bg-brand-burgundy text-white p-5 rounded border border-brand-gold shadow-2xl max-w-xs hidden sm:block">
            <p className="font-sans text-xs italic leading-relaxed">
              \"We do not cook for accolades; we cook to remember the heavy copper pots of our grandmother’s kitchen in Bombay.\"
            </p>
            <span className="block font-mono text-[9px] uppercase text-brand-gold font-bold mt-3 tracking-widest">— CHEF ROHAN MEHTA</span>
          </div>
        </div>
      </div>

      {/* Mission & Vision Bento */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
        <div className="p-8 bg-white dark:bg-brand-charcoal border border-vintage rounded-lg shadow-sm flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded bg-brand-gold/15 flex items-center justify-center text-brand-gold mb-5">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="font-display font-semibold text-lg text-brand-charcoal dark:text-brand-cream uppercase tracking-wide">
              OUR MISSION
            </h3>
            <p className="text-xs text-brand-muted leading-relaxed mt-3">
              To dismantle the division of premium dining by preserving and sharing the vibrant, inclusive Bombay café culture in the heart of London. We present pure tandoor culinary craft utilizing local, sustainable ingredients while serving guests with unparalleled hospitality.
            </p>
          </div>
        </div>

        <div className="p-8 bg-white dark:bg-brand-charcoal border border-vintage rounded-lg shadow-sm flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded bg-brand-gold/15 flex items-center justify-center text-brand-gold mb-5">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-display font-semibold text-lg text-brand-charcoal dark:text-brand-cream uppercase tracking-wide">
              OUR VISION
            </h3>
            <p className="text-xs text-brand-muted leading-relaxed mt-3">
              To inspire a deeper understanding of regional Indian migration cuisine, showcasing that spices are designed to bring out nuance, warmth, and depth rather than simple heat. We aim to become a carbon-conscious restaurant model of global standing.
            </p>
          </div>
        </div>
      </div>

      {/* Vertical Interactive Timeline */}
      <div className="mb-24">
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="font-mono text-xs uppercase tracking-widest text-brand-gold font-bold">Chronology</span>
          <h3 className="font-display font-bold text-2xl text-brand-charcoal dark:text-brand-cream mt-1 uppercase tracking-wide">
            OUR SACRED TIMELINE
          </h3>
        </div>

        <div className="relative border-l border-vintage/50 max-w-3xl mx-auto pl-6 sm:pl-10 space-y-12">
          {timelineEvents.map((event, idx) => (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              key={idx}
              className="relative"
            >
              {/* Year circle indicator */}
              <div className="absolute -left-12 sm:-left-[52px] top-1.5 w-6 h-6 rounded-full bg-brand-cream dark:bg-brand-charcoal border-2 border-brand-gold flex items-center justify-center z-10 shadow-sm">
                <div className="w-2 h-2 rounded-full bg-brand-burgundy dark:bg-brand-gold" />
              </div>

              <span className="font-mono text-sm font-bold text-brand-burgundy dark:text-brand-gold">
                {event.year}
              </span>
              <h4 className="font-display font-semibold text-base text-brand-charcoal dark:text-brand-cream mt-0.5 uppercase tracking-wide">
                {event.title}
              </h4>
              <p className="text-xs text-brand-muted leading-relaxed mt-2 max-w-xl">
                {event.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Core Values */}
      <div>
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="font-mono text-xs uppercase tracking-widest text-brand-gold font-bold">Foundation Pillars</span>
          <h3 className="font-display font-bold text-2xl text-brand-charcoal dark:text-brand-cream mt-1 uppercase tracking-wide">
            THE ETHICAL HAVEN
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {coreValues.map((val, idx) => {
            const Icon = val.icon;
            return (
              <div
                key={idx}
                className="p-6 bg-white dark:bg-brand-charcoal border border-vintage rounded-lg text-center shadow-sm hover:shadow-md transition-all"
              >
                <div className="w-12 h-12 rounded-full bg-brand-gold/10 text-brand-gold flex items-center justify-center mx-auto mb-4 border border-brand-gold/20">
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="font-display font-semibold text-sm text-brand-charcoal dark:text-brand-cream uppercase tracking-wider">
                  {val.title}
                </h4>
                <p className="text-xs text-brand-muted leading-relaxed mt-2.5">
                  {val.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
