const express = require("express");
const { PrismaClient } = require("@prisma/client");

const authController = require("../controllers/auth");
const { body } = require("express-validator");


const prisma = new PrismaClient();

const router = express.Router();

router.put("/signup", [
    body("email").isEmail().withMessage("Please enter a valid email").custom(async (value, { req }) => {
        const existedUser = await prisma.user.findUnique({
            where: {
                email: value
            }
        })

        if (existedUser) {
            return Promise.reject("Email already exists");
        }
    }).normalizeEmail(),
    body("password").trim().isLength({ min: 5 }).withMessage("Password must be at least 5 characters"),
    body("name").trim().not().isEmpty().withMessage("Name is required")
], authController.postSignup);

router.post("/login", [
    body("email").isEmail().withMessage("Please enter a valid email").custom(async (value, { req }) => {
        const existedUser = await prisma.user.findUnique({
            where: {
                email: value
            }
        })

        if (!existedUser) {
            return Promise.reject("User does not exist!");
        }
    }).normalizeEmail(),
    body("password").trim().isLength({ min: 5 }).withMessage("Password must be at least 5 characters")
], authController.getLogin)

module.exports = router;

