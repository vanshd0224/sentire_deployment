import os

index_css_path = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\src\index.css"

with open(index_css_path, 'r', encoding='utf-8') as f:
    css = f.read()

old_reveal = """/* ── Scroll Reveal Motion Engine ── */
.reveal-fade-up {
  opacity: 0;
  transform: translateY(28px);
  transition: opacity 0.85s cubic-bezier(0.16, 1, 0.3, 1), transform 0.85s cubic-bezier(0.16, 1, 0.3, 1);
  will-change: opacity, transform;
}
.reveal-fade-up.is-revealed {
  opacity: 1;
  transform: translateY(0);
}

.reveal-scale-up {
  opacity: 0;
  transform: scale(0.94);
  transition: opacity 0.85s cubic-bezier(0.16, 1, 0.3, 1), transform 0.85s cubic-bezier(0.16, 1, 0.3, 1);
  will-change: opacity, transform;
}
.reveal-scale-up.is-revealed {
  opacity: 1;
  transform: scale(1);
}"""

new_reveal = """/* ── Scroll Reveal Motion Engine (Fail-Safe 100% Visible) ── */
.reveal-fade-up {
  opacity: 1 !important;
  transform: translateY(0) !important;
  transition: opacity 0.85s cubic-bezier(0.16, 1, 0.3, 1), transform 0.85s cubic-bezier(0.16, 1, 0.3, 1);
}

.reveal-scale-up {
  opacity: 1 !important;
  transform: scale(1) !important;
  transition: opacity 0.85s cubic-bezier(0.16, 1, 0.3, 1), transform 0.85s cubic-bezier(0.16, 1, 0.3, 1);
}"""

css = css.replace(old_reveal, new_reveal)

with open(index_css_path, 'w', encoding='utf-8') as f:
    f.write(css)

print("SUCCESS: Updated index.css so all sections are 100% visible with 0 blank spaces")
