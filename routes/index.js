// var express = require('express');
// var router = express.Router();
// const upload =require('./multer')

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });


// router.post('/upload',upload.single('image'),(req, res)=> {
//     console.log(req.file)
// });

// module.exports = router;



var express = require('express');
var router = express.Router();
const upload=require('./multer')
const {cloudinary}= require('./cloudnary')
const Cloud= require('./schema')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.post('/upload',upload.single('image'),async(req, res)=> {

  const result = await cloudinary.uploader.upload(req.file.path);

      const data= new Cloud({
        name:req.body.name,
        image:result.secure_url,
        cloud_id:result.public_id
      })
      await data.save();
      res.send('successfully')

    console.log(result)
});

module.exports = router;
