import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

// ------------------ Favorite --------------------
// https://books-tracker-api.onrender.com

export const addToFavorite = async (bookData) => {
    const graphqlQuery = {
        query: `
            mutation adddToFavorite($bookData : BookInput!) {
                addToFavorite(bookData : $bookData) 
            }
        `,
        variables: {
            bookData: bookData
        }
    }

    const reponse = await fetch("https://books-tracker-api.onrender.com/graphql", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        },
        body: JSON.stringify(graphqlQuery)
    });

    const data = await reponse.json();

    return data;
}

export const fetchFavoriteBooks = async ({ signal }) => {
    const graphqlQuery = {
        query: `
            query {
                favoriteBooks {
                    id
                    bookId
                    image
                    title
                    author
                    categories
                    language
                    pages
                    description
                    textSnippet
                    previewLink
                }
            }
        `
    }

    const response = await fetch("https://books-tracker-api.onrender.com/graphql", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        },
        body: JSON.stringify(graphqlQuery),
        signal: signal
    });

    const data = await response.json();

    return data;
}

export const removeFromFavorite = async (id) => {
    const graphqlQuery = {
        query: `
            mutation removeFromFavorite($id : ID!) {
                removeFromFavorite(id : $id)
            }
        `,
        variables: {
            id: id
        }
    }
    const response = await fetch("https://books-tracker-api.onrender.com/graphql", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        },
        body: JSON.stringify(graphqlQuery),
    });

    const data = await response.json();

    return data;
}

// ------------------ To read --------------------


export const addToToRead = async (bookData) => {
    const graphqlQuery = {
        query: `
            mutation adddToToRead($bookData : BookInput!) {
                addToToRead(bookData : $bookData) 
            }
        `,
        variables: {
            bookData: bookData
        }
    }

    const reponse = await fetch("https://books-tracker-api.onrender.com/graphql", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        },
        body: JSON.stringify(graphqlQuery)
    });

    const data = await reponse.json();

    return data;
}

export const fetchToReadBooks = async ({ signal }) => {
    const graphqlQuery = {
        query: `
            query {
                toReadBooks {
                    id
                    bookId
                    image
                    title
                    author
                    categories
                    language
                    pages
                    description
                    textSnippet
                    previewLink
                }
            }
        `
    }

    const response = await fetch("https://books-tracker-api.onrender.com/graphql", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        },
        body: JSON.stringify(graphqlQuery),
        signal: signal
    });

    const data = await response.json();

    return data;
}

export const removeFromToRead = async (id) => {
    const graphqlQuery = {
        query: `
            mutation removeFromToRead($id : ID!) {
                removeFromToRead(id : $id)
            }
        `,
        variables: {
            id: id
        }
    }
    const response = await fetch("https://books-tracker-api.onrender.com/graphql", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        },
        body: JSON.stringify(graphqlQuery),
    });

    const data = await response.json();

    return data;
}

// ------------------ Have read --------------------

export const addToHaveRead = async (bookData) => {
    const graphqlQuery = {
        query: `
            mutation adddToHaveRead($bookData : BookInput!) {
                addToHaveRead(bookData : $bookData) 
            }
        `,
        variables: {
            bookData: bookData
        }
    }

    const reponse = await fetch("https://books-tracker-api.onrender.com/graphql", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        },
        body: JSON.stringify(graphqlQuery)
    });

    const data = await reponse.json();

    return data;
}

export const fetchHaveReadBooks = async ({ signal }) => {
    const graphqlQuery = {
        query: `
            query {
                haveReadBooks {
                    id
                    bookId
                    image
                    title
                    author
                    categories
                    language
                    pages
                    description
                    textSnippet
                    previewLink
                }
            }
        `
    }

    const response = await fetch("https://books-tracker-api.onrender.com/graphql", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        },
        body: JSON.stringify(graphqlQuery),
        signal: signal
    });

    const data = await response.json();

    return data;
}

export const removeFromHaveRead = async (id) => {
    const graphqlQuery = {
        query: `
            mutation removeFromHaveRead($id : ID!) {
                removeFromHaveRead(id : $id)
            }
        `,
        variables: {
            id: id
        }
    }
    const response = await fetch("https://books-tracker-api.onrender.com/graphql", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        },
        body: JSON.stringify(graphqlQuery),
    });

    const data = await response.json();

    return data;
}

// ------------------ Current Read --------------------

export const addToCurrentRead = async (bookData) => {
    const graphqlQuery = {
        query: `
            mutation adddToCurrentRead($bookData : BookInput!) {
                addToCurrentRead(bookData : $bookData) 
            }
        `,
        variables: {
            bookData: bookData
        }
    }

    const reponse = await fetch("https://books-tracker-api.onrender.com/graphql", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        },
        body: JSON.stringify(graphqlQuery)
    });

    const data = await reponse.json();

    return data;
}

export const fetchCurrentReadBooks = async ({ signal }) => {
    const graphqlQuery = {
        query: `
            query {
                currentReadBooks {
                    id
                    bookId
                    image
                    title
                    author
                    categories
                    language
                    pages
                    description
                    textSnippet
                    previewLink
                    readPages
                }
            }
        `
    }

    const response = await fetch("https://books-tracker-api.onrender.com/graphql", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        },
        body: JSON.stringify(graphqlQuery),
        signal: signal
    });

    const data = await response.json();

    return data;
}

export const updateReadPages = async ({ id, readPages }) => {
    console.log(id, readPages);
    const graphqlQuery = {
        query: `
            mutation updateReadPages ($id : ID!,$readPages : Int!) {
                updateReadPages(id:$id,readPages:$readPages) 
            }
        `,
        variables: {
            id: id, readPages: readPages
        }
    }
    const response = await fetch("https://books-tracker-api.onrender.com/graphql", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        },
        body: JSON.stringify(graphqlQuery)
    });

    const data = await response.json();

    return data;
}

export const removeFromCurrentRead = async (id) => {
    const graphqlQuery = {
        query: `
            mutation removeFromCurrentRead($id : ID!) {
                removeFromCurrentRead(id : $id)
            }
        `,
        variables: {
            id: id
        }
    }
    const response = await fetch("https://books-tracker-api.onrender.com/graphql", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        },
        body: JSON.stringify(graphqlQuery),
    });

    const data = await response.json();

    return data;
}

// ------------------- Authentication ------------------

export const signUp = async ({ email, password, name }) => {
    const reponse = await fetch("https://books-tracker-api.onrender.com/auth/signup", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, name })
    });

    const data = await reponse.json();

    return data;
}

export const login = async ({ email, password }) => {
    const reponse = await fetch("https://books-tracker-api.onrender.com/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password })
    });

    const data = await reponse.json();

    return data;
}

// ------------------ Feedback --------------

export const sendFeedback = async ({ message, rating }) => {
    const graphqlQuery = {
        query: `
            mutation sendFeedback($feedback : FeedbackInput!) {
                createFeedback(feedbackData : $feedback)
            }
        `,
        variables: {
            feedback: {
                message: message,
                rating: rating
            }
        }
    }

    const response = await fetch("https://books-tracker-api.onrender.com/graphql", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        },
        body: JSON.stringify(graphqlQuery)
    });

    const data = await response.json();
    return data;
}

// ------------------ User --------------

export const fetchUser = async ({ signal }) => {
    const graphqlQuery = {
        query: `
            query {
                getUser {
                    id
                    profilePic
                    email
                    name
                    favoriteBooksCount
                    toReadBooksCount
                    haveReadBooksCount
                    currentReadBooksCount
                }
            }
        `
    }

    const response = await fetch("https://books-tracker-api.onrender.com/graphql", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        },
        body: JSON.stringify(graphqlQuery),
        signal: signal
    });

    const data = await response.json();
    return data;
}