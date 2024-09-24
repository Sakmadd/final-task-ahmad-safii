const express = require('express')
const app = express()
require('./src/middlewares/config')(app)

const homesRoutes = require('./src/routes/homesRoutes')
const usersRoutes = require('./src/routes/usersRoutes')
const heroesRoutes = require('./src/routes/heroesRoutes')
const typesRoutes = require('./src/routes/typesRoutes')


app.use(express.json())

app.use('/', homesRoutes)
app.use('/users', usersRoutes)
app.use('/heroes', heroesRoutes)
app.use('/types', typesRoutes)

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})