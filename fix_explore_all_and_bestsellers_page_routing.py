import os
import re

src_dir = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\src"

# 1. Update App.tsx so activePage "bestsellers" and "new-arrivals" route to PerfumesPage with the full filter bar matching Screenshot 109!
app_path = os.path.join(src_dir, "App.tsx")
with open(app_path, "r", encoding="utf-8") as f:
    app_code = f.read()

# Make sure onNavigate("bestsellers") and onNavigate("new-arrivals") handle filtering properly in App.tsx
new_nav_handler = """  const handleNavigate = (page: PageName, filterOptions?: PerfumeFilterOptions) => {
    if (page === "bestsellers") {
      setActiveFilters({ category: "bestsellers" });
      setActivePage("perfumes");
    } else if (page === "new-arrivals") {
      setActiveFilters({ category: "new" });
      setActivePage("perfumes");
    } else {
      setActiveFilters(filterOptions);
      setActivePage(page);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };"""

pattern = r'const handleNavigate = \(page: PageName, filterOptions\?: PerfumeFilterOptions\) => \{[\s\S]*?window\.scrollTo\(\{ top: 0, behavior: "smooth" \}\);[\s\S]*?\};'
app_code = re.sub(pattern, new_nav_handler, app_code)

with open(app_path, "w", encoding="utf-8") as f:
    f.write(app_code)

# 2. Update BestSellers.tsx on home page so Explore All -> calls onOpenPerfumesPage(undefined, undefined, "bestsellers")
bs_path = os.path.join(src_dir, "components", "BestSellers.tsx")
with open(bs_path, "r", encoding="utf-8") as f:
    bs_code = f.read()

bs_code = re.sub(
    r'onClick=\{\(\) => \{[\s\S]*?\}\}',
    'onClick={() => onOpenPerfumesPage?.(undefined, undefined, "bestsellers")}',
    bs_code,
    count=1
)

with open(bs_path, "w", encoding="utf-8") as f:
    f.write(bs_code)

# 3. Update NewArrivals.tsx on home page so Explore All -> calls onOpenPerfumesPage(undefined, undefined, "new")
na_path = os.path.join(src_dir, "components", "NewArrivals.tsx")
with open(na_path, "r", encoding="utf-8") as f:
    na_code = f.read()

na_code = re.sub(
    r'onClick=\{\(\) => \{[\s\S]*?\}\}',
    'onClick={() => onOpenPerfumesPage?.(undefined, undefined, "new")}',
    na_code,
    count=1
)

with open(na_path, "w", encoding="utf-8") as f:
    f.write(na_code)

print("SUCCESS: Fixed Explore All and Navbar routing to open PerfumesPage with full filter bar (Screenshot 109)!")
