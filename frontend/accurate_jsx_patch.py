import os
import re

src_dir = r'C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\src'

def find_tag_end(content, start_pos):
    i = start_pos
    in_curly = 0
    in_dquote = False
    in_squote = False

    while i < len(content):
        ch = content[i]
        if ch == '"' and not in_squote:
            in_dquote = not in_dquote
        elif ch == "'" and not in_dquote:
            in_squote = not in_squote
        elif not in_dquote and not in_squote:
            if ch == '{':
                in_curly += 1
            elif ch == '}':
                if in_curly > 0:
                    in_curly -= 1
            elif in_curly == 0:
                if content[i:i+2] == '/>':
                    return i, '/>'
                elif ch == '>':
                    return i, '>'
        i += 1
    return None, None

def patch_file(fpath):
    with open(fpath, 'r', encoding='utf-8') as f:
        content = f.read()

    orig_content = content
    base_name = os.path.splitext(os.path.basename(fpath))[0].lower()
    field_idx = 0
    img_idx = 0

    # 1. Form fields: <input, <select, <textarea
    pos = 0
    pattern = re.compile(r'<(input|select|textarea)[\s/>]', re.IGNORECASE)
    
    while True:
        match = pattern.search(content, pos)
        if not match:
            break

        tag_name = match.group(1).lower()
        start_pos = match.start()
        after_name_pos = match.end() - 1

        end_pos, end_tok = find_tag_end(content, after_name_pos)
        if end_pos is None:
            pos = match.end()
            continue

        full_tag = content[start_pos : end_pos + len(end_tok)]

        if 'type="hidden"' in full_tag or "type='hidden'" in full_tag:
            pos = end_pos + len(end_tok)
            continue

        has_id = bool(re.search(r'\bid\s*=', full_tag))
        has_name = bool(re.search(r'\bname\s*=', full_tag))

        if not (has_id and has_name):
            field_idx += 1
            attr_str = ""
            if not has_id:
                attr_str += f' id="{base_name}-{tag_name}-{field_idx}"'
            if not has_name:
                attr_str += f' name="{base_name}-{tag_name}-{field_idx}"'

            new_tag = content[start_pos:end_pos] + attr_str + end_tok
            content = content[:start_pos] + new_tag + content[end_pos + len(end_tok):]
            pos = start_pos + len(new_tag)
        else:
            pos = end_pos + len(end_tok)

    # 2. Lazy images: <img ... loading="lazy" ...>
    pos = 0
    img_pattern = re.compile(r'<img[\s/>]', re.IGNORECASE)

    while True:
        match = img_pattern.search(content, pos)
        if not match:
            break

        start_pos = match.start()
        after_name_pos = match.end() - 1

        end_pos, end_tok = find_tag_end(content, after_name_pos)
        if end_pos is None:
            pos = match.end()
            continue

        full_tag = content[start_pos : end_pos + len(end_tok)]

        is_lazy = 'loading="lazy"' in full_tag or "loading='lazy'" in full_tag
        has_width = bool(re.search(r'\bwidth\s*=', full_tag))
        has_height = bool(re.search(r'\bheight\s*=', full_tag))

        if is_lazy and not (has_width and has_height):
            img_idx += 1
            attr_str = ""
            if not has_width:
                attr_str += ' width="600"'
            if not has_height:
                attr_str += ' height="600"'

            new_tag = content[start_pos:end_pos] + attr_str + end_tok
            content = content[:start_pos] + new_tag + content[end_pos + len(end_tok):]
            pos = start_pos + len(new_tag)
        else:
            pos = end_pos + len(end_tok)

    if content != orig_content:
        with open(fpath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Patched {os.path.basename(fpath)}: {field_idx} fields, {img_idx} images")

for root, dirs, filenames in os.walk(src_dir):
    for fn in filenames:
        if fn.endswith(('.tsx', '.ts', '.html', '.jsx', '.js')):
            patch_file(os.path.join(root, fn))
