export const sortByDateCreatedDesc = (array) => {
    array.sort((a, b) => {
        return new Date(b.created_at) - new Date(a.created_at);
    });

    return array;
}

export const sortByDateCreatedAsc = (array) => {
    array.sort((a, b) => {
        return new Date(a.created_at) - new Date(b.created_at);
    });

    return array;
}

export const sortByLastViewedDesc = (array) => {
    array.sort((a, b) => {
        return new Date(b.last_viewed) - new Date(a.last_viewed);
    });

    return array;
}