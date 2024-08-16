import Mock from 'mockjs';

interface DataList {
  date: string;
  name: string;
  address: string;
}

const generateMockData = () => {
  return Mock.mock({
    'items|100': [
      {
        date: '@date',
        name: '@name',
        address: '@county(true)',
      },
    ],
  });
};

export const mockData = generateMockData().items as DataList[];
