import os

app_path = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\src\App.tsx"

with open(app_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Add AccountPage import
content = content.replace(
    'import AccountDrawerModal from "./components/AccountDrawerModal";',
    'import AccountDrawerModal from "./components/AccountDrawerModal";\nimport AccountPage from "./components/AccountPage";\nimport { auth } from "./lib/firebase";'
)

# Update PageName type definition
content = content.replace(
    'type PageName = "home" | "perfumes" | "bestsellers" | "new-arrivals" | "about" | "byob" | "personalisation" | "client-services" | "track-order";',
    'type PageName = "home" | "perfumes" | "bestsellers" | "new-arrivals" | "about" | "byob" | "personalisation" | "client-services" | "track-order" | "account";'
)

# Update handleAccountClick
account_click_fn = """  const handleAccountClick = () => {
    if (auth.currentUser) {
      setCurrentPage("account");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setIsAccountOpen(true);
    }
  };"""

content = content.replace(
    'const [isAccountOpen, setIsAccountOpen] = useState(false);',
    'const [isAccountOpen, setIsAccountOpen] = useState(false);\n' + account_click_fn
)

# Replace onOpenAccount in Navbar and MobileBottomNav
content = content.replace(
    'onOpenAccount={() => setIsAccountOpen(true)}',
    'onOpenAccount={handleAccountClick}'
)

# Add route for currentPage === "account"
account_route = """      ) : currentPage === "account" ? (
        <AccountPage
          onNavigate={handleNavigate}
          onOpenLoginModal={() => setIsAccountOpen(true)}
        />"""

content = content.replace(
    ') : currentPage === "track-order" ? (',
    account_route + '\n      ) : currentPage === "track-order" ? ('
)

# Update hashchange listener for #account
content = content.replace(
    '} else if (hash === "#about" || path.includes("about")) {',
    '} else if (hash === "#account" || path.includes("account")) {\n        setCurrentPage("account");\n      } else if (hash === "#about" || path.includes("about")) {'
)

# Pass onSuccessLogin to AccountDrawerModal
content = content.replace(
    '<AccountDrawerModal isOpen={isAccountOpen} onClose={() => setIsAccountOpen(false)} />',
    '<AccountDrawerModal isOpen={isAccountOpen} onClose={() => setIsAccountOpen(false)} onSuccessLogin={() => { setCurrentPage("account"); window.scrollTo({ top: 0, behavior: "smooth" }); }} />'
)

with open(app_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("SUCCESS: Updated App.tsx to support full-page Account suite and smart AccountClick!")
