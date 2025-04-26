require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const NodeCache = require('node-cache');
const { emailQueue } = require('./jobs/emailJob');

const app = express();
const cache = new NodeCache();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

// 🔄 Middleware: Request Logger
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// Route with server-side caching
app.get('/', (req, res) => {
  const cachedTime = cache.get("time");

  if (cachedTime) {
    return res.render("home", { time: cachedTime, fromCache: true });
  }

  const timeNow = new Date().toLocaleTimeString();
  cache.set("time", timeNow, 10); // Cache for 10 seconds

  res.render("home", { time: timeNow, fromCache: false });
});

// Route to simulate background email job
app.post('/send-email', async (req, res) => {
  const { email } = req.body;
  await emailQueue.add({ email });
  res.send(`Email job added for ${email}`);
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
