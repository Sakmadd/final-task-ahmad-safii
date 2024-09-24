const query = require('../middlewares/postgresdb') 

const addHero = async (req, res) => {
  const { name, type_id, photo } = req.body
  const userId = req.user.id

  try {
    const newHero = await query(
      'INSERT INTO heroes_tb (name, type_id, photo, user_id) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, type_id, photo, userId]
    )
    res.json(newHero.rows[0])
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}

const getHero = async (req, res) => {
  const { id } = req.params

  try {
    const hero = await query('SELECT * FROM heroes_tb WHERE id = $1', [id])

    if (hero.rows.length === 0) {
      return res.status(404).json({ msg: 'Hero not found' })
    }

    res.json(hero.rows[0])
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}

const editHero = async (req, res) => {
  const { id } = req.params
  const { name, type_id, photo } = req.body

  try {
    const updatedHero = await query(
      'UPDATE heroes_tb SET name = $1, type_id = $2, photo = $3 WHERE id = $4 RETURNING *',
      [name, type_id, photo, id]
    )

    if (updatedHero.rows.length === 0) {
      return res.status(404).json({ msg: 'Hero not found' })
    }

    res.json(updatedHero.rows[0])
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

    res.json({ msg: 'Hero deleted successfully' })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}



module.exports = {
  getHero,
  addHero,
  deleteHero,
  editHero,
}