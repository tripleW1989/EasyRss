import { request } from 'umi';
export async function getHtml(url: string) {
  return request(url, {
    method: 'GET',
  });
}
