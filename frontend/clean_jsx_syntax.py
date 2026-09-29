import os
import re

src_dir = r'C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\src'

def clean_and_fix_tags():
    for root, dirs, filenames in os.walk(src_dir):
        for fname in filenames:
            if not fname.endswith(('.tsx', '.ts', '.html', '.jsx', '.js')):
                continue
            
            fpath = os.path.join(root, fname)
            with open(fpath, 'r', encoding='utf-8', errors='ignore') as f:
                content = f.read()

            orig_content = content

            # Fix invalid syntax like `/ width="600"` or `/ width=`
            content = re.sub(r'/\s+(width|height|id|name)=', r' \1=', content)

            # Fix double slashes or broken image endings
            content = re.sub(r'\s*/\s*/>', ' />', content)

            if content != orig_content:
                with open(fpath, 'w', encoding='utf-8') as f:
                    f.write(content)
                print(f"Fixed syntax in {fname}")

if __name__ == '__main__':
    clean_and_fix_tags()
