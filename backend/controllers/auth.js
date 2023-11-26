const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient();
require("dotenv").config();


exports.postSignup = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const error = new Error("Validation failed");
        error.code = 422;
        error.data = errors.array();
        throw error;
    }

    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;

    const hashedPassward = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
        data: {
            email,
            password: hashedPassward,
            name
        }
    })

    // console.log(user);

    if (!user) {
        const error = new Error("Error while creating user");
        error.code = 500;
        throw error;
    }

    res.status(201).json({ message: "User created", userId: user.id });
}

exports.getLogin = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const error = new Error("Validation failed");
        error.code = 422;
        error.data = errors.array();
        throw error;
    }

    const email = req.body.email;
    const password = req.body.password;

    const user = await prisma.user.findUnique({
        where: {
            email: email
        }
    })

    if (!user) {
        const error = new Error("Error while fetching user");
        error.code = 401;
        throw error;
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
        const error = new Error("Password is incorrect");
        error.code = 401;
        throw error;
    }

    const token = jwt.sign({
        email,
        userId: user.id
    }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });

    res.status(200).json({ token, userId: user.id.toString() });
}