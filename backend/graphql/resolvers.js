const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports = {
    // ----- Favorite ---------------------------------

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
    favoriteBooks: async ({ }, req) => {
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
    removeFromFavorite: async ({ id }, req) => {
        if (!req.isAuth) {
            const error = new Error("Not authenticated");
            error.code = 401;
            throw error;
        }

        const updatedUser = await prisma.user.update({
            where: {
                id: req.userId
            },
            data: {
                favorite: {
                    disconnect: {
                        id: parseInt(id)
                    }
                }
            }
        });

        if (!updatedUser) {
            const error = new Error("Error while removing book from favorite");
            error.code = 500;
            throw error;
        }

        return true;
    },

    // -------- ToRead ---------------------------------------

    addToToRead: async ({ bookData }, req) => {
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
                toRead: {
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
    toReadBooks: async ({ }, req) => {
        if (!req.isAuth) {
            const error = new Error("Not authenticated");
            error.code = 401;
            throw error
        }

        const books = await prisma.user.findUnique({
            where: {
                id: req.userId
            }
        }).toRead();

        if (!books) {
            const error = new Error("Error while fetching favorite books");
            error.code = 500;
            throw error;
        }

        return books;
    },
    removeFromToRead: async ({ id }, req) => {
        if (!req.isAuth) {
            const error = new Error("Not authenticated");
            error.code = 401;
            throw error;
        }

        const updatedUser = await prisma.user.update({
            where: {
                id: req.userId
            },
            data: {
                toRead: {
                    disconnect: {
                        id: parseInt(id)
                    }
                }
            }
        });

        if (!updatedUser) {
            const error = new Error("Error while removing book from favorite");
            error.code = 500;
            throw error;
        }

        return true;
    },

    // --------- HaveRead ---------------------------------

    addToHaveRead: async ({ bookData }, req) => {
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
                haveRead: {
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
    haveReadBooks: async ({ }, req) => {
        if (!req.isAuth) {
            const error = new Error("Not authenticated");
            error.code = 401;
            throw error
        }

        const books = await prisma.user.findUnique({
            where: {
                id: req.userId
            }
        }).haveRead();

        if (!books) {
            const error = new Error("Error while fetching favorite books");
            error.code = 500;
            throw error;
        }

        return books;
    },
    removeFromHaveRead: async ({ id }, req) => {
        if (!req.isAuth) {
            const error = new Error("Not authenticated");
            error.code = 401;
            throw error;
        }

        const updatedUser = await prisma.user.update({
            where: {
                id: req.userId
            },
            data: {
                haveRead: {
                    disconnect: {
                        id: parseInt(id)
                    }
                }
            }
        });

        if (!updatedUser) {
            const error = new Error("Error while removing book from favorite");
            error.code = 500;
            throw error;
        }

        return true;
    },

    // --------- CurrentRead -------------------------------------------

    addToCurrentRead: async ({ bookData }, req) => {
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
                currentRead: {
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
    currentReadBooks: async ({ }, req) => {
        if (!req.isAuth) {
            const error = new Error("Not authenticated");
            error.code = 401;
            throw error
        }

        const books = await prisma.user.findUnique({
            where: {
                id: req.userId
            }
        }).currentRead();

        if (!books) {
            const error = new Error("Error while fetching favorite books");
            error.code = 500;
            throw error;
        }

        return books;
    },
    updateReadPages: async ({ id, readPages }, req) => {
        if (!req.isAuth) {
            const error = new Error("Not authenticated");
            error.code = 401;
            throw error
        }
        const updatedBook = await prisma.book.update({
            where: {
                id: parseInt(id)
            },
            data: {
                readPages: readPages
            }
        });

        if (!updatedBook) {
            const error = new Error("Error while updating read pages");
            error.code = 500;
            throw error;
        }

        return true;
    },
    removeFromCurrentRead: async ({ id }, req) => {
        if (!req.isAuth) {
            const error = new Error("Not authenticated");
            error.code = 401;
            throw error;
        }

        const updatedUser = await prisma.user.update({
            where: {
                id: req.userId
            },
            data: {
                currentRead: {
                    disconnect: {
                        id: parseInt(id)
                    }
                }
            }
        });

        if (!updatedUser) {
            const error = new Error("Error while removing book from favorite");
            error.code = 500;
            throw error;
        }

        return true;
    },

    // ---------------- Feedback ----------------
    createFeedback: async ({ feedbackData }, req) => {
        if (!req.isAuth) {
            const error = new Error("Not authenticated");
            error.code = 401;
            throw error;
        }

        const feedback = await prisma.feedback.create({
            data: {
                message: feedbackData.message,
                rating: feedbackData.rating,
                user: {
                    connect: {
                        id: req.userId
                    }
                }
            }
        });

        if (!feedback) {
            const error = new Error("Error while creating feedback");
            error.code = 500;
            throw error;
        }

        return true;
    },

    // ------------------ User ------------------
    getUser: async ({}, req) => {
        if (!req.isAuth) {
            const error = new Error("Not authenticated");
            error.code = 401;
            throw error;
        }

        const user = await prisma.user.findUnique({
            where: {
                id: parseInt(req.userId)
            }
        });

        if (!user) {
            const error = new Error("Error while fetching user");
            error.code = 500;
            throw error;
        }

        return {
            id: user.id,
            profilePic: user.profilePic,
            name : user.name,
            email: user.email,
            favoriteBooksCount: 2,
            toReadBooksCount: 2,
            haveReadBooksCount: 2,
            currentReadBooksCount: 2
        }
    }
};

const createBook = async (bookData) => {
    const existedBook = await prisma.book.findUnique({
        where: {
            bookId: bookData.bookId
        }
    });

    if (existedBook) {
        return existedBook;
    }

    const book = await prisma.book.create({
        data: { ...bookData, readPages: 0 }
    });

    if (!book) {
        const error = new Error("Error while creating book");
        error.code = 500;
        throw error;
    }

    return book;
}