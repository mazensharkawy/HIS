
import Router from 'express';
import path from 'path';
let router = Router();

router.get('/view',(req,res)=>renderPage('home',res));

const renderPage = (view, res) => {
  const page = path.join(__dirname, 'views', `${view}.html`);
  res.sendFile(page);
};


export default router;