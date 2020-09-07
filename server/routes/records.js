const express = require('express')
const router = express.Router()
 
const Record = require('../models/Record')
 
router.get('/', async (req, res) => {
    res.json(await Record.find().sort({'qrDate': -1}))
})
 
router.get('/limit/:limit/:skip', async (req, res) => {
   res.json(await Record.find().sort({'qrDate': -1}).limit(Number(req.params.limit)).skip(Number(req.params.skip)))
})

router.get('/:id', async (req, res) => {
   res.json(await Record.findById(req.params.id))
})
 
router.get('/find/:qrid', async (req, res) => {
   res.json(await Record.findOne({qrId:req.params.qrid}))
})

router.get('/random/:num', async (req, res) => {
   res.json(await Record.aggregate([{ $sample: { size: Number(req.params.num) } }]))
})

router.post('/', async (req, res) => {
    const record = new Record(req.body)
    await record.save()
    res.json({state: 'success'})
})
 
/*router.put('/:id', async (req, res) => {
   await Record.findByIdAndUpdate(req.params.id, req.body)
   res.json({state: 'updated'})
})*/
 
router.delete('/delete/:id', async (req, res) => {
   await Record.findByIdAndRemove(req.params.id)
   res.json({state: 'Запись удалена'})
})
 
module.exports = router
