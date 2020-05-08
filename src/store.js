const DATA ={
    ownedByMe: [
        {
            id: 1,
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
                    itemName: 'Sisig Burrito',
                    quantity: '1',
                    price: '8.99',
                    splitList: [
                        {
                            id: 1,
                            itemId: 1,
                            nickname: 'Sam',
                            avatarColor: 'orange',
                            shareQty: '1'
                        }
                    ]
                },
                {
                    id: 2,
                    itemName: 'Tosilog Burrito',
                    quantity: '1',
                    price: '8.99',
                    splitList: [
                        {
                            id: 2,
                            itemId: 2,
                            nickname: 'Frodo',
                            avatarColor: 'blue',
                            shareQty: '1'
                        }
                    ]
                },
                {
                    id: 3,
                    itemName: 'Sisig With Rice',
                    quantity: '1',
                    price: '8.99',
                    splitList: []
                }
            ]
        },
        {
            id: 2,
            billName: 'Lers Ros',
            billThumbnail: '🍜',
            lastViewed: 'Last viewed today at 1:25 pm',
            discounts: '0',
            tax: '1.99',
            tip: '2',
            fees: '0',
            total: '12.98',
            items: [
                {
                    id: 4,
                    itemName: 'Sisig Burrito',
                    quantity: '1',
                    price: '8.99',
                    splitList: [
                        {
                            id: 1,
                            itemId: 4,
                            nickname: 'Sam',
                            avatarColor: 'orange',
                            shareQty: '1'
                        },
                        {
                            id: 2,
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
            billName: 'The Spice Jar',
            billThumbnail: '🥘',
            lastViewed: 'Last viewed today at 1:25 pm',
            discounts: '0',
            tax: '1.99',
            tip: '2',
            fees: '0',
            total: '12.98',
            items: [
                {
                    id: 5,
                    itemName: 'Sisig Burrito',
                    quantity: '1',
                    price: '8.99',
                    splitList: [
                        {
                            id: 1,
                            itemId: 5,
                            nickname: 'Sam',
                            avatarColor: 'orange',
                            shareQty: '1'
                        },
                        {
                            id: 2,
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
                    itemName: 'Sisig Burrito',
                    quantity: '1',
                    price: '8.99',
                    splitList: [
                        {
                            id: 1,
                            itemId: 6,
                            nickname: 'Sam',
                            avatarColor: 'orange',
                            shareQty: '1'
                        },
                        {
                            id: 2,
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