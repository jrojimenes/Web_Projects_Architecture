const express = require('express');
const router = express.Router();
const {isLoggedIn} = require('../lib/auth');
const pool = require('../database');

router.get('/add', isLoggedIn ,(req,res) => {
  res.render('links/addLinks');
});

router.post('/add', isLoggedIn ,async (req,res) =>{
 const {title, url, description} = req.body;
 const newLink = {
    title,
    url,
    description,
    user_id : req.user.id
 };
 //Send info to Mysql Schema
 await pool.query('INSERT INTO links set ?', [newLink]);
  
//Send message
req.flash('success', 'link saved successfully');

 //Redirect to other view
 res.redirect('/links');

});

router.get('/', isLoggedIn, async (req,res) =>{
  const links = await pool.query('SELECT * FROM links where user_id = ?', [req.user.id]);
   //Render the view
   res.render('links/list_links', {links});
});


router.get('/delete/:id', isLoggedIn ,async (req, res) =>{

  const {id} = req.params;

  await pool.query('DELETE FROM links WHERE ID = ?', [id]);

  req.flash('success', 'link removed seccessfully');
   
  res.redirect('/links');

});


router.get('/edit/:id', isLoggedIn, async (req, res) =>{
  const {id} = req.params;

try{
  const links = await pool.query('SELECT * FROM links WHERE id = ?', [id]);

  res.render('links/edit', {link: links[0]});
} 
catch(ex){
  callback(ex);
}
});


router.post('/edit/:id', isLoggedIn, async (req,res) => {

  const {id} = req.params;
  const {title, description, url} = req.body;

  const newLink = {
    title,
    description,
    url
  };
 await pool.query('UPDATE links SET ? where id = ?', [newLink, id]);

 req.flash('success', 'link updated successfully');
 
res.redirect('/links');
});

module.exports = router;