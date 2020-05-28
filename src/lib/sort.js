export const sortByDateCreated = (array) => {
    array.sort((a, b) => {
        return new Date(b.created_at) - new Date(a.created_at);
    });

    return array;
}

export const sortByLastViewed = (array) => {
    array.sort((a, b) => {
        return new Date(b.last_viewed) - new Date(a.last_viewed);
    });

    return array;
}