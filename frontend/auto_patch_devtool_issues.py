import os
import re

src_dir = r'C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\src'

def auto_patch_form_fields_and_images():
    form_counter = 0
    img_counter = 0

    for root, dirs, filenames in os.walk(src_dir):
        for fname in filenames:
            if not fname.endswith(('.tsx', '.ts', '.html', '.jsx', '.js')):
                continue
            
            fpath = os.path.join(root, fname)
            rel_file = os.path.relpath(fpath, src_dir).replace('\\', '/')
            base_name = os.path.splitext(fname)[0].lower()

            with open(fpath, 'r', encoding='utf-8', errors='ignore') as f:
                content = f.read()

            orig_content = content
            
            # --- 1. Form Fields Patching ---
            def patch_form_field(match):
                nonlocal form_counter
                full_tag = match.group(0)
                tag_name = match.group(1).lower()
                attrs = match.group(2) or ''

                if 'type="hidden"' in full_tag or "type='hidden'" in full_tag:
                    return full_tag
                
                has_id = bool(re.search(r'\bid\s*=', attrs))
                has_name = bool(re.search(r'\bname\s*=', attrs))

                if has_id and has_name:
                    return full_tag

                form_counter += 1
                field_id = f"{base_name}-{tag_name}-{form_counter}"
                
                new_attrs = attrs
                if not has_id:
                    new_attrs += f' id="{field_id}"'
                if not has_name:
                    new_attrs += f' name="{field_id}"'
                
                return f"<{tag_name}{new_attrs}>"

            content = re.sub(r'<(input|select|textarea)(\s+[^>]*)?>', patch_form_field, content, flags=re.IGNORECASE)

            # --- 2. Lazy Images Patching ---
            def patch_lazy_img(match):
                nonlocal img_counter
                full_tag = match.group(0)
                attrs = match.group(1) or ''

                is_lazy = 'loading="lazy"' in full_tag or "loading='lazy'" in full_tag
                has_width = bool(re.search(r'\bwidth\s*=', attrs))
                has_height = bool(re.search(r'\bheight\s*=', attrs))

                if is_lazy and not (has_width and has_height):
                    img_counter += 1
                    new_attrs = attrs
                    if not has_width:
                        new_attrs += ' width="600"'
                    if not has_height:
                        new_attrs += ' height="600"'
                    return f"<img{new_attrs}>"
                
                return full_tag

            content = re.sub(r'<img(\s+[^>]*)?>', patch_lazy_img, content, flags=re.IGNORECASE)

            if content != orig_content:
                with open(fpath, 'w', encoding='utf-8') as f:
                    f.write(content)
                print(f"Patched {rel_file}")

    print(f"\nTotal form fields patched: {form_counter}")
    print(f"Total lazy images patched: {img_counter}")

if __name__ == '__main__':
    auto_patch_form_fields_and_images()
