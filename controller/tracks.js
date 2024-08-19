const Track = require('../models/track')
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')


//CREATE POST ROUTE
router.post('/', async (req, res) => {
  try {
    const newTrack = await Track.create(req.body)
    res.status(201).json(newTrack)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

//GET INDEX ROUTE
router.get('/', async (req, res) => {
  try {
    const allTracks = await Track.find()
    res.status(200).json(allTracks)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

//GET SHOW ROUTE
router.get('/:trackId', async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.trackId)) {
      res.status(404)
      throw new Error('Track cannot be found')
    }
    const track = await Track.findById(req.params.trackId)
    res.status(200).json(track)

  } catch (error) {
    if (res.statusCode === 404) {
      res.json({ error: error.message })
    } else {
      res.status(500).json({ error: error.message })
    }
  }
})

//PUT UPDATE TRACK ROUTE
router.put('/:trackId', async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.trackId)) {
      res.status(404)
      throw new Error('Track cannot be found')
    }

    const updateTrack = await Track.findByIdAndUpdate(req.params.trackId, req.body, {
      new: true,
    })

    if (!updateTrack) {
      res.status(404)
      throw new Error('Track cannot be found')
    }

    res.status(200).json(updateTrack)
  } catch (error) {
    if (res.statusCode === 404) {
      res.json({ error: error.message })
    } else {
      res.status(500)
      res.json({ error: error.message })
    }
  }
})

//DELETE ROUTE
router.delete('/:trackId', async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.trackId)) {
      res.status(404)
      throw new Error('Track cannot be found')
    }

    const deleteTrack = await Track.findByIdAndDelete(req.params.trackId)
    
    if(!deleteTrack) {
      res.status(404)
      throw new Error('Track cannot be found')
    }
    res.status(200).json(deleteTrack)

  } catch (error) {
    if (res.statusCode === 404) {
      res.json({ error: error.message })
    } else {
      res.status(500)
      res.json({ error: error.message })
    }
  }
})


module.exports = router