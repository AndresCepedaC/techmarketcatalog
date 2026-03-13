import React from 'react';
import * as Lucide from 'lucide-react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary atrapó un error crítico:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-quantum-deep flex flex-col items-center justify-center p-6 text-center">
          <div className="relative floating-island border-danger-red/30 p-12 max-w-lg w-full flex flex-col items-center">
            <div className="absolute inset-0 bg-danger-red/5 blur-[100px] pointer-events-none rounded-full animate-pulse" />
            
            <Lucide.AlertOctagon size={64} className="text-danger-red mb-6 drop-shadow-[0_0_15px_rgba(255,42,95,0.8)] animate-pulse" />
            
            <h1 className="text-3xl font-black text-white uppercase tracking-tighter mb-2 text-shadow-sm">
              Critical System Failure
            </h1>
            
            <p className="text-danger-red/80 font-mono text-xs uppercase tracking-widest mb-8 holo-data border border-danger-red/20 bg-danger-red/10 px-4 py-2 rounded-lg">
              ERR_CODE // {this.state.error?.message || "UNKNOWN_FATAL"}
            </p>
            
            <button 
              onClick={() => window.location.reload()}
              className="px-8 py-4 bg-danger-red/10 border border-danger-red/50 text-danger-red font-black text-sm uppercase tracking-[0.2em] rounded-xl hover:bg-danger-red hover:text-white transition-all duration-300 shadow-[0_0_20px_rgba(255,42,95,0.2)] hover:shadow-[0_0_40px_rgba(255,42,95,0.6)] flex items-center gap-3"
            >
              <Lucide.RefreshCw size={18} />
              REINICIAR SISTEMA
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
