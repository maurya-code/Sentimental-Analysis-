/**
 * SentiAna - Main App Data & Storage
 */

const PRODUCTS = [
  {
    id: "ip1",
    name: "Apple iPhone XR",
    description: "6.1-inch Liquid Retina display, A12 Bionic chip, Face ID, and up to 25 hours of video playback. Available in six vibrant colors.",
    category: "Smartphone",
    image: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=400&q=80",
    specs: ["6.1\" Liquid Retina", "A12 Bionic Chip", "Face ID", "12MP Camera"]
  },
  {
    id: "sg10",
    name: "Samsung Galaxy S10",
    description: "6.1-inch Dynamic AMOLED display, triple rear cameras, in-display fingerprint sensor, and 4100 mAh battery.",
    category: "Smartphone",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&q=80",
    specs: ["6.1\" AMOLED", "Triple Camera", "In-display Fingerprint", "4100mAh"]
  },
  {
    id: "sg9",
    name: "Samsung Galaxy S9",
    description: "5.8-inch Super AMOLED, Snapdragon 845, variable aperture camera, and stereo speakers tuned by AKG.",
    category: "Smartphone",
    image: "https://images.unsplash.com/photo-1553179459-4514c0f52f42?w=400&q=80",
    specs: ["5.8\" Super AMOLED", "Snapdragon 845", "Variable Aperture", "AKG Speakers"]
  },
  {
    id: "dl1",
    name: "Dell Inspiron 15",
    description: "15.6-inch FHD display, 10th Gen Intel Core i7, 8GB RAM, 512GB SSD. Built for everyday productivity and entertainment.",
    category: "Laptop",
    image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400&q=80",
    specs: ["15.6\" FHD", "Intel i7 10th Gen", "8GB RAM", "512GB SSD"]
  },
  {
    id: "as1",
    name: "ASUS ZenBook 14",
    description: "Ultra-thin 14-inch laptop with AMD Ryzen 5, 16GB RAM, 512GB SSD and NumberPad touchpad.",
    category: "Laptop",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&q=80",
    specs: ["14\" FHD", "AMD Ryzen 5", "16GB RAM", "NumberPad"]
  },
  {
    id: "op1",
    name: "OnePlus 7 Pro",
    description: "6.67-inch Fluid AMOLED at 90Hz, Snapdragon 855, triple cameras, and Warp Charge 30 for all-day battery.",
    category: "Smartphone",
    image: "https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=400&q=80",
    specs: ["6.67\" 90Hz AMOLED", "Snapdragon 855", "Triple Camera", "Warp Charge 30"]
  }
];

// Seed data - sample reviews
const SEED_REVIEWS = {
  "ip1": [
    { id: "r1", author: "Arjun M.", text: "Amazing phone! The camera is absolutely incredible and battery life is fantastic.", sentiment: "positive", compound: 0.82, date: "2024-01-15" },
    { id: "r2", author: "Priya S.", text: "Love the display and the Face ID works perfectly. Best phone I've had.", sentiment: "positive", compound: 0.74, date: "2024-02-03" },
    { id: "r3", author: "Rahul K.", text: "Overpriced for the features. No fast charging is really disappointing.", sentiment: "negative", compound: -0.51, date: "2024-02-20" },
  ],
  "sg10": [
    { id: "r4", author: "Neha T.", text: "Excellent display and the in-display fingerprint is super cool. Highly recommend!", sentiment: "positive", compound: 0.77, date: "2024-01-10" },
    { id: "r5", author: "Vikram B.", text: "Good phone but the battery drains quite fast. Otherwise it's great.", sentiment: "positive", compound: 0.22, date: "2024-03-01" },
  ],
  "sg9": [
    { id: "r6", author: "Anjali R.", text: "Solid performance. The camera is good but the battery is a bit weak.", sentiment: "positive", compound: 0.18, date: "2024-01-22" },
    { id: "r7", author: "Dev P.", text: "Freezes sometimes and gets really hot. Not worth the price at all.", sentiment: "negative", compound: -0.64, date: "2024-02-14" },
  ],
  "dl1": [
    { id: "r8", author: "Sunita L.", text: "Great laptop for the price. Fast, reliable, and the display is crisp.", sentiment: "positive", compound: 0.69, date: "2024-01-30" },
    { id: "r9", author: "Manish C.", text: "The fan is really noisy and it runs hot. Disappointing build quality.", sentiment: "negative", compound: -0.55, date: "2024-03-05" },
    { id: "r10", author: "Pooja V.", text: "Perfect for my work needs. Boots up fast and keyboard is comfortable.", sentiment: "positive", compound: 0.61, date: "2024-03-12" },
  ],
  "as1": [
    { id: "r11", author: "Karan J.", text: "Incredibly slim and powerful. The NumberPad is an awesome feature!", sentiment: "positive", compound: 0.88, date: "2024-02-08" },
    { id: "r12", author: "Meera N.", text: "Beautiful design and super fast. Best laptop I've owned!", sentiment: "positive", compound: 0.79, date: "2024-03-10" },
  ],
  "op1": [
    { id: "r13", author: "Aditya S.", text: "The 90Hz display is stunning. Warp charge is absolutely incredible!", sentiment: "positive", compound: 0.85, date: "2024-01-18" },
    { id: "r14", author: "Riya M.", text: "No headphone jack is annoying and it's quite heavy. Average experience.", sentiment: "negative", compound: -0.31, date: "2024-02-25" },
  ]
};

// Storage management
const Storage = {
  REVIEWS_KEY: 'sentiana_reviews',
  USER_KEY: 'sentiana_user',

  getReviews() {
    const stored = localStorage.getItem(this.REVIEWS_KEY);
    if (!stored) {
      localStorage.setItem(this.REVIEWS_KEY, JSON.stringify(SEED_REVIEWS));
      return SEED_REVIEWS;
    }
    return JSON.parse(stored);
  },

  getReviewsForProduct(productId) {
    const all = this.getReviews();
    return all[productId] || [];
  },

  addReview(productId, review) {
    const all = this.getReviews();
    if (!all[productId]) all[productId] = [];
    all[productId].push(review);
    localStorage.setItem(this.REVIEWS_KEY, JSON.stringify(all));
  },

  getUser() {
    return localStorage.getItem(this.USER_KEY) || null;
  },

  setUser(name) {
    localStorage.setItem(this.USER_KEY, name);
  },

  logout() {
    localStorage.removeItem(this.USER_KEY);
  }
};

// Products with computed scores
function getProductsWithScores() {
  const reviews = Storage.getReviews();
  return PRODUCTS.map(p => {
    const productReviews = reviews[p.id] || [];
    const stats = window.SentimentEngine.computeProductScore(productReviews);
    return { ...p, ...stats, reviewCount: productReviews.length };
  }).sort((a, b) => b.score - a.score);
}

window.AppData = { PRODUCTS, Storage, getProductsWithScores };
