'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from './auth-context';

export default function RegisterForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [agreedTerms, setAgreedTerms] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  
  const { register, loading, error } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 清除之前的错误
    setFormError(null);
    
    // 表单验证
    if (password !== confirmPassword) {
      setFormError('两次输入的密码不一致');
      return;
    }
    
    if (!agreedTerms) {
      setFormError('请同意服务条款');
      return;
    }
    
    // 提交注册
    await register(email, password);
    
    // 注册后需要更新用户的全名，这部分通常需要在注册后调用另一个API来更新用户信息
    // 这里简化处理，实际实现可能需要在auth-context.tsx中扩展register方法
  };

  return (
    <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-md">
      <div>
        <div className="w-16 h-16 bg-black rounded-xl flex items-center justify-center mx-auto">
          <i className="fas fa-rocket text-white text-2xl"></i>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          创建账号
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          加入跨境电商AI优化助手，提升您的产品竞争力
        </p>
      </div>
      
      {(error || formError) && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
          <p className="text-sm text-red-700">{formError || error}</p>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div className="space-y-4">
          <div>
            <label htmlFor="full-name" className="block text-sm font-medium text-gray-700">
              全名
            </label>
            <input 
              id="full-name"
              type="text" 
              required 
              className="appearance-none rounded-md relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-black focus:border-black focus:z-10 sm:text-sm" 
              placeholder="请输入您的全名"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              邮箱地址
            </label>
            <input 
              id="email"
              type="email" 
              required 
              className="appearance-none rounded-md relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-black focus:border-black focus:z-10 sm:text-sm" 
              placeholder="请输入您的邮箱地址"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              密码
            </label>
            <input 
              id="password"
              type="password" 
              required 
              className="appearance-none rounded-md relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-black focus:border-black focus:z-10 sm:text-sm" 
              placeholder="请设置密码"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          
          <div>
            <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
              确认密码
            </label>
            <input 
              id="confirm-password"
              type="password" 
              required 
              className="appearance-none rounded-md relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-black focus:border-black focus:z-10 sm:text-sm" 
              placeholder="请再次输入密码"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          
          <div className="flex items-center">
            <input 
              id="agree-terms" 
              name="agree-terms" 
              type="checkbox" 
              className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
              checked={agreedTerms}
              onChange={(e) => setAgreedTerms(e.target.checked)}
            />
            <label htmlFor="agree-terms" className="ml-2 block text-sm text-gray-900">
              我已阅读并同意<a href="#" className="text-black font-medium">服务条款</a>和<a href="#" className="text-black font-medium">隐私政策</a>
            </label>
          </div>
        </div>
        
        <div>
          <button 
            type="submit"
            disabled={loading}
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-black hover:bg-gray-800 focus:outline-none"
          >
            {loading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                处理中...
              </span>
            ) : '注册'}
          </button>
        </div>
      </form>
      
      <div className="text-center text-sm text-gray-600">
        已有账号? <Link href="/auth/login" className="font-medium text-black hover:underline">登录</Link>
      </div>
    </div>
  );
} 