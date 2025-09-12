import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { MessageCircle, X } from "lucide-react";

const ChatbotWidget = () => {
  const [botOpen, setBotOpen] = useState(true);

  type ChatMsg = { role: 'bot' | 'user'; text: string };
  const Chatbot = () => {
    const [messages, setMessages] = useState<ChatMsg[]>([
      { role: 'bot', text: 'Halo! Aku Irsyad’s Portfolio Assistant. Mau gaya profesional atau santai Gen Z? Ketik: /tone professional atau /tone casual. Tanyakan apa saja: profil, skills, proyek, sertifikat, kontak, atau minta rekomendasi eksplorasi.' }
    ]);
    const [tone, setTone] = useState<'professional' | 'casual'>('professional');
    const [input, setInput] = useState('');
    const listRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
      listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' });
    }, [messages]);

    const scrollToSection = (id: string) => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        try { window.history.pushState(null, '', `#${id}`); } catch {}
      }
    };

    const setToneWithMessage = (mode: 'professional' | 'casual') => {
      setTone(mode);
      setMessages(prev => ([...prev, { role: 'bot', text: mode === 'professional' ? 'Tone diatur ke PROFESSIONAL. Aku akan jawab dengan gaya formal dan ringkas.' : 'Sip! Tone CASUAL diaktifkan. Santai tapi tetap informatif ya. 😎' }]));
    };

    const getBotReply = (userText: string): string => {
      const q = userText.trim();
      const t = q.toLowerCase();

      if (t.startsWith('/tone')) {
        if (t.includes('professional')) { setTone('professional'); return 'Tone diatur ke PROFESSIONAL. Aku akan jawab dengan gaya formal dan ringkas.'; }
        if (t.includes('casual')) { setTone('casual'); return 'Sip! Tone CASUAL diaktifkan. Santai tapi tetap informatif ya. 😎'; }
        return 'Gunakan /tone professional atau /tone casual untuk mengubah gaya bahasa.';
      }

      const isID = /^(apa|siapa|kenapa|bagaimana|kapan|dimana|dong|bro|gan|bang|kak|tolong|kontak|proyek|sertifikat|ipk|kuliah|portofolio|portfolio|hubungi)/i.test(t) || /[\u0100-\u024F\u1E00-\u1EFFa-z]/i.test(t) && t.includes('yang');

      const introProfessional = () => '**Tentang Saya\nNama saya Irsyad Faruq Ardiansyah, Fresh Graduate Informatika (GPA 3.56/4.00) dari Universitas Indraprasta PGRI.\nSaya berfokus pada Data Analysis: data cleaning, exploratory data analysis, hingga pembuatan model prediktif untuk mendukung pengambilan keputusan.\nTeknologi: Python, SQL, Excel, Power BI, Tableau, Looker Studio.\nTerbiasa menjembatani kebutuhan bisnis dan solusi teknis, serta kolaboratif dalam tim.\nTujuan: membangun solusi data yang measurable dan berdampak.';
      const introCasual = () => '**Tentang Aku\nHalo! Aku Irsyad, fresh grad Informatika (IPK 3.56) yang doyan ngulik data.\nSuka ngubah data mentah jadi insight, bikin model prediksi, dan dashboard yang cozy.\nTools: Python, SQL, Excel, Power BI, Tableau, Looker Studio.\nGoal: bantu tim makin cepat-tepat ambil keputusan. ✨';

      const skillsReply = () => (tone === 'professional' ? '**Skills Utama**' : '**Skill Utamaku**') +
        '\n- Programming: Python, SQL' +
        '\n- Data Analysis: Data Cleaning, EDA, Feature Engineering, Data Mining, Machine Learning, NLP' +
        '\n- Tools: Jupyter Notebook, Excel (Pivot, Advanced Formulas), MySQL Workbench, Power BI (DAX, Relationships), Tableau, Looker Studio' +
        '\n- Soft Skills: Analytical Thinking, Problem Solving, Team Collaboration, Business Acumen, Communication';

      const impactfulProject = () => (tone === 'professional' ? '**Project Paling Impactful**' : '**Project Paling Nendang**') +
        '\nMobile JKN Sentiment Analysis' +
        '\n- Data: 10.000+ ulasan Google Play (scraping).' +
        '\n- Teknik: cleaning, tokenization, sentiment labeling, keyword extraction.' +
        '\n- Temuan: pain points (login/OTP), positives (UI/registrasi).' +
        '\n- Dampak: bantu product team prioritasi perbaikan & UX.' +
        '\nTools: Python, NLP, Streamlit.';

      const whyHire = () => (tone === 'professional'
        ? '**Alasan merekrut saya**\n- Mindset analitis, fokus value bisnis.\n- Menjembatani kebutuhan bisnis dan solusi teknis.\n- Adaptif, kolaboratif, cepat belajar.\n- Pengalaman: data cleaning → modeling → visualisasi.'
        : '**Kenapa harus hire aku?**\n- Data-driven dan ngejar impact.\n- Nyambung ke bisnis tapi tetap teknis.\n- Fleksibel, teamwork, gercep belajar.\n- Udah kebukti dari data mentah sampai dashboard.'
      );

      const certificates = () => '**Certificates\n- BNSP: Computer Network Engineering (2022–2025)\n- MTCNA (2021–2024)\n- DQLab Bootcamp (Python, R, SQL) – 2023\n- Udemy: Excel & Google Sheets for Data Analysis – 2025';

      const projectsList = () => '**Projects\n1) World Layoffs (SQL + Power BI) — tren global, surge 2022, hotspot US & Eropa.\n2) Mobile JKN Sentiment (Python + NLP + Streamlit) — 10k+ review, login/OTP issue.\n3) Bike Sales (Analytics) — segmentasi >1k transaksi, high-value segment.\n4) Expert System CareerGuide.id (Python + Streamlit) — backward chaining, reasoning path.\n5) CKD Prediction (Python + ML) — >25 variabel klinis, prediksi risiko.';

      const contactInfo = () => (tone === 'professional' ? '**Kontak**' : '**Kontak Aku**') +
        '\n- Email: irsyad3254@gmail.com\n- WhatsApp: +62 877-7543-9677\n- LinkedIn: https://linkedin.com/in/IrsyadFaruqArdiansyah\n- Portfolio: https://porto-irsyad.netlify.app' +
        (tone === 'professional' ? '\nSilakan hubungi saya untuk kolaborasi atau peluang kerja.' : '\nPing aja kalau mau kolab atau ada project seru! 🚀');

      const learning = () => '**Learning Journey (Ongoing)**\n- SQL: CTEs, Triggers, Window Functions, Optimization\n- Excel: Advanced Formulas, Pivot, Cleaning\n- BI: Tableau (calc fields, bins), Power BI (DAX, relationships, drilldown)\n- ML/NLP: supervised & unsupervised, evaluation, basic DL';

      const orgExp = () => '**Organizational Experience\n- PKM-KC: RFID-based stadium seat selection (Android integrated) — passed funding.';
      const workExp = () => '**Work Experience\n- KOPINDOSAT (Freelance Drafter, 2024–2025) — blueprint rel, track layout, technical drawings.\n- Ministry of Agriculture (Intern, Nov 2019–Jan 2020) — input & arsip surat, Excel.\n- KORPOLAIRUD BAHARKAM POLRI (Intern, Aug–Oct 2019) — server maintenance/monitoring, ship plotting, IT troubleshooting.';

      const exploreCTA = () => (tone === 'professional'
        ? '\n\nLanjut eksplor: #projects, #skills, #certificates, atau #contact.'
        : '\n\nCek #projects, #skills, #certificates, atau langsung ke #contact! ✨');

      if (t === '/help' || t === 'help') {
        return '**Bantuan**\n- Tentang: "Tell me about yourself"\n- Skills\n- Work experience\n- Projects\n- Most impactful project\n- Certificates\n- Learning journey\n- Organizational experience\n- Contact\n- Ubah gaya: /tone professional | /tone casual';
      }
      if (/(tell me about|about yourself|perkenalkan|ceritakan|tell me)/i.test(t)) return (tone === 'professional' ? introProfessional() : introCasual()) + exploreCTA();
      if (/(skill|skills|keahlian|kemampuan)/i.test(t)) return skillsReply() + exploreCTA();
      if (/(impactful|paling (impact|berdampak)|terbaik|unggulan)/i.test(t) || /(project|proyek)/i.test(t) && /(impact|unggulan|favorit|paling)/i.test(t)) return impactfulProject() + exploreCTA();
      if (/(hire you|why hire|kenapa.*hire|kenapa.*rekrut|mengapa.*rekrut)/i.test(t)) return whyHire() + exploreCTA();
      if (/(certificate|certificates|sertifikat)/i.test(t)) { scrollToSection('certificates'); return certificates() + (isID ? '\n\n(Scroller ke Certificates...)' : '\n\n(Scrolling to Certificates...)') + exploreCTA(); }
      if (/(contact|kontak|email|wa|whatsapp|hubungi)/i.test(t)) { scrollToSection('contact'); return contactInfo() + (isID ? '\n\n(Scroller ke Contact...)' : '\n\n(Scrolling to Contact...)'); }
      if (/(project|proyek|portfolio|portofolio)/i.test(t)) { scrollToSection('projects'); return projectsList() + (isID ? '\n\n(Scroller ke Projects...)' : '\n\n(Scrolling to Projects...)') + exploreCTA(); }
      if (/(learn|learning|belajar|fokus)/i.test(t)) { scrollToSection('learning'); return learning() + (isID ? '\n\n(Scroller ke Learning...)' : '\n\n(Scrolling to Learning...)') + exploreCTA(); }
      if (/(organization|organizational|organisasi|pkm|pkm-kc)/i.test(t)) return orgExp() + exploreCTA();
      if (/(work experience|pengalaman kerja|intern|magang|kerja)/i.test(t)) { scrollToSection('experience'); return workExp() + (isID ? '\n\n(Scroller ke Experience...)' : '\n\n(Scrolling to Experience...)') + exploreCTA(); }
      if (/(gpa|ipk|education|kuliah|jurusan)/i.test(t)) return (tone === 'professional' ? 'Education: Informatics Engineering, Universitas Indraprasta PGRI (GPA 3.56/4.00).' : 'Kuliah Informatika di UNINDRA, IPK 3.56/4.00. 👍') + exploreCTA();
      if (/(about|tentang|profile|profil|about me|about irsyad)/i.test(t)) { scrollToSection('about'); return (tone === 'professional' ? introProfessional() : introCasual()) + (isID ? '\n\n(Scroller ke About...)' : '\n\n(Scrolling to About...)') + exploreCTA(); }

      if (/(recruiter|hr|dosen|lecture|formal|profesional)/i.test(t)) { setTone('professional'); return 'Baik, aku akan jawab dengan gaya profesional. Ada yang ingin diketahui terkait proyek/skills/kualifikasi?'; }
      if (/(bro|gan|bang|wkwk|haha|santai|gen z|gaul)/i.test(t)) { setTone('casual'); return 'Oke bro, santai aja. Mau bahas proyek paling ribet atau skill favorit? 😄'; }
      if (/(politik|jokes|random|di luar topik|outside scope)/i.test(t)) return 'Aku fokus ke profil/portofolio Irsyad ya. Tanyain seputar skills, proyek, sertifikat, atau kontak.';
      return (isID
        ? 'Hmm, belum nangkep. Coba: "Tell me about yourself", "Apa skill utama?", "Project paling impactful?", "/tone".'
        : 'I didn’t catch that. Try: "Tell me about yourself", "Top skills?", "Most impactful project?", or type /tone.'
      );
    };

    const sendMessage = () => {
      const text = input.trim();
      if (!text) return;
      setMessages(prev => ([...prev, { role: 'user', text }]));
      setInput('');
      setTimeout(() => setMessages(prev => ([...prev, { role: 'bot', text: getBotReply(text) }])), 250);
    };

    const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } };

    return (
      <div className="flex flex-col h-[min(60vh,520px)] min-h-[360px]">
        <div ref={listRef} className="flex-1 overflow-y-auto space-y-3 pr-1 py-2">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm whitespace-pre-line ${m.role === 'user' ? 'bg-blue-600 text-white rounded-br-sm' : 'bg-gray-100 text-gray-800 rounded-bl-sm'}`}>{m.text}</div>
            </div>
          ))}
        </div>
        <div className="mt-1 flex items-center gap-2 px-1">
          <span className="text-xs text-gray-500">Tone:</span>
          <button type="button" onClick={() => setToneWithMessage('professional')} className={`text-xs px-3 py-1 rounded-full border transition-colors ${tone === 'professional' ? 'bg-blue-50 text-blue-700 border-blue-200' : 'text-gray-600 border-gray-300 hover:bg-gray-50'}`}>Professional</button>
          <button type="button" onClick={() => setToneWithMessage('casual')} className={`text-xs px-3 py-1 rounded-full border transition-colors ${tone === 'casual' ? 'bg-blue-50 text-blue-700 border-blue-200' : 'text-gray-600 border-gray-300 hover:bg-gray-50'}`}>Casual</button>
        </div>
        <div className="mt-2 flex items-center gap-2 pt-2 border-t border-gray-200">
          <input type="text" value={input} onChange={e => setInput(e.target.value)} onKeyDown={onKeyDown} placeholder="Tulis pesan... (Enter untuk kirim)" className="min-w-0 flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
          <button type="button" onClick={sendMessage} className="shrink-0 bg-blue-600 text-white py-2 px-3 md:px-4 rounded-lg hover:bg-blue-700 transition-colors">Kirim</button>
        </div>
      </div>
    );
  };

  return (
    <div>
      {botOpen ? (
        <div className="fixed bottom-20 right-4 z-50 w-[min(96vw,440px)] md:w-[440px]">
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2 border-b bg-gray-50">
              <div>
                <div className="font-semibold leading-tight">Chad.Bot</div>
                <div className="text-[11px] text-gray-500">Ask about profile, skills, projects, certificates</div>
              </div>
              <button aria-label="Close chatbot" onClick={() => setBotOpen(false)} className="text-gray-500 hover:text-gray-700 p-1 rounded">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-3">
              <Chatbot />
            </div>
          </div>
        </div>
      ) : (
        <button
          aria-label="Open chatbot"
          onClick={() => setBotOpen(true)}
          className="fixed bottom-20 right-4 z-50 rounded-full bg-blue-600 text-white p-4 shadow-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          title="Open Chatbot"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};

export default ChatbotWidget;
