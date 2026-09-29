import os
import re

src_dir = r'C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\src'

def patch_file(fpath):
    with open(fpath, 'r', encoding='utf-8') as f:
        content = f.read()

    orig_content = content
    base_name = os.path.splitext(os.path.basename(fpath))[0].lower()
    field_idx = 0
    img_idx = 0

    # 1. Form fields: <input ...>, <select ...>, <textarea ...>
    def replace_form(match):
        nonlocal field_idx
        full_tag = match.group(0)
        tag_name = match.group(1).lower()

        if 'type="hidden"' in full_tag or "type='hidden'" in full_tag:
            return full_tag

        has_id = 'id=' in full_tag or 'id={' in full_tag
        has_name = 'name=' in full_tag or 'name={' in full_tag

        if has_id and has_name:
            return full_tag

        field_idx += 1
        attr_str = ""
        if not has_id:
            attr_str += f' id="{base_name}-{tag_name}-{field_idx}"'
        if not has_name:
            attr_str += f' name="{base_name}-{tag_name}-{field_idx}"'

        if full_tag.endswith('/>'):
            return full_tag[:-2] + attr_str + ' />'
        elif full_tag.endswith('>'):
            return full_tag[:-1] + attr_str + '>'
        return full_tag

    content = re.sub(r'<(input|select|textarea)(\s+[^>]*)?>', replace_form, content, flags=re.IGNORECASE)

    # 2. Lazy images: <img ... loading="lazy" ...>
    def replace_img(match):
        nonlocal img_idx
        full_tag = match.group(0)

        is_lazy = 'loading="lazy"' in full_tag or "loading='lazy'" in full_tag
        has_width = 'width=' in full_tag or 'width={' in full_tag
        has_height = 'height=' in full_tag or 'height={' in full_tag

        if is_lazy and not (has_width and has_height):
            img_idx += 1
            attr_str = ""
            if not has_width:
                attr_str += ' width="600"'
            if not has_height:
                attr_str += ' height="600"'

            if full_tag.endswith('/>'):
                return full_tag[:-2] + attr_str + ' />'
            elif full_tag.endswith('>'):
                return full_tag[:-1] + attr_str + '>'
        return full_tag

    content = re.sub(r'<img(\s+[^>]*)?>', replace_img, content, flags=re.IGNORECASE)

    if content != orig_content:
        with open(fpath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Patched {os.path.basename(fpath)}: {field_idx} fields, {img_idx} images")

for root, dirs, filenames in os.walk(src_dir):
    for fn in filenames:
        if fn.endswith(('.tsx', '.ts', '.html', '.jsx', '.js')):
            patch_file(os.path.join(root, fn))
