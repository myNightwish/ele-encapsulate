export const originMenu = [
    {
        name: '导航 1',
        icon: 'location',
        children: [
            { name: '导航 1-1', icon: 'bell' },
            { name: '导航 1-2', icon: 'location' },
        ],
    },
    {
        name: '导航 2',
        icon: 'setting',
        children: [
            { name: '导航 2-1', icon: 'edit' },
            { name: '导航 2-2', icon: 'magnet' },
        ],
    },
    {
        name: '导航 2',
        icon: 'menu',
        children: [
            { name: '导航 3-1', icon: 'calendar' },
            { name: '导航 3-2', icon: 'document' },
        ],
    },
];

export const infiniteMenu = [
    {
        name: '导航 1',
        icon: 'location',
        children: [
            { name: '导航 1-1', icon: 'magnet' },
            { name: '导航 1-2', icon: 'location' },
        ],
    },
    {
        name: '导航 2',
        icon: 'setting',
        children: [
            {
                name: '导航 2-1',
                icon: 'setting',
                children: [
                    { name: '导航 2-1-1', icon: 'postcard' },
                    { name: '导航 2-1-2', icon: 'location' },
                ],
            },
            {
                name: '导航 2-2',
                icon: 'setting',
                children: [
                    {
                        name: '导航 2-2-1',
                        icon: 'list',
                        children: [
                            { name: '导航 2-2-1-1', icon: 'bell' },
                            {
                                name: '导航 2-2-2-1',
                                icon: 'location',
                                children: [
                                    {
                                        name: '导航 2-2-2-1-1',
                                        icon: 'calendar',
                                    },
                                    {
                                        name: '导航 2-2-2-2-2',
                                        icon: 'location',
                                    },
                                ],
                            },
                        ],
                    },
                    { name: '导航 2-2-2', icon: 'location' },
                ],
            },
        ],
    },
];
