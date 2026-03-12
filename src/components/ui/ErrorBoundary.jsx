// [Brand-adapted] — tokens from design-system.json | visual ref: photos/background/ + photos/logo/
import React from 'react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  
  static getDerivedStateFromError(error) { 
    return { hasError: true, error }; 
  }
  
  componentDidCatch(error, errorInfo) { 
    console.error("TechMarket Error Boundary:", error, errorInfo); 
  }
  
  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center min-h-screen bg-quantum-deep p-8 font-sans">
          <div className="max-w-md w-full glass-quantum border border-quantum-cyan/30 p-8 rounded-3xl shadow-neon-xl">
            <h1 className="text-3xl font-black text-quantum-cyan mb-4 italic text-3d-monumental">⚠️ ERROR DETECTADO</h1>
            <p className="text-white/40 mb-6 leading-relaxed holo-data text-xs">
              La aplicación ha encontrado un problema de sincronización. Por favor, intenta reiniciar el enlace.
            </p>
            <div className="bg-quantum-deep/80 p-4 rounded-xl border border-quantum-cyan/10 mb-8 overflow-x-auto">
              <pre className="text-[10px] text-quantum-cyan font-mono tracking-widest">
                {this.state.error?.toString()}
              </pre>
            </div>
            <button 
              onClick={() => window.location.reload()} 
              className="w-full py-4 neon-wave-btn text-quantum-cyan font-black rounded-xl transition-all shadow-neon-md tracking-[0.2em] text-xs uppercase"
            >
              REINTENTAR CARGA
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
