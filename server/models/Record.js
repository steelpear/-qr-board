const mongoose = require('mongoose')
const { Schema } = mongoose
 
const Record = new Schema({
    qrId: String,
    qrImgSrc: String,
    qrDate: Date
})
module.exports = mongoose.model('Record', Record)
