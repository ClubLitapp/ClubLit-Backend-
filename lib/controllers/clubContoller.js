import {Club} from "/Users/winniebrendawaiya/ClubBackend /lib/models/clubmodel.js"
import dotenv from 'dotenv';

dotenv.config();

export class ClubController {
    async getCoordinatesForAddress(address) {
        const apiKey = process.env.GOOGLE_MAPS_API_KEY;  // Ensure your API key is stored in an environment variable
        const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
    
        try {
            const response = await axios.get(url);
            if (response.data.status === 'OK') {
                const { lat, lng } = response.data.results[0].geometry.location;
                return { lat, lng };
            } else {
                throw new Error('Geocoding failed: ' + response.data.status);
            }
        } catch (error) {
            throw new Error('Geocoding error: ' + error.message);
        }
    }

    async addNewClub(req, res, next) {
        try {
            console.log("Club name is " + req.body.clubname);
    
            // Check if the club already exists in the database
            const clubExists = await Club.findOne({ clubname: req.body.clubname }).exec();
    
            if (clubExists) {
                // If club exists, throw an error
                throw new Error('Club with this clubname already exists');
            } else {
                const coordinates = getCoordinatesForAddress(req.body.address);

                if (!coordinates) {
                    throw new Error('Error getting coordinates of ' + req.body.address);
                } else {
                    const newClub = new Club({
                        name: req.body.clubname,
                        imageList: [],
                        address: req.body.address,
                        location: coordinates, // Assuming location should be coordinates
                    });
    
                    const savedClub = await newClub.save();
                    res.status(201).json(savedClub);
                }
            }
        } catch (err) {
            next(err);
        }
    }
}    
             
const clubController = new ClubController();
export default clubController;






app.post('/add-club', async (req, res) => {
    const { address } = req.body;
    try {
        const location = await getCoordinatesForAddress(address);
        const newClub = new Club({
            name: req.body.name,
            location: location,
            // other properties...
        });
        await newClub.save();
        res.status(201).send(newClub);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});


function createGoogleMapsLink(lat, lng) {
    return `https://www.google.com/maps/?q=${lat},${lng}`;
}

app.post('/add-club', async (req, res) => {
    const { address } = req.body;
    try {
        const location = await getCoordinatesForAddress(address);
        const googleMapsUrl = createGoogleMapsLink(location.lat, location.lng);
        const newClub = new Club({
            name: req.body.name,
            location: location,
            googleMapsUrl: googleMapsUrl,  // Save this if you want to store it in the database
            // other properties...
        });
        await newClub.save();
        res.status(201).send(newClub);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});


async function getAverageRating(clubId) {
    const results = await Rating.aggregate([
        { $match: { clubId: mongoose.Types.ObjectId(clubId) } },
        { $group: {
            _id: null,
            averageRating: { $avg: "$rating" }
        }}
    ]);
    return results.length ? results[0].averageRating : 0; // Return 0 if no ratings exist
}

async function getMostRecentRating(clubId) {
    const result = await Rating.findOne({ clubId: mongoose.Types.ObjectId(clubId) })
        .sort({ createdAt: -1 }) // Sort by creation time descending
        .exec();
    return result ? result.rating : null; // Return the most recent rating or null if none exist
}

async function updateAverageRating(clubId, rating) {
    const averageRating = await getAverageRating(clubId);
    await Club.findByIdAndUpdate(clubId, { averageRating });
}


