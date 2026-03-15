# SentiAna — Product Sentiment Analysis

A portfolio web application that analyses customer reviews using **Sentiment Analysis**, 
classifying them as Positive, Negative, or Neutral and ranking products by their net sentiment score.

## 🔗 Live Demo
> Deploy to Project to get your live [Link](https://luxury-dasik-b80dc2.netlify.app)

---

## 📌 What It Does
- Browse tech products (phones, laptops) ranked by customer sentiment
- Submit your own product reviews
- Real-time sentiment analysis using a JavaScript VADER implementation
- Live sentiment tester — type anything and see the compound score instantly
- User login (name-only, stored in localStorage)
- Fully responsive design

---

## 🧠 How Sentiment Analysis Works

Uses the **VADER (Valence Aware Dictionary and Sentiment Reasoner)** algorithm:

1. Every word in the lexicon has a pre-assigned sentiment score
2. The algorithm handles **negation** ("not good" → flipped score)
3. **Booster words** amplify scores ("very amazing" → higher positive)
4. All scores are normalised to a **compound score** between -1.0 and +1.0

```
compound ≥ +0.05  →  POSITIVE 😊
compound ≤ -0.05  →  NEGATIVE 😞
otherwise         →  NEUTRAL  😐
```

The original backend was built in **Python + Django** with the `vaderSentiment` library.
This portfolio version ports the same algorithm to JavaScript for static hosting.

---

## 🛠 Tech Stack

| Layer        |    Portfolio (Static)  |
|--------------|------------------------|
| Backend      |  — (none needed)       |
| Sentiment    | Custom JS port         |
| Database     | localStorage           |
| Hosting      |Netlify        |



## 📁 File Structure

```
sentiment-netlify/
├── index.html          # Product listing page
├── product.html        # Product detail + reviews
├── css/
│   ├── style.css       # Global styles
│   └── product.css     # Product page styles
├── js/
│   ├── app.js          # Product data & localStorage management
│   └── sentiment-engine.js  # VADER algorithm in JavaScript
├── netlify.toml        # Netlify routing config
└── README.md           # This file
```

---

## 💡 Customisation Tips for Portfolio

- **Add your name**: Edit the hero section in `index.html`
- **Add products**: Extend the `PRODUCTS` array in `js/app.js`
- **Tweak sentiment**: Adjust thresholds in `js/sentiment-engine.js`
- **Change colours**: Edit CSS variables in `css/style.css` under `:root`

---

## 👤 Original Project

Built as a final year project using Python, Django, and the vaderSentiment library.


---


