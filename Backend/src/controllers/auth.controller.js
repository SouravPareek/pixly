const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");
const { ImageKit, toFile } = require("@imagekit/nodejs");

const imagekit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

async function registerController(req, res) {
    const { username, email, password, bio, profileImage } = req.body;

    const isUserAlreadyExists = await userModel.findOne({
        $or: [{ username }, { email }],
    });

    if (isUserAlreadyExists) {
        return res.status(409).json({
            message: "User already exists",
        });
    }

    const hash = await bcrypt.hash(password, 10);

    let imageUrl;

    if (req.file) {
        const file = await imagekit.files.upload({
            file: await toFile(Buffer.from(req.file.buffer), "profile"),
            fileName: "-profile",
            folder: "cohort-2-insta-clone-profiles",
        });

        imageUrl = file.url;
    }

    const userData = {
        username,
        email,
        password: hash,
        bio,
    };

    if (imageUrl) {
        userData.profileImage = imageUrl;
    }

    const user = await userModel.create(userData);

    const token = jsonwebtoken.sign(
        {
            id: user._id,
            username: user.username,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1d" },
    );

    res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
    });

    res.status(201).json({
        message: "User registered successfully",
        user: {
            email: user.email,
            username: user.username,
            bio: user.bio,
            profileImage: user.profileImage,
        },
        token: token,
    });
}

async function loginController(req, res) {
    const { email, username, password } = req.body;

    const user = await userModel
        .findOne({
            $or: [
                {
                    username: username,
                },
                {
                    email: email,
                },
            ],
        })
        .select("+password"); //as in schema password was marked as select:false, so we need to add password explicitly to use it for verification while logging in, if not then password will be undefined and thus an error will be returned

    if (!user) {
        return res.status(404).json({
            message: "Invalid credentials",
        });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res.status(401).json({
            message: "Invalid credentials",
        });
    }

    const token = jsonwebtoken.sign(
        {
            id: user._id,
            username: user.username,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1d" },
    );

    res.cookie("token", token);

    res.status(200).json({
        message: "User loggedIn successfully.",
        user: {
            username: user.username,
            email: user.email,
            bio: user.bio,
            profileImage: user.profileImage,
        },
    });
}

async function getMeController(req, res) {
    const userid = req.user.id;

    const user = await userModel.findById(userid);

    res.status(200).json({
        user: {
            username: user.username,
            email: user.email,
            bio: user.bio,
            profileImage: user.profileImage,
        },
    });
}

module.exports = {
    registerController,
    loginController,
    getMeController,
};
