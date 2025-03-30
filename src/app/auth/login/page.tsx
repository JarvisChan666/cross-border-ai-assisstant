import LoginForm from '@/components/auth/login-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '登录 - 跨境电商AI优化助手',
  description: '登录到跨境电商AI优化助手，提高您的产品在各平台的曝光率和转化率。',
};

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <LoginForm />
    </div>
  );
} 