import bodyParser from 'body-parser';
import express from 'express';
import helmet from 'helmet';
import xss from 'xss-clean';
import tokenMiddleWare from './middlewares/token';
import tokens from './routes/tokens';
import user from './routes/user';




global.dev_ENV = process.env.NODE_ENV !== 'production'

var app = express()

// app.use(
//   express.static(path.join(__dirname, '../client/build'), { index: false })
// )
app.use(xss())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(helmet())

app.use(tokenMiddleWare)

app.use('/tokens', tokens)
app.use('/user', user)


// app.get('/*', function (req, res) {
//   res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
// });

// 404 handling
// =============================================================================
app.use(function (req, res, next) {
  res.status(404).send({ error: 'not found' })
})

// Error handling
// =============================================================================
app.use(function (err, _req, res, _next) {
  if (err.name === 'UnauthorizedError') {
    res.send({ error: 'invalid token...' })
  } else {
    if (err.status) res.status(err.status)
    else res.status(err.error.code)

    if (!err.error || !err.error.code) {
      return res.send('something bad happened')
    }
    res.send({ error: err.error })
  }
})
var dev_ENV = process.env.NODE_ENV !== 'production'
var listener = app.listen(
  dev_ENV ? 3001 : process.env.PORT || 3001,
  function () {
    console.log(
      (dev_ENV ? 'Dev' : 'Prod') +
      'Mode Listening on port ' +
      listener.address().port
    ) //Listening on port 8888
  }
)
