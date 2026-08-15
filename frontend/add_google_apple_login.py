import os

modal_path = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\src\components\AccountDrawerModal.tsx"

with open(modal_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Add Google and Apple providers import
content = content.replace(
    'signOut,',
    'signOut,\n  GoogleAuthProvider,\n  OAuthProvider,\n  signInWithPopup,'
)

# Add handler for Google and Apple sign in
google_apple_code = """
  // Google Sign In
  const handleGoogleSignIn = async () => {
    setLoading(true);
    setErrorMessage("");
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      setViewMode("overview");
    } catch (err: any) {
      console.error("Google Sign-In Error:", err);
      setErrorMessage("Could not sign in with Google.");
    } finally {
      setLoading(false);
    }
  };

  // Apple Sign In
  const handleAppleSignIn = async () => {
    setLoading(true);
    setErrorMessage("");
    try {
      const provider = new OAuthProvider("apple.com");
      await signInWithPopup(auth, provider);
      setViewMode("overview");
    } catch (err: any) {
      console.error("Apple Sign-In Error:", err);
      setErrorMessage("Could not sign in with Apple.");
    } finally {
      setLoading(false);
    }
  };
"""

content = content.replace(
    'const recaptchaVerifierRef = useRef<RecaptchaVerifier | null>(null);',
    google_apple_code + '\n  const recaptchaVerifierRef = useRef<RecaptchaVerifier | null>(null);'
)

# Add Google and Apple buttons right after Submit button on Login screen
buttons_jsx = """              <button
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

            {/* Social Login Buttons: Google & Apple */}
            <div className="space-y-2.5">
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={loading}
                className="w-full py-3 border border-[#e5dfd5] bg-[#ffffff] hover:bg-[#faf8f5] text-[#1e1e1e] font-medium text-xs rounded-xl flex items-center justify-center gap-3 transition-all cursor-pointer shadow-sm hover:border-[#c89b5a]/40"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>Continue with Google</span>
              </button>

              <button
                type="button"
                onClick={handleAppleSignIn}
                disabled={loading}
                className="w-full py-3 border border-[#1e1e1e] bg-[#1e1e1e] hover:bg-[#000000] text-[#ffffff] font-medium text-xs rounded-xl flex items-center justify-center gap-3 transition-all cursor-pointer shadow-sm"
              >
                <svg className="w-4 h-4 fill-current text-white" viewBox="0 0 170 170">
                  <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.33.13-9.13-1.9-14.4-6.08-3.56-2.9-7.58-7.77-12.06-14.61-6.72-10.22-12.02-21.84-15.91-34.86-3.89-13.02-5.83-25.22-5.83-36.6 0-14.28 3.56-26.06 10.68-35.34 7.12-9.28 16.03-14.04 26.74-14.27 4.1 0 8.87 1.08 14.32 3.23 5.45 2.15 9.4 3.23 11.87 3.23 2.11 0 6.21-1.14 12.3-3.42 6.09-2.28 11.07-3.3 14.94-3.07 10.74.83 19.34 4.88 25.8 12.15-9.61 5.79-14.32 13.82-14.12 24.1 0 8.01 2.94 14.92 8.82 20.73 5.88 5.81 12.98 9.07 21.3 9.78-1.92 5.84-4.53 11.81-7.83 17.91zm-32.96-107.71c0 6.27-2.25 12.22-6.76 17.84-4.51 5.62-10.15 9.17-16.92 10.65-.26-1.57-.39-3.08-.39-4.53 0-6.19 2.37-12.19 7.1-18.01 4.73-5.82 10.51-9.35 17.34-10.6.14 1.5.21 3.05.21 4.65z"/>
                </svg>
                <span>Continue with Apple</span>
              </button>
            </div>"""

content = content.replace(
    '</form>',
    buttons_jsx
)

with open(modal_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("SUCCESS: Added Continue with Google and Continue with Apple buttons to Login Modal")
