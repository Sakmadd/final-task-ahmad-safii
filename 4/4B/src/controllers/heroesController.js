const query = require('../middlewares/postgresdb') 


const addHero = async (req, res) => {
  const { name, description } = req.body
  const type_id = req.body.type
  const user = req.session.user
  const photo = '../../public/image/unknown-user.jpg'

  try {
    await query(
      'INSERT INTO heroes_tb (name, type_id, photo, user_id, description) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, type_id, photo, user.id, description]
    )
    res.redirect('/')
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}

const detailHeroView = async (req, res) => {
  const { id } = req.params

  try {
    const hero = await query('SELECT * FROM heroes_tb WHERE id = $1', [id])

    if (hero.rows.length === 0) {
      return res.status(404).json({ msg: 'Hero not found' })
    }

    res.render('heroes', {hero: hero.rows[0], title : 'Detail Hero'})
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}

const editHero = async (req, res) => {
  const { id } = req.params
  const { name, description} = req.body
  const type_id = req.body.type
  const photo = '../../public/image/unknown-user.jpg'
  console.log(description)
  try {
    const updatedHero = await query(
      'UPDATE heroes_tb SET name = $1, type_id = $2, photo = $3, description = $4 WHERE id = $5 RETURNING *',
      [name, type_id, photo, description, id]
    )

    if (updatedHero.rows.length === 0) {
      return res.status(404).json({ msg: 'Hero not found' })
    }

    res.redirect('/')
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}

const deleteHero = async (req, res) => {
  const { id } = req.params

  try {
    const deletedHero = await query('DELETE FROM heroes_tb WHERE id = $1 RETURNING *', [id])

    if (deletedHero.rows.length === 0) {
      return res.status(404).json({ msg: 'Hero not found' })
    }

    res.redirect('/')
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}
const addHeroView = async (req,res) => {
  const user = req.session.user
  const types = await query('SELECT * FROM type_tb ')
  res.render('heroes', {user, types: types.rows, title : 'Add Heroes' })
}
const editHeroView = async (req,res) => {
  const { id } = req.params
  const hero = await query('SELECT * FROM heroes_tb WHERE id = $1', [id])
  const types = await query('SELECT * FROM type_tb ')
  res.render('heroes', {hero : hero.rows[0] ,title : 'Edit Heroes' , types : types.rows})
}


module.exports = {
  detailHeroView,
  addHero,
  deleteHero,
  editHero,
  addHeroView,
  editHeroView
}