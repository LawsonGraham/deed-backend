const express = require("express");
var bodyParser = require('body-parser')
const Project = require("../models/Project");

require("dotenv").config();

const router = express.Router();
const urlencodedParser = bodyParser.urlencoded({ extended: false })


//// Users
// B@B Users API
////

router.get("/", async function (req, res) {
  const { id, url } = req.query;

  try {
    let filter = {};
    if (id) {
      filter.id = id;
    }
    if (url) {
      filter.url = url;
    }
    
    let projects = await Project.find(filter);
    return res.status(200).json(projects);
  } catch (err) {
    console.log(err);
    return res.status(400).send(err);
  }
});

// Get all event ids a user has been to
router.get("/:url", async function (req, res) {
  const { url } = req.params;
  try {
    let project = await Project.findOne({ url: url });
    if (!project) throw new Error("No record found.");

    return res.status(200).json(project);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

router.post("/newProject", urlencodedParser, async function (req, res) {
  const { id, name, coverImage, url } = req.body;

  if (!name || !coverImage || !url) {
    return res.status(400).json({
      error: "Missing required fields",
      name: name,
      coverImage: coverImage,
      url: url,
      test: 'test'
    });
  }

  try {
    var new_project = new Project({
      id,
      name,
      coverImage,
      url,
    });
    await new_project.save();
    return res.status(200).json(new_project);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

router.post("/attendEvent", async function (req, res) {
  const { address, eventId } = req.body;

  try {
    let user = User.findOne({ address });
    if (!user) throw new Error("No user found.");

    let event = Event.findOne({ _id: eventId });
    if (!event) throw new Error("No event found.");

    var newUserEvent = new UserEvent({
      userId: user._id,
      eventId,
    });
    await newUserEvent.save();
    return res.status(200).json(newUserEvent);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

module.exports = router;
