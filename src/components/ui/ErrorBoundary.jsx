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
        <div className="flex items-center justify-center min-h-screen bg-brand-bg p-8 font-sans">
          <div className="max-w-md w-full bg-brand-card border border-brand-pink/30 p-8 rounded-2xl shadow-2xl">
            <h1 className="text-3xl font-black text-brand-pink mb-4 italic">⚠️ ERROR DETECTADO</h1>
            <p className="text-gray-400 mb-6 leading-relaxed">
              La aplicación ha encontrado un problema inesperado. Por favor, intenta recargar la página.
            </p>
            <div className="bg-black/40 p-4 rounded-xl border border-white/5 mb-8 overflow-x-auto">
              <pre className="text-xs text-brand-pink font-mono">
                {this.state.error?.toString()}
              </pre>
            </div>
            <button 
              onClick={() => window.location.reload()} 
              className="w-full py-4 bg-brand-pink text-white font-black rounded-xl hover:bg-white hover:text-brand-pink transition-all shadow-[0_10px_20px_rgba(255,45,149,0.3)]"
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
