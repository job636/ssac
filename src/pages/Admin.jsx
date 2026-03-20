import React, { useState, useEffect } from 'react';
import { getAdminKeys, saveAdminKey, deleteAdminKey } from '../api';
import { ShieldAlert, Trash2, Plus, LogOut, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const navigate = useNavigate();
  const [isLogged, setIsLogged] = useState(false);
  const [adminId, setAdminId] = useState('');
  const [adminPass, setAdminPass] = useState('');
  
  const [keys, setKeys] = useState([]);
  const [newKey, setNewKey] = useState('');
  const [newExpiry, setNewExpiry] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await getAdminKeys(adminId, adminPass);
    setLoading(false);
    
    if (res.error) {
      setError('접근 권한이 없습니다.');
    } else {
      setIsLogged(true);
      setKeys(res.keys || []);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!newKey || !newExpiry) return;
    setLoading(true);
    
    const res = await saveAdminKey(adminId, adminPass, { key: newKey, expiry: newExpiry });
    if (res.error) {
      setError('저장 실패');
    } else {
      // Refresh keys
      const updated = await getAdminKeys(adminId, adminPass);
      setKeys(updated.keys || []);
      setNewKey('');
      setNewExpiry('');
    }
    setLoading(false);
  };

  const handleDelete = async (keyToDelete) => {
    if (!window.confirm('삭제하시겠습니까?')) return;
    setLoading(true);
    const res = await deleteAdminKey(adminId, adminPass, keyToDelete);
    if (!res.error) {
      const updated = await getAdminKeys(adminId, adminPass);
      setKeys(updated.keys || []);
    }
    setLoading(false);
  };

  if (!isLogged) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
        <div className="w-full max-w-sm bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
          <ShieldAlert className="w-12 h-12 text-indigo-900 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-center mb-6">T-MAS 관리자 로그인</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <input type="text" placeholder="관리자 ID" value={adminId} onChange={e => setAdminId(e.target.value)} className="w-full p-4 rounded-xl border bg-gray-50 outline-none" />
            <input type="password" placeholder="비밀번호" value={adminPass} onChange={e => setAdminPass(e.target.value)} className="w-full p-4 rounded-xl border bg-gray-50 outline-none" />
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            <button type="submit" disabled={loading} className="w-full p-4 bg-indigo-900 text-white rounded-xl font-bold">로그인</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold flex items-center gap-2"><ShieldAlert /> 인증키 발급/관리</h1>
          <button onClick={() => navigate('/login')} className="flex items-center gap-2 text-gray-500 hover:text-indigo-600"><LogOut className="w-5 h-5"/> 나가기</button>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 mb-8">
          <h2 className="text-xl font-bold mb-4">새 인증키 발급</h2>
          <form onSubmit={handleSave} className="flex flex-col md:flex-row gap-4">
            <input type="text" placeholder="발급할 키 (예: 학교명-난수)" value={newKey} onChange={e => setNewKey(e.target.value)} className="flex-1 p-4 rounded-xl border bg-gray-50 outline-none" required />
            <input type="date" value={newExpiry} onChange={e => setNewExpiry(e.target.value)} className="flex-1 p-4 rounded-xl border bg-gray-50 outline-none" required />
            <button type="submit" disabled={loading} className="p-4 bg-indigo-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 md:w-32"><Plus /> 추가</button>
          </form>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-indigo-50 text-indigo-900">
              <tr>
                <th className="p-4 pl-8 font-bold">인증키</th>
                <th className="p-4 font-bold">만료일자</th>
                <th className="p-4 font-bold text-center">상태</th>
                <th className="p-4 pr-8 text-right font-bold">관리</th>
              </tr>
            </thead>
            <tbody>
              {keys.length === 0 ? (
                <tr><td colSpan="4" className="text-center p-8 text-gray-500">등록된 키가 없습니다.</td></tr>
              ) : keys.map((k) => {
                const isExpired = new Date() > new Date(k.expiry);
                return (
                  <tr key={k.key} className="border-b border-gray-50 last:border-none">
                    <td className="p-4 pl-8 font-mono">{k.key}</td>
                    <td className="p-4">{k.expiry}</td>
                    <td className="p-4 text-center">
                      {isExpired ? <span className="text-pink-500 font-bold text-sm">만료됨</span> : <span className="text-teal-500 font-bold text-sm flex items-center justify-center gap-1"><CheckCircle2 className="w-4 h-4"/> 유효</span>}
                    </td>
                    <td className="p-4 pr-8 text-right">
                      <button onClick={() => handleDelete(k.key)} className="text-gray-400 hover:text-pink-500 p-2"><Trash2 className="w-5 h-5"/></button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Admin;
