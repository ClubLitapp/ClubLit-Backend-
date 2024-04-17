import { User } from "/Users/winniebrendawaiya/ClubBackend /lib/models/usersmodel.js";
import axios from 'axios';
import dotenv from 'dotenv';
import crypto from 'crypto'

// Load environment variables from the .env file
dotenv.config();
// function to hash passwords using sha256
function hash(inputString) {
    const hash = crypto.createHash('sha256');
    hash.update(inputString);
    return hash.digest('hex');
}

export class UserController {
    async addNewUser(req, res, next) {
        try {
            console.log("user name is " + req.body.username);
    
            // Check if the user already exists in the database
            let userExists = await User.findOne({ username: req.body.username }).exec();
    
            if (userExists) {
                // If user exists, throw an error
                throw new Error('User with this username already exists');
            } else {
                const hashPassword = hash(req.body.password);
                const hashConfirmPassword = hash(req.body.confirmPassword);
                if (hashPassword != hashConfirmPassword) {
                    // If passwords don't match, throw an error
                    throw new Error('Passwords do not match');
                } else {
                    // Create and save the new user to the database if they don't exist

                    let newUser = new User({
                        username: req.body.username,
                        password: hashPassword,
                        email: req.body.email,
                        location: req.body.location,
                    });
    
                let savedUser = await newUser.save();
                res.status(201).json(savedUser);
                }
                
            }
        } catch (err){
            next(err);
        }
    }
}
    
             
const userController = new UserController();
export default userController;


