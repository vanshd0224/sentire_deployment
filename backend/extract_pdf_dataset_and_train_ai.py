import os
import json

backend_data_dir = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\backend\data"
os.makedirs(backend_data_dir, exist_ok=True)

dataset_json_path = os.path.join(backend_data_dir, "sentire_dataset.json")

# Structured Brand System Prompt & Knowledge Base derived from PDF
sentire_knowledge = {
  "brand": "SENTIRE By PC",
  "tagline": "A Scent Beyond The Ordinary",
  "guidelines": {
    "core_rule": "Lead recommendations with one of the 11 core 50 ML signature fragrances, followed by 30 ML and 10 ML step-down formats.",
    "purple_oud_rule": "Purple Oud is 50 ML ONLY and never produced in smaller sizes.",
    "no_competitors_rule": "NO competitor or outside designer brand names may ever appear.",
    "tone": "Sophisticated, warm, luxurious, evocative, and deeply knowledgeable scent master."
  },
  "core_eleven_fragrances": [
    { "name": "White Oud", "family": "Clean Woody Oud", "share": "16.2%", "sizes": ["50 ML", "30 ML", "10 ML"], "desc": "Oud stripped back to something luminous and clean. Refined, bright, and quietly magnetic." },
    { "name": "Deep Crush", "family": "Warm Musk", "share": "10.7%", "sizes": ["50 ML", "30 ML", "10 ML"], "desc": "Soft musk wrapped in warmth, with clean freshness underneath. Reads like skin, only better." },
    { "name": "Rich", "family": "Fresh Fruity Woody", "share": "10.6%", "sizes": ["50 ML", "30 ML", "10 ML"], "desc": "Icy fruit over polished woods. Sharp and expensive-smelling without trying." },
    { "name": "Midnight", "family": "Dark Spicy Oriental", "share": "9.8%", "sizes": ["50 ML", "30 ML", "10 ML"], "desc": "Spice, smoke and a warm amber depth that turns up after dark. Built for low light and late hours." },
    { "name": "Seductive", "family": "Fresh Spicy Citrus", "share": "9.6%", "sizes": ["50 ML", "30 ML", "10 ML"], "desc": "Bright citrus sharpened with spice. Crisp on the open, warm by the end." },
    { "name": "Personna", "family": "Aquatic Woody", "share": "9.4%", "sizes": ["50 ML", "30 ML", "10 ML"], "desc": "Cool aquatic freshness over a dry woody base. Easy, clean, and unbothered." },
    { "name": "Purple Oud", "family": "Fruity Oud / Smoky Oud", "share": "8.3%", "sizes": ["50 ML ONLY"], "desc": "Deep, resinous oud lit from within by dark berries. Limited addition to the house." },
    { "name": "Mirai", "family": "Sweet Gourmand", "share": "7.3%", "sizes": ["50 ML", "30 ML", "10 ML"], "desc": "Dark coffee and vanilla folded into something addictive. Warm, sweet, and lingers for days." },
    { "name": "Calantha", "family": "Fruity Floral Gourmand", "share": "7.0%", "sizes": ["50 ML", "30 ML", "10 ML"], "desc": "Juicy fruit and florals over a soft vanilla finish. Playful, glowing, and effortlessly likeable." },
    { "name": "O809", "family": "Fresh Aromatic Spice", "share": "6.8%", "sizes": ["50 ML", "30 ML", "10 ML"], "desc": "Assertive fresh-spicy signature with an ambered backbone. Unmistakably masculine and dependable." },
    { "name": "Herrlich", "family": "Sweet Floral", "share": "4.3%", "sizes": ["50 ML", "30 ML", "10 ML"], "desc": "Lush white-floral bouquet with a soft sweetness through it. Romantic in the classic sense." }
  ],
  "secondary_fragrances_10_30ml": [
    "PC Leather (Smooth leather with smoky edge)",
    "Zephyrine (Bold sweet-spicy burst)",
    "Vanaco (Warm vanilla curled around tobacco)",
    "Le Chocolat (Pure, unapologetic chocolate)",
    "Quantillion (Bright fruit over smoky woody base)",
    "Woo-dy (Creamy sandalwood, calm & grounded)",
    "Dapper (Rich oriental in traditional style)",
    "Reiz (Composed, elegant floral)",
    "Sent-Aura (Soft, luminous, easy to wear)",
    "Bijou (Bright, jewel-like floral)"
  ],
  "sample_dataset_qa": [
    {
      "q": "best perfume to gift a best friend",
      "rec": "Deep Crush",
      "ans": "For that, I'd put Deep Crush in your hand. It's soft musk wrapped in warmth, with a clean freshness underneath. Reads like skin, only better — intimate and quietly magnetic. Gifting is about safety and delight in equal measure. Start wherever suits you: the 50 ML is the full signature bottle, the 30 ML is the easy way to live with it a while, and the 10 ML slips into a bag or pocket for the first try. If you'd like to compare, Calantha or O809 sits close by."
    },
    {
      "q": "best perfume to gift a female friend",
      "rec": "Calantha",
      "ans": "Calantha is the one. It's juicy fruit and florals over a soft vanilla finish. Playful, glowing and effortlessly likeable. It's an easy scent to receive. Start wherever suits you: the 50 ML is the full signature bottle, the 30 ML is the easy way to live with it a while, and the 10 ML slips into a bag or pocket for the first try. If you'd like to compare, Herrlich or Seductive sits close by."
    },
    {
      "q": "best perfume to gift a mom / mother",
      "rec": "Calantha or Mirai",
      "ans": "I'd reach straight for Calantha or Mirai. Mirai features dark coffee and vanilla folded into something addictive—warm, sweet and lingering on fabric for days. Start wherever suits you: the 50 ML is the full signature bottle, the 30 ML is the easy way to live with it a while, and the 10 ML slips into a bag or pocket for the first try."
    },
    {
      "q": "best perfume for delhi winter / cold weather",
      "rec": "Purple Oud or Midnight",
      "ans": "Go with Purple Oud or Midnight. Purple Oud is a deep, resinous oud lit from within by dark berries. Cold weather is the one time you can wear something heavy without it overwhelming a room. Purple Oud is made in 50 ML only — a limited addition to the house."
    },
    {
      "q": "best perfume for humid weather / monsoon",
      "rec": "Rich or O809",
      "ans": "Go with Rich or O809. Rich brings icy fruit over polished woods — sharp and expensive-smelling without trying. Humidity does half the projecting for you, so keep the composition light and let the air carry it. Available in 50 ML, 30 ML, and 10 ML."
    },
    {
      "q": "best perfume for date night / romance",
      "rec": "Midnight or Seductive",
      "ans": "Midnight is built for low light and late hours — spice, smoke, and a warm amber depth that turns up after dark. Date nights reward warmth over freshness. Start with the 50 ML signature bottle, 30 ML, or 10 ML."
    },
    {
      "q": "best perfume for office / daily wear",
      "rec": "White Oud or Personna",
      "ans": "This is White Oud or Personna territory. White Oud is clean, luminous oud stripped back and refined — interesting enough that it isn't forgettable while keeping distance politely in shared spaces. Available in 50 ML, 30 ML, and 10 ML."
    }
  ]
}

with open(dataset_json_path, 'w', encoding='utf-8') as f:
    json.dump(sentire_knowledge, f, indent=2)

print("SUCCESS: Created sentire_dataset.json knowledge base in backend/data/")
