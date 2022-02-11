//imports
const express = require('express')
const app = express()
const { ROLE, users } = require('./data')
const { authUser, authRole } = require('./basicAuth')
const projectRouter = require('./routes/projects')
const { engine } = require('express/lib/application')


//Set views
app.set('views', './views')
app.set('view engine', 'ejs')

// Static files and more

app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use(express.json())
app.use(setUser)
app.use('/projects', projectRouter)


app.get('/', (req, res) => {
  res.render('index', {text: 'This is EJS'})
})

app.get('/dashboard', authUser, (req, res) => {
  res.render('dashboard')
})

app.get('/admin', authUser, authRole(ROLE.ADMIN), (req, res) => {
  res.render('admin')
})

function setUser(req, res, next) {
  const userId = req.body.userId
  if (userId) {
    req.user = users.find(user => user.id === userId)
  }
  next()
}

app.listen(3000)