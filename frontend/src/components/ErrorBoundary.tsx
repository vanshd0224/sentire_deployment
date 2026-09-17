import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("[React App ErrorBoundary caught error]:", error, errorInfo);
    this.setState({ error, errorInfo });
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen w-full bg-[#050505] text-[#eeebe5] flex flex-col items-center justify-center p-6 text-center">
          <div className="max-w-lg rounded-2xl border border-[#a4492e]/40 bg-[#151412] p-8 shadow-2xl">
            <h2 className="text-xl font-bold text-[#a4492e] font-display uppercase tracking-wider mb-2">
              Something went wrong
            </h2>
            <p className="text-sm text-gray-300 mb-6">
              An unexpected display issue occurred. We've captured the error to resolve it immediately.
            </p>
            {this.state.error && (
              <pre className="text-left bg-black/80 p-4 rounded-lg text-xs text-red-400 overflow-x-auto max-h-48 mb-6 border border-red-900/50">
                {this.state.error.toString()}
                {"\n"}
                {this.state.errorInfo?.componentStack}
              </pre>
            )}
            <button
              onClick={() => {
                this.setState({ hasError: false, error: null, errorInfo: null });
                window.location.reload();
              }}
              className="rounded-full bg-[#a4492e] px-8 py-3 text-xs font-bold uppercase tracking-[0.18em] text-black hover:bg-[#8a3b24] transition-all shadow-md cursor-pointer"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
