const fs = require('fs')
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const morgan = require('morgan')
const path = require('path')
const app = express()

app.use(cors())

app.set('port', 3000)

app.listen(app.get('port'), () => {
  console.log(`[OK] Server is running on localhost:${app.get('port')}`)
})

fs.readFile('dbconnect.config', 'utf8', (err, data) => {
  if(err) console.log(err)
  mongoose.connect(data, { useNewUrlParser: true,  useUnifiedTopology: true }).then(
    () => { console.log('[OK] DB is connected') },
    err => { console.error(err) }
  )
})

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(morgan('dev'))
app.use('/api/records', require('./routes/records'))
app.use('/api/settings', require('./routes/settings'))
app.use('/api/login', require('./routes/login'))
app.use('/', express.static(path.join(__dirname, '../dist')))
