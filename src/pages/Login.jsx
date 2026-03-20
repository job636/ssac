import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { verifyAccessKey } from '../api';

const Login = ({ onLogin }) => {
  const [accessKey, setAccessKey] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!accessKey.trim()) return;
    
    setLoading(true);
    setError('');
    
    const result = await verifyAccessKey(accessKey);
    setLoading(false);
    
    if (result.valid) {
      onLogin(accessKey);
    } else {
      setError(result.message || '유효하지 않은 키입니다.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4 font-sans">
      <div className="w-full max-w-md bg-white rounded-[2.5rem] shadow-sm border border-gray-100 p-8 md:p-12 text-center">
        <Sparkles className="w-16 h-16 text-indigo-600 mx-auto mb-6" />
        <h1 className="text-3xl font-extrabold text-indigo-900 mb-2">T-MAS 입장</h1>
        <p className="text-gray-500 mb-8">상담을 시작하려면 인증키를 입력해주세요.</p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <input 
            type="password" 
            placeholder="인증키 입력" 
            value={accessKey}
            onChange={(e) => setAccessKey(e.target.value)}
            className="w-full py-4 px-6 rounded-2xl border-2 border-gray-100 outline-none focus:border-indigo-600 bg-gray-50 focus:bg-white text-lg transition-all text-center tracking-widest"
          />
          
          {error && <div className="text-pink-500 font-medium text-sm">{error}</div>}
          
          <button 
            type="submit" 
            disabled={loading || !accessKey.trim()}
            className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-bold text-xl hover:bg-indigo-700 disabled:opacity-50 transition-colors shadow-md"
          >
            {loading ? '확인 중...' : '입장하기'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
