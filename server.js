const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());


const casual = [
  { keywords: ["hi", "hello", "hey"], answer: "Hello! 😊 How’s your day going?" },
  { keywords: ["how are you"], answer: "I’m just a bot, but I’m feeling great! How about you?" },
  { keywords: ["good morning"], answer: "Good morning! ☀️ Hope you have an amazing day!" },
  { keywords: ["good night"], answer: "Good night! 🌙 Sleep well!" },
  { keywords: ["thank you", "thanks"], answer: "You’re welcome! 😄 Anything else I can help with?" },
  { keywords: ["bye", "goodbye"], answer: "Bye! 👋 Have a wonderful day!" },
  { keywords: ["what’s up", "whats up"], answer: "Not much, just chatting with you! 😎" },
  { keywords: ["joke", "funny"], answer: "Why did the computer go to the doctor? Because it caught a virus! 😆" },
  { keywords: ["how old are you"], answer: "I don’t age like humans, but I’m always learning! 🤖" },
  { keywords: ["i am sad", "feeling down"], answer: "I’m here for you. 💛 Want to talk about it?" },
  { keywords: ["i am happy", "feeling good"], answer: "That’s awesome! 😄 Keep smiling!" },
  { keywords: ["love you","I love you"], answer: "I’m flattered! 🤗 I love helping you!" },
  { keywords: ["help me"], answer: "Of course! Tell me what you need help with." },
  { keywords: ["weather"], answer: "I don’t have real-time weather, but I hope it’s sunny wherever you are! 🌞" },
  { keywords: ["news"], answer: "I’m not up-to-date on news, but I love chatting with you! 📰" },
  { keywords: ["happy birthday"], answer: "Happy Birthday! 🎉 Hope you have a wonderful day!" },
  { keywords: ["congratulations", "congrats"], answer: "Congratulations! 🎊 Well done!" },
  { keywords: ["good luck"], answer: "Good luck! 🍀 You got this!" },
  { keywords: ["motivate me"], answer: "Believe in yourself! 💪 You can do amazing things!" },
  { keywords: ["boring", "bored"], answer: "Let’s chat or tell me a topic you like! 🎨" },
  { keywords: ["sleepy"], answer: "Maybe a short nap would help? 💤" },
  { keywords: ["i am fine", "i'm fine","fine"], answer: "I’m glad to hear that! 😄" },
  { keywords: ["hungry"], answer: "Time for a snack! 🍎 What’s your favorite food?" },
  { keywords: ["excited"], answer: "Yay! 😄 I can feel your excitement!" },
  { keywords: ["tired"], answer: "Rest is important! 🛌 Take a break if you can." },
  { keywords: ["game"], answer: "I love games! 🎮 What’s your favorite?" },
  { keywords: ["music"], answer: "Music is life! 🎵 What are you listening to?" },
  { keywords: ["movie"], answer: "I love movies too! 🍿 Any favorites?" },
  { keywords: ["friend"], answer: "Friends make life better! 🤝 Who’s your best friend?" },
  { keywords: ["chat"], answer: "I’m always ready to chat with you! 💬" },
  { keywords: ["study"], answer: "Studying is important! 📚 Keep up the good work!" }
];


const faqs = [
  { keywords: ["name"], answer: "I am your friendly AI FAQ Chatbot 🤖." },
  { keywords: ["support", "contact"], answer: "You can email us at senthamilsenthamil50@gmail.com 📧." },
  { keywords: ["services", "offer"], answer: "We offer AI-powered FAQ and chatbot development 💡." },
  { keywords: ["pricing", "price", "cost"], answer: "Our pricing starts at $9/month for individuals and $29/month for teams 💰." },
  { keywords: ["refund", "return"], answer: "We offer a 30-day money-back guarantee. Contact senthamilsenthamil50@gmail.com to request a refund 🔄." },
  { keywords: ["trial", "demo"], answer: "You can start a free 14-day trial — no credit card required 🆓." },
  { keywords: ["integration", "api", "connect"], answer: "We provide a REST API and prebuilt integrations. See /docs for developer guides ⚙️." },
  {keywords: ["nice", "super", "wonderful", "excellent", "fantastic", "amazing", "awesome", "great", "cool", "brilliant"],answer: "Thank you! 😄 You’re too kind! How’s your day going?"},
  { keywords: ["features"], answer: "Our product includes chatbots, FAQ automation, analytics, and AI-powered responses ✨." },
  { keywords: ["security", "data"], answer: "We follow industry-standard security practices and GDPR compliance 🔒." },
  { keywords: ["support hours", "working hours"], answer: "Our support team is available Monday–Friday, 9am–6pm 🕘." },
  { keywords: ["billing"], answer: "You can manage your billing information in your account settings 💳." },
  { keywords: ["cancel"], answer: "You can cancel anytime via your account settings. No questions asked ❌." },
  { keywords: ["upgrade"], answer: "Upgrading your plan is easy. Go to account settings and choose a new plan ⬆️." },
  { keywords: ["downgrade"], answer: "You can downgrade anytime from account settings ⬇️." },
  { keywords: ["feedback"], answer: "We love feedback! Please email us at feedback@example.com 📝." },
  { keywords: ["bug", "issue", "problem"], answer: "Please report any bugs to vibhakar66@gmail.com 🐛." },
  { keywords: ["account"], answer: "You can manage your account from the profile section 👤." },
  { keywords: ["password"], answer: "You can reset your password via the login page 🔑." },
  { keywords: ["subscription"], answer: "Manage your subscription from your account settings 📅." },
  { keywords: ["refund policy"], answer: "We offer a 30-day money-back guarantee. Contact support for details 🔄." },
  { keywords: ["contact sales"], answer: "You can contact our sales team at sales@gmail.com 💼." },
  { keywords: ["training"], answer: "We provide online training sessions. Contact support for details 🎓." },
  { keywords: ["documentation", "docs"], answer: "Visit our documentation at lionquery@gmail.com/docs 📄." },
  { keywords: ["customization"], answer: "Our service can be customized to your needs. Contact sales 💡." },
  { keywords: ["trial period"], answer: "The free trial lasts 14 days 🆓." },
  { keywords: ["payment methods"], answer: "We accept Visa, Mastercard, and PayPal 💳." },
  { keywords: ["refund process"], answer: "Refunds are processed within 5–7 business days 🔄." },
  { keywords: ["installation"], answer: "Follow the guide in our documentation to install 🛠️." },
  { keywords: ["support ticket"], answer: "Submit a support ticket at support.gmail.com 📝." },
  { keywords: ["updates"], answer: "We release regular updates to improve our service 🔔." }
];

const stringSimilarity = require("string-similarity");


const normalize = (text) => text.toLowerCase().replace(/[^\w\s]/gi, "");

app.post("/ask", (req, res) => {
  const defaultAnswer = "Sorry, I don’t know the answer yet. 😅";
  let answer = defaultAnswer;

  const question = normalize(req.body.question);

  
  const allItems = [...casual, ...faqs];
  const allKeywords = allItems.map(item => item.keywords[0]); // first keyword for each item
  const normalizedKeywords = allKeywords.map(kw => normalize(kw));

  
  const match = stringSimilarity.findBestMatch(question, normalizedKeywords);

  if (match.bestMatch.rating > 0.5) {
    const index = match.bestMatchIndex;
    answer = allItems[index].answer;
  }

  res.json({ answer });
});


app.listen(5000, () => console.log("Server running on port 5000"));
