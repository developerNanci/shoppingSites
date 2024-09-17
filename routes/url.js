const express = require('express')
const { handleGenerateNewShortURL, handleGetShortURL , handleUpdateUrl, handleGetAnalytics} = require('../controller/url')
const router = express.Router()

router.post('/', handleGenerateNewShortURL)
router.get('/', handleGetShortURL)
router.get('/:shortId', handleUpdateUrl)
router.get('/analytics/:shortId', handleGetAnalytics)

module.exports = router