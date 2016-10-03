"use strict";

let express = require('express')
let app = express()
let bodyparser = require('body-parser')
let session = require('express-session')

// Moteur de template
app.set('view engine', 'ejs')


// Middleware
app.use('/assets', express.static('public'))
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())
app.use(session({
  secret : 'piunuiuin',
  resave : false,
  saveUninitialized : true,
  cookie: {secure : false}
}))

app.use(require('./middlewares/flash'))

// Routes
app.get('/', (request, response) => {
    console.log(request.session)

    let Message = require('./models/message')
    Message.all(function(messages) {
      response.render('pages/index', {messages : messages})
    })


})

app.post('/', (request, response) => {
    console.log(request.body)

    if (request.body.message === undefined || request.body.message === '') {
      //response.render('pages/index', { error : "Vous n'avez pas entré de message"})
      //request.session.error =  "Vous n'avez pas entré de message";

      request.flash('error',"Vous n'avez pas entré de message")
      response.redirect('/')
    } else {
      let Message = require('./models/message')

      Message.create(request.body.message, function () {
        request.flash('success', "Merci !")
        response.redirect('/')
      })

    }

})

app.get('/message/:id', (request, response) => {
  console.log(request.params.id)

  let Message = require('./models/message')

  Message.find(request.params.id, function (message) {
    response.render('messages/show', {message : message})
  })


})

app.listen(8080)
