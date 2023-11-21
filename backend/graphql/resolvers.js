const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports = {
    // ----- Favorite ------
    addToFavorite: async ({ bookData }, req) => {
        if (!req.isAuth) {
            const error = new Error("Not authenticated");
            error.code = 401;
            throw error
        }

        // before adding to favorite first take a note of that book
        const book = await createBook(bookData);

        const updatedUser = await prisma.user.update({
            where: {
                id: req.userId
            },
            data: {
                favorite: {
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
    favoriteBooks: async ({},req) => {
        if (!req.isAuth) {
            const error = new Error("Not authenticated");
            error.code = 401;
            throw error
        }

        const books = await prisma.user.findUnique({
            where: {
                id: req.userId
            }
        }).favorite();

        if (!books) {
            const error = new Error("Error while fetching favorite books");
            error.code = 500;
            throw error;
        }

        return books;
    },
    // -------- ToRead --------
    // --------- HaveRead -------
    // --------- CurrentRead --------
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