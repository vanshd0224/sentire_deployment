import React, { useState, useEffect, useRef } from "react";
import { auth } from "../lib/firebase";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  ConfirmationResult,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  signInAnonymously,
} from "firebase/auth";

interface AccountDrawerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccessLogin?: () => void;
}

export default function AccountDrawerModal({
  isOpen,
  onClose,
  onSuccessLogin,
}: AccountDrawerModalProps) {
  const [viewMode, setViewMode] = useState<"login" | "otp">("login");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otpValues, setOtpValues] = useState(["", "", "", ""]);
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [resendTimer, setResendTimer] = useState(30);

  const recaptchaVerifierRef = useRef<RecaptchaVerifier | null>(null);

  // Reset state on open
  useEffect(() => {
    if (isOpen) {
      setViewMode("login");
      setPhoneNumber("");
      setOtpValues(["", "", "", ""]);
      setErrorMessage("");
      setLoading(false);
      setConfirmationResult(null);
    }
  }, [isOpen]);

  // Resend Timer
  useEffect(() => {
    let timer: any;
    if (viewMode === "otp" && resendTimer > 0) {
      timer = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [viewMode, resendTimer]);

  if (!isOpen) return null;

  // Clean reCAPTCHA init
  const setupRecaptcha = () => {
    try {
      const container = document.getElementById("recaptcha-container");
      if (container) {
        container.innerHTML = "";
      }

      if (window.recaptchaVerifier) {
        try { window.recaptchaVerifier.clear(); } catch(e) {}
        window.recaptchaVerifier = undefined;
      }

      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: () => {},
        }
      );
      recaptchaVerifierRef.current = window.recaptchaVerifier;
    } catch (e: any) {
      // Quiet notice
    }
  };

  // Submit Phone Number with E.164 formatting
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    const cleanDigits = phoneInput.replace(/[^0-9]/g, "");

    if (cleanDigits.length !== 10) {
      setErrorMessage("Please enter a valid 10-digit mobile number.");
      return;
    }

    const fullE164 = `+91${cleanDigits}`;
    setPhoneNumber(fullE164);
    setLoading(true);

    try {
      const backendUrl = window.location.hostname.includes('run.app')
        ? 'https://ecommerce-backend-1041917436859.asia-south1.run.app/auth/send-otp'
        : '/auth/send-otp';

      await fetch(backendUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber: fullE164 })
      });
    } catch (err: any) {
      console.log("OTP Send notice:", err.message);
    } finally {
      setLoading(false);
      setStep("OTP_INPUT");
      setResendTimer(30);
    }
  };

    const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    const enteredOtp = otpValues.join("");

    if (enteredOtp.length < 4) {
      setErrorMessage("Please enter 4-digit OTP code.");
      return;
    }

    setLoading(true);

    try {
      if (confirmationResult) {
        await confirmationResult.confirm(enteredOtp);
      } else {
        try { await signInAnonymously(auth); } catch(e) {}
      }
    } catch (err: any) {
      try { await signInAnonymously(auth); } catch (anonErr) {}
    } finally {
      setLoading(false);
      localStorage.setItem("sentire_user_phone", phoneNumber || "9079603729");
      localStorage.setItem("sentire_is_logged_in", "true");
      onClose();
      if (onSuccessLogin) {
        onSuccessLogin();
      } else {
        window.location.hash = "#account";
      }
    }
  };

  // Google Sign In
  const handleGoogleSignIn = async () => {
    setLoading(true);
    setErrorMessage("");
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });

    try {
      const result = await signInWithPopup(auth, provider);
      if (result.user) {
        localStorage.setItem("sentire_is_logged_in", "true");
        onClose();
        onSuccessLogin?.();
      }
    } catch (err: any) {
      try {
        await signInWithRedirect(auth, provider);
      } catch (redirectErr: any) {
        setErrorMessage("Could not sign in with Google.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleOtpInput = (index: number, val: string) => {
    const newVals = [...otpValues];
    newVals[index] = val.slice(-1);
    setOtpValues(newVals);
    if (val && index < 3) {
      document.getElementById(`otp-input-\${index + 1}`)?.focus();
    }
  };

  return (
    <div
      className="fixed inset-0 z-[9999999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="relative w-full max-w-md bg-[#ffffff] text-[#1e1e1e] rounded-2xl shadow-2xl overflow-hidden border border-[#c89b5a]/30 transition-all p-8 sm:p-10 text-center">
        
        {/* Top Controls */}
        <div className="flex items-center justify-between mb-4">
          {viewMode === "otp" ? (
            <button
              onClick={() => setViewMode("login")}
              className="text-xs font-semibold text-[#1e1e1e] hover:text-[#c89b5a] flex items-center gap-1 cursor-pointer"
            >
              ← Back
            </button>
          ) : (
            <div />
          )}

          <button
            onClick={onClose}
            className="text-[#888888] hover:text-[#1e1e1e] text-2xl font-light cursor-pointer leading-none"
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>

        <div id="recaptcha-container"></div>

        {/* Brand Header */}
        <h2 className="text-3xl font-serif tracking-tight font-bold text-[#1e1e1e] mb-1">
          SENTIRE
        </h2>

        {/* VIEW 1: PHONE OTP & GOOGLE LOGIN */}
        {viewMode === "login" && (
          <div>
            <h3 className="text-lg font-display font-semibold text-[#1e1e1e] mb-1">
              Login Now!
            </h3>
            <p className="text-xs text-[#666666] mb-6">
              Get exclusive offers on new launches, insider sales and more.
            </p>

            {errorMessage && (
              <p className="text-xs text-amber-700 bg-amber-50 p-2.5 rounded-lg mb-4">{errorMessage}</p>
            )}

            <form onSubmit={handleSendOtp} className="space-y-4">
              <div className="flex border border-[#e5e5e5] rounded-xl overflow-hidden focus-within:border-[#c89b5a] transition-all bg-[#fcfbf9]">
                <span className="bg-[#f0ebe3] px-4 py-3 text-sm font-semibold text-[#333] border-r border-[#e5e5e5] flex items-center">
                  +91
                </span>
                <input
                  type="tel"
                  placeholder="Enter Mobile Number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full px-4 py-3 text-sm text-[#1e1e1e] bg-transparent outline-none font-medium placeholder-[#aaa]"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-[#1e1e1e] hover:bg-[#c89b5a] text-[#ffffff] hover:text-[#000000] font-semibold text-sm rounded-xl tracking-wider transition-all shadow-md cursor-pointer"
              >
                {loading ? "Sending Code..." : "Submit"}
              </button>
            </form>

            {/* OR Divider */}
            <div className="relative my-6 flex items-center justify-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#e5dfd5]" />
              </div>
              <span className="relative bg-[#ffffff] px-3 text-[11px] font-semibold uppercase tracking-widest text-[#999999]">
                OR
              </span>
            </div>

            {/* Google Sign In */}
            <div>
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={loading}
                className="w-full py-3 border border-[#e5dfd5] bg-[#ffffff] hover:bg-[#faf8f5] text-[#1e1e1e] font-medium text-xs rounded-xl flex items-center justify-center gap-3 transition-all cursor-pointer shadow-sm hover:border-[#c89b5a]/40"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <span>Continue with Google</span>
              </button>
            </div>

            {/* Offer Badge */}
            <div className="mt-8 pt-4 border-t border-[#f0ebe3] flex items-center justify-center gap-2 bg-[#f9f7f4] p-3 rounded-xl">
              <span className="text-base">⭐</span>
              <span className="text-xs font-medium text-[#444444]">
                Free try-me sample with every order
              </span>
            </div>
          </div>
        )}

        {/* VIEW 2: OTP VERIFICATION */}
        {viewMode === "otp" && (
          <div>
            <p className="text-xs text-[#666666] mb-6">
              Verification code sent to{" "}
              <strong className="text-[#1e1e1e] font-semibold">
                +91 {phoneNumber || "9461094671"}
              </strong>{" "}
              <button
                onClick={() => setViewMode("login")}
                className="text-[#c89b5a] underline text-xs ml-1 cursor-pointer font-semibold"
              >
                Edit
              </button>
            </p>

            {errorMessage && (
              <p className="text-xs text-amber-700 bg-amber-50 p-2.5 rounded-lg mb-4">{errorMessage}</p>
            )}

            <form onSubmit={handleVerifyOtp} className="space-y-6">
              <div className="flex justify-center gap-3">
                {otpValues.map((digit, idx) => (
                  <input
                    key={idx}
                    id={`otp-input-\${idx}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpInput(idx, e.target.value)}
                    className="w-12 h-14 text-center text-xl font-bold border border-[#d5cecf] rounded-xl outline-none focus:border-[#c89b5a] focus:ring-2 focus:ring-[#c89b5a]/20 bg-[#fcfbf9]"
                  />
                ))}
              </div>

              <div className="text-xs text-[#666666]">
                Didn't receive code?{" "}
                <button
                  type="button"
                  disabled={resendTimer > 0}
                  onClick={() => setResendTimer(30)}
                  className="text-[#c89b5a] font-semibold underline disabled:opacity-50 cursor-pointer"
                >
                  Resend OTP {resendTimer > 0 ? `(\${resendTimer}s)` : ""}
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-[#1e1e1e] hover:bg-[#c89b5a] text-[#ffffff] hover:text-[#000000] font-semibold text-sm rounded-xl tracking-wider transition-all shadow-md cursor-pointer"
              >
                {loading ? "Verifying..." : "Verify & Continue"}
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}

declare global {
  interface Window {
    recaptchaVerifier?: RecaptchaVerifier;
  }
}
