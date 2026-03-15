/**
 * SentimentEngine - JavaScript port of VADER-style sentiment analysis
 * Based on the original Python vaderSentiment used in the Django project
 */

const SENTIMENT_LEXICON = {
  // Positive words
  "amazing": 3.1, "awesome": 3.1, "excellent": 3.2, "fantastic": 3.3, "great": 3.1,
  "good": 1.9, "love": 3.2, "loved": 3.2, "perfect": 3.4, "outstanding": 3.4,
  "brilliant": 3.3, "superb": 3.1, "wonderful": 3.4, "best": 3.2, "beautiful": 3.0,
  "happy": 2.7, "pleased": 2.1, "satisfied": 2.1, "recommend": 2.0, "recommended": 2.0,
  "impressed": 2.5, "impressive": 2.5, "nice": 1.8, "fast": 1.5, "quick": 1.3,
  "reliable": 1.9, "solid": 1.7, "smooth": 1.6, "comfortable": 1.7, "easy": 1.5,
  "worth": 1.5, "exceptional": 3.3, "incredible": 3.2, "cool": 1.8, "sleek": 1.9,
  "elegant": 2.1, "premium": 1.8, "powerful": 2.0, "efficient": 1.7, "durable": 1.8,
  "value": 1.5, "affordable": 1.6, "top": 1.7, "favourite": 2.2, "favorite": 2.2,
  "joy": 2.9, "joyful": 2.9, "delighted": 2.7, "enjoy": 2.3, "enjoyed": 2.3,
  "like": 1.5, "liked": 1.5, "works": 0.9, "working": 0.9, "sturdy": 1.5,
  "responsive": 1.6, "bright": 1.4, "sharp": 1.4, "crisp": 1.4, "vibrant": 1.7,
  "stunning": 3.0, "flawless": 2.8, "seamless": 2.1, "intuitive": 2.0, "quality": 1.8,

  // Negative words
  "bad": -2.0, "terrible": -3.1, "awful": -3.0, "horrible": -3.2, "hate": -3.3,
  "hated": -3.3, "worst": -3.2, "disappointing": -2.5, "disappointed": -2.5,
  "poor": -2.1, "slow": -1.7, "broken": -2.8, "useless": -2.9, "waste": -2.7,
  "overpriced": -2.3, "expensive": -1.6, "cheap": -1.2, "flimsy": -2.0, "fragile": -1.7,
  "difficult": -1.5, "hard": -1.1, "problem": -1.8, "problems": -1.8, "issue": -1.6,
  "issues": -1.6, "defective": -2.8, "defect": -2.5, "fault": -2.0, "faulty": -2.5,
  "disappoints": -2.5, "frustrating": -2.4, "frustrated": -2.4, "annoying": -2.2,
  "ugly": -2.1, "outdated": -1.8, "unreliable": -2.4, "unstable": -2.1, "crashes": -2.7,
  "crash": -2.4, "freeze": -2.2, "freezes": -2.2, "lag": -1.9, "lags": -1.9,
  "glitch": -2.0, "glitches": -2.0, "regret": -2.6, "regretted": -2.6, "return": -1.4,
  "returned": -1.4, "refund": -1.7, "avoid": -2.2, "overheating": -2.5, "hot": -0.8,
  "noisy": -1.6, "noise": -1.0, "mediocre": -1.8, "average": -0.5, "meh": -1.2,
  "weak": -1.7, "limited": -1.3, "lacking": -1.5, "lacks": -1.5, "missing": -1.2,
  "uncomfortable": -1.8, "heavy": -0.7, "bulky": -1.0, "complicated": -1.5,
};

const NEGATIONS = ["not","no","never","neither","nor","nobody","nothing","nowhere",
  "cannot","can't","won't","don't","doesn't","didn't","hasn't","haven't","hadn't",
  "isn't","aren't","wasn't","weren't","shouldn't","wouldn't","couldn't","mightn't"];

const BOOSTERS = {
  "very": 1.3, "extremely": 1.5, "incredibly": 1.5, "absolutely": 1.4, "really": 1.2,
  "super": 1.3, "so": 1.1, "highly": 1.3, "totally": 1.2, "completely": 1.3,
  "utterly": 1.4, "deeply": 1.2, "quite": 0.9, "somewhat": 0.7, "slightly": 0.6,
  "barely": 0.4, "hardly": 0.4, "just": 0.9, "pretty": 1.0, "fairly": 0.9,
  "kind of": 0.7, "sort of": 0.7, "a bit": 0.7, "a little": 0.6,
};

function analyzeSentiment(text) {
  const words = text.toLowerCase().replace(/[^a-z\s']/g, ' ').split(/\s+/).filter(Boolean);
  let scores = [];

  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    if (SENTIMENT_LEXICON.hasOwnProperty(word)) {
      let score = SENTIMENT_LEXICON[word];

      // Check for negation in 3-word window
      const windowStart = Math.max(0, i - 3);
      const windowWords = words.slice(windowStart, i);
      const hasNegation = windowWords.some(w => NEGATIONS.includes(w));
      if (hasNegation) score *= -0.74;

      // Check for booster word before
      if (i > 0 && BOOSTERS.hasOwnProperty(words[i - 1])) {
        score *= BOOSTERS[words[i - 1]];
      }

      scores.push(score);
    }
  }

  if (scores.length === 0) return { compound: 0, label: 'neutral', emoji: '😐' };

  const sum = scores.reduce((a, b) => a + b, 0);
  const norm = sum / Math.sqrt(sum * sum + 15);
  const compound = Math.round(norm * 1000) / 1000;

  let label, emoji;
  if (compound >= 0.05) { label = 'positive'; emoji = '😊'; }
  else if (compound <= -0.05) { label = 'negative'; emoji = '😞'; }
  else { label = 'neutral'; emoji = '😐'; }

  return { compound, label, emoji };
}

// Compute overall product score from reviews
function computeProductScore(reviews) {
  if (!reviews || reviews.length === 0) return { score: 0, positive: 0, negative: 0, neutral: 0 };
  let pos = 0, neg = 0, neu = 0;
  reviews.forEach(r => {
    if (r.sentiment === 'positive') pos++;
    else if (r.sentiment === 'negative') neg++;
    else neu++;
  });
  const score = pos - neg;
  return { score, positive: pos, negative: neg, neutral: neu };
}

window.SentimentEngine = { analyzeSentiment, computeProductScore };
