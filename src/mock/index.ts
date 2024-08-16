// src/mock/index.ts
import Mock from 'mockjs';
import { mockData } from './data';

Mock.setup({
  timeout: '200-400', // 模拟请求延迟
});

Mock.mock(/\/api\/data\/list/, 'get', (options: any) => {
  const url = new URL(options.url, window.location.origin);
  const page = Number(url.searchParams.get('page')) || 1;
  const pageSize = Number(url.searchParams.get('pageSize')) || 10;

  const start = (page - 1) * pageSize;
  const end = page * pageSize;

  const pageData = mockData.slice(start, end);

  return {
    code: 200,
    message: 'success',
    data: {
      total: mockData.length,
      items: pageData,
    }
  };
});
