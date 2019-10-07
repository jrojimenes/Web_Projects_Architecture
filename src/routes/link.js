const express = require('express');
const router = express.Router();

const pool = require('../database');

router.get('/add', (req,res) => {
  res.render('links/addLinks');
});


router.post('/add', async (req,res) =>{

 const {title, url, description} = req.body;

 const newLink = {
    title,
    url,
    description
 };

 await pool.query('INSERT INTO links set ?', [newLink]);

  res.send('received');


});



router.get('/', async (req,res) =>{
  const links = await pool.query('SELECT * FROM links');
   console.log(links);
   res.send('listas irán aquí');
});


module.exports = router;