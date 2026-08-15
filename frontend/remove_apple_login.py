import os

modal_path = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\src\components\AccountDrawerModal.tsx"

with open(modal_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Remove Apple Sign In handler and Apple button
if 'handleAppleSignIn' in content:
    # Remove handleAppleSignIn function
    apple_func_start = '  // Apple Sign In'
    apple_func_end = '    } font-medium'
    
    # Simple regex / string replace
    lines = content.split('\n')
    new_lines = []
    skip = False
    
    for line in lines:
        if '// Apple Sign In' in line:
            skip = True
            continue
        if skip and 'const recaptchaVerifierRef' in line:
            skip = False
        if skip:
            continue
        if 'Continue with Apple' in line or 'handleAppleSignIn' in line or '<svg class="w-4 h-4 fill-current text-white"' in line:
            continue
        new_lines.append(line)
        
    new_content = '\n'.join(new_lines)
    
    with open(modal_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("SUCCESS: Removed Apple login button from AccountDrawerModal.tsx")
else:
    print("Apple login button already removed")
