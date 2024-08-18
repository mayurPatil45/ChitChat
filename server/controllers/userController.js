const User = require('../model/userModel')
const bcrypt = require('bcrypt')

const register = async (req, res, next) => {
    try {
        const { firstname, lastname, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const emailCheck = await User.findOne({ email: email });

        if (emailCheck) return res.status(400).json({ message: "Email already exists" });

        const user = await User.create({ firstname, lastname, email, password: hashedPassword });
        delete user.password;

        const avatar = user.avatar;

        const { password: _, ...userWithoutPassowrd } = user.toObject();
        res.status(201).json({ user: userWithoutPassowrd });

    } catch (error) {
        res.status(404).json({ message: error.message });
        next(error);
    }
}

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });

        if (!user) return res.status(400).json({ message: "Incorrect email" });

        const isCorrectPassword = await bcrypt.compare(password, user.password);
        if (!isCorrectPassword) return res.status(400).json({ message: 'Incorrect Password!!!' });
        delete user.password;

        const { password: _, ...userWithoutPassword } = user.toObject();
        res.status(201).json({ user: userWithoutPassword });

    } catch (error) {
        res.status(404).json({ message: error.message });
        next(error);
    }
}

const setAvatar = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { image } = req.body;
        const user = await User.findByIdAndUpdate(id, { avatar: image, isAvatar: true }, { new: true });

        if (!user) {
            return res.status(400).json({ message: 'User not found!!!' });
        }

        res.status(201).json({ avatar: user.avatar });

    } catch (error) {
        res.status(404).json({ message: error.message });
        next(error);
    }
}

const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find({ _id: { $ne: req.params.id } }).select(["email", "firstname", "lastname", "avatar", "_id"]);
        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({ message: error.message });
        next(error);
    }
}

module.exports = { register, login, setAvatar, getAllUsers }