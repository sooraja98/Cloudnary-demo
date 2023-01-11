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


router.post('/upload',async(req, res)=> {

  const file=req.files.image
  let imagePath
  await cloudinary.uploader.upload(file.tempFilePath,{folder:"Products"},(error,result)=>{
      imagePath=result.secure_url;
      public_id=result.public_id
  });

      const data= new Cloud({
        name:req.body.name,
        image:imagePath,
        cloud_id:public_id
      })
      await data.save();
      res.send('successfully')
});

module.exports = router;
