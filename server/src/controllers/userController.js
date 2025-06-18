const UserModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const { hashPassword, comparePasswords } = require('../utils/hashUtil');
const dotenv = require("dotenv");

// loading data from .env
dotenv.config();

class UserController {
    static async signUp(req, res) {
        try {
            const {full_name, birth_date, email, psswd } = req.body;

            if ( !full_name || !birth_date || !email || !psswd) {
                return res.status(400).json({ message: "All feilds are required !"});
            }

            const user = await UserModel.getUser(email);
            if(user) return res.status(400).json({ message: "This email adress already exists" });

            const hashedPassword = await hashPassword(psswd);
            const result = await UserModel.insertUser(full_name, birth_date, email, hashedPassword);

            if (result.success) {
                return res.status(201).json({ message: "User Created Successfully !", userId: result.insertId});
            } else {
                return res.status(500).json({ message: "Error While inserting user !", error: result.error});
            }

        } catch (error) {
            res.status(500).json({ error: "Internal Server Error", details: error.message });
        }
    }

    static async login(req, res) {
        try {
            const { email, psswd } = req.body;
            
            if (!email || !psswd) return res.status(400).json({ message: 'Email and Password are required !' });
        
            const user = await UserModel.getUser(email);
            if (!user) return res.status(401).json({ message: 'User not found !' });

            const valid = await comparePasswords(psswd, user.psswd);
            if (!valid) return res.status(401).json({ message: 'Email or Password is incorrect !' });

            const token = jwt.sign(
                {userId: user.id_user, email: user.email },
                process.env.SECRET_KEY,
                { expiresIn: '1h' }
            )

            res.status(200).json({ message: 'Connected Successfully !', token });


        } catch (error) {
            res.status(500).json({ error: "Internal Server Error", details: error.message });
        }
        
    }
}

module.exports = UserController;