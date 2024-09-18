const URL = require("../models/url");
const shortid = require("shortid");

async function handleGetShortURL(_req, res) {
  const allEntries = await URL.find();
  return res.status(200).json(allEntries);
}

async function handleUpdateUrl(req, res) {
  const shortId = req.params.shortId;
  const urlEntry = await URL.findOneAndUpdate(
    { shortId },
    { $push: { visitHistory: { timestamp: Date.now() } } }
  );
  if (!urlEntry) {
    return res.status(404).json({ error: "URL not found" });
  }

  res.redirect(urlEntry.redirectURL)
  // res.status(200).json({ redirectURL: urlEntry.redirectURL });
}

async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId;
  const results = await URL.findOne({ shortId });
  return res.json({
    totalClicks: results.visitHistory.length,
    analystic: results.visitHistory,
  });
}

async function handleGenerateNewShortURL(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "URL is required" });

  const shortID = shortid();
  await URL.create({
    shortId: shortID,
    redirectURL: body.url,
    visitHistory: [],
  });

  return res.render('home',{
    id: shortID 
  })
  // return res.status(201).json({ id: shortID });
}

module.exports = {
  handleGenerateNewShortURL,
  handleGetShortURL,
  handleUpdateUrl,
  handleGetAnalytics,
};
