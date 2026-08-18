import { useState } from 'react'
import reactLogo from './assets/react.svg'
import { useAppStore } from './store/useAppStore'

function App() {
  const { count, increment, reset } = useAppStore()
  const [isDark, setIsDark] = useState(false)

  return (
    <div className={`${isDark ? 'dark' : ''} min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 transition-colors duration-200 p-6 md:p-12 flex flex-col items-center justify-center`}>
      
      {/* Outer Dashboard Card Wrapper */}
      <div className="w-full max-w-xl border border-stone-900 dark:border-stone-400 bg-stone-100 dark:bg-stone-900 rounded-none flex flex-col relative transition-colors duration-200">
        
        {/* Header Block: Hard line, stark uppercase text */}
        <header className="flex items-center justify-between border-b border-stone-900 dark:border-stone-400 px-6 py-4 bg-stone-50 dark:bg-stone-950 transition-colors duration-200">
          <div className="flex items-center gap-3">
            <h1 className="text-xs font-bold tracking-widest text-stone-900 dark:text-stone-50 uppercase font-sans">
              AppMonitor // Core Output
            </h1>
          </div>
          
          <button 
            onClick={() => setIsDark(!isDark)}
            className="px-3 py-1 border border-stone-900 dark:border-stone-300 text-stone-900 dark:text-stone-100 bg-stone-100 dark:bg-stone-800 text-[10px] font-mono uppercase hover:bg-stone-200 dark:hover:bg-stone-700 transition-none cursor-pointer"
          >
            Mode: {isDark ? 'Dark' : 'Light'}
          </button>
        </header>

        {/* The Caged Aurora Section */}
        {/* overflow-hidden creates the "solid edges" for the gradient blobs */}
        <div className="relative h-44 w-full overflow-hidden border-b border-stone-900 dark:border-stone-400 bg-stone-50 dark:bg-stone-950 transition-colors duration-200">
          
          {/* Animated Aurora Blobs */}
          <div className="absolute top-[-20%] left-[-10%] w-56 h-56 bg-aurora-orange/40 dark:bg-aurora-orange/50 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl animate-blob"></div>
          <div className="absolute top-[-20%] right-[-10%] w-56 h-56 bg-aurora-rose/40 dark:bg-aurora-rose/50 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl animate-blob" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-[-30%] left-[20%] w-56 h-56 bg-aurora-amber/40 dark:bg-aurora-amber/50 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl animate-blob" style={{ animationDelay: '4s' }}></div>
          
          {/* Grid lines overlay for tech/grid paper aesthetic */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none"></div>

          {/* Foreground UI overlaid on the trapped aurora */}
          <div className="absolute inset-0 z-10 flex flex-col justify-between p-6">
            <div className="flex justify-between items-start">
              <span className="text-[10px] font-mono font-bold uppercase px-1.5 py-0.5 border border-stone-900/10 dark:border-stone-100/10 bg-stone-100/50 dark:bg-stone-900/50 backdrop-blur-xs">
                NODE_01 // LIVE
              </span>
              <span className="text-[10px] font-mono text-stone-500 dark:text-stone-400">
                TEMP: 38.6°C
              </span>
            </div>

            <div className="flex flex-col">
              <span className="text-4xl font-mono font-bold text-stone-900 dark:text-white leading-none">
                {count.toLocaleString()} reqs
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-stone-700 dark:text-stone-300 mt-1">
                Telemetry Log Volume
              </span>
            </div>
          </div>
        </div>

        {/* Body Control Section */}
        <div className="flex flex-col p-6 gap-6 bg-stone-50 dark:bg-stone-900 transition-colors duration-200">
          
          {/* Data details list */}
          <div className="grid grid-cols-3 gap-4 border-b border-stone-200 dark:border-stone-800 pb-5">
            <div className="flex flex-col">
              <span className="text-[9px] text-stone-400 dark:text-stone-500 uppercase font-mono">Uptime</span>
              <span className="text-sm font-mono font-medium">99.98%</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[9px] text-stone-400 dark:text-stone-500 uppercase font-mono">Latency</span>
              <span className="text-sm font-mono font-medium">42 ms</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[9px] text-stone-400 dark:text-stone-500 uppercase font-mono">Framework</span>
              <div className="flex items-center gap-1 mt-0.5">
                <img src={reactLogo} className="h-3.5 w-3.5 animate-spin" style={{ animationDuration: '10s' }} alt="React logo" />
                <span className="text-xs font-mono font-bold">React 19</span>
              </div>
            </div>
          </div>

          <p className="text-xs text-stone-600 dark:text-stone-400 font-sans leading-relaxed">
            System running at optimal temperatures. Telemetry logs captured and securely stored. Action required if error rate exceeds 0.05%.
          </p>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={increment}
              className="flex-1 border border-stone-900 dark:border-stone-100 text-stone-900 dark:text-stone-100 py-2.5 px-4 text-xs font-mono uppercase hover:bg-stone-900 hover:text-stone-50 dark:hover:bg-stone-100 dark:hover:text-stone-900 transition-colors focus:outline-none focus:ring-2 focus:ring-aurora-orange focus:ring-offset-2 dark:focus:ring-offset-stone-950 cursor-pointer"
            >
              Trigger System Log
            </button>
            
            <button
              onClick={reset}
              className="border border-dashed border-stone-400 dark:border-stone-600 text-stone-500 dark:text-stone-400 py-2.5 px-4 text-xs font-mono uppercase hover:bg-stone-200/50 dark:hover:bg-stone-800/50 transition-colors focus:outline-none focus:ring-2 focus:ring-stone-500 focus:ring-offset-2 dark:focus:ring-offset-stone-950 cursor-pointer"
            >
              Clear Counter
            </button>
          </div>

        </div>

        {/* Footer block */}
        <footer className="border-t border-stone-900 dark:border-stone-400 px-6 py-3 bg-stone-50 dark:bg-stone-950 text-[9px] font-mono text-stone-500 dark:text-stone-400 flex justify-between transition-colors duration-200">
          <span>AESTHETIC: CAGED AURORA</span>
          <span>VITE + TAILWIND v4</span>
        </footer>

      </div>
    </div>
  )
}

export default App
