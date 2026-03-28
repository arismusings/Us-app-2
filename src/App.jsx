import { useState, useEffect } from "react";

const QUESTIONS = [
  { id: 1, type: "deep", category: "Values", text: "What does a 'good life' look like to you — be specific.", tag: "🧠 Deep Dive" },
  { id: 2, type: "this-or-that", category: "Lifestyle", text: "Would you rather: live in a big city or a quiet town?", options: ["Big city energy 🌆", "Quiet town life 🌿"], tag: "⚡ This or That" },
  { id: 3, type: "deep", category: "Family", text: "What's one thing from your childhood you want to recreate in your future?", tag: "🧠 Deep Dive" },
  { id: 4, type: "this-or-that", category: "Relationship Style", text: "When you're upset, do you need space or closeness?", options: ["I need space 🌙", "Hold me close 🤍"], tag: "⚡ This or That" },
  { id: 5, type: "deep", category: "Dreams", text: "What would you do with your life if money wasn't a factor?", tag: "🧠 Deep Dive" },
  { id: 6, type: "this-or-that", category: "Love Style", text: "Words of affirmation or acts of service?", options: ["Tell me you love me 💬", "Show me you love me 🛠️"], tag: "⚡ This or That" },
  { id: 7, type: "deep", category: "Conflict", text: "How do you typically behave when you're hurt by someone close to you?", tag: "🧠 Deep Dive" },
  { id: 8, type: "this-or-that", category: "Social Life", text: "Big group hangouts or intimate one-on-ones?", options: ["The more the merrier 🎉", "Just us two 🕯️"], tag: "⚡ This or That" },
  { id: 9, type: "this-or-that", category: "Ambition", text: "Would you rather be really good at one thing or pretty good at many?", options: ["Master of one 🎯", "Jack of all trades 🎪"], tag: "⚡ This or That" },
  { id: 10, type: "deep", category: "Future", text: "Where do you see yourself living in 10 years, and why?", tag: "🧠 Deep Dive" },
  { id: 11, type: "this-or-that", category: "Romance", text: "Spontaneous surprise or a carefully planned date?", options: ["Sweep me off my feet 🌹", "Plan every detail 📅"], tag: "⚡ This or That" },
  { id: 12, type: "deep", category: "Friendship", text: "What's something a best friend has done for you that you'll never forget?", tag: "🧠 Deep Dive" },
  { id: 13, type: "this-or-that", category: "Lifestyle", text: "Early bird or night owl?", options: ["Up with the sun 🌅", "Alive at midnight 🌙"], tag: "⚡ This or That" },
  { id: 14, type: "deep", category: "Growth", text: "What's a belief you held five years ago that you've completely changed?", tag: "🧠 Deep Dive" },
  { id: 15, type: "this-or-that", category: "Travel", text: "Luxury resort or backpacking adventure?", options: ["Five stars 🏨", "Off the beaten path 🎒"], tag: "⚡ This or That" },
  { id: 16, type: "deep", category: "Identity", text: "What part of your culture or background are you most proud of?", tag: "🧠 Deep Dive" },
  { id: 17, type: "this-or-that", category: "Home", text: "Hosting or being hosted?", options: ["Come to mine 🏡", "Take me somewhere ✨"], tag: "⚡ This or That" },
  { id: 18, type: "deep", category: "Vulnerability", text: "What's something you find hard to ask for help with?", tag: "🧠 Deep Dive" },
  { id: 19, type: "this-or-that", category: "Communication", text: "Long voice notes or long text messages?", options: ["Hear my voice 🎙️", "Read my words 💬"], tag: "⚡ This or That" },
  { id: 20, type: "deep", category: "Joy", text: "Describe a moment in the last year when you felt completely yourself.", tag: "🧠 Deep Dive" },
];

const ACTIVITIES = [
  { id: "a1", emoji: "🎙️", title: "Voice Note Challenge", desc: "Send a 60-second voice note describing your favourite memory from childhood.", type: "challenge" },
  { id: "a2", emoji: "📸", title: "Photo of Your World", desc: "Share a photo of something in your space that you've never told them about.", type: "challenge" },
  { id: "a3", emoji: "💌", title: "Three Unsaid Things", desc: "Write three things you've been thinking about them but haven't said yet.", type: "reflection" },
  { id: "a4", emoji: "🎵", title: "Soundtrack Swap", desc: "Send them 3 songs that describe how you feel when you're talking to them.", type: "challenge" },
  { id: "a5", emoji: "🌙", title: "End-of-Day Ritual", desc: "For one week, send a single sentence about the highlight of your day before bed.", type: "ritual" },
  { id: "a6", emoji: "🗺️", title: "Dream Date Plan", desc: "Plan your perfect first date in detail — location, time, what you'd wear, what you'd talk about.", type: "reflection" },
];

const QUIZ = {
  title: "Love Language Snapshot",
  questions: [
    { q: "When I'm feeling low, I most want my partner to...", options: ["Say something kind", "Do something helpful", "Hug me", "Spend time with me", "Surprise me with something"] },
    { q: "I feel most loved when...", options: ["They compliment me", "They take something off my plate", "Physical touch", "We spend quality time", "Thoughtful gifts"] },
    { q: "My ideal way to show love is...", options: ["Verbal affirmation", "Acts of service", "Physical affection", "Quality time", "Thoughtful gifts"] },
  ],
  languages: ["Words of Affirmation", "Acts of Service", "Physical Touch", "Quality Time", "Gift Giving"]
};

const palette = {
  bg: "#0d0d0f",
  surface: "#16161a",
  card: "#1c1c22",
  accent1: "#e8b4a0",
  accent2: "#a0c4e8",
  accent3: "#c4a0e8",
  text: "#f0ede8",
  muted: "#8a8590",
  border: "#2a2a32",
};

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    background: ${palette.bg};
    color: ${palette.text};
    font-family: 'DM Sans', sans-serif;
    font-weight: 300;
    min-height: 100vh;
  }

  .app {
    max-width: 420px;
    margin: 0 auto;
    min-height: 100vh;
    position: relative;
    overflow-x: hidden;
  }

  .noise {
    position: fixed;
    inset: 0;
    opacity: 0.03;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
    pointer-events: none;
    z-index: 0;
  }

  .glow {
    position: fixed;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    filter: blur(100px);
    opacity: 0.08;
    pointer-events: none;
    z-index: 0;
  }

  .glow-1 { background: ${palette.accent1}; top: -100px; right: -100px; }
  .glow-2 { background: ${palette.accent2}; bottom: 100px; left: -100px; }

  .content { position: relative; z-index: 1; padding: 0 20px 100px; }

  .header {
    padding: 48px 20px 32px;
    position: relative;
    z-index: 1;
  }

  .header-label {
    font-size: 11px;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: ${palette.accent1};
    margin-bottom: 8px;
    font-weight: 400;
  }

  .header-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 38px;
    font-weight: 300;
    line-height: 1.15;
    color: ${palette.text};
  }

  .header-title em {
    font-style: italic;
    color: ${palette.accent1};
  }

  .nav {
    display: flex;
    gap: 4px;
    padding: 0 20px 24px;
    position: relative;
    z-index: 1;
  }

  .nav-btn {
    flex: 1;
    padding: 10px 4px;
    background: transparent;
    border: 1px solid ${palette.border};
    border-radius: 10px;
    color: ${palette.muted};
    font-family: 'DM Sans', sans-serif;
    font-size: 11px;
    font-weight: 400;
    cursor: pointer;
    transition: all 0.2s ease;
    letter-spacing: 0.5px;
  }

  .nav-btn.active {
    background: ${palette.accent1}18;
    border-color: ${palette.accent1}60;
    color: ${palette.accent1};
  }

  .card {
    background: ${palette.card};
    border: 1px solid ${palette.border};
    border-radius: 20px;
    padding: 24px;
    margin-bottom: 16px;
    transition: transform 0.2s ease;
  }

  .card:active { transform: scale(0.99); }

  .tag {
    display: inline-block;
    font-size: 10px;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    padding: 4px 10px;
    border-radius: 20px;
    margin-bottom: 14px;
    font-weight: 500;
  }

  .tag-deep { background: ${palette.accent3}20; color: ${palette.accent3}; border: 1px solid ${palette.accent3}30; }
  .tag-tot { background: ${palette.accent2}20; color: ${palette.accent2}; border: 1px solid ${palette.accent2}30; }
  .tag-challenge { background: ${palette.accent1}20; color: ${palette.accent1}; border: 1px solid ${palette.accent1}30; }
  .tag-quiz { background: #a0e8c420; color: #a0e8c4; border: 1px solid #a0e8c430; }

  .q-text {
    font-family: 'Cormorant Garamond', serif;
    font-size: 22px;
    font-weight: 400;
    line-height: 1.4;
    color: ${palette.text};
    margin-bottom: 20px;
  }

  .option-btn {
    width: 100%;
    padding: 14px 18px;
    background: ${palette.surface};
    border: 1px solid ${palette.border};
    border-radius: 12px;
    color: ${palette.text};
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    font-weight: 300;
    text-align: left;
    cursor: pointer;
    margin-bottom: 10px;
    transition: all 0.2s ease;
  }

  .option-btn:hover { border-color: ${palette.accent1}60; background: ${palette.accent1}08; }
  .option-btn.selected { border-color: ${palette.accent1}; background: ${palette.accent1}15; color: ${palette.accent1}; }

  .answer-input {
    width: 100%;
    background: ${palette.surface};
    border: 1px solid ${palette.border};
    border-radius: 12px;
    padding: 16px;
    color: ${palette.text};
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    font-weight: 300;
    line-height: 1.6;
    resize: none;
    min-height: 120px;
    outline: none;
    transition: border-color 0.2s ease;
  }

  .answer-input:focus { border-color: ${palette.accent1}60; }
  .answer-input::placeholder { color: ${palette.muted}; }

  .save-btn {
    margin-top: 14px;
    width: 100%;
    padding: 14px;
    background: ${palette.accent1}20;
    border: 1px solid ${palette.accent1}50;
    border-radius: 12px;
    color: ${palette.accent1};
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    letter-spacing: 0.5px;
    transition: all 0.2s ease;
  }

  .save-btn:hover { background: ${palette.accent1}30; }
  .save-btn.saved { background: #a0e8c420; border-color: #a0e8c460; color: #a0e8c4; }

  .skip-btn {
    display: flex;
    align-items: center;
    gap: 5px;
    background: transparent;
    border: 1px solid ${palette.border};
    border-radius: 8px;
    color: ${palette.muted};
    font-family: 'DM Sans', sans-serif;
    font-size: 11px;
    font-weight: 400;
    cursor: pointer;
    padding: 5px 10px;
    transition: all 0.2s ease;
    letter-spacing: 0.5px;
    white-space: nowrap;
  }

  .skip-btn:hover { color: ${palette.text}; border-color: ${palette.muted}; }
  .skip-btn:disabled { opacity: 0.25; cursor: not-allowed; }

  .q-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 14px;
  }

  .activity-emoji { font-size: 28px; margin-bottom: 12px; display: block; }

  .activity-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 20px;
    font-weight: 400;
    margin-bottom: 8px;
    color: ${palette.text};
  }

  .activity-desc {
    font-size: 14px;
    color: ${palette.muted};
    line-height: 1.6;
    margin-bottom: 16px;
  }

  .divider {
    height: 1px;
    background: ${palette.border};
    margin: 4px 0 20px;
  }

  .section-label {
    font-size: 11px;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: ${palette.muted};
    margin-bottom: 16px;
    font-weight: 400;
  }

  .quiz-q {
    font-family: 'Cormorant Garamond', serif;
    font-size: 18px;
    font-weight: 400;
    margin-bottom: 16px;
    color: ${palette.text};
    line-height: 1.5;
  }

  .progress-bar {
    height: 2px;
    background: ${palette.border};
    border-radius: 2px;
    margin-bottom: 20px;
  }

  .progress-fill {
    height: 100%;
    background: linear-gradient(90deg, ${palette.accent1}, ${palette.accent3});
    border-radius: 2px;
    transition: width 0.4s ease;
  }

  .result-card {
    text-align: center;
    padding: 32px 24px;
  }

  .result-emoji { font-size: 48px; margin-bottom: 16px; display: block; }

  .result-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 28px;
    font-weight: 400;
    color: ${palette.accent1};
    margin-bottom: 12px;
  }

  .result-desc {
    font-size: 14px;
    color: ${palette.muted};
    line-height: 1.7;
  }

  .share-hint {
    margin-top: 20px;
    padding: 14px;
    background: ${palette.surface};
    border-radius: 12px;
    font-size: 13px;
    color: ${palette.muted};
    line-height: 1.6;
    text-align: left;
    border: 1px solid ${palette.border};
  }

  .share-hint strong { color: ${palette.accent1}; font-weight: 500; }

  .answers-list { margin-top: 16px; }

  .answer-item {
    padding: 14px;
    background: ${palette.surface};
    border-radius: 10px;
    margin-bottom: 8px;
    border: 1px solid ${palette.border};
  }

  .answer-q { font-size: 11px; color: ${palette.muted}; margin-bottom: 6px; letter-spacing: 0.5px; }
  .answer-a { font-size: 14px; color: ${palette.text}; line-height: 1.5; }

  .empty-state {
    text-align: center;
    padding: 48px 24px;
    color: ${palette.muted};
    font-size: 14px;
    line-height: 1.7;
  }

  .empty-icon { font-size: 36px; margin-bottom: 12px; display: block; }

  .streak-bar {
    display: flex;
    gap: 6px;
    margin-bottom: 20px;
  }

  .streak-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${palette.border};
  }

  .streak-dot.done { background: ${palette.accent1}; }
`;

// ─── SUPABASE CONFIG — replace these two values ───────────────────────────────
const SUPABASE_URL = "https://cfbtwknfrsvwhhbwlveq.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNmYnR3a25mcnN2d2hoYndsdmVxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ2NjExMzYsImV4cCI6MjA5MDIzNzEzNn0.fQtDclNwleoic-cGJxKfJ86mNJgvdNyUG-n_TLsF0hk";
// ──────────────────────────────────────────────────────────────────────────────

const sb = {
  async load(user_id) {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/ck_state?user_id=eq.${user_id}&select=*`, {
      headers: { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${SUPABASE_ANON_KEY}` }
    });
    const rows = await res.json();
    return rows?.[0] ?? null;
  },
  async save(user_id, data) {
    await fetch(`${SUPABASE_URL}/rest/v1/ck_state`, {
      method: "POST",
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        "Content-Type": "application/json",
        Prefer: "resolution=merge-duplicates",
      },
      body: JSON.stringify({ user_id, ...data, updated_at: new Date().toISOString() }),
    });
  }
};

// localStorage fallback — keeps UI snappy while Supabase syncs in background
const LS = {
  get: (key, fallback) => { try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch { return fallback; } },
  set: (key, val) => { try { localStorage.setItem(key, JSON.stringify(val)); } catch {} },
};

// Prompt user to pick a username on first load — this is their identity in Supabase
// Both you and him set a different user_id so data stays separate
function getUserId() {
  let id = localStorage.getItem("ck_user_id");
  if (!id) {
    id = prompt("Choose a username for this app (e.g. 'ari' or 'him') — you'll use this every time you open it:") || "user";
    id = id.trim().toLowerCase().replace(/\s+/g, "_");
    localStorage.setItem("ck_user_id", id);
  }
  return id;
}

const USER_ID = getUserId();

export default function App() {
  const [tab, setTab] = useState("today");
  const [syncing, setSyncing] = useState(true);
  const [syncError, setSyncError] = useState(false);

  const [answers, setAnswers] = useState(() => LS.get("ck_answers", {}));
  const [saved, setSaved] = useState(() => LS.get("ck_saved", {}));
  const [selectedOptions, setSelectedOptions] = useState(() => LS.get("ck_selected", {}));
  const [textAnswers, setTextAnswers] = useState(() => LS.get("ck_text", {}));
  const [quizStep, setQuizStep] = useState(() => LS.get("ck_quizStep", 0));
  const [quizAnswers, setQuizAnswers] = useState(() => LS.get("ck_quizAnswers", []));
  const [quizDone, setQuizDone] = useState(() => LS.get("ck_quizDone", false));
  const [completedActivities, setCompletedActivities] = useState(() => LS.get("ck_activities", {}));
  const [skippedIds, setSkippedIds] = useState(() => LS.get("ck_skipped", []));
  const [currentQIndex, setCurrentQIndex] = useState(() => LS.get("ck_qIndex", (new Date().getDate()) % QUESTIONS.length));

  // Load from Supabase on mount — overrides localStorage with cloud truth
  useEffect(() => {
    sb.load(USER_ID).then(row => {
      if (row) {
        if (row.answers)            { setAnswers(row.answers);                       LS.set("ck_answers", row.answers); }
        if (row.saved)              { setSaved(row.saved);                           LS.set("ck_saved", row.saved); }
        if (row.selected_options)   { setSelectedOptions(row.selected_options);      LS.set("ck_selected", row.selected_options); }
        if (row.text_answers)       { setTextAnswers(row.text_answers);              LS.set("ck_text", row.text_answers); }
        if (row.quiz_step != null)  { setQuizStep(row.quiz_step);                   LS.set("ck_quizStep", row.quiz_step); }
        if (row.quiz_answers)       { setQuizAnswers(row.quiz_answers);              LS.set("ck_quizAnswers", row.quiz_answers); }
        if (row.quiz_done != null)  { setQuizDone(row.quiz_done);                   LS.set("ck_quizDone", row.quiz_done); }
        if (row.activities)         { setCompletedActivities(row.activities);        LS.set("ck_activities", row.activities); }
        if (row.skipped_ids)        { setSkippedIds(row.skipped_ids);               LS.set("ck_skipped", row.skipped_ids); }
        if (row.q_index != null)    { setCurrentQIndex(row.q_index);                LS.set("ck_qIndex", row.q_index); }
      }
      setSyncing(false);
    }).catch(() => { setSyncError(true); setSyncing(false); });
  }, []);

  // Push full state to Supabase — called after every meaningful change
  const pushToCloud = (patch) => {
    sb.save(USER_ID, patch).catch(() => setSyncError(true));
  };

  const skipQuestion = () => {
    const newSkipped = [...skippedIds, QUESTIONS[currentQIndex].id];
    setSkippedIds(newSkipped);
    LS.set("ck_skipped", newSkipped);
    let next = (currentQIndex + 1) % QUESTIONS.length;
    let attempts = 0;
    while (attempts < QUESTIONS.length) {
      if (!newSkipped.includes(QUESTIONS[next].id) && !saved[QUESTIONS[next].id]) break;
      next = (next + 1) % QUESTIONS.length;
      attempts++;
    }
    setCurrentQIndex(next);
    LS.set("ck_qIndex", next);
    pushToCloud({ skipped_ids: newSkipped, q_index: next });
  };

  const todayQ = QUESTIONS[currentQIndex];
  const tomorrowQ = QUESTIONS[(currentQIndex + 1) % QUESTIONS.length];
  const skipsLeft = QUESTIONS.length - skippedIds.length - Object.keys(saved).length;
  const streak = Math.min(Object.keys(saved).length, 7);

  const saveAnswer = (id, answer) => {
    const newAnswers = { ...answers, [id]: answer };
    const newSaved = { ...saved, [id]: true };
    setAnswers(newAnswers);
    setSaved(newSaved);
    LS.set("ck_answers", newAnswers);
    LS.set("ck_saved", newSaved);
    pushToCloud({ answers: newAnswers, saved: newSaved });
  };

  const handleQuizAnswer = (optionIndex) => {
    const newAnswers = [...quizAnswers, optionIndex];
    setQuizAnswers(newAnswers);
    LS.set("ck_quizAnswers", newAnswers);
    if (quizStep < QUIZ.questions.length - 1) {
      setQuizStep(quizStep + 1);
      LS.set("ck_quizStep", quizStep + 1);
      pushToCloud({ quiz_answers: newAnswers, quiz_step: quizStep + 1 });
    } else {
      setQuizDone(true);
      LS.set("ck_quizDone", true);
      pushToCloud({ quiz_answers: newAnswers, quiz_done: true });
    }
  };

  const getLoveLanguage = () => {
    const counts = [0, 0, 0, 0, 0];
    quizAnswers.forEach(a => counts[a]++);
    const max = Math.max(...counts);
    return QUIZ.languages[counts.indexOf(max)];
  };

  const loveLanguageEmojis = {
    "Words of Affirmation": "💬",
    "Acts of Service": "🛠️",
    "Physical Touch": "🤍",
    "Quality Time": "⏳",
    "Gift Giving": "🎁",
  };

  return (
    <>
      <style>{styles}</style>
      <div className="app">
        <div className="noise" />
        <div className="glow glow-1" />
        <div className="glow glow-2" />

        <div className="header">
          <div className="header-label">Connection Kit</div>
          <h1 className="header-title">
            building <em>us</em>,<br />one day at a time
          </h1>
          <div style={{ marginTop: 10, fontSize: 11, color: syncError ? "#e8a0a0" : palette.muted, display: "flex", alignItems: "center", gap: 5 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: syncError ? "#e8a0a0" : syncing ? palette.muted : "#a0e8c4", display: "inline-block" }} />
            {syncError ? "Couldn't reach cloud — saved locally" : syncing ? "Syncing…" : `Signed in as ${USER_ID} · saved to cloud`}
          </div>
        </div>

        <div className="nav">
          {[["today", "Today"], ["activities", "Activities"], ["quiz", "Quiz"], ["answers", "Our Answers"]].map(([id, label]) => (
            <button key={id} className={`nav-btn ${tab === id ? "active" : ""}`} onClick={() => setTab(id)}>
              {label}
            </button>
          ))}
        </div>

        <div className="content">

          {tab === "today" && (
            <>
              <div className="streak-bar">
                {Array.from({ length: 7 }).map((_, i) => (
                  <div key={i} className={`streak-dot ${i < streak ? "done" : ""}`} />
                ))}
                <span style={{ fontSize: 11, color: palette.muted, marginLeft: 4, lineHeight: "8px", alignSelf: "center" }}>
                  {streak} day{streak !== 1 ? "s" : ""} answered
                </span>
              </div>

              <div className="section-label">Today's Question</div>
              <div className="card">
                <div className="q-header">
                  <span className={`tag ${todayQ.type === "deep" ? "tag-deep" : "tag-tot"}`} style={{ marginBottom: 0 }}>{todayQ.tag}</span>
                  {!saved[todayQ.id] && (
                    <button
                      className="skip-btn"
                      onClick={skipQuestion}
                      disabled={skipsLeft <= 1}
                      title={skipsLeft <= 1 ? "No more questions to skip to" : "Skip this question"}
                    >
                      ↻ not feeling this one
                    </button>
                  )}
                </div>
                <p className="q-text" style={{ marginTop: 14 }}>{todayQ.text}</p>

                {todayQ.type === "this-or-that" ? (
                  <>
                    {todayQ.options.map((opt, i) => (
                      <button
                        key={i}
                        className={`option-btn ${selectedOptions[todayQ.id] === i ? "selected" : ""}`}
                        onClick={() => {
                          const updated = { ...selectedOptions, [todayQ.id]: i };
                          setSelectedOptions(updated);
                          LS.set("ck_selected", updated);
                          pushToCloud({ selected_options: updated });
                        }}
                      >
                        {opt}
                      </button>
                    ))}
                    {selectedOptions[todayQ.id] !== undefined && (
                      <button
                        className={`save-btn ${saved[todayQ.id] ? "saved" : ""}`}
                        onClick={() => saveAnswer(todayQ.id, todayQ.options[selectedOptions[todayQ.id]])}
                      >
                        {saved[todayQ.id] ? "✓ Saved — share yours with them!" : "Save my answer"}
                      </button>
                    )}
                  </>
                ) : (
                  <>
                    <textarea
                      className="answer-input"
                      placeholder="Take your time with this one…"
                      value={textAnswers[todayQ.id] || ""}
                      onChange={e => {
                        const updated = { ...textAnswers, [todayQ.id]: e.target.value };
                        setTextAnswers(updated);
                        LS.set("ck_text", updated);
                        pushToCloud({ text_answers: updated });
                      }}
                    />
                    <button
                      className={`save-btn ${saved[todayQ.id] ? "saved" : ""}`}
                      onClick={() => saveAnswer(todayQ.id, textAnswers[todayQ.id])}
                      disabled={!textAnswers[todayQ.id]}
                    >
                      {saved[todayQ.id] ? "✓ Saved — share yours with them!" : "Save my answer"}
                    </button>
                  </>
                )}
              </div>

              <div className="share-hint">
                <strong>How it works:</strong> Answer today's question, save it, then share it with them. Ask them to do the same — then compare. The point isn't to agree. It's to understand.
              </div>

              <div style={{ height: 24 }} />
              <div className="section-label">Coming Tomorrow</div>
              <div className="card" style={{ opacity: 0.5 }}>
                <span className={`tag ${tomorrowQ.type === "deep" ? "tag-deep" : "tag-tot"}`}>{tomorrowQ.tag}</span>
                <p className="q-text" style={{ fontSize: 18 }}>{tomorrowQ.text}</p>
              </div>
            </>
          )}

          {tab === "activities" && (
            <>
              <div className="section-label">Connection Challenges</div>
              {ACTIVITIES.map(a => (
                <div className="card" key={a.id}>
                  <span className="activity-emoji">{a.emoji}</span>
                  <div className="activity-title">{a.title}</div>
                  <div className="activity-desc">{a.desc}</div>
                  <button
                    className={`save-btn ${completedActivities[a.id] ? "saved" : ""}`}
                    onClick={() => {
                      const updated = { ...completedActivities, [a.id]: true };
                      setCompletedActivities(updated);
                      LS.set("ck_activities", updated);
                      pushToCloud({ activities: updated });
                    }}
                  >
                    {completedActivities[a.id] ? "✓ Done! Did they do it too?" : "Mark as done"}
                  </button>
                </div>
              ))}
            </>
          )}

          {tab === "quiz" && (
            <>
              <div className="section-label">Love Language Quiz</div>
              {!quizDone ? (
                <div className="card">
                  <span className="tag tag-quiz">💗 Compatibility</span>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${(quizStep / QUIZ.questions.length) * 100}%` }} />
                  </div>
                  <p className="quiz-q">{QUIZ.questions[quizStep].q}</p>
                  {QUIZ.questions[quizStep].options.map((opt, i) => (
                    <button key={i} className="option-btn" onClick={() => handleQuizAnswer(i)}>
                      {opt}
                    </button>
                  ))}
                  <p style={{ fontSize: 12, color: palette.muted, marginTop: 8 }}>
                    Question {quizStep + 1} of {QUIZ.questions.length}
                  </p>
                </div>
              ) : (
                <div className="card result-card">
                  <span className="result-emoji">{loveLanguageEmojis[getLoveLanguage()]}</span>
                  <div className="result-title">{getLoveLanguage()}</div>
                  <p className="result-desc">
                    This is how you most naturally give and receive love. Share this with them and ask them to take the quiz too — then talk about what surprised you.
                  </p>
                  <div className="share-hint" style={{ marginTop: 20 }}>
                    <strong>Discussion prompt:</strong> "Does this feel accurate to you? What would I do that would mean the most to you right now?"
                  </div>
                  <button className="save-btn" style={{ marginTop: 16 }} onClick={() => { setQuizStep(0); setQuizAnswers([]); setQuizDone(false); LS.set("ck_quizStep", 0); LS.set("ck_quizAnswers", []); LS.set("ck_quizDone", false); pushToCloud({ quiz_step: 0, quiz_answers: [], quiz_done: false }); }}>
                    Retake quiz
                  </button>
                </div>
              )}
            </>
          )}

          {tab === "answers" && (
            <>
              <div className="section-label">My Saved Answers</div>
              {Object.keys(answers).length === 0 ? (
                <div className="card empty-state">
                  <span className="empty-icon">🌿</span>
                  Your answers will live here. Start with today's question and build your story together.
                </div>
              ) : (
                <div className="answers-list">
                  {Object.entries(answers).map(([id, answer]) => {
                    const q = QUESTIONS.find(q => q.id === parseInt(id));
                    return q ? (
                      <div className="answer-item" key={id}>
                        <div className="answer-q">{q.text}</div>
                        <div className="answer-a">{answer}</div>
                      </div>
                    ) : null;
                  })}
                </div>
              )}
              <div className="share-hint" style={{ marginTop: 8 }}>
                <strong>Tip:</strong> Screenshot your answers and send them. Ask them to send theirs back before you read each other's — keep it honest.
              </div>
            </>
          )}

        </div>
      </div>
    </>
  );
}
