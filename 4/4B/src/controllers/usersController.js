const bcrypt = require('bcrypt')
const query = require('../middlewares/postgresdb')



const registerPost = async (req, res) => {


  try{
    const { username, email, password } = req.body
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(password,saltRounds)

    let userByEmail = await query('SELECT * FROM users_tb WHERE email = $1', [email])

    if (userByEmail.rows.length === 1) {
      req.flash('error', 'Sorry, this email has been registered! 😣')
      res.redirect('/users/register')
    }else{
      await query('INSERT INTO users_tb (email, username, password) VALUES ($1, $2, $3)', [email, username, hashedPassword])
      req.flash('success', 'Yeay!, you successfully registered 🙌')
      res.redirect('/users/login')
    }
  } catch (er){
    req.flash('error', 'Sorry, Somethings Wrong! 😣')
    res.redirect('/users/register')
  } 
}

const loginPost = async (req, res) => {
  const { email, password } = req.body

  try {
    let user = await query('SELECT * FROM users_tb WHERE email = $1', [email])

    if (user.rows.length === 0) {
      return res.status(400).json({ msg: 'Invalid credentials' })
    }

    bcrypt.compare(password, user.rows[0].password, (err,result) => {
      if (err) {
        req.flash('error', 'something went wrong i can feel it! 😞')
        res.redirect('/')
      } else if(result) {
        req.session.user = user.rows[0]
        req.flash('success', 'Youre successfully logged in! 🙌')
        res.redirect('/users/login')
      }else {
        req.flash('error', 'Wait!, your email or password was not right! 🤔')
        res.redirect('/users/login')
      }
    })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}

const registerView = (req, res) => {
  res.render('users', {title : 'Register'})
}

const loginView = (req,res) => {
  const user = req.session.user
  res.render('users', {user, title : 'Login'})
}

const  logout = (req,res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).send('Failed to destroy session.')
    }
    res.redirect('/users/login')
  })
}

module.exports = { 
  registerView,
  loginView,
  registerPost,
  loginPost,
  logout
}
