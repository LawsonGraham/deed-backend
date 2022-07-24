const express = require('express');
const Nft = require('../models/Nft');

require('dotenv').config();

const router = express.Router();

// Get specific event object, or many objects
router.get('/', async function (req, res) {
  const { _id } = req.query;

  try {
    let nfts = await Nft.find(_id ? { _id } : {});
    return res.status(200).json(nfts);
  } catch (err) {
    console.log(err);
    return res.status(200).json(err);
  }
});

// Get all NFTs with project url
router.get('/:url', async function (req, res) {
  const { url } = req.params;
  try {
    let nfts = await Nft.find({ projecturl: url });
    if (!nfts) throw new Error('No record found.');

    return res.status(200).json(nfts);
  } catch (err) {
    console.log(err);
    return res.status(200).json(err);
  }
});

router.post('/newEvent', async function (req, res) {
  const { startTimestamp, endTimestamp, name, type, imageUrl, qrCodeUrl } =
    req.body;

  if (
    !startTimestamp ||
    !endTimestamp ||
    !name ||
    !type ||
    !imageUrl ||
    !qrCodeUrl
  ) {
    return res.status(400).json({
      error: 'Missing required fields',
    });
  }

  try {
    let nftId = await Event.countDocuments();
    let new_event = new Event({
      startTimestamp,
      endTimestamp,
      name,
      type,
      imageUrl,
      qrCodeUrl,
      nftId,
    });
    await new_event.save();
    return res.status(200).json(new_event);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }
});

module.exports = router;
