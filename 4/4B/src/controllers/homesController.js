const query = require('../middlewares/postgresdb')

const homeView = async (req,res) => {
  const user = req.session.users
  const heroes = await query(`
            SELECT 
                h.id AS id,
                h.name AS name,
                h.type_id,
                h.photo,
                h.user_id,
                h.description,
                t.name AS type_name
            FROM 
                heroes_tb h
            JOIN 
                type_tb t ON h.type_id = t.id;
        `)
  
  res.render('home', {user, heroes : heroes.rows})
}

module.exports = {
  homeView
}