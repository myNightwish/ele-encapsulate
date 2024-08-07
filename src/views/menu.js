export const originMenu = [
  {
    name: '导航 1',
    icon: 'location',
    children: [
      { name: '导航 1-1', icon: 'location', },
      { name: '导航 1-2', icon: 'location', }
    ]
  },
  {
    name: '导航 2',
    icon: 'setting',
    children: [
      { name: '导航 2-1', icon: 'setting' },
      { name: '导航 2-2', icon: 'setting' }
    ]
  },
  {
    name: '导航 2',
    icon: 'document',
    children: [
      { name: '导航 3-1',  icon: 'document', },
      { name: '导航 3-2',  icon: 'document', }
    ]
  }
]

export const infiniteMenu = [
  {
    name: '导航 1',
    icon: 'location',
    children: [
      { name: '导航 1-1', icon: 'location', },
      { name: '导航 1-2', icon: 'location', }
    ]
  },
  {
    name: '导航 2',
    icon: 'setting',
    children: [
      { 
        name: '导航 2-1',
        icon: 'setting',
        children: [
          { name: '导航 2-1-1', icon: 'location', },
          { name: '导航 2-1-2', icon: 'location', }
        ]
      },
      { 
        name: '导航 2-2',
        icon: 'setting',
        children: [{
            name: '导航 2-2-1',
            icon: 'location',
            children: [
              { name: '导航 2-2-1-1', icon: 'location', },
              { name: '导航 2-2-2-1', icon: 'location',
                children: [
                  { name: '导航 2-2-2-1-1', icon: 'location', },
                  { name: '导航 2-2-2-2-2', icon: 'location', }
                ]
              }
          ]},
          { name: '导航 2-2-2', icon: 'location'}
        ]
      }
    ]
  }
]