const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../models");
const User = db.User;

exports.register = async (req, res) => {
    try {
        const { email, password, name } = req.body;

        let user = await User.findOne({ where: { email } });
        if (user) return res.status(400).json({ msg: "User already exists" });

        const hashedPass = await bcrypt.hash(password, 10);
        user = await User.create({ email, password: hashedPass, name });

        res.json({ msg: "User registered successfully" });
    } catch (err) {
        res.status(500).send("Server error");
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(400).json({ msg: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

        res.json({ token });
    } catch (err) {
        res.status(500).send("Server error");
    }
};
