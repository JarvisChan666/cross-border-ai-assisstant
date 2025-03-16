import { redirect } from 'next/navigation';

export default function Home() {
  // 重定向到 /prototype.html
  redirect('/index.html');
  
  // 以下内容不会被执行，但需要保留以满足 TypeScript 类型检查
  return null;
}