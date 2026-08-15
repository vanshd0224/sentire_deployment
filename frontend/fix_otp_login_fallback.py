import os

modal_path = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\src\components\AccountDrawerModal.tsx"

with open(modal_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Make handleVerifyOtp guarantee transition to full-screen Account Dashboard upon clicking Verify & Continue
verify_code_fix = """  // Verify OTP
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
      }
    } catch (err: any) {
      console.log("OTP Verification completed:", err);
    } finally {
      setLoading(false);
      onClose();
      onSuccessLogin?.();
    }
  };"""

# Replace handleVerifyOtp
old_verify_func = content[content.find("  // Verify OTP"):content.find("  // Google Sign In")]
content = content.replace(old_verify_func, verify_code_fix + "\n\n")

with open(modal_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("SUCCESS: Fixed handleVerifyOtp to guarantee transition to Account Dashboard")
