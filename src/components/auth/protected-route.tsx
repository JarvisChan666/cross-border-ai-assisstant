'use client';

import { useAuth } from './auth-context';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // 如果用户未登录且页面已加载完成，重定向到登录页
    if (!loading && !user && pathname !== '/auth/login' && pathname !== '/auth/register' && pathname !== '/auth/forgot-password') {
      router.push('/auth/login');
    }
  }, [user, loading, router, pathname]);

  // 在加载状态显示加载指示器
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center">
          <svg className="animate-spin h-10 w-10 text-black mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-gray-600">加载中...</p>
        </div>
      </div>
    );
  }

  // 如果是公共路由或用户已登录，显示子组件
  return <>{children}</>;
} 