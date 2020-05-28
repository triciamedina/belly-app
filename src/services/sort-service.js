const SortService = {
    sortByDateCreated(array) {
        array.sort((a, b) => {
            return new Date(b.created_at) - new Date(a.created_at);
        });

        return array;
    },
    sortByLastViewed(array) {
        array.sort((a, b) => {
            return new Date(b.last_viewed) - new Date(a.last_viewed);
        });

        return array;
    },

};

export default SortService;