import React, { useState, useEffect } from 'react';
import { Sparkles, RefreshCcw, Heart, User, Send, Loader2, Phone, Mail, Download, Lightbulb, CheckCircle2 } from 'lucide-react';

// 78장 타로 카드 데이터 (생략 없이 그대로 유지하세요)
const TAROT_DECK = [
  { name: '0. 광대', url: 'https://i.postimg.cc/TwBTxvhd/0-babo.jpg' },
  { name: '1. 마법사', url: 'https://i.postimg.cc/sxSsDHhR/1.jpg' },
  { name: '2. 고위 여사제', url: 'https://i.postimg.cc/65rtkSKQ/2.jpg' },
  { name: '3. 여황제', url: 'https://i.postimg.cc/HsmtHFff/3.jpg' },
  { name: '4. 황제', url: 'https://i.postimg.cc/ZnkzgPDs/4.jpg' },
  { name: '5. 교황', url: 'https://i.postimg.cc/L5dF7k0b/5.jpg' },
  { name: '6. 연인', url: 'https://i.postimg.cc/Rhrx81bb/6.jpg' },
  { name: '7. 전차', url: 'https://i.postimg.cc/6QH8Xbjw/7.jpg' },
  { name: '8. 힘', url: 'https://i.postimg.cc/tJhGH1L2/8.jpg' },
  { name: '9. 은둔자', url: 'https://i.postimg.cc/2y4NfqPT/9.jpg' },
  { name: '10. 운명의 수레바퀴', url: 'https://i.postimg.cc/gkrNF1NC/10.jpg' },
  { name: '11. 정의', url: 'https://i.postimg.cc/hv9RqJHy/11.jpg' },
  { name: '12. 매달린 사람', url: 'https://i.postimg.cc/Xqw60ZT1/12.jpg' },
  { name: '13. 죽음', url: 'https://i.postimg.cc/Gtkn1BZ6/13.jpg' },
  { name: '14. 절제', url: 'https://i.postimg.cc/7hgryCpp/14.jpg' },
  { name: '15. 악마', url: 'https://i.postimg.cc/8chgVF28/15.jpg' },
  { name: '16. 탑', url: 'https://i.postimg.cc/brQfjG7c/16.jpg' },
  { name: '17. 별', url: 'https://i.postimg.cc/vTWwd1Jw/17.jpg' },
  { name: '18. 달', url: 'https://i.postimg.cc/J0bCWyfL/18.jpg' },
  { name: '19. 태양', url: 'https://i.postimg.cc/2y4Nfqsz/19.jpg' },
  { name: '20. 심판', url: 'https://i.postimg.cc/C5jpVZ3x/20.jpg' },
  { name: '21. 세계', url: 'https://i.postimg.cc/59vVzG6Q/21.jpg' },
  { name: 'Ace of Swords', url: 'https://i.postimg.cc/RhvXNN30/swords1.jpg' },
  { name: 'Two of Swords', url: 'https://i.postimg.cc/v8v0CLjD/swords2.jpg' },
  { name: 'Three of Swords', url: 'https://i.postimg.cc/nhN2qdsG/swords3.jpg' },
  { name: 'Four of Swords', url: 'https://i.postimg.cc/BnRp2h87/swords4.jpg' },
  { name: 'Five of Swords', url: 'https://i.postimg.cc/BnRp2h8h/swords5.jpg' },
  { name: 'Six of Swords', url: 'https://i.postimg.cc/rshCsgXr/swords6.jpg' },
  { name: 'Seven of Swords', url: 'https://i.postimg.cc/44w1W47N/swords7.jpg' },
  { name: 'Eight of Swords', url: 'https://i.postimg.cc/Hsh9CStG/swords8.jpg' },
  { name: 'Nine of Swords', url: 'https://i.postimg.cc/fbxcmMQk/swords9.jpg' },
  { name: 'Ten of Swords', url: 'https://i.postimg.cc/bvQxkqfZ/swords10.jpg' },
  { name: 'Page of Swords', url: 'https://i.postimg.cc/dVCrcJ1V/swordspage.jpg' },
  { name: 'Knight of Swords', url: 'https://i.postimg.cc/8cnMN5M9/swordsknight.jpg' },
  { name: 'Queen of Swords', url: 'https://i.postimg.cc/zf1WJ4b0/swordsqueen.jpg' },
  { name: 'King of Swords', url: 'https://i.postimg.cc/BbwH46Hy/swordsking.jpg' },
  { name: 'Ace of Wands', url: 'https://i.postimg.cc/mgTzJC0K/wands1.jpg' },
  { name: 'Two of Wands', url: 'https://i.postimg.cc/jSRwmPG9/wands2.jpg' },
  { name: 'Three of Wands', url: 'https://i.postimg.cc/P5dp9YB9/wands3.jpg' },
  { name: 'Four of Wands', url: 'https://i.postimg.cc/RZv6yKjk/wands4.jpg' },
  { name: 'Five of Wands', url: 'https://i.postimg.cc/9Q1Rhz2z/wands5.jpg' },
  { name: 'Six of Wands', url: 'https://i.postimg.cc/Dw5JTmhG/wands6.jpg' },
  { name: 'Seven of Wands', url: 'https://i.postimg.cc/x1gJ2qQ5/wands7.jpg' },
  { name: 'Eight of Wands', url: 'https://i.postimg.cc/0NQ62x5p/wands8.jpg' },
  { name: 'Nine of Wands', url: 'https://i.postimg.cc/7L6CYDPX/wands9.jpg' },
  { name: 'Ten of Wands', url: 'https://i.postimg.cc/N0MyfYGC/wands10.jpg' },
  { name: 'Page of Wands', url: 'https://i.postimg.cc/NFL2JcSg/wandspage.jpg' },
  { name: 'Knight of Wands', url: 'https://i.postimg.cc/d1syCd9x/wandsknight.jpg' },
  { name: 'Queen of Wands', url: 'https://i.postimg.cc/SR52HPbf/wandsqueen.jpg' },
  { name: 'King of Wands', url: 'https://i.postimg.cc/JhcXtKjm/wandskking.jpg' },
  { name: 'Ace of Cups', url: 'https://i.postimg.cc/PJmJF5Kv/cups1.jpg' },
  { name: 'Two of Cups', url: 'https://i.postimg.cc/L5z508vn/cups2.jpg' },
  { name: 'Three of Cups', url: 'https://i.postimg.cc/MHyHrptc/cups3.jpg' },
  { name: 'Four of Cups', url: 'https://i.postimg.cc/GtktSmzG/cups4.jpg' },
  { name: 'Five of Cups', url: 'https://i.postimg.cc/J7Jshp8S/cups5.jpg' },
  { name: 'Six of Cups', url: 'https://i.postimg.cc/KcL1Y0bw/cups6.jpg' },
  { name: 'Seven of Cups', url: 'https://i.postimg.cc/c1YvJFZq/cups7.jpg' },
  { name: 'Eight of Cups', url: 'https://i.postimg.cc/L4fJsxR2/cups8.jpg' },
  { name: 'Nine of Cups', url: 'https://i.postimg.cc/sfSM2Tyf/cups9.jpg' },
  { name: 'Ten of Cups', url: 'https://i.postimg.cc/44tY3WZf/cups10.jpg' },
  { name: 'Page of Cups', url: 'https://i.postimg.cc/C5W5cfbt/cupspage.jpg' },
  { name: 'Knight of Cups', url: 'https://i.postimg.cc/sDkGcbcp/cupsknight.jpg' },
  { name: 'Queen of Cups', url: 'https://i.postimg.cc/C15KY470/cupsqueen.jpg' },
  { name: 'King of Cups', url: 'https://i.postimg.cc/4N7hpXpb/cupsking.jpg' },
  { name: 'Ace of Pentacles', url: 'https://i.postimg.cc/8zy5Y3dJ/pentacles1.jpg' },
  { name: 'Two of Pentacles', url: 'https://i.postimg.cc/T3kwsSjr/pentacles2.jpg' },
  { name: 'Three of Pentacles', url: 'https://i.postimg.cc/dVW1fXRr/pentacles3.jpg' },
  { name: 'Four of Pentacles', url: 'https://i.postimg.cc/cLDHzj7R/pentacles4.jpg' },
  { name: 'Five of Pentacles', url: 'https://i.postimg.cc/DwCZNDQ6/pentacles5.jpg' },
  { name: 'Six of Pentacles', url: 'https://i.postimg.cc/3xLRq6jf/pentacles6.jpg' },
  { name: 'Seven of Pentacles', url: 'https://i.postimg.cc/qvmRFYcZ/pentacles7.jpg' },
  { name: 'Eight of Pentacles', url: 'https://i.postimg.cc/7Lf6rVX9/pentacles8.jpg' },
  { name: 'Nine of Pentacles', url: 'https://i.postimg.cc/6Qy3x0zg/pentacles9.jpg' },
  { name: 'Ten of Pentacles', url: 'https://i.postimg.cc/d0L1cB4K/pentacles10.jpg' },
  { name: 'Page of Pentacles', url: 'https://i.postimg.cc/YSqFGYRd/pentaclespage.jpg' },
  { name: 'Knight of Pentacles', url: 'https://i.postimg.cc/xdTmJM55/pentaclesknight.jpg' },
  { name: 'Queen of Pentacles', url: 'https://i.postimg.cc/rm7RPbk3/pentaclesqueen.jpg' },
  { name: 'King of Pentacles', url: 'https://i.postimg.cc/GphD8GKz/pentaclesking.jpg' },
];

const App = () => {
  const [step, setStep] = useState(1);
  const [userName, setUserName] = useState('');
  const [school, setSchool] = useState('');
  const [grade, setGrade] = useState('');
  const [concern, setConcern] = useState('');
  const [randomCards, setRandomCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [observation, setObservation] = useState('');
  const [analysis, setAnalysis] = useState('');
  const [solutionTip, setSolutionTip] = useState('');
  const [loading, setLoading] = useState(false);
  const [today, setToday] = useState('');

  // 선생님의 API 키
  const apiKey = "AIzaSyBQHdA33KuZZgp224UacOCXmAaJ2tAbqQk";

  useEffect(() => {
    const date = new Date();
    setToday(`${date.getFullYear()}년 ${String(date.getMonth() + 1).padStart(2, '0')}월 ${String(date.getDate()).padStart(2, '0')}일`);
  }, []);

  const handleGoToSelection = () => {
    if (!userName.trim() || !school.trim() || !grade.trim() || !concern.trim()) return;
    const shuffled = [...TAROT_DECK].sort(() => Math.random() - 0.5).slice(0, 5);
    setRandomCards(shuffled);
    setStep(2);
  };

  const handleCardPick = (card) => {
    setSelectedCard(card);
    setStep(3);
  };

  const getExpertAnalysis = async () => {
    if (!observation.trim()) return;
    setLoading(true);

    const systemPrompt = "너는 정서중심 상담사야. " + userName + "님의 고민과 타로 이미지를 보고 깊이 공감해주고 실천 방안 5가지를 작성해줘.";
    const userQuery = "고민: " + concern + "\n관찰: " + observation;

    try {
      // 주소를 아주 깔끔하게 정리했습니다.
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: userQuery }] }],
          systemInstruction: { parts: [{ text: systemPrompt }] }
        })
      });

      if (!response.ok) {
        throw new Error('네트워크 응답이 좋지 않습니다.');
      }

      const result = await response.json();
      const text = result.candidates?.[0]?.content?.parts?.[0]?.text || "";

      if (text) {
        setAnalysis(text);
        setSolutionTip("오늘 하루 " + userName + "님을 위한 작은 실천을 시작해보세요.");
        setStep(4);
      } else {
        setAnalysis("AI가 답변을 생성하지 못했습니다. 다시 시도해주세요.");
        setStep(4);
      }
    } catch (error) {
      setAnalysis("마음 연결에 실패했습니다. API 키의 앞뒤 공백을 확인해주세요.");
      setStep(4);
    } finally {
      setLoading(false);
    }
  };

  const getReportTemplate = () => {
    return `
    <!DOCTYPE html>
    <html lang="ko">
    <head>
      <meta charset="utf-8">
      <title>T-MAS 결과 보고서</title>
      <style>
        @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css');
        body { font-family: 'Pretendard', sans-serif; padding: 40px; line-height: 1.6; }
        .header { background: #f0f7ff; padding: 20px; border-radius: 10px; margin-bottom: 30px; }
        .title { color: #1e40af; font-size: 24pt; font-weight: bold; }
        .section { margin-bottom: 30px; padding: 20px; border: 1px solid #ddd; border-radius: 10px; }
        .section-title { font-weight: bold; font-size: 14pt; color: #3b82f6; margin-bottom: 15px; }
        .card-img { width: 120px; border-radius: 10px; }
        .footer { text-align: center; margin-top: 50px; color: #666; font-size: 10pt; }
      </style>
    </head>
    <body>
      <div class="header">
        <div style="font-size: 10pt;">싹(SSAC)심리상담센터&AI상담콘텐츠연구소</div>
        <div class="title">T-MAS 마음 분석 보고서</div>
        <div style="margin-top: 10px;">성명: ${userName} | 일자: ${today}</div>
      </div>
      <div class="section">
        <div class="section-title">01. 선택된 카드와 당신의 시선</div>
        <div style="display: flex; gap: 20px;">
          <img src="${selectedCard?.url}" class="card-img">
          <div><p><b>나의 고민:</b> ${concern}</p><p><b>내가 본 시선:</b> "${observation}"</p></div>
        </div>
      </div>
      <div class="section">
        <div class="section-title">02. 치유의 리딩</div>
        <div style="white-space: pre-wrap;">${analysis}</div>
      </div>
      <div class="section">
        <div class="section-title">03. 전문가 솔루션</div>
        <div style="white-space: pre-wrap;">${solutionTip}</div>
      </div>
      <div class="footer">싹(SSAC)심리상담센터 | 문의: 063-225-1400</div>
    </body>
    </html>`;
  };

  const handleSaveHTML = () => {
    const htmlContent = getReportTemplate();
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `T-MAS_보고서_${userName}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 flex flex-col items-center p-4 md:p-8 font-sans">
      <header className="w-full max-w-4xl mb-12 text-center pt-8">
        <h1 className="text-4xl font-extrabold text-indigo-600 mb-3 flex items-center justify-center gap-3">
          <Sparkles className="w-10 h-10" /> 마음을 읽는 Tarot 상담 (T-MAS)
        </h1>
        <p className="text-gray-500 text-lg">싹(SSAC) 심리상담센터와 함께하는 마음 치유</p>
      </header>

      <main className="flex-grow w-full max-w-4xl bg-gray-50 rounded-[2.5rem] p-8 shadow-sm border border-gray-100">
        {step === 1 && (
          <div className="space-y-8 flex flex-col items-center">
            <h2 className="text-2xl font-bold">당신의 고민을 들려주시겠어요?</h2>
            <div className="w-full max-w-2xl space-y-4">
              <div className="flex gap-4">
                <input type="text" className="flex-1 p-4 rounded-xl border" placeholder="성명" value={userName} onChange={(e) => setUserName(e.target.value)} />
                <input type="text" className="flex-1 p-4 rounded-xl border" placeholder="학교" value={school} onChange={(e) => setSchool(e.target.value)} />
                <input type="text" className="w-24 p-4 rounded-xl border" placeholder="학년" value={grade} onChange={(e) => setGrade(e.target.value)} />
              </div>
              <textarea className="w-full h-40 p-4 rounded-xl border resize-none" placeholder="고민을 적어보세요..." value={concern} onChange={(e) => setConcern(e.target.value)} />
              <button onClick={handleGoToSelection} disabled={!userName || !concern} className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold text-xl disabled:opacity-50 transition-all hover:bg-indigo-700">상담 시작하기</button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="text-center space-y-8">
            <h2 className="text-2xl font-bold">에너지가 닿는 카드를 선택하세요</h2>
            <div className="flex flex-wrap justify-center gap-4">
              {randomCards.map((card, idx) => (
                <div key={idx} onClick={() => handleCardPick(card)} className="w-24 h-40 bg-indigo-900 rounded-lg cursor-pointer hover:-translate-y-4 transition-all border-2 border-amber-200" />
              ))}
            </div>
          </div>
        )}

        {step === 3 && selectedCard && (
          <div className="grid md:grid-cols-2 gap-10">
            <div className="text-center">
              <img src={selectedCard.url} className="w-56 rounded-xl shadow-2xl mx-auto mb-4" />
              <p className="font-bold text-indigo-600">{selectedCard.name}</p>
            </div>
            <div className="space-y-6">
              <h3 className="text-xl font-bold">이 그림이 어떻게 보이시나요?</h3>
              <textarea className="w-full h-40 p-4 rounded-xl border" placeholder="느껴지는 대로 적어보세요..." value={observation} onChange={(e) => setObservation(e.target.value)} />
              <button onClick={getExpertAnalysis} disabled={loading || !observation} className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold transition-all hover:bg-indigo-700">
                {loading ? <div className="flex items-center justify-center gap-2"><Loader2 className="animate-spin" /> 마음 읽는 중...</div> : "내 마음 전하기"}
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-2xl border shadow-sm">
              <h3 className="text-indigo-600 font-bold mb-4 flex items-center gap-2"><Heart className="w-5 h-5" /> 치유의 리딩</h3>
              <div className="whitespace-pre-wrap leading-relaxed">{analysis}</div>
            </div>
            <div className="bg-indigo-50 p-6 rounded-2xl border-2 border-indigo-200">
              <h3 className="text-indigo-700 font-bold mb-4 flex items-center gap-2"><Lightbulb className="w-5 h-5" /> 전문가 솔루션</h3>
              <div className="whitespace-pre-wrap leading-relaxed">{solutionTip}</div>
            </div>
            <div className="flex gap-4">
              <button onClick={handleSaveHTML} className="flex-1 py-4 bg-indigo-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-700 transition-all"><Download /> 결과 저장</button>
              <button onClick={() => setStep(1)} className="flex-1 py-4 bg-gray-200 rounded-xl font-bold hover:bg-gray-300 transition-all">다시 시작</button>
            </div>
          </div>
        )}
      </main>

      <footer className="mt-8 text-center text-gray-500 text-sm space-y-1">
        <p>싹(SSAC) 심리상담센터 & AI상담 콘텐츠 연구소</p>
        <p>한국상담학회 교육연수기관 | 전북 전주시 완산구</p>
      </footer>
    </div>
  );
};

export default App; 