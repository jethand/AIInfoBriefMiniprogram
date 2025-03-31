import { message } from 'antd';

// 错误码映射
const ERROR_CODE_MAP: Record<string, string> = {
  '401': '未授权，请登录',
  '403': '无权限访问',
  '404': '请求的资源不存在',
  '500': '服务器内部错误',
  '502': '网关错误',
  '503': '服务不可用',
  '504': '网关超时',
  // 业务错误码
  '10001': '用户未登录',
  '10002': '参数错误',
  '10003': '资源不存在',
  '20001': '内容已被删除',
  // 可根据实际业务需求扩展更多错误码
};

// 默认错误消息
const DEFAULT_ERROR_MSG = '请求失败，请稍后再试';

// 请求超时时间 (ms)
const REQUEST_TIMEOUT = 15000;

// 模拟延迟，仅用于开发阶段
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// 请求配置接口
export interface RequestOptions {
  // 是否显示错误提示
  showError?: boolean;
  // 错误提示自定义文本
  errorMessage?: string;
  // 请求超时时间
  timeout?: number;
  // 请求头
  headers?: Record<string, string>;
  // 是否携带认证信息
  withCredentials?: boolean;
}

// 响应数据接口
export interface ResponseData<T = any> {
  code: string | number;
  data: T;
  message: string;
  success: boolean;
}

// 处理错误
const handleError = (
  error: any, 
  options: RequestOptions = {}
): never => {
  const { showError = true, errorMessage } = options;
  
  // 获取错误信息
  let errorMsg = '';
  
  if (error.response) {
    // HTTP 错误状态码
    const statusCode = String(error.response.status);
    errorMsg = ERROR_CODE_MAP[statusCode] || `请求错误 (${statusCode})`;
    
    // 如果响应中包含业务错误码，优先使用业务错误信息
    if (error.response.data && error.response.data.code) {
      const businessCode = String(error.response.data.code);
      if (ERROR_CODE_MAP[businessCode]) {
        errorMsg = ERROR_CODE_MAP[businessCode];
      }
    }
  } else if (error.message === 'Network Error') {
    errorMsg = '网络错误，请检查网络连接';
  } else if (error.message && error.message.includes('timeout')) {
    errorMsg = '请求超时，请稍后再试';
  } else {
    errorMsg = error.message || DEFAULT_ERROR_MSG;
  }
  
  // 显示错误提示
  if (showError) {
    message.error(errorMessage || errorMsg);
  }
  
  // 抛出统一格式的错误
  throw {
    message: errorMsg,
    originalError: error,
    code: error.response?.status || error.response?.data?.code || 'UNKNOWN_ERROR'
  };
};

// 检查响应状态
const checkStatus = <T>(
  response: ResponseData<T>, 
  options: RequestOptions = {}
): T => {
  const { showError = true, errorMessage } = options;
  const { code, data, message: msg, success } = response;
  
  if (!success || code !== 0 && code !== '0' && code !== 200 && code !== '200') {
    // 获取错误消息
    const errorMsg = ERROR_CODE_MAP[String(code)] || msg || DEFAULT_ERROR_MSG;
    
    // 显示错误提示
    if (showError) {
      message.error(errorMessage || errorMsg);
    }
    
    // 抛出业务错误
    throw {
      message: errorMsg,
      code,
      data
    };
  }
  
  return data;
};

/**
 * 发送请求
 * 注意：当前为模拟实现，实际项目中应使用 axios、fetch 等库
 */
export async function request<T = any>(
  url: string, 
  options: RequestOptions = {}
): Promise<T> {
  try {
    // 模拟API请求延迟
    await delay(500);
    
    // 这里是模拟实现，实际项目中应替换为真实API调用
    // 例如使用 axios 或 fetch
    
    // 模拟成功响应
    const mockSuccessResponse: ResponseData<T> = {
      code: 0,
      data: {} as T, // 实际数据会从服务端返回
      message: 'success',
      success: true
    };
    
    // 处理并返回数据
    return checkStatus<T>(mockSuccessResponse, options);
  } catch (error) {
    return handleError(error, options);
  }
}

// 封装常用的请求方法
export const http = {
  get: <T = any>(url: string, options?: RequestOptions) => 
    request<T>(url, { ...options, method: 'GET' }),
    
  post: <T = any>(url: string, data?: any, options?: RequestOptions) => 
    request<T>(url, { ...options, method: 'POST', data }),
    
  put: <T = any>(url: string, data?: any, options?: RequestOptions) => 
    request<T>(url, { ...options, method: 'PUT', data }),
    
  delete: <T = any>(url: string, options?: RequestOptions) => 
    request<T>(url, { ...options, method: 'DELETE' })
};

export default http;
