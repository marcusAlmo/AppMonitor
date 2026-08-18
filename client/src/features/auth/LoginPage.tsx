import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from './useAuthStore';
import { useAppStore } from '../../store/useAppStore';
import { Button } from '../../components/ui';
import { Shield, Lock, Mail, ArrowRight, Sun, Moon, Cpu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Framer Motion Animation Variants ---
const bootSequence = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const bootItem = {
  hidden: { y: 15, opacity: 0, filter: 'blur(4px)' },
  visible: {
    y: 0,
    opacity: 1,
    filter: 'blur(0px)',
    transition: { type: 'spring', stiffness: 300, damping: 24 }
  },
};

// --- Custom Animated Circuit Traces ---
const DataTraces = () => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-70">
      <svg className="w-full h-full" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice">
        <defs>
          <filter id="glow-orange" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <filter id="glow-green" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        <g fill="none" strokeWidth="2" className="stroke-stone-300/30 dark:stroke-stone-700/30">
          <path d="M -100 300 L 200 300 L 300 400 L 300 1100" />
          <path d="M 1100 650 L 800 650 L 700 750 L -100 750" />
          <path d="M 600 -100 L 600 200 L 700 300 L 1100 300" />
        </g>

        <motion.path
          d="M -100 300 L 200 300 L 300 400 L 300 1100"
          fill="none" stroke="#f97316" strokeWidth="3" filter="url(#glow-orange)"
          initial={{ pathLength: 0, pathOffset: 1, opacity: 0 }}
          animate={{ pathLength: [0, 0.5, 0], pathOffset: [1, 0, 0], opacity: [0, 1, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
        <motion.path
          d="M 1100 650 L 800 650 L 700 750 L -100 750"
          fill="none" stroke="#10b981" strokeWidth="3" filter="url(#glow-green)"
          initial={{ pathLength: 0, pathOffset: 1, opacity: 0 }}
          animate={{ pathLength: [0, 0.5, 0], pathOffset: [1, 0, 0], opacity: [0, 1, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear", delay: 1.5 }}
        />
      </svg>
    </div>
  );
};

// --- Custom Code-Built Robot Character ---
const UtilitarianBot = () => {
  return (
    <div className="flex flex-col items-center justify-center relative w-24 h-24 mb-1">
      <motion.div className="w-1 h-3 bg-stone-900 dark:bg-stone-400 absolute top-2 z-0" />

      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        className="absolute top-5 w-12 h-10 border-2 border-stone-900 dark:border-stone-400 bg-stone-50 dark:bg-stone-900 flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(28,25,23,1)] dark:shadow-[4px_4px_0px_0px_rgba(168,162,158,0.2)] z-10"
      >
        <div className="w-8 h-4 bg-stone-900 dark:bg-stone-950 overflow-hidden relative border border-stone-700">
          <motion.div
            animate={{ x: [-10, 22, -10] }}
            transition={{ repeat: Infinity, duration: 3.5, ease: "linear" }}
            className="w-3 h-full bg-white shadow-[0_0_8px_2px_rgba(255,255,255,0.8)]"
          />
        </div>
      </motion.div>

      <motion.div
        animate={{ opacity: [0.4, 0.8, 0.4], scale: [0.8, 1.2, 0.8] }}
        transition={{ repeat: Infinity, duration: 0.6 }}
        className="absolute bottom-5 w-3 h-3 bg-white/60 rounded-full blur-[3px]"
      />

      <motion.div
        animate={{ scale: [1, 0.75, 1], opacity: [0.4, 0.15, 0.4] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        className="absolute bottom-1 w-10 h-1.5 bg-stone-900/50 dark:bg-black/60 rounded-[100%]"
      />
    </div>
  );
};

export const LoginPage: React.FC = () => {
  const { login } = useAuthStore();
  const { isDark, toggleDark } = useAppStore();
  const navigate = useNavigate();

  const [email, setEmail] = useState('admin@appmonitor.ai');
  const [password, setPassword] = useState('••••••••••••');
  const [isLoading, setIsLoading] = useState(false);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  const titleText = "SIGN IN TO PLATFORM".split("");

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      login('admin');
      setIsLoading(false);
      navigate('/tickets');
    }, 1500);
  };

  return (
    <div className={isDark ? 'dark' : ''}>
      <div className="relative min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 flex flex-col items-center justify-center p-4 sm:p-8 transition-colors duration-300 overflow-hidden">

        <DataTraces />
        <div className="absolute inset-0 bg-[radial-gradient(#80808044_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none z-0" />

        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-md border-2 border-stone-900 dark:border-stone-400 bg-stone-50 dark:bg-stone-900 shadow-[8px_8px_0px_0px_rgba(28,25,23,1)] dark:shadow-[8px_8px_0px_0px_rgba(168,162,158,0.2)] overflow-hidden font-mono z-10"
        >
          {/* Header Bar */}
          <header className="border-b-2 border-stone-900 dark:border-stone-400 px-6 py-4 bg-stone-100 dark:bg-stone-950 flex items-center justify-between relative z-20">
            <div className="flex items-center gap-2.5">
              <Shield className="w-5 h-5 text-stone-900 dark:text-stone-100" />
              <div>
                <h1 className="text-xs font-semibold uppercase tracking-widest leading-none">APPMONITOR</h1>
                <span className="text-[9px] text-stone-500 uppercase tracking-tighter block mt-0.5">AUTHENTICATION GATEWAY</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={toggleDark}
                className="p-1.5 border border-stone-900/30 dark:border-stone-400 text-stone-900 dark:text-stone-100 hover:bg-stone-200 dark:hover:bg-stone-800 transition-colors cursor-pointer"
                title="Toggle Theme"
              >
                {isDark ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5" />}
              </button>
            </div>
          </header>

          {/* Hero Banner with Soft Caged Orange & Green Aurora Blobs */}
          <div className="relative h-[210px] w-full flex flex-col items-center justify-center p-6 text-center border-b-2 border-stone-900 dark:border-stone-400 overflow-hidden bg-stone-900">

            {/* Floating Orange Aurora Blob */}
            <motion.div
              animate={{
                x: [-20, 20, -20],
                y: [-10, 15, -10],
                scale: [1, 1.15, 1],
              }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="absolute -top-10 -left-10 w-44 h-44 bg-orange-600/70 rounded-full blur-[45px] pointer-events-none"
            />

            {/* Floating Green Aurora Blob */}
            <motion.div
              animate={{
                x: [20, -15, 20],
                y: [10, -20, 10],
                scale: [1.1, 0.9, 1.1],
              }}
              transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
              className="absolute -bottom-10 -right-10 w-44 h-44 bg-emerald-600/60 rounded-full blur-[45px] pointer-events-none"
            />

            {/* Scanline overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0)_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px] pointer-events-none mix-blend-overlay z-10" />

            <div className="z-20 relative flex flex-col items-center w-full">
              <UtilitarianBot />

              {/* CREATIVE TITLE REVEAL (Non-Mono, Chunky Sans) */}
              <div className="mt-3 flex items-center justify-center font-sans">
                <span className="text-emerald-500/70 text-2xl font-light mr-2 select-none">[</span>
                <h2 className="text-xl font-black uppercase tracking-tighter text-white flex items-center justify-center drop-shadow-md">
                  {titleText.map((char, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 + 0.5, duration: 0.3 }}
                      className={char === " " ? "w-1.5" : ""}
                    >
                      {char}
                    </motion.span>
                  ))}
                  {/* Blinking Terminal Cursor Block */}
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ repeat: Infinity, duration: 0.8, ease: "steps(2)" }}
                    className="w-3 h-5 bg-emerald-500 ml-1.5 inline-block"
                  />
                </h2>
                <span className="text-emerald-500/70 text-2xl font-light ml-2 select-none">]</span>
              </div>
            </div>
          </div>

          {/* Form Body */}
          <motion.form
            variants={bootSequence}
            initial="hidden"
            animate="visible"
            onSubmit={handleLoginSubmit}
            className="p-6 space-y-4 bg-stone-50 dark:bg-stone-900 relative z-20"
          >
            <AnimatePresence>
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-20 bg-stone-50/90 dark:bg-stone-900/90 backdrop-blur-sm flex flex-col items-center justify-center border-b-2 border-stone-900 dark:border-stone-400"
                >
                  <Cpu className="w-8 h-8 text-emerald-600 dark:text-emerald-400 animate-pulse mb-3" />
                  <span className="text-xs font-bold uppercase tracking-widest text-stone-900 dark:text-stone-100">
                    AUTHENTICATING...
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-3">
              <motion.div variants={bootItem}>
                <label className="block text-[10px] uppercase text-stone-500 mb-1 flex items-center gap-1.5 font-semibold">
                  <Mail className={`w-3.5 h-3.5 transition-colors ${focusedInput === 'email' ? 'text-emerald-600 dark:text-emerald-400' : 'text-stone-500'}`} />
                  WORK EMAIL ADDRESS
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-stone-400 dark:text-stone-600 font-bold">{'>'}</span>
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onFocus={() => setFocusedInput('email')}
                    onBlur={() => setFocusedInput(null)}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@appmonitor.ai"
                    className="w-full pl-8 pr-3 py-2 bg-stone-100 dark:bg-stone-950 border-2 border-stone-900 dark:border-stone-700 text-xs font-mono text-stone-900 dark:text-stone-100 focus:outline-none focus:border-emerald-600 dark:focus:border-emerald-500"
                  />
                </div>
              </motion.div>

              <motion.div variants={bootItem}>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-[10px] uppercase text-stone-500 flex items-center gap-1.5 font-semibold">
                    <Lock className={`w-3.5 h-3.5 transition-colors ${focusedInput === 'password' ? 'text-emerald-600 dark:text-emerald-400' : 'text-stone-500'}`} />
                    PASSWORD
                  </label>
                  <a href="#forgot" onClick={(e) => e.preventDefault()} className="text-[9px] text-emerald-600 dark:text-emerald-400 hover:underline uppercase">
                    FORGOT?
                  </a>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-stone-400 dark:text-stone-600 font-bold">{'>'}</span>
                  </div>
                  <input
                    type="password"
                    required
                    value={password}
                    onFocus={() => setFocusedInput('password')}
                    onBlur={() => setFocusedInput(null)}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-8 pr-3 py-2 bg-stone-100 dark:bg-stone-950 border-2 border-stone-900 dark:border-stone-700 text-xs font-mono text-stone-900 dark:text-stone-100 focus:outline-none focus:border-emerald-600 dark:focus:border-emerald-500"
                  />
                </div>
              </motion.div>
            </div>

            <motion.div variants={bootItem} className="pt-2">
              <Button type="submit" variant="primary" size="md" disabled={isLoading} className="w-full gap-2 relative border-2 border-stone-900 dark:border-stone-100">
                LOG IN
                <ArrowRight className="w-4 h-4" />
              </Button>
            </motion.div>

            {/* Quick Sample Demo Accounts Section */}
            <motion.div variants={bootItem} className="pt-4 border-t-2 border-dashed border-stone-300 dark:border-stone-800 space-y-2">
              <div className="flex justify-between items-center text-[9px] text-stone-500 font-semibold uppercase">
                <span>SAMPLE DEMO ACCOUNTS (CLICK TO AUTOFILL):</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { role: 'ADMIN', color: 'emerald', email: 'admin@appmonitor.ai', desc: 'Full System Ops' },
                  { role: 'PARTNER', color: 'orange', email: 'marcus@acme-inc.io', desc: 'Acme Corp Admin' },
                  { role: 'END-USER', color: 'violet', email: 'alex@acme-inc.io', desc: 'Client Support' }
                ].map((demo) => (
                  <button
                    key={demo.role}
                    type="button"
                    onClick={() => {
                      setEmail(demo.email);
                      setPassword('demo123');
                      login(demo.role.toLowerCase() === 'end-user' ? 'user' : demo.role.toLowerCase());
                      navigate('/tickets');
                    }}
                    className={`p-2 border-2 border-stone-300 dark:border-stone-800 bg-stone-100 dark:bg-stone-950 hover:border-${demo.color}-500 dark:hover:border-${demo.color}-400 hover:-translate-y-0.5 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)] dark:hover:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)] transition-all text-left cursor-pointer`}
                  >
                    <span className={`text-[9px] font-semibold text-${demo.color}-600 dark:text-${demo.color}-400 block mb-0.5`}>{demo.role}</span>
                    <span className="text-[8px] text-stone-500 block truncate">{demo.desc}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.form>

          {/* Footer */}
          <footer className="border-t-2 border-stone-900 dark:border-stone-400 px-6 py-3 bg-stone-100 dark:bg-stone-950 font-mono text-[9px] text-stone-500 flex justify-between relative z-20">
            <span>STATUS: ONLINE</span>
            <span>DEVIN INTEGRATION ACTIVE</span>
          </footer>
        </motion.div>
      </div>
    </div>
  );
};