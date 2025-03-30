'use client';

import { useAuth } from '@/components/auth/auth-context';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <nav className="bg-white shadow-sm fixed w-full z-10">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
                <i className="fas fa-rocket text-white text-xl"></i>
              </div>
              <span className="ml-3 text-xl font-semibold">AI优化助手</span>
            </div>
          </div>
          
          {user && (
            <>
              <div className="hidden md:flex items-center space-x-4">
                <Link 
                  href="/dashboard"
                  className={`px-3 py-2 rounded-md ${isActive('/dashboard') ? 'text-black font-medium' : 'text-gray-700 hover:text-black'}`}
                >
                  <i className="fas fa-home mr-1"></i> 首页
                </Link>
                <Link 
                  href="/dashboard/history"
                  className={`px-3 py-2 rounded-md ${isActive('/dashboard/history') ? 'text-black font-medium' : 'text-gray-700 hover:text-black'}`}
                >
                  <i className="fas fa-history mr-1"></i> 历史记录
                </Link>
                <Link 
                  href="/dashboard/pricing"
                  className={`px-3 py-2 rounded-md ${isActive('/dashboard/pricing') ? 'text-black font-medium' : 'text-gray-700 hover:text-black'}`}
                >
                  <i className="fas fa-crown mr-1"></i> 会员升级
                </Link>
                <div className="relative">
                  <button 
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="flex items-center px-3 py-2 rounded-md text-gray-700 hover:text-black"
                  >
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mr-2">
                      <span className="text-sm font-medium">
                        {user.email?.charAt(0).toUpperCase() || 'U'}
                      </span>
                    </div>
                    <span>{user.email?.split('@')[0] || '用户'}</span>
                    <i className="fas fa-chevron-down ml-1 text-xs"></i>
                  </button>
                  
                  {isMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                      <Link 
                        href="/dashboard/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <i className="fas fa-user mr-2"></i> 个人资料
                      </Link>
                      <Link 
                        href="/dashboard/settings"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <i className="fas fa-cog mr-2"></i> 设置
                      </Link>
                      <button 
                        onClick={() => logout()}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                      >
                        <i className="fas fa-sign-out-alt mr-2"></i> 退出登录
                      </button>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="md:hidden">
                <button 
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="text-gray-700"
                >
                  <i className="fas fa-bars text-xl"></i>
                </button>
                
                {isMenuOpen && (
                  <div className="absolute top-16 left-0 right-0 bg-white shadow-md">
                    <div className="px-2 pt-2 pb-3 space-y-1">
                      <Link 
                        href="/dashboard"
                        className={`block px-3 py-2 rounded-md ${isActive('/dashboard') ? 'bg-gray-100 text-black' : 'text-gray-700'}`}
                      >
                        <i className="fas fa-home mr-1"></i> 首页
                      </Link>
                      <Link 
                        href="/dashboard/history"
                        className={`block px-3 py-2 rounded-md ${isActive('/dashboard/history') ? 'bg-gray-100 text-black' : 'text-gray-700'}`}
                      >
                        <i className="fas fa-history mr-1"></i> 历史记录
                      </Link>
                      <Link 
                        href="/dashboard/pricing"
                        className={`block px-3 py-2 rounded-md ${isActive('/dashboard/pricing') ? 'bg-gray-100 text-black' : 'text-gray-700'}`}
                      >
                        <i className="fas fa-crown mr-1"></i> 会员升级
                      </Link>
                      <Link 
                        href="/dashboard/profile"
                        className="block px-3 py-2 rounded-md text-gray-700"
                      >
                        <i className="fas fa-user mr-1"></i> 个人资料
                      </Link>
                      <Link 
                        href="/dashboard/settings"
                        className="block px-3 py-2 rounded-md text-gray-700"
                      >
                        <i className="fas fa-cog mr-1"></i> 设置
                      </Link>
                      <button 
                        onClick={() => logout()}
                        className="block w-full text-left px-3 py-2 rounded-md text-red-600"
                      >
                        <i className="fas fa-sign-out-alt mr-1"></i> 退出登录
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
} 