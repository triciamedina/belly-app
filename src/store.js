const DATA ={
    ownedByMe: [
        {
            id: 1,
            date_added: '2020-01-01T23:28:56.782Z',
            billName: 'Señor Sisig',
            billThumbnail: '🌯',
            lastViewed: 'Last viewed today at 1:25 pm',
            discounts: '0',
            tax: '2.50',
            tip: '5',
            fees: '3',
            total: '37.47',
            items: [
                {
                    id: 1,
                    date_added: '2020-01-02T23:28:56.782Z',
                    itemName: 'Sisig Burrito',
                    quantity: '1',
                    price: '8.99',
                    splitList: [
                        {
                            id: 1,
                            date_added: '2020-01-02T23:28:56.782Z',
                            itemId: 1,
                            nickname: 'Sam',
                            avatarColor: 'orange',
                            shareQty: '1'
                        }
                    ]
                },
                {
                    id: 2,
                    date_added: '2020-01-03T23:28:56.782Z',
                    itemName: 'Tosilog Burrito',
                    quantity: '1',
                    price: '8.99',
                    splitList: [
                        {
                            id: 2,
                            date_added: '2020-01-03T23:28:56.782Z',
                            itemId: 2,
                            nickname: 'Frodo',
                            avatarColor: 'blue',
                            shareQty: '1'
                        }
                    ]
                },
                {
                    id: 3,
                    date_added: '2020-01-04T23:28:56.782Z',
                    itemName: 'Sisig With Rice',
                    quantity: '1',
                    price: '8.99',
                    splitList: []
                }
            ]
        },
        {
            id: 2,
            date_added: '2020-02-01T23:28:56.782Z',
            billName: 'Lers Ros',
            billThumbnail: '🍜',
            lastViewed: 'Last viewed today at 1:25 pm',
            discounts: '0',
            tax: '2.38',
            tip: '4',
            fees: '0.10',
            total: '34.38',
            items: [
                {
                    id: 4,
                    date_added: '2020-02-01T23:28:56.782Z',
                    itemName: 'Lek Tom Yum Haeng',
                    quantity: '2',
                    price: '13.95',
                    splitList: [
                        {
                            id: 1,
                            date_added: '2020-01-02T23:28:56.782Z',
                            itemId: 4,
                            nickname: 'Sam',
                            avatarColor: 'orange',
                            shareQty: '1'
                        },
                        {
                            id: 2,
                            date_added: '2020-01-03T23:28:56.782Z',
                            itemId: 4,
                            nickname: 'Frodo',
                            avatarColor: 'blue',
                            shareQty: '2'
                        }
                    ]
                }
            ]
        },
        {
            id: 3,
            date_added: '2020-03-01T23:28:56.782Z',
            billName: 'The Spice Jar',
            billThumbnail: '🥘',
            lastViewed: 'Last viewed today at 1:25 pm',
            discounts: '0',
            tax: '4.76',
            tip: '8',
            fees: '0',
            total: '82.76',
            items: [
                {
                    id: 5,
                    date_added: '2020-02-01T23:28:56.782Z',
                    itemName: 'Spiced Chicken Chopped Salad',
                    quantity: '5',
                    price: '14',
                    splitList: [
                        {
                            id: 1,
                            date_added: '2020-01-02T23:28:56.782Z',
                            itemId: 5,
                            nickname: 'Sam',
                            avatarColor: 'orange',
                            shareQty: '1'
                        },
                        {
                            id: 2,
                            date_added: '2020-01-03T23:28:56.782Z',
                            itemId: 5,
                            nickname: 'Frodo',
                            avatarColor: 'blue',
                            shareQty: '2'
                        }
                    ]
                }
            ]
        }
    ],
    sharedWithMe: [
        {
            id: 4,
            date_added: '2020-01-01T23:28:56.782Z',
            billName: 'Rooster & Rice',
            billThumbnail: '🐓',
            lastViewed: 'Last viewed today at 1:25 pm',
            discounts: '0',
            tax: '1.99',
            tip: '2',
            fees: '0',
            total: '12.98',
            items: [
                {
                    id: 6,
                    date_added: '2020-01-02T23:28:56.782Z',
                    itemName: 'Sisig Burrito',
                    quantity: '1',
                    price: '8.99',
                    splitList: [
                        {
                            id: 1,
                            itemId: 6,
                            date_added: '2020-01-02T23:28:56.782Z',
                            nickname: 'Sam',
                            avatarColor: 'orange',
                            shareQty: '1'
                        },
                        {
                            id: 2,
                            date_added: '2020-01-03T23:28:56.782Z',
                            itemId: 6,
                            nickname: 'Frodo',
                            avatarColor: 'blue',
                            shareQty: '2'
                        }
                    ]
                }
            ]
        }
    ]
}

export default DATA;