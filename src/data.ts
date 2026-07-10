import { MenuItem, RestaurantLocation, GalleryImage, FAQItem } from "./types";

export const MENU_ITEMS: MenuItem[] = [
  // BEVERAGES
  {
    id: "bev-1",
    name: "Viceroy's Punch",
    tamilName: "வைசிராய் பஞ்ச்",
    description: "A legendary house punch of premium bourbon, spiced black tea, cold-pressed lime, and aromatic bitters, served over hand-carved ice.",
    price: 14.5,
    category: "beverages",
    isVegetarian: true,
    isVegan: true,
    isSpicy: false,
    isPopular: true,
    isChefRecommendation: true,
    spiceLevel: 0,
  },
  {
    id: "bev-2",
    name: "Salted Cumin Lassi",
    tamilName: "உப்பு சீரக லஸ்ஸி",
    description: "Cooling house-made yogurt churned with toasted cumin seeds, mineral Himalayan pink salt, and a dash of refreshing mint.",
    price: 6.5,
    category: "beverages",
    isVegetarian: true,
    isVegan: false,
    isSpicy: false,
    isPopular: false,
    isChefRecommendation: false,
    spiceLevel: 0,
  },
  {
    id: "bev-3",
    name: "Bollybellini",
    tamilName: "பாலிபெல்லினி",
    description: "Our signature sparkling cocktail featuring lychee purée, crushed fresh raspberries, cardamom syrup, and premium Prosecco.",
    price: 13.0,
    category: "beverages",
    isVegetarian: true,
    isVegan: true,
    isSpicy: false,
    isPopular: true,
    isChefRecommendation: false,
    spiceLevel: 0,
  },
  {
    id: "bev-4",
    name: "House Chai",
    tamilName: "ஹவுஸ் சாய்",
    description: "Slow-brewed black Assam tea with ginger, green cardamom, black pepper, and fresh milk. Served steaming hot and sweet in cutting glasses.",
    price: 4.5,
    category: "beverages",
    isVegetarian: true,
    isVegan: false,
    isSpicy: false,
    isPopular: true,
    isChefRecommendation: false,
    spiceLevel: 0,
  },

  // SMALL PLATES
  {
    id: "sp-1",
    name: "Keema Pau",
    tamilName: "கீமா பாவ்",
    description: "A classic Bombay café favorite. Highly spiced minced lamb, simmered in a rich tomato gravy, served with hot buttered soft pav buns.",
    price: 11.5,
    category: "small-plates",
    isVegetarian: false,
    isVegan: false,
    isSpicy: true,
    isPopular: true,
    isChefRecommendation: true,
    spiceLevel: 2,
  },
  {
    id: "sp-2",
    name: "Okra Fries",
    tamilName: "வெண்டைக்காய் ப்ரைஸ்",
    description: "Fine-cut ladies' fingers, dusted with cornflour and dry spices, fried crisp and seasoned with amchoor (tangy dried mango powder). Addictive.",
    price: 7.5,
    category: "small-plates",
    isVegetarian: true,
    isVegan: true,
    isSpicy: false,
    isPopular: true,
    isChefRecommendation: false,
    spiceLevel: 1,
  },
  {
    id: "sp-3",
    name: "Samosa Chaat",
    tamilName: "சமோசா சாட்",
    description: "Two crispy pastry samosas broken open and smothered in warm spiced chickpeas, sweet yogurt, tangy tamarind chutney, and fresh mint chutney.",
    price: 9.5,
    category: "small-plates",
    isVegetarian: true,
    isVegan: false,
    isSpicy: true,
    isPopular: false,
    isChefRecommendation: false,
    spiceLevel: 1,
  },

  // GRILLS
  {
    id: "gr-1",
    name: "Spicy Lamb Chops",
    tamilName: "காரமான ஆட்டுக்கறி சாப்ஸ்",
    description: "Our crowning glory. Three tender lamb chops steeped overnight in fresh ginger, crushed garlic, malt vinegar, and black cardamom, seared pink over glowing coals.",
    price: 24.5,
    category: "grills",
    isVegetarian: false,
    isVegan: false,
    isSpicy: true,
    isPopular: true,
    isChefRecommendation: true,
    spiceLevel: 3,
  },
  {
    id: "gr-2",
    name: "Murgh Malai Tikka",
    tamilName: "முர்க் மலை திக்கா",
    description: "Soft chicken fillets steeped in garlic, ginger, green chilies, coriander stems, cheese, and heavy cream. Chargrilled to tender perfection.",
    price: 16.5,
    category: "grills",
    isVegetarian: false,
    isVegan: false,
    isSpicy: false,
    isPopular: true,
    isChefRecommendation: false,
    spiceLevel: 1,
  },
  {
    id: "gr-3",
    name: "Paneer Tikka",
    tamilName: "பனீர் திக்கா",
    description: "Chunk cubes of organic cottage cheese, green bell peppers, and red onions, skewered and charred with our signature yellow tandoori spice rub.",
    price: 14.5,
    category: "grills",
    isVegetarian: true,
    isVegan: false,
    isSpicy: true,
    isPopular: false,
    isChefRecommendation: false,
    spiceLevel: 2,
  },

  // CURRIES
  {
    id: "cur-1",
    name: "House Black Daal",
    tamilName: "கருப்பு பருப்பு",
    description: "Our signature dish. Dark, rich, deeply deeply smoky, and incredibly velvety. Simmered over a gentle coal flame for over twenty-four hours.",
    price: 12.0,
    category: "curries",
    isVegetarian: true,
    isVegan: false,
    isSpicy: false,
    isPopular: true,
    isChefRecommendation: true,
    spiceLevel: 1,
  },
  {
    id: "cur-2",
    name: "Chicken Ruby",
    tamilName: "சிக்கன் ரூபி",
    description: "Tender boneless chicken seared in the tandoor, then simmered in a silky, rich makhani sauce of ripe tomatoes, butter, cashew paste, and dry fenugreek.",
    price: 17.5,
    category: "curries",
    isVegetarian: false,
    isVegan: false,
    isSpicy: false,
    isPopular: true,
    isChefRecommendation: false,
    spiceLevel: 1,
  },
  {
    id: "cur-3",
    name: "Jackfruit Biryani",
    tamilName: "பலாப்பழ பிரியாணி",
    description: "Layered premium aromatic Basmati rice, slow-cooked in a sealed clay pot with tender jackfruit chunks, caramelised onions, mint leaves, and biryani spices.",
    price: 16.0,
    category: "curries",
    isVegetarian: true,
    isVegan: true,
    isSpicy: true,
    isPopular: true,
    isChefRecommendation: true,
    spiceLevel: 2,
  },
  {
    id: "cur-4",
    name: "Nalli Nihari",
    tamilName: "நல்லி நிஹாரி",
    description: "A slow-cooked, rich shank of lamb on the bone, stewed with marrow in a velvety spiced bone gravy. Served with fresh ginger matchsticks and lime.",
    price: 22.0,
    category: "curries",
    isVegetarian: false,
    isVegan: false,
    isSpicy: true,
    isPopular: false,
    isChefRecommendation: true,
    spiceLevel: 2,
  },

  // BREADS & RICE
  {
    id: "br-1",
    name: "Garlic Naan",
    tamilName: "பூண்டு நான்",
    description: "Classic hand-stretched tandoor baked wheat bread, brushed with fresh minced garlic butter and coriander.",
    price: 4.5,
    category: "breads-rice",
    isVegetarian: true,
    isVegan: false,
    isSpicy: false,
    isPopular: true,
    isChefRecommendation: false,
    spiceLevel: 0,
  },
  {
    id: "br-2",
    name: "Steamed Basmati Rice",
    tamilName: "பாஸ்மதி சாதம்",
    description: "Aromatic, extra long-grain Basmati rice, steamed perfectly with whole cloves and black cardamom.",
    price: 4.0,
    category: "breads-rice",
    isVegetarian: true,
    isVegan: true,
    isSpicy: false,
    isPopular: false,
    isChefRecommendation: false,
    spiceLevel: 0,
  },
  {
    id: "br-3",
    name: "Cheese & Chili Naan",
    tamilName: "சீஸ் மிளகாய் நான்",
    description: "Spun wheat flatbread stuffed with cheddar cheese and green chilies, baked on tandoor walls.",
    price: 5.5,
    category: "breads-rice",
    isVegetarian: true,
    isVegan: false,
    isSpicy: true,
    isPopular: true,
    isChefRecommendation: true,
    spiceLevel: 1,
  },

  // DESSERTS
  {
    id: "des-1",
    name: "Cardamom Pistachio Kulfi",
    tamilName: "ஏலக்காய் பிஸ்தா குல்பி",
    description: "Traditional dense frozen Indian milk ice cream, infused with fragrant green cardamom pods and crushed raw pistachios.",
    price: 7.5,
    category: "desserts",
    isVegetarian: true,
    isVegan: false,
    isSpicy: false,
    isPopular: true,
    isChefRecommendation: false,
    spiceLevel: 0,
  },
  {
    id: "des-2",
    name: "Mango Shrikhand",
    tamilName: "மாம்பழ ஸ்ரீகண்ட்",
    description: "Velvety hung curd sweetened and infused with premium Alphonso mango pulp, green cardamom, and precious Persian saffron strands.",
    price: 8.0,
    category: "desserts",
    isVegetarian: true,
    isVegan: false,
    isSpicy: false,
    isPopular: false,
    isChefRecommendation: true,
    spiceLevel: 0,
  }
];

export const RESTAURANT_LOCATIONS: RestaurantLocation[] = [
  {
    id: "loc-covent",
    name: "Covent Garden",
    address: "12 Upper St. Martin's Lane",
    city: "London WC2H 9FB",
    phone: "+44 20 7420 9320",
    email: "coventgarden@spicehaven.co.uk",
    hours: {
      weekdays: "08:00 AM - 11:30 PM",
      weekends: "09:00 AM - Midnight"
    },
    directionsUrl: "https://maps.google.com/?q=Covent+Garden+London",
    description: "Our flagship café situated in the historic theatre district, boasting antique teak partitions, marble-topped dining tables, and original vintage Indian cinema posters."
  },
  {
    id: "loc-kings",
    name: "King's Cross",
    address: "5 Stable Street, Granary Square",
    city: "London N1C 4AB",
    phone: "+44 20 7420 9340",
    email: "kingscross@spicehaven.co.uk",
    hours: {
      weekdays: "08:00 AM - 11:00 PM",
      weekends: "09:00 AM - Midnight"
    },
    directionsUrl: "https://maps.google.com/?q=Granary+Square+Kings+Cross+London",
    description: "Housed in a beautiful Victorian coal-transit building, featuring an expansive outdoor terrace, custom brass bar rails, and magnificent high ceilings."
  },
  {
    id: "loc-soho",
    name: "Soho Wardour",
    address: "22 Kingly Street",
    city: "London W1B 5QP",
    phone: "+44 20 7420 9360",
    email: "soho@spicehaven.co.uk",
    hours: {
      weekdays: "08:00 AM - Midnight",
      weekends: "09:00 AM - 01:00 AM"
    },
    directionsUrl: "https://maps.google.com/?q=Kingly+Street+Soho+London",
    description: "An intimate, moody, and highly atmospheric space echoing the jazz-inflected late nights of mid-century Bombay. Dark wood paneling and warm copper glow."
  }
];

export const GALLERY_IMAGES: GalleryImage[] = [
  {
    id: "gal-1",
    src: "https://images.unsplash.com/photo-1585938338990-21f1685eaa5c?auto=format&fit=crop&w=800&h=600&q=80",
    alt: "Spice Haven Main Dining Room",
    category: "interior",
    caption: "Our Covent Garden main hall showcasing salvaged vintage Bombay mirrors, hand-crafted teak columns, and marble seating.",
    date: "Established 2021"
  },
  {
    id: "gal-2",
    src: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&h=600&q=80",
    alt: "Plating Spicy Lamb Chops",
    category: "dishes",
    caption: "Our signature Spicy Lamb Chops, chargrilled over live charcoal and garnished with fresh coriander roots.",
    date: "Signature Dish"
  },
  {
    id: "gal-3",
    src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&h=600&q=80",
    alt: "Vintage Cabin Cabinets",
    category: "interior",
    caption: "The elegant vintage bar seating at Soho, featuring a curated collection of antique bottles and brass lamps.",
    date: "Soho Wardour"
  },
  {
    id: "gal-4",
    src: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=800&h=600&q=80",
    alt: "Behind the Scenes with Chef",
    category: "behind-the-scenes",
    caption: "Executive Chef Rohan Mehta inspecting the slow-cooking Black Daal, which simmers for 24 hours.",
    date: "Kitchen Mastery"
  },
  {
    id: "gal-5",
    src: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=800&h=600&q=80",
    alt: "The Feast",
    category: "dishes",
    caption: "A sumptuous Spread including Jackfruit Biryani, Garlic Naan, House Daal, and Okra Fries.",
    date: "Sharing Feast"
  },
  {
    id: "gal-6",
    src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&h=600&q=80",
    alt: "Archival Bombay Photography",
    category: "historical",
    caption: "Framed mid-century portraiture adorning our walls, sourced directly from antique shops in South Bombay.",
    date: "Circa 1953"
  }
];

export const FAQS: FAQItem[] = [
  {
    question: "Do you accept walk-ins or are reservations mandatory?",
    answer: "We warmly welcome both! We keep a substantial portion of our dining rooms unreserved so that walk-ins can join us at any time. However, to guarantee your table, particularly on weekend evenings, we highly recommend making a reservation online.",
    category: "reservations"
  },
  {
    question: "Is your menu entirely Halal?",
    answer: "Yes, all of our chicken, lamb, and beef are strictly certified Halal and sourced from reputable, high-welfare farms. We do not use any pork products in our kitchen.",
    category: "menu"
  },
  {
    question: "What are your options for vegetarians and vegans?",
    answer: "Bombay cafe culture is rich with vegetarian choices! Over half of our menu is vegetarian, and we have many fully vegan dishes, clearly labeled with (VG). Our kitchen can also accommodate nut or gluten allergies on request.",
    category: "menu"
  },
  {
    question: "Do you host private events or large dinner parties?",
    answer: "Absolutely. We offer beautifully styled private dining areas in our Covent Garden and King's Cross locations. For parties of 12 or more, we serve bespoke sharing set menus. Please contact events@spicehaven.co.uk to organize.",
    category: "events"
  },
  {
    question: "What is your corkage policy?",
    answer: "We feature an exceptional curation of house cocktails, fine wines, and craft beers. However, should you wish to bring an exceptional bottle of your own, corkage is permitted at £30 per bottle of wine or £45 per bottle of sparkling wine.",
    category: "general"
  }
];
