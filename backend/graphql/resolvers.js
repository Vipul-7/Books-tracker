const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports = {
    // ~~~~~~~~~~~~~~~~~~~~~~Queries~~~~~~~~~~~~~~~~~~~~~~
    // ------------------ Favorite---------------------------
    Query: {
        favoriteBooks: async (parent, { }, context, info) => {
            if (!context.isAuth) {
                const error = new Error("Not authenticated");
                error.code = 401;
                throw error
            }

            const books = await prisma.user.findUnique({
                where: {
                    id: context.userId
                }
            }).favorite();

            if (!books) {
                const error = new Error("Error while fetching favorite books");
                error.code = 500;
                throw error;
            }

            return books;
        },


        // -------- ToRead ---------------------------------------

        toReadBooks: async (parent, { }, context, info) => {
            if (!context.isAuth) {
                const error = new Error("Not authenticated");
                error.code = 401;
                throw error
            }

            const books = await prisma.user.findUnique({
                where: {
                    id: context.userId
                }
            }).toRead();

            if (!books) {
                const error = new Error("Error while fetching favorite books");
                error.code = 500;
                throw error;
            }

            return books;
        },


        // --------- HaveRead ---------------------------------

        haveReadBooks: async (parent, { }, context, info) => {
            if (!context.isAuth) {
                const error = new Error("Not authenticated");
                error.code = 401;
                throw error
            }

            const books = await prisma.user.findUnique({
                where: {
                    id: context.userId
                }
            }).haveRead();

            if (!books) {
                const error = new Error("Error while fetching favorite books");
                error.code = 500;
                throw error;
            }

            return books;
        },


        // --------- CurrentRead -------------------------------------------

        currentReadBooks: async (parent, { }, context, info) => {
            if (!context.isAuth) {
                const error = new Error("Not authenticated");
                error.code = 401;
                throw error
            }

            const books = await prisma.user.findUnique({
                where: {
                    id: context.userId
                }
            }).currentRead();

            if (!books) {
                const error = new Error("Error while fetching favorite books");
                error.code = 500;
                throw error;
            }

            return books;
        },

        // ------------------ User ------------------
        getUser: async (parent, { }, context, info) => {
            if (!context.isAuth) {
                const error = new Error("Not authenticated");
                error.code = 401;
                throw error;
            }

            const user = await prisma.user.findUnique({
                where: {
                    id: parseInt(context.userId)
                }
            });

            if (!user) {
                const error = new Error("Error while fetching user");
                error.code = 500;
                throw error;
            }

            const favoriteBooks = await prisma.user.findUnique({
                where: {
                    id: parseInt(context.userId)
                }
            }).favorite();

            const toReadBooks = await prisma.user.findUnique({
                where: {
                    id: parseInt(context.userId)
                }
            }).toRead();

            const haveReadBooks = await prisma.user.findUnique({
                where: {
                    id: parseInt(context.userId)
                }
            }).haveRead();

            const currentReadBooks = await prisma.user.findUnique({
                where: {
                    id: parseInt(context.userId)
                }
            }).currentRead();

            if (favoriteBooks === null || toReadBooks === null || haveReadBooks === null || currentReadBooks === null) {
                const error = new Error("Error while fetching user");
                error.code = 500;
                throw error;
            }

            return {
                id: user.id,
                profilePic: user.profilePic,
                name: user.name,
                email: user.email,
                favoriteBooksCount: favoriteBooks.length,
                toReadBooksCount: toReadBooks.length,
                haveReadBooksCount: haveReadBooks.length,
                currentReadBooksCount: currentReadBooks.length
            }
        },
    },

    // ~~~~~~~~~~~~~~~~~~~~~~Mutations~~~~~~~~~~~~~~~~~~~
    // ------------------ Favorite---------------------------

    Mutation: {
        addToFavorite: async (parent, { bookData }, context, info) => {
            if (!context.isAuth) {
                const error = new Error("Not authenticated");
                error.code = 401;
                throw error
            }

            // before adding to favorite first take a note of that book
            const book = await createBook(bookData);

            const updatedUser = await prisma.user.update({
                where: {
                    id: context.userId
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
        removeFromFavorite: async (parent, { id }, context, info) => {
            if (!context.isAuth) {
                const error = new Error("Not authenticated");
                error.code = 401;
                throw error;
            }

            const updatedUser = await prisma.user.update({
                where: {
                    id: context.userId
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

        addToToRead: async (parent, { bookData }, context, info) => {
            if (!context.isAuth) {
                const error = new Error("Not authenticated");
                error.code = 401;
                throw error
            }

            // before adding to favorite first take a note of that book
            const book = await createBook(bookData);

            const updatedUser = await prisma.user.update({
                where: {
                    id: context.userId
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
        removeFromToRead: async (parent, { id }, context, info) => {
            if (!context.isAuth) {
                const error = new Error("Not authenticated");
                error.code = 401;
                throw error;
            }

            const updatedUser = await prisma.user.update({
                where: {
                    id: context.userId
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

        addToHaveRead: async (parent, { bookData }, context, info) => {
            if (!context.isAuth) {
                const error = new Error("Not authenticated");
                error.code = 401;
                throw error
            }

            // before adding to favorite first take a note of that book
            const book = await createBook(bookData);

            const updatedUser = await prisma.user.update({
                where: {
                    id: context.userId
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
        removeFromHaveRead: async (parent, { id }, context, info) => {
            if (!context.isAuth) {
                const error = new Error("Not authenticated");
                error.code = 401;
                throw error;
            }

            const updatedUser = await prisma.user.update({
                where: {
                    id: context.userId
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

        addToCurrentRead: async (parent, { bookData }, context, info) => {
            if (!context.isAuth) {
                const error = new Error("Not authenticated");
                error.code = 401;
                throw error
            }

            // before adding to favorite first take a note of that book
            const book = await createBook(bookData);

            const updatedUser = await prisma.user.update({
                where: {
                    id: context.userId
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
        updateReadPages: async (parent, { id, readPages }, context, info) => {
            if (!context.isAuth) {
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
        removeFromCurrentRead: async (parent, { id }, context, info) => {
            if (!context.isAuth) {
                const error = new Error("Not authenticated");
                error.code = 401;
                throw error;
            }

            const updatedUser = await prisma.user.update({
                where: {
                    id: context.userId
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
        createFeedback: async (parent, { feedbackData }, context, info) => {
            if (!context.isAuth) {
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
                            id: context.userId
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
    }
}

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
