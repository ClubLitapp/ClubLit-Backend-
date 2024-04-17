import Image from '../models/imagemodel';


const { Storage } = require('@google-cloud/storage');
const multer = require('multer');
const MulterGoogleCloudStorage = require('multer-google-storage');

const storage = new Storage({
  projectId: 'your-project-id',
  keyFilename: 'path-to-your-service-account-file.json'
});

const uploader = multer({
  storage: MulterGoogleCloudStorage.storageEngine({
    bucket: 'your-bucket-name',
    projectId: 'your-project-id',
    keyFilename: 'path-to-your-service-account-file.json',
    filename: (req, file, cb) => {
      // Custom file naming if necessary
      cb(null, `${Date.now()}-${file.originalname}`);
    }
  })
});

app.post('/upload', uploader.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  try {
    const newImage = new Image({
      userId: req.body.userId,
      clubId: req.body.clubId,
      imageUrl: req.file.path  // The URL of the file in Google Cloud Storage
    });
    await newImage.save();
    res.status(201).send(newImage);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});




app.get('/images/:clubId', async (req, res) => {
    try {
      const images = await Image.find({ clubId: req.params.clubId })
                                .sort({ createdAt: -1 })  // Sort by most recent
                                .limit(5);  // Limit to 5 images
      res.status(200).send(images);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  });
  