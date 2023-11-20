const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports = {
    addToFavorite: async ({ bookData }, req) => {
        const book = await createBook(bookData);

        const updatedUser = await prisma.user.update({
            where: {
                id: req.user.id
            },
            data: {
                favorite : {
                    connect: {
                        id: book.id
                    }
                }
            }
        });

        if (!updatedUser) {
            const error = new Error("Error while adding book to favorite");
            error.code = 500;
            throw error;
        }

        return true;
    },
    favoriteBooks: () => {
        return {
            id: 1,
            title: "vip",
            author: "kl",
        };
    },
};

const createBook = async (bookData) => {
    const book = await prisma.book.create({
        data: bookData
    });

    if (!book) {
        const error = new Error("Error while creating book");
        error.code = 500;
        throw error;
    }

    return book;
}