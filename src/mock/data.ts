import Mock from 'mockjs';

interface DataList {
  date: string;
  name: string;
  address: string;
  id: string;
}

// 用于生成简单唯一标识符（例如，UUID 或使用 Date.now() 和 Math.random()）
const generateUniqueId = () => `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

const generateMockData = () => {
  return Mock.mock({
    'items|100': [
      {
        date: '@date',
        name: '@name',
        address: '@county(true)',
        id: generateUniqueId(),
      },
    ],
  });
};

export const mockData = generateMockData().items as DataList[];
