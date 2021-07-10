const router = require('express').Router();
const cloudinary = require('cloudinary');
const fs = require('fs');

//we will upload image an on cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

router.post('/upload', (req, res) =>{
    try {
    
          console.log(req.files);
          if(!req.files || Object.keys(req.files).length === 0)
             return res.status(400).send('No files were uploaded');

           const file = req.files.file;
           if(file.size > 1024*1024) {
               removeTmp(file.tempFilePath);
               return res.status(400).json({msg: "Size too large"});
           } 

           if(file.mimetype !== 'image/jpg' && file.mimetype !== 'image/png' && file.mimetype !== 'image/jpeg'){
                removeTmp(file.tempFilePath);
                return res.status(400).json({msg: 'file formate is incorrect'});
           }

           cloudinary.v2.uploader.upload(file.tempFilePath, {folder: "test1"}, async(err, result)=>{
                if(err) throw err;
                removeTmp(file.tempFilePath)
                //After upload will have file tmp
                res.json({public_id: result.public_id, url: result.secure_url});
                //res.json({result});
            })
           
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
});

// Delete image 
router.post('/destroy', (req, res) =>{
    try {
        const {public_id} = req.body;
        if(!public_id) return res.status(400).json({msg: 'No images Selected'})

        cloudinary.v2.uploader.destroy(public_id, async(err, result) =>{
            if(err) throw err;
            res.json({msg: "Deleted Image"})
        })

    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
    
})

const removeTmp = (path) =>{
    fs.unlink(path, err=>{
        if(err) throw err;
    });
}

module.exports = router;