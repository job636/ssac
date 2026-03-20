import React, { useState, useEffect } from 'react';
import { Sparkles, RefreshCcw, Heart, User, Send, Loader2, Phone, Mail, Download, Lightbulb, CheckCircle2 } from 'lucide-react';

// 78장 타로 카드 데이터
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

  const apiKey = "";

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

    const systemPrompt = `너는 따뜻하고 공감 능력이 뛰어난 정서중심 전문 상담사야. 
사용자가 쓴 고민과 타로 카드에 대한 관찰(투사) 내용을 바탕으로 마음을 치유하는 글을 작성해줘. 
결과는 반드시 다음 두 부분으로 명확히 나누어 작성해야 해:

1. [HEALING_MESSAGE]: 
- 사용자가 카드를 보고 쓴 "어떻게 보이는지"에 대한 내용을 리딩의 핵심 근거로 삼아 깊이 공감하고 수용해줘. (예: "카드의 구름이 무겁게 보인다고 하신 건, 지금 고민이 그만큼 묵직하게 다가오기 때문일지도 몰라요.")
- 마음을 어루만지는 치유의 메시지를 3~4문단으로 작성해.

2. [SOLUTION_TIP]: 
- 아주 사소하지만 지금 당장 실행할 수 있는 구체적인 행동 대안을 정확히 5가지 제안해줘.
- 솔루션 본문 내용은 반드시 "두괄식"으로 명료하게 표현해줘. (예시: "1. 이완훈련하기 : 긴장을 이완시키기 위해 심호흡을 1분 간격으로 해 보기")
- 반드시 "1. 2. 3. 4. 5."와 같이 번호를 매긴 리스트 형식으로 작성하고, 각 항목 사이에는 빈 줄(공백 라인)을 하나씩 넣어 가독성을 높여줘.

[반드시 지켜야 할 규칙]
- 전문 용어 절대 금지: '게슈탈트', '투사', '미해결 과제', '회피' 등의 단어를 직접 쓰지 마. 대신 "마음속에 남아있는 해결되지 않은 느낌들", "직접 마주하기 어려웠던 마음" 등으로 쉽게 풀어서 설명해.
- 판단이나 단정 절대 금지: "당신은 ~한 상태입니다", "~해야 합니다"와 같은 단정적인 표현은 피하고, "지금 마음이 ~하게 느껴질 수 있겠군요", "~일지도 모르겠어요"와 같이 부드럽고 공감적인 어조를 유지해.
- 마크다운 기호(예: **)를 절대 사용하지 말고 순수 텍스트로만 답변해.`;

    const userQuery = `내담자의 고민: ${concern}\n선택한 카드: ${selectedCard.name}\n내담자가 본 카드 이미지의 모습: ${observation}`;

    const fetchWithBackoff = async (retries = 5, delay = 1000) => {
      try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: userQuery }] }],
            systemInstruction: { parts: [{ text: systemPrompt }] }
          })
        });

        if (!response.ok) throw new Error('API Response Not OK');
        return await response.json();
      } catch (error) {
        if (retries > 0) {
          await new Promise(res => setTimeout(res, delay));
          return fetchWithBackoff(retries - 1, delay * 2);
        }
        throw error;
      }
    };

    try {
      const result = await fetchWithBackoff();
      const text = result.candidates?.[0]?.content?.parts?.[0]?.text || "";

      if (text) {
        const parts = text.split('[SOLUTION_TIP]');
        setAnalysis(parts[0].replace('[HEALING_MESSAGE]', '').trim());
        setSolutionTip(parts[1]?.trim() || "1. 자신의 마음을 돌보는 시간을 가져보세요.");
        setStep(4);
      }
    } catch (error) {
      setAnalysis("마음 연결에 실패했습니다. 다시 시도해 주세요.");
      setStep(4);
    } finally {
      setLoading(false);
    }
  };

  const getReportTemplate = () => {
    const cleanAnalysis = analysis.replace(/\*\*/g, '');
    const cleanSolution = solutionTip.replace(/\*\*/g, '');

    return `
    <!DOCTYPE html>
    <html lang="ko">
    <head>
      <meta charset="utf-8">
      <title>T-MAPP 결과 보고서</title>
      <style>
        @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css');

        @page { 
          size: A4; 
          margin: 0; 
        }

        body { 
          font-family: 'Pretendard', sans-serif; 
          margin: 0; 
          padding: 0; 
          background-color: #f4f4f4; 
          -webkit-print-color-adjust: exact; 
          font-size: 10.5pt;
        }

        /* flex-grow 문제를 해결한 안정적인 A4 고정 레이아웃 */
        .page { 
          width: 210mm; 
          height: 296.8mm; 
          padding: 20mm 20mm 30mm 20mm; /* 하단 여백 추가 */
          margin: 0 auto; 
          background: #fff; 
          box-sizing: border-box; 
          position: relative; 
          display: block; /* flex 해제 */
          overflow: hidden; /* 페이지 밖으로 나가는 내용 숨김 */
          page-break-after: always;
        }

        .page:last-child { 
          page-break-after: auto; 
        }

        .report-header { 
          background-color: #EBF5FB; 
          padding: 15px 25px; 
          border-radius: 12px; 
          margin-bottom: 15px; 
          display: flex; 
          justify-content: space-between; 
          align-items: center; 
          border: 1px solid #D6EAF8; 
        }

        .institution-name { font-size: 11pt; color: #566573; font-weight: 600; margin-bottom: 5px; display: block; }
        .report-title { font-size: 22pt; font-weight: 800; color: #1B4F72; margin: 0; letter-spacing: -0.5px; }
        .header-right { text-align: right; font-size: 9.5pt; color: #7F8C8D; }

        .section { margin-bottom: 15px; }
        .section-title { font-size: 14pt; font-weight: 700; color: #2E4053; margin-bottom: 15px; display: flex; align-items: center; gap: 8px; }
        .section-title::before { content: ''; display: inline-block; width: 6px; height: 18px; background-color: #85C1E9; border-radius: 3px; }

        .summary-container { display: flex; gap: 25px; align-items: flex-start; }
        .card-display { flex-shrink: 0; width: 130px; text-align: center; }
        .card-display img { width: 100%; border-radius: 8px; border: 1px solid #ddd; margin-bottom: 8px; }
        
        .field-box { background-color: #f9fafb; padding: 15px; border-radius: 8px; border: 1px solid #f0f0f0; margin-bottom: 15px; }
        .field-label { font-size: 10pt; font-weight: 700; color: #5DADE2; margin-bottom: 6px; display: block; text-transform: uppercase; }

        /* 치유 리딩 박스 레이아웃 변경 (flex-grow 제거, min-height 적용) */
        .healing-box { 
          border: 1px solid #D1D5DB; 
          border-radius: 10px; 
          padding: 20px; 
          background: #fff;
          min-height: 120mm; /* 남은 공간을 안정적으로 확보 */
          margin-bottom: 20px;
          page-break-inside: auto; 
        }

        .healing-content { 
          font-size: 10.5pt; 
          line-height: 1.7; 
          text-align: justify; 
          white-space: pre-wrap; 
          color: #000;
          word-break: keep-all; 
        }

        .solution-box { 
          border: 1.5px solid #5DADE2 !important; 
          border-radius: 12px; 
          padding: 25px; 
          position: relative; 
          background: #fff;
        }
        .solution-label-badge { position: absolute; top: -13px; left: 25px; background: white; padding: 0 12px; border: 1.5px solid #5DADE2; border-radius: 20px; font-weight: bold; font-size: 10.5pt; color: #5DADE2; }

        /* 푸터: 페이지 최하단 절대 위치 고정 */
        .report-footer { 
          position: absolute;
          bottom: 12mm;
          left: 20mm;
          right: 20mm;
          border-top: 1px dashed #D7DBDD; 
          padding-top: 10px;
          text-align: center; 
          font-size: 9pt; 
          color: #7F8C8D; 
        }

        .footer-institution { font-weight: bold; color: #222; font-size: 11pt; margin-bottom: 5px; }
        .page-number { position: absolute; bottom: 6mm; left: 50%; transform: translateX(-50%); font-size: 9pt; color: #999; }

        @media print {
          body { background: none; }
          .page { 
            margin: 0; 
            box-shadow: none; 
            border: none;
          }
        }
      </style>
    </head>
    <body>
      <div class="page">
        <div class="report-header">
          <div class="header-left">
            <span class="institution-name">싹(SSAC)심리상담센터&AI상담콘텐츠연구소</span>
            <h1 class="report-title">나의 마음 지도: T-MAPP 보고서</h1>
          </div>
          <div class="header-right" style="line-height: 1.5;">
            분석 일자: <b>${today}</b><br>
            학교/학년: <b>${school} ${grade}</b><br>
            성명: <b>${userName}</b>
          </div>
        </div>

        <div class="section">
          <h2 class="section-title">01. 상담 개요 및 주관적 투사</h2>
          <div class="summary-container">
            <div class="card-display">
              <img src="${selectedCard?.url}" alt="타로 카드" />
              <div style="font-size: 9pt; color: #7F8C8D; margin-top: 5px;">${selectedCard?.name}</div>
            </div>
            <div style="flex-grow: 1;">
              <div class="field-box">
                <span class="field-label">당신의 고민</span>
                <div style="font-size: 11pt;">${concern}</div>
              </div>
              <div class="field-box">
                <span class="field-label">당신의 시선</span>
                <div style="font-size: 11pt; font-style: italic; color: #555;">"${observation}"</div>
              </div>
            </div>
          </div>
        </div>

        <div class="section">
          <div class="healing-box">
            <h2 class="section-title">02. 마음을 어루만지는 시간 (Healing Reading)</h2>
            <div class="healing-content">${cleanAnalysis}</div>
          </div>
        </div>

        <div class="report-footer">
          <p class="footer-institution">싹(SSAC)심리상담센터&AI상담콘텐츠연구소</p>
        </div>
        <div class="page-number">1 / 2</div>
      </div>

      <div class="page">
        <div class="report-header">
          <div class="header-left">
            <span class="institution-name">싹(SSAC)심리상담센터&AI상담콘텐츠연구소</span>
            <h1 class="report-title">나의 마음 지도: T-MAPP 보고서</h1>
          </div>
        </div>

        <div class="section">
          <div class="solution-box">
            <div class="solution-label-badge">🌿 전문가가 전하는 솔루션</div>
            <div class="healing-content" style="font-weight: 500; margin-top: 10px;">${cleanSolution}</div>
          </div>
        </div>

        <div class="report-footer">
          <p class="footer-institution">싹(SSAC)심리상담센터&AI상담콘텐츠연구소</p>
          <p>상담문의: ssac-center.com | 본 결과지는 무단 복제를 금합니다.</p>
          <p style="margin-top: 5px;">본 결과지는 귀하의 심리적 안정과 자각을 돕기 위해 작성되었습니다.</p>
        </div>
        <div class="page-number">2 / 2</div>
      </div>
    </body>
    </html>
    `;
  };

  const handleSaveHTML = () => {
    const htmlContent = getReportTemplate();
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `상담레포트_${new Date().getTime()}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const resetAll = () => {
    setStep(1);
    setUserName('');
    setSchool('');
    setGrade('');
    setConcern('');
    setSelectedCard(null);
    setObservation('');
    setAnalysis('');
    setSolutionTip('');
    setRandomCards([]);
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 flex flex-col items-center p-4 md:p-8 font-sans relative">
      <header className="w-full max-w-4xl mb-12 text-center relative z-10">
        <h1 className="text-4xl font-extrabold text-indigo-600 mb-3 flex items-center justify-center gap-3">
          <Sparkles className="w-10 h-10" />
          마음을 읽는 타로상담
        </h1>
        <p className="text-gray-500 text-lg font-medium">전문가와 함께하는 지금, 여기의 치유</p>
      </header>

      <main className="flex-grow w-full max-w-4xl bg-gray-50/90 rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-gray-100 relative overflow-hidden z-10">

        {step === 1 && (
          <div className="w-full space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 flex flex-col items-center">
            <div className="text-center space-y-3">
              <h2 className="text-2xl font-bold text-gray-800">당신의 고민을 들려주시겠어요?</h2>
              <p className="text-gray-500">당신의 마음이 가리키는 방향을 함께 찾아보겠습니다.</p>
            </div>

            <div className="w-full max-w-2xl flex flex-col gap-4">
              <div className="flex flex-col md:flex-row gap-4">
                <input
                  type="text"
                  className="flex-1 p-5 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-indigo-400 outline-none transition-all bg-white text-lg shadow-inner"
                  placeholder="성명 (예: 홍길동)"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
                <input
                  type="text"
                  className="flex-1 p-5 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-indigo-400 outline-none transition-all bg-white text-lg shadow-inner"
                  placeholder="학교 (예: 싹초등학교)"
                  value={school}
                  onChange={(e) => setSchool(e.target.value)}
                />
                <input
                  type="text"
                  className="flex-1 p-5 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-indigo-400 outline-none transition-all bg-white text-lg shadow-inner"
                  placeholder="학년 (예: 6학년)"
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                />
              </div>
              <textarea
                className="w-full h-48 p-6 rounded-3xl border border-gray-200 focus:ring-2 focus:ring-indigo-400 outline-none transition-all resize-none bg-white text-lg shadow-inner"
                placeholder="최근 마음을 어지럽히는 고민이 있다면 무엇이든 적어보세요..."
                value={concern}
                onChange={(e) => setConcern(e.target.value)}
              />
            </div>

            <button
              onClick={handleGoToSelection}
              disabled={!userName.trim() || !school.trim() || !grade.trim() || !concern.trim()}
              className="w-full max-w-2xl py-5 bg-indigo-600 text-white rounded-2xl font-bold text-xl hover:bg-indigo-700 active:scale-[0.98] transition-all shadow-lg disabled:opacity-50"
            >
              상담 시작하기
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="w-full space-y-10 text-center animate-in fade-in duration-700">
            <h2 className="text-2xl font-bold">에너지가 닿는 카드를 선택하세요</h2>
            <div className="flex flex-wrap justify-center gap-6 py-4">
              {randomCards.map((_, idx) => (
                <div
                  key={idx}
                  onClick={() => handleCardPick(randomCards[idx])}
                  className="w-28 h-48 bg-indigo-950 rounded-xl shadow-2xl cursor-pointer hover:-translate-y-6 transition-all duration-500 flex items-center justify-center border-4 border-amber-200 relative group overflow-hidden"
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-500 via-indigo-900 to-indigo-950"></div>
                  <div className="absolute inset-2 border border-amber-200/30 rounded-lg pointer-events-none"></div>
                  <div className="relative z-10 flex flex-col items-center">
                    <Sparkles className="text-amber-300 w-12 h-12 group-hover:scale-125 transition-transform duration-500 drop-shadow-[0_0_8px_rgba(252,211,77,0.8)]" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 3 && selectedCard && (
          <div className="w-full grid md:grid-cols-2 gap-10 animate-in fade-in slide-in-from-right-4 duration-700">
            <div className="flex flex-col items-center space-y-4">
              <div className="w-56 h-96 rounded-2xl shadow-2xl overflow-hidden border-4 border-white">
                <img src={selectedCard.url} alt={selectedCard.name} className="w-full h-full object-cover" crossOrigin="anonymous" />
              </div>
              <p className="font-bold text-indigo-600 text-lg">{selectedCard.name}</p>
            </div>

            <div className="flex flex-col justify-center space-y-6">
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-gray-800 leading-snug">
                  이 그림이 어떻게 보이시나요?
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  카드 속 인물의 표정, 배경, 혹은 느껴지는 에너지에 대해 자유롭게 적어주세요.
                </p>
              </div>
              <textarea
                className="w-full h-40 p-5 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-indigo-400 outline-none transition-all resize-none bg-white shadow-inner"
                placeholder="보이는 대로 자유롭게 적어보세요."
                value={observation}
                onChange={(e) => setObservation(e.target.value)}
              />
              <button
                onClick={getExpertAnalysis}
                disabled={loading || !observation.trim()}
                className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold text-lg hover:bg-indigo-700 flex items-center justify-center gap-2 shadow-md disabled:opacity-50"
              >
                {loading ? <><Loader2 className="animate-spin" /> 리딩 중...</> : <><Send className="w-5 h-5" /> 내 마음 전하기</>}
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="w-full animate-in zoom-in duration-700 flex flex-col items-center gap-8">
            <div className="flex flex-col items-center space-y-3">
              <div className="w-44 h-72 bg-white rounded-xl shadow-lg overflow-hidden border-4 border-white">
                <img src={selectedCard?.url} alt="Card" className="w-full h-full object-cover" crossOrigin="anonymous" />
              </div>
              <h3 className="text-lg font-bold text-indigo-600">{selectedCard?.name}</h3>
            </div>

            <div className="w-full max-w-2xl space-y-8">
              <div className="bg-white p-8 rounded-[2rem] border-2 border-gray-300 shadow-sm relative">
                <div className="absolute top-0 right-8 -translate-y-1/2 bg-pink-500 px-4 py-1.5 rounded-full border border-pink-500 shadow-sm flex items-center gap-2 text-white font-bold text-sm">
                  <Heart className="w-4 h-4 fill-current text-white" />
                  치유의 리딩
                </div>
                <div className="text-gray-800 leading-relaxed text-lg whitespace-pre-wrap">
                  {analysis.replace(/\*\*/g, '')}
                </div>
              </div>

              <div className="bg-white p-8 pt-10 rounded-[2rem] border-2 border-indigo-600 shadow-sm relative overflow-visible">
                <div className="absolute top-0 right-8 -translate-y-1/2 bg-indigo-600 px-5 py-2 rounded-full shadow-md flex items-center gap-2 text-white font-bold text-sm z-20 whitespace-nowrap">
                  <CheckCircle2 className="w-4 h-4" />
                  전문가 솔루션
                </div>
                <div className="relative z-10 text-indigo-900 leading-relaxed text-lg whitespace-pre-wrap font-medium">
                  {solutionTip.replace(/\*\*/g, '')}
                </div>
                <Lightbulb className="absolute -bottom-6 -left-6 w-24 h-24 text-indigo-200/40" />
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <button
                  onClick={handleSaveHTML}
                  className="flex-1 flex items-center justify-center gap-2 py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-colors shadow-lg"
                >
                  <Download className="w-5 h-5" />
                  결과 저장하기
                </button>
                <button
                  onClick={resetAll}
                  className="flex-1 py-4 flex items-center justify-center gap-2 bg-gray-200 text-gray-700 rounded-2xl font-bold hover:bg-gray-300 transition-colors shadow-sm"
                >
                  <RefreshCcw className="w-5 h-5" />
                  다른 상담 시작
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="w-full max-w-4xl mt-12 pt-8 border-t border-gray-100 text-center relative z-10 space-y-2">
        <p className="text-gray-500 flex items-center justify-center gap-2 font-medium">
          <User className="w-5 h-5 text-gray-400" />
          싹(SSAC)심리상담센터 & AI상담 콘텐츠 연구소
        </p>
        <p className="text-sm text-gray-500">
          한국상담학회 교육연수기관(1급, 2급 수련기관)
        </p>
        <div className="text-sm text-gray-500 mt-2 flex justify-center gap-6">
          <span className="flex items-center gap-1.5 font-medium"><Phone className="w-4 h-4" /> 063-225-1400</span>
          <span className="flex items-center gap-1.5 font-medium"><Mail className="w-4 h-4" /> job636@hanmail.net</span>
        </div>
      </footer>
    </div>
  );
};

export default App;