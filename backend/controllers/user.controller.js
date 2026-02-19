import User from "../models/user.model.js";

const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        //basic validation
        // if (!username || !email || !password) {
        //     return res.status(400).json({ message: "All fields are required" });
        // };

        //check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "User already exists" });
        };

        //create new user
        const user = await User.create({
            username,
            email,
            password,
            loggedIn: false
        });

        // res.status(201).json({ message: "User registered successfully", user:{ id:user.id, email: user.email, username:user.username} });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const loginUser = async (req, res) => {
    try {
        
        // check if user exists
        const { email, password } = req.body;
        
        // validate inputs
        // if (!email || !password) {
        //     return res.status(400).json({ message: "Email and password are required" });
        // };

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        };

        // check password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: "Incorrect password" });
        };

        // res.status(200).json({ message: "Login successful",
        // user: { 
        //     id: user.id, 
        //     email: user.email, 
        //     username: user.username 
        // } 
    });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const logoutUser = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        };

        // res.status(200).json({ message: "Logout successful" });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export { registerUser, loginUser, logoutUser };
