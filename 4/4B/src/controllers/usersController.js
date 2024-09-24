const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const query = require('../middlewares/postgresdb')
const salt = bcrypt.genSalt(10)

const registerPost = async (req, res) => {
  const { email, username, password } = req.body

  try {
    let user = await query('SELECT * FROM users_tb WHERE email = $1', [email])
    if (user.rows.length > 0) {
      return res.status(400).json({ msg: 'User already exists' })
    }

    const hashedPassword = await bcrypt.hash(password, salt)

    await query('INSERT INTO users_tb (email, username, password) VALUES ($1, $2, $3)', [email, username, hashedPassword])

    res.status(201).json({ msg: 'User registered successfully' })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}

const loginPost = async (req, res) => {
  const { email, password } = req.body

  try {
    let user = await query('SELECT * FROM users_tb WHERE email = $1', [email])

    if (user.rows.length === 0) {
      return res.status(400).json({ msg: 'Invalid credentials' })
    }

    const isMatch = await bcrypt.compare(password, user.rows[0].password)

    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' })
    }

    const payload = {
      user: {
        id: user.rows[0].id,
        username: user.rows[0].username,
        email: user.rows[0].email
      },
        
    }

    const secret = process.env.JWT_SECRET
    const expiresIn = 60 * 60 * 60 * 1 
    const token = jwt.sign(payload, secret, { expiresIn })

    res.json({ data : payload.user , token })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}

const registerView = (req, res) => {
  res.render('register')
}

const loginView = (req,res) => {
  res.render('login')
}

module.exports = { 
  registerView,
  loginView,
  registerPost,
  loginPost
}
