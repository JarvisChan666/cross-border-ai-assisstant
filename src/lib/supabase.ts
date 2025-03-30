import { createClient } from '@supabase/supabase-js';

// 创建 Supabase 客户端
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// 验证环境变量是否已设置
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase URL or Anon Key is not set in environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// 使用邮箱登录
export async function signInWithEmail(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  // 确保返回完整的 data 和 error
  return { data, error };
}

// 使用邮箱注册
export async function signUpWithEmail(email: string, password: string, metadata?: { full_name?: string }) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata, // 可以存储额外的用户元数据
      },
    });
    
    if (error) throw error;
    
    // 如果注册成功，但需要验证邮箱
    if (data.user && !data.user.confirmed_at) {
      // 这里可以处理邮箱验证的逻辑
      return { user: data.user, needsEmailConfirmation: true };
    }
    
    return { user: data.user, needsEmailConfirmation: false };
  }

// 登出
export async function signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  }


// 获取当前用户
export async function getCurrentUser() {
    const { data, error } = await supabase.auth.getUser();
    
    if (error) throw error;
    
    return data.user;
  }

  // 获取用户资料
export async function getUserProfile(userId: string) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
      
    if (error) throw error;
    
    return data;
  }
  
  // 更新用户资料
  export async function updateUserProfile(userId: string, updates: any) {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId);
      
    if (error) throw error;
    
    return data;
  }
  
  // 重置密码
  export async function resetPassword(email: string) {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    });
    
    if (error) throw error;
  }
  
  // 更新密码
  export async function updatePassword(newPassword: string) {
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });
    
    if (error) throw error;
  }