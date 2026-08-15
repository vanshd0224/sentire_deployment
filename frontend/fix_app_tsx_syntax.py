import os

app_path = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\src\App.tsx"

with open(app_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

clean_lines = []
for line in lines:
    # Skip duplicate or misplaced AccountDrawerModal lines inside ternary
    if '<AccountDrawerModal isOpen={isAccountOpen}' in line:
        continue
    # Remove duplicate onOpenAccount prop lines
    if 'onOpenAccount={() => setIsAccountOpen(true)}' in line:
        # Keep only 1 instance per component if needed
        if not any('onOpenAccount=' in l for l in clean_lines[-2:]):
            clean_lines.append(line)
        continue
    clean_lines.append(line)

# Put single AccountDrawerModal before final </div>
final_code = "".join(clean_lines)
final_code = final_code.replace(
    '</CartDrawer>\n    </div>',
    '</CartDrawer>\n      <AccountDrawerModal isOpen={isAccountOpen} onClose={() => setIsAccountOpen(false)} />\n    </div>'
)
if '</CartDrawer>\n      <AccountDrawerModal' not in final_code and '<CartDrawer' in final_code:
    final_code = final_code.replace(
        '/>\n    </div>\n  );\n}',
        '/>\n      <AccountDrawerModal isOpen={isAccountOpen} onClose={() => setIsAccountOpen(false)} />\n    </div>\n  );\n}'
    )

with open(app_path, 'w', encoding='utf-8') as f:
    f.write(final_code)

print("SUCCESS: Cleaned up App.tsx syntax!")
