// Google Apps Script 연동 API
// 아래 URL을 Google Sheets의 Apps Script 배포 URL로 변경해주세요.
export const GOOGLE_SHEETS_API_URL = "YOUR_GOOGLE_APPS_SCRIPT_URL_HERE";

export const verifyAccessKey = async (key) => {
  if (GOOGLE_SHEETS_API_URL === "YOUR_GOOGLE_APPS_SCRIPT_URL_HERE") {
    if (key === 'test-key') return { valid: true };
    return { valid: false, message: '개발 테스트 모드: 키는 "test-key" 입니다.' };
  }

  try {
    const res = await fetch(`${GOOGLE_SHEETS_API_URL}?action=verifyKey&key=${encodeURIComponent(key)}`);
    return await res.json();
  } catch (error) {
    return { valid: false, message: 'DB 연결에 실패했습니다.' };
  }
};

export const getAdminKeys = async (id, pass) => {
  if (GOOGLE_SHEETS_API_URL === "YOUR_GOOGLE_APPS_SCRIPT_URL_HERE") {
    if (id !== 'ssac' || pass !== 'ssac1400') return { error: 'Unauthorized' };
    return { keys: [{ key: 'test-key', expiry: '2099-12-31' }] };
  }

  try {
    const res = await fetch(`${GOOGLE_SHEETS_API_URL}?action=getKeys&id=${encodeURIComponent(id)}&pass=${encodeURIComponent(pass)}`);
    return await res.json();
  } catch (error) {
    return { error: 'DB 연결 실패' };
  }
};

export const saveAdminKey = async (id, pass, keyData) => {
  if (GOOGLE_SHEETS_API_URL === "YOUR_GOOGLE_APPS_SCRIPT_URL_HERE") return { success: true };
  
  try {
    const res = await fetch(GOOGLE_SHEETS_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({ action: 'saveKey', id, pass, key: keyData })
    });
    return await res.json();
  } catch (error) {
    return { error: 'DB 연결 실패' };
  }
};

export const deleteAdminKey = async (id, pass, keyString) => {
  if (GOOGLE_SHEETS_API_URL === "YOUR_GOOGLE_APPS_SCRIPT_URL_HERE") return { success: true };

  try {
    const res = await fetch(GOOGLE_SHEETS_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({ action: 'deleteKey', id, pass, key: keyString })
    });
    return await res.json();
  } catch (error) {
    return { error: 'DB 연결 실패' };
  }
};
