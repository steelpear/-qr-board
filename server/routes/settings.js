const fs = require('fs')
const express = require('express')
const router = express.Router()
 
const Settings = require('../models/Settings')
 
router.get('/', async (req, res) => {
    res.json(await Settings.find())
})
 
router.put('/', async (req, res) => {
   await Settings.update(req.body)
   res.json({state: 'updated'})
})

/*router.post('/', async (req, res) => {
    const record = new Settings(req.body)
    await record.save()
    res.json({state: 'success'})
})*/
 
module.exports = router
