// src/Components/Contact.jsx
// Requires: npm install @emailjs/browser framer-motion

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';

const EMAILJS_SERVICE_ID  = 'service_h8kslhm';
const EMAILJS_TEMPLATE_ID = 'template_zje7tri';
const EMAILJS_PUBLIC_KEY  = 'HxWlaunhO56_pmAPN';

// ─── Candidate profile ────────────────────────────────────────────────────────
const CANDIDATE_PROFILE = `
Candidate: Aditya Deshmukh
Experience: 1–4 years (target range)
Current level: Senior Software Developer / Full Stack Developer / Freelancer

Skills:
- Languages: Python, JavaScript, SQL, C/C++, Java, R, Excel/VBA
- Web: React (Vite), Node.js, Express.js, Django, Flask, HTML, CSS, Bootstrap, Tailwind CSS
- Databases: MongoDB, MySQL, Oracle, SQLite, BigQuery
- Data/Analytics: PySpark, pandas, NumPy, Scikit-learn, Matplotlib, Seaborn, Tableau, Power BI, Jupyter
- Cloud/Tools: Firebase, JWT Auth, REST APIs, Databricks, Apache Spark
- Other: Data Analysis, ETL, Dashboard Development, Market Data Monitoring

Recent projects:
- Birth Certificate Management System (React, Node.js, MongoDB, JWT)
- Hospital Appointment System (JS, jQuery, SQL, Bootstrap)
- Maharashtra Migration Analysis (PySpark, pandas, SQL, Seaborn)
- Grocery App in progress (React Native, Node.js, MongoDB)

Work history:
- Capgemini (2021–2024): Python, Flask, Django, SQL, Power BI, Excel Macros, Tableau
- Freelancer (2024–Present): Full stack apps, Firebase, MongoDB

Preferred roles: Full Stack Developer, Data Analyst, Backend Developer, Python Developer, Software Engineer
Preferred experience bracket: 1–4 years
`;

// ─── Careers URL map ──────────────────────────────────────────────────────────
const enc = (s) => encodeURIComponent(s);

// LinkedIn + Indeed links for any company + role
const getApplyLinks = (company, title) => {
  const q = `${company} ${title}`;
  return [
    { label: 'LinkedIn', url: `https://www.linkedin.com/jobs/search/?keywords=${enc(q)}&location=India` },
    { label: 'Indeed',   url: `https://in.indeed.com/jobs?q=${enc(q)}` },
  ];
};

// ─── AI Provider calls ────────────────────────────────────────────────────────
// ─── Helper: throws with status code so fallback chain can detect 429 ────────
const checkStatus = (res, name) => {
  if (res.status === 429) throw new Error(`RATE_LIMIT:${name}`);
  if (res.status === 401 || res.status === 403) throw new Error(`AUTH_ERROR:${name}`);
  if (!res.ok) throw new Error(`HTTP_ERROR:${name}:${res.status}`);
};

const callGemini = async (prompt) => {
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
    }
  );
  checkStatus(res, 'Gemini');
  const data = await res.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
  if (!text) throw new Error('EMPTY:Gemini');
  return text;
};

const callGroq = async (prompt) => {
  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'llama-3.1-8b-instant',
      max_tokens: 1500,
      messages: [{ role: 'user', content: prompt }],
    }),
  });
  checkStatus(res, 'Groq');
  const data = await res.json();
  const text = data.choices?.[0]?.message?.content || '';
  if (!text) throw new Error('EMPTY:Groq');
  return text;
};

const callOpenRouter = async (prompt) => {
  const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
      'HTTP-Referer': window.location.origin,
    },
    body: JSON.stringify({
      model: 'mistralai/mistral-7b-instruct:free',
      max_tokens: 1500,
      messages: [{ role: 'user', content: prompt }],
    }),
  });
  checkStatus(res, 'OpenRouter');
  const data = await res.json();
  const text = data.choices?.[0]?.message?.content || '';
  if (!text) throw new Error('EMPTY:OpenRouter');
  return text;
};

// ─── Job Finder ───────────────────────────────────────────────────────────────
function MatchBadge({ score }) {
  return (
    <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border flex-shrink-0 ${
      score >= 85
        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
        : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30'
    }`}>
      {score}%
    </span>
  );
}

function JobCard({ job, index }) {
  const links = getApplyLinks(job.company, job.title);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
      className="bg-gray-900 border border-gray-700/60 rounded-xl p-3 hover:border-cyan-500/40 transition-all duration-300 flex flex-col gap-2"
    >
      {/* Title + Badge */}
      <div className="flex items-start justify-between gap-1">
        <p className="text-white font-semibold text-[12px] leading-snug">{job.title}</p>
        <MatchBadge score={job.matchScore} />
      </div>

      {/* Location + Exp */}
      <div className="flex flex-wrap gap-x-2 text-[10px] text-gray-400">
        <span>{job.location}</span><span>·</span><span>{job.experience}</span>
      </div>

      {/* Skills */}
      <div className="flex flex-wrap gap-1">
        {job.skills.map((s, i) => (
          <span key={i} className="text-[9px] px-1.5 py-0.5 rounded bg-gray-800 text-gray-400 border border-gray-700">{s}</span>
        ))}
      </div>

      {/* Apply buttons */}
      <div className="flex gap-1.5 mt-auto pt-2 border-t border-gray-700/50">
        {links.map((link) => (
          <a key={link.label} href={link.url} target="_blank" rel="noopener noreferrer"
            className="flex-1 text-center text-[10px] px-2 py-1 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/20 transition-all font-medium">
            {link.label} ↗
          </a>
        ))}
      </div>
    </motion.div>
  );
}

function JobFinder() {
  const [company, setCompany]   = useState('');
  const [jobs, setJobs]         = useState([]);
  const [loading, setLoading]   = useState(false);
  const [status, setStatus]     = useState('');
  const [error, setError]       = useState('');
  const [cooldown, setCooldown] = useState(false);

  const findJobs = async () => {
    const trimmed = company.trim();
    if (!trimmed || cooldown) return;

    setLoading(true);
    setJobs([]);
    setError('');
    setStatus(`Searching ${trimmed}...`);
    setCooldown(true);
    setTimeout(() => setCooldown(false), 15000);

    const prompt = `You are a job search assistant. Based on this candidate profile:
${CANDIDATE_PROFILE}
Find ALL possible best-fit job openings at "${trimmed}" for someone with 1–4 years experience.
Return as many roles as possible (minimum 8, ideally 12+) as a JSON array sorted by matchScore descending.
Each object must have exactly these fields:
- id: realistic job ID this company uses
- company: "${trimmed}"
- title: job title
- location: city name in India, "Remote", or "Hybrid"
- experience: range like "1–3 yrs"
- matchScore: integer 70–99
- skills: array of 4 skill strings from the candidate profile
Do NOT include reason or applyUrl. Return ONLY valid JSON array, no markdown, no backticks.`;

    // ── Fallback chain: Groq → OpenRouter → Gemini ──
    // Groq first — most generous free tier, least likely to 429
    const providers = [
      { name: 'Groq',       call: () => callGroq(prompt) },
      { name: 'OpenRouter', call: () => callOpenRouter(prompt) },
      { name: 'Gemini',     call: () => callGemini(prompt) },
    ];

    let text = '';
    let usedProvider = '';

    for (let i = 0; i < providers.length; i++) {
      const provider = providers[i];
      const isLast = i === providers.length - 1;
      try {
        setStatus('Trying ' + provider.name + '...');
        text = await provider.call();
        usedProvider = provider.name;
        break;
      } catch (err) {
        console.warn(provider.name + ' failed:', err.message);
        if (!isLast) {
          setStatus(provider.name + ' busy, switching...');
          await new Promise((r) => setTimeout(r, 500));
        }
      }
    }

    try {
      if (!text) throw new Error('all_failed');
      const jsonMatch = text.match(/\[[\s\S]*\]/);
      if (!jsonMatch) throw new Error('no_json');
      const parsed = JSON.parse(jsonMatch[0]);
      setJobs(parsed.sort((a, b) => b.matchScore - a.matchScore));
      setStatus(parsed.length + ' roles found via ' + usedProvider);
    } catch {
      setError('All providers are busy. Please wait a moment and try again.');
      setStatus('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header row: title + glowing resume link */}
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-2xl font-bold text-white">Job Fit Finder</h3>
        <a
          href="https://drive.google.com/file/d/15mUJs3xX975Ze_DOUWD4aRgr7YGbAUin/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          className="resume-glow flex items-center gap-1.5 text-[11px] font-semibold text-cyan-400 px-3 py-1.5 rounded-lg border border-cyan-500/40 bg-cyan-500/10 hover:bg-cyan-500/20 hover:border-cyan-400 transition-all duration-300"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Resume
        </a>
      </div>
      <p className="text-gray-400 text-sm mb-5">
        Enter a company name to find roles that match my profile — 1–4 yrs, full stack &amp; data.
      </p>
      <div className="flex gap-2 mb-3">
        <input
          type="text" value={company}
          onChange={(e) => setCompany(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && findJobs()}
          placeholder="e.g. TCS, Google, Wipro..."
          className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors"
        />
        <button onClick={findJobs} disabled={loading || !company.trim() || cooldown}
          className="px-4 py-2.5 bg-cyan-500 hover:bg-cyan-400 disabled:opacity-40 disabled:cursor-not-allowed text-black font-semibold rounded-lg text-sm transition-all whitespace-nowrap">
          {loading ? '...' : cooldown ? 'Wait...' : 'Search'}
        </button>
      </div>

      <AnimatePresence mode="wait">
        {(status || error) && (
          <motion.p key={status || error} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className={`text-xs mb-3 flex items-center gap-1.5 ${error ? 'text-red-400' : 'text-gray-400'}`}>
            {loading && <span className="inline-block w-3 h-3 border-2 border-gray-600 border-t-cyan-400 rounded-full animate-spin" />}
            {error || status}
          </motion.p>
        )}
      </AnimatePresence>

      <div className="overflow-y-auto pr-1" style={{ maxHeight: '420px' }}>
        <div className="grid grid-cols-2 gap-2">
          {jobs.map((job, i) => <JobCard key={job.id + i} job={job} index={i} />)}
        </div>
        {jobs.length === 0 && !loading && !status && (
          <div className="flex items-center justify-center text-gray-600 text-sm text-center py-10">
            Search a company to see matched roles
          </div>
        )}
      </div>

      {jobs.length > 0 && (
        <p className="text-[10px] text-gray-700 mt-3 leading-relaxed">
          Job IDs are AI-generated for reference. Links go to official careers pages or Google — verify before applying.
        </p>
      )}
    </div>
  );
}

// ─── Contact Form ─────────────────────────────────────────────────────────────
function ContactForm() {
  const formRef               = useRef();
  const [sending, setSending] = useState(false);
  const [sent, setSent]       = useState(false);
  const [error, setError]     = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setError('');
    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        EMAILJS_PUBLIC_KEY
      );
      setSent(true);
    } catch (err) {
      console.error(err);
      setError('Failed to send. Please email me directly at adity.r.deshmukh3117@gmail.com');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <h3 className="text-2xl font-bold text-white mb-2">Get in Touch</h3>
      <p className="text-gray-400 text-sm mb-6">
        Have a project in mind or want to hire me? Drop a message and I'll get back to you.
      </p>

      {/* Social links */}
      <div className="flex gap-5 mb-6">
        <a href="https://www.linkedin.com/in/aditya-deshmukh-1a9a2a193/" target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
          LinkedIn
        </a>
      </div>

      {sent ? (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
          className="flex-1 flex flex-col items-center justify-center text-center py-10">
          <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mb-4">
            <svg className="w-7 h-7 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p className="text-white font-semibold text-lg mb-1">Message sent!</p>
          <p className="text-gray-400 text-sm">I'll get back to you soon.</p>
        </motion.div>
      ) : (
        <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-4 flex-1">
          <div>
            <label className="block text-xs text-gray-400 mb-1.5">Name</label>
            <input type="text" name="from_name" required placeholder="Your name"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors" />
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-1.5">Email</label>
            <input type="email" name="from_email" required placeholder="your@email.com"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors" />
          </div>
          <div className="flex-1">
            <label className="block text-xs text-gray-400 mb-1.5">Message</label>
            <textarea name="message" required placeholder="Tell me about your project or opportunity..." rows={5}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors resize-none" />
          </div>
          {error && <p className="text-xs text-red-400">{error}</p>}
          <button type="submit" disabled={sending}
            className="w-full py-3 bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-black font-semibold rounded-lg text-sm transition-all">
            {sending ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      )}
    </div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────
export default function Contact() {
  return (
    <section id="contact" className="py-20 bg-gray-950 text-white">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="text-center mb-14">
          <h2 className="text-4xl font-bold mb-3">Contact</h2>
          <p className="text-gray-400 text-sm max-w-lg mx-auto">
            Find the right role for me at your company, or just say hello.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-gray-800/40 border border-gray-700/50 rounded-2xl p-6 min-h-[580px] flex flex-col">
            <JobFinder />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gray-800/40 border border-gray-700/50 rounded-2xl p-6 min-h-[580px] flex flex-col">
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
}