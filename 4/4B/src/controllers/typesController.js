const query = require('../middlewares/postgresdb') 

const addType = async (req, res) => {
  const { name } = req.body
  
  try {
    const newType = await query('INSERT INTO type_tb (name) VALUES ($1) RETURNING *', [name])
    res.json(newType.rows[0])
  } catch (err) {
    console.log(err)
  } 
}

const editType = async (req, res) => {
  const { id } = req.params
  const { name } = req.body

  try {
    const updatedType = await query(
      'UPDATE type_tb SET name = $1 WHERE id = $2 RETURNING *',
      [name, id]
    )

    if (updatedType.rows.length === 0) {
      return res.status(404).json({ msg: 'Type not found' })
    }

    res.json(updatedType.rows[0])
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}

const deleteType = async (req, res) => {
  const { id } = req.params

  try {
    const deletedType = await query('DELETE FROM type_tb WHERE id = $1 RETURNING *', [id])

    if (deletedType.rows.length === 0) {
      return res.status(404).json({ msg: 'Type not found' })
    }

    res.json({ msg: 'Type deleted successfully' })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}

module.exports = {
  addType,
  editType,
  deleteType
}