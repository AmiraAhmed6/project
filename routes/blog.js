const express = require('express');
const multer = require("multer");
const path =require("path")
const authMiddleware = require('../middlewares/auth');
const {
  create, 
  getAll, 
  getById,
  editOne,
  deleteone,
  getuserBlogs,
  getblog,
  getauther,
  gettitle,
} = require('../controllers/blog');

const router = express.Router();


const storage = multer.diskStorage({
  destination: function(req, file, cb) {
      cb(null, 'Uploads');
  },

  filename: function(req, file, cb) {
      cb(null, file.originalname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

//get All Blogs
router.get('/', async (req, res, next) => {
  try {
    const blog = await getAll();
    res.json(blog);
  } catch (e) {
    next(e);
  }
});

router.use(authMiddleware);

//Search By Tag
router.get('/tags/:tag', async (req, res, next) => {
  const { params: {tag} } = req;
  try {
    console.log(tag);
    const blogs = await getblog(tag);
    res.json(blogs);
  } catch (e) {
    next(e);
  }
});
//search by auther
router.get('/auther/:auther', async (req, res, next) => {
  const { params: {auther} } = req;
  try {
    const blogs = await getauther(auther);
    res.json(blogs);
  } catch (e) {
    next(e);
  }
});
//search by title
router.get('/title/:title', async (req, res, next) => {
  const { params: {title} } = req;
  try {
    const blogs = await gettitle(title);
    res.json(blogs);
  } catch (e) {
    next(e);
  }
});
//create Blog
router.post('/',upload.single("photo"), async (req, res, next) => {
  const { body, user: { id } } = req;
  const _file =req.file.filename;
  try {
    const blog = await create({ ...body,photo:_file, auther: id });
    res.json(blog);
  } catch (e) {
    next(e);
  }
});
//get All User Blogs
router.get('/', async (req, res, next) => {
  const { user: { id } } = req;
  try {
    const blog = await getuserBlogs({ auther: id });
    res.json(blog);
  } catch (e) {
    next(e);
  }
});
//get Blog By ID
router.get('/:id', async (req, res, next) => {
  const { params: { id } } = req;
  try {
    const blog = await getById(id);
    res.json(blog);
  } catch (e) {
    next(e);
  }
});

//Update Blog
router.patch('/:id', async (req, res, next) => {
  const { params: { id }, body } = req;
  try {
    const blogs = await editOne(id, body);
    res.json(blogs);
  } catch (e) {
    next(e);
  }
});
//Delete By ID
router.delete('/:id',async (req, res, next) => {
    const { params: { id } } = req;
    try {
      const blogs = await deleteone(id);
      res.json(blogs);
    } catch (e) {
      next(e);
    }
});

module.exports = router;
