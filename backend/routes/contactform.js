const express = require("express");
const multer = require('multer');
const nodemailer = require('nodemailer');
const Emails = require('../models/contact');

const router = express.Router();

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
           user: 'william.zhou8818@gmail.com',
           pass: '@Zhouli881118'
       }
   });





const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg'
}
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const isValid = MIME_TYPE_MAP[file.mimetype];
        let error = new Error('Invalid mime type');
        if (isValid) {
            error = null;
        }
        cb(null, "backend/images");
    },
    filename: (req, file, cb) => {
        const  name = file.originalname.toLowerCase().split(' ').join('-');
        const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null, name + '-' + Date.now() + '.' + ext);
    }
});

router.post("", multer({storage: storage}).single("image"), (req, res, next) => {
    const url = req.protocol + '://' + req.get('host');

    const emails = new Emails({
        name: req.body.name,
        address: req.body.address,
        email: req.body.email,
        messages: req.body.messages,
        imagePath: url + "/images/" + req.file.filename
    });
    emails.save().then(createdReq => {
        res.status(201).json({
            message: 'Post added sucessfully',
            emails: {
                ...createdReq,
                id: createdReq._id
            }
        });
    });
    const mailOptions = {
        from: 'william.zhou8818@gmail.com', // sender address
        to: 'william.zhou8818@gmail.com', // list of receivers
        subject: 'New Request', // Subject line
        html: '<p>Name: '+emails.name+'</p><br><p>Email: '+emails.email+'</p><br><p>Address: '+emails.address+ '</p><br><p>Message: '+emails.messages+'</p><br>Embedded image: <img src="cid:unique@kreata.ee"/>',
        attachments: [{
            filename: 'image',
            path: emails.imagePath,
            cid: 'unique@kreata.ee' //same cid value as in the html img src
        }]            
      };
      transporter.sendMail(mailOptions, function (err, info) {
        if(err)
          console.log(err)
        else
          console.log(info);
     });
    
});

router.get('', (req, res, next) => {

    // res.send('HEKKKKK');
    Emails.find()
      .then( docs => {
            res.status(200).json({
                message: 'Email requiest fetched successfully',
                posts: docs
            });

      });
    
}); 

// router.put("/:id", (req, res, next) => {
//     const post = new  Post({
//         _id: req.body.id,
//         title: req.body.title,
//         content: req.body.content
//     })
//     Post.updateOne({_id: req.params.id}, post).then(result => {
//         res.status(200).json({message: "Update successful !"});
//     })
// });

// router.get("/:id", (req, res, next) => {
//     Post.findById(req.params.id).then(post => {
//         if (post) {
//             res.status(200).json(post);
//         } else {
//             res.status(404).json({message: 'Post not found!'});
//         }
//     })
// });

// router.delete("/:id", (req, res, next) => {
//     console.log(req.params.id);
//     Post.deleteOne({_id: req.params.id}).then( result => {
//         console.log(result);
//         res.status(200).json({message:'Post deleted!'});
//     })
// });


module.exports = router;