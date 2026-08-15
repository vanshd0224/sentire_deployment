import os

env_path = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\backend\.env"
route_path = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\backend\routes\auth\phoneAuth.js"

api_key = "6a9gztIGAP1K5MLOycRdfpoWX42UTjQq7uhenNwYbEZCJF3Vvml1ymfXpUOnxQGdbjqwFoC3N0r2LEgW"

# 1. Update backend/.env
with open(env_path, 'r', encoding='utf-8') as f:
    env_code = f.read()

if "FAST2SMS_API_KEY" in env_code:
    lines = env_code.split('\n')
    new_lines = []
    for line in lines:
        if line.startswith("FAST2SMS_API_KEY"):
            new_lines.append(f"FAST2SMS_API_KEY={api_key}")
        else:
            new_lines.append(line)
    env_code = '\n'.join(new_lines)
else:
    env_code += f"\nFAST2SMS_API_KEY={api_key}\n"

with open(env_path, 'w', encoding='utf-8') as f:
    f.write(env_code)

print("SUCCESS: Updated backend/.env with Fast2SMS API Key")

# 2. Update phoneAuth.js
with open(route_path, 'r', encoding='utf-8') as f:
    r_code = f.read()

old_block = """    // If Fast2SMS / Twilio API Key exists in env, dispatch real SMS
    if (process.env.FAST2SMS_API_KEY) {
      try {
        await fetch('https://www.fast2sms.com/dev/bulkV2', {
          method: 'POST',
          headers: {
            'authorization': process.env.FAST2SMS_API_KEY,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            route: 'otp',
            variables_values: generatedOtp,
            numbers: cleanPhone.replace('+91', '')
          })
        });
      } catch (smsErr) {
        logger.warn('Fast2SMS Dispatch Notice:', smsErr.message);
      }
    }"""

new_block = """    // Fast2SMS Real OTP Dispatch Engine
    const fastKey = process.env.FAST2SMS_API_KEY || "6a9gztIGAP1K5MLOycRdfpoWX42UTjQq7uhenNwYbEZCJF3Vvml1ymfXpUOnxQGdbjqwFoC3N0r2LEgW";
    if (fastKey) {
      try {
        await fetch('https://www.fast2sms.com/dev/bulkV2', {
          method: 'POST',
          headers: {
            'authorization': fastKey,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            route: 'q',
            message: `Your Sentire Luxury Perfumes verification code is: ${generatedOtp}`,
            language: 'english',
            flash: 0,
            numbers: cleanPhone.replace('+91', '')
          })
        });
      } catch (smsErr) {
        logger.warn('Fast2SMS Dispatch Notice:', smsErr.message);
      }
    }"""

r_code = r_code.replace(old_block, new_block)

with open(route_path, 'w', encoding='utf-8') as f:
    f.write(r_code)

print("SUCCESS: Updated phoneAuth.js with Fast2SMS Quick SMS OTP route")
