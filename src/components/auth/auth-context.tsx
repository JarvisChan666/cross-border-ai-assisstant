'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode
} from 'react';
import { User, Session } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

// 添加函数签名和类型
interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  error: string | null;
  signUpWithEmail: (email: string, password: string, options?: Record<string, unknown>) => Promise<any>;
  signInWithEmail: (email: string, password: string) => Promise<any>;
  logout: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, options?: Record<string, unknown>) => Promise<void>;
}

// 创建 Auth 上下文
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 导出 Provider 组件
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();

  // 初始化 auth 状态
  useEffect(() => {
    const initAuth = async () => {
      try {
        setLoading(true);
        
        // 获取当前会话
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          setSession(session);
          setUser(session.user);
        }

        // 监听 auth 状态变化
        const { data: { subscription } } = await supabase.auth.onAuthStateChange(
          (event, session) => {
            setSession(session);
            setUser(session?.user || null);
            setLoading(false);
          }
        );

        return () => {
          subscription.unsubscribe();
        };
      } catch (error) {
        console.error('Auth initialization error:', error);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, [supabase.auth]);

  // 登录函数
  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      
      // 使用 signInWithEmail 函数
      const response = await signInWithEmail(email, password);
      const { data, error } = response;
      
      if (error) {
        console.error('登录错误详情:', error);
        throw error;
      }
      
      // 添加防御性检查
      if (!data) {
        throw new Error('登录响应数据为空');
      }
      
      // 检查 user 对象是否存在
      if (!data.user) {
        throw new Error('用户数据不存在');
      }
      
      // 数据有效，设置用户状态
      setUser(data.user);
      router.push('/dashboard');
      
    } catch (err: unknown) {
      console.error('登录失败:', err);
      // 提供更具体的错误信息
      if (err instanceof Error && err.message.includes('Invalid login credentials')) {
        setError('登录失败：邮箱或密码不正确');
      } else if (err instanceof Error) {
        setError(err.message || '登录失败，请稍后再试');
      } else {
        setError('登录失败，发生未知错误');
      }
    } finally {
      setLoading(false);
    }
  };

  // 注册函数
  const register = async (email: string, password: string, options?: Record<string, unknown>) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await signUpWithEmail(email, password, options);
      const { error } = response;
      
      if (error) throw error;
      
      // 注册成功后转到验证页面
      router.push('/auth/verify-email');
      
    } catch (err: unknown) {
      console.error('注册失败:', err);
      if (err instanceof Error) {
        setError(err.message || '注册失败，请稍后再试');
      } else {
        setError('注册失败，发生未知错误');
      }
    } finally {
      setLoading(false);
    }
  };

  // 登出函数
  const logout = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      // 清除用户状态
      setUser(null);
      router.push('/auth/login');
    } catch (err: unknown) {
      console.error('登出失败:', err);
      if (err instanceof Error) {
        setError(err.message || '登出失败，请稍后再试');
      } else {
        setError('登出失败，发生未知错误');
      }
    } finally {
      setLoading(false);
    }
  };

  // 使用 Supabase Auth API 实现注册
  const signUpWithEmail = async (email: string, password: string, options?: Record<string, unknown>) => {
    return await supabase.auth.signUp({
      email,
      password,
      options: {
        data: options,
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };

  // 使用 Supabase Auth API 实现登录
  const signInWithEmail = async (email: string, password: string) => {
    return await supabase.auth.signInWithPassword({
      email,
      password,
    });
  };

  // 提供 Auth 上下文给子组件
  return (
    <AuthContext.Provider value={{
      user,
      session,
      loading,
      error,
      signUpWithEmail,
      signInWithEmail,
      logout,
      login,
      register,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

// 导出 useAuth hook
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 