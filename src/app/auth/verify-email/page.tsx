 'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';
  
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-md">
        <div>
          <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mx-auto">
            <i className="fas fa-envelope text-green-600 text-2xl"></i>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            验证您的邮箱
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            我们已向 {email} 发送了一封验证邮件。请查看您的邮箱并点击验证链接完成注册。
          </p>
        </div>
        
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
          <div className="flex">
            <div className="flex-shrink-0">
              <i className="fas fa-info-circle text-blue-600"></i>
            </div>
            <div className="ml-3">
              <p className="text-sm text-blue-700">
                如果您没有收到邮件，请检查垃圾邮件文件夹，或 
                <Link href="/auth/resend-verification" className="font-medium underline">
                  重新发送验证邮件
                </Link>
              </p>
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <Link href="/auth/login" className="text-sm font-medium text-black hover:underline">
            返回登录页面
          </Link>
        </div>
      </div>
    </div>
  );
}