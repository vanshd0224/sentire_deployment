import os

app_path = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\src\App.tsx"

with open(app_path, 'r', encoding='utf-8') as f:
    app_content = f.read()

# Add ProductQuickViewModal component and selectedProduct state to App.tsx
modal_state_code = """  const [selectedProductModal, setSelectedProductModal] = useState<any>(null);"""

quick_view_modal_code = """
      {/* Product Quick View Modal */}
      {selectedProductModal && (
        <div
          className="fixed inset-0 z-[9999999] flex items-center justify-center bg-black/70 backdrop-blur-md p-4"
          onClick={(e) => { if (e.target === e.currentTarget) setSelectedProductModal(null); }}
        >
          <div className="relative w-full max-w-xl bg-[#ffffff] text-[#1e1e1e] rounded-3xl shadow-2xl overflow-hidden border border-[#c89b5a]/40 p-6 sm:p-8">
            <button
              onClick={() => setSelectedProductModal(null)}
              className="absolute top-4 right-4 text-[#888888] hover:text-[#1e1e1e] text-2xl font-light leading-none cursor-pointer"
            >
              &times;
            </button>

            <div className="flex flex-col sm:flex-row gap-6 items-center">
              <div className="w-full sm:w-1/2 aspect-square bg-[#f6f2ec] rounded-2xl p-4 flex items-center justify-center border border-[#e5dfd5]">
                <img
                  src={selectedProductModal.image}
                  alt={selectedProductModal.name}
                  className="max-h-56 object-contain filter drop-shadow-md"
                />
              </div>

              <div className="w-full sm:w-1/2 space-y-3 text-left">
                <span className="text-[10px] font-bold text-[#c89b5a] uppercase tracking-widest bg-[#c89b5a]/10 px-2.5 py-1 rounded-full border border-[#c89b5a]/30">
                  {selectedProductModal.family || "Haute Parfumerie"}
                </span>

                <h3 className="text-2xl font-serif font-bold text-[#1e1e1e]">
                  {selectedProductModal.name}
                </h3>

                <p className="text-xs text-[#666666] leading-relaxed">
                  {selectedProductModal.description || selectedProductModal.desc || "Crafted beyond time with rare botanicals, precious woods, and luminous accords."}
                </p>

                <div className="pt-2 border-t border-[#f0ebe3]">
                  <span className="text-xs font-bold text-[#1e1e1e] uppercase">Scent Notes:</span>
                  <p className="text-xs text-[#c89b5a] font-medium mt-0.5">
                    {selectedProductModal.notes || "Clean Oud • Luminous Wood • Soft Musk"}
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <span className="text-xl font-bold text-[#1e1e1e]">
                    ₹{selectedProductModal.prices?.[50]?.price || selectedProductModal.price || "2,499"}
                  </span>
                  <span className="text-xs text-[#777] line-through">
                    ₹{selectedProductModal.prices?.[50]?.originalPrice || "3,299"}
                  </span>
                </div>

                <button
                  onClick={() => {
                    handleAddToCart({
                      productId: selectedProductModal.id,
                      name: selectedProductModal.name,
                      price: selectedProductModal.prices?.[50]?.price || selectedProductModal.price || 2499,
                      originalPrice: selectedProductModal.prices?.[50]?.originalPrice || 3299,
                      image: selectedProductModal.image,
                      size: 50,
                    });
                    setSelectedProductModal(null);
                    setIsCartOpen(true);
                  }}
                  className="w-full py-3.5 bg-[#1e1e1e] hover:bg-[#c89b5a] text-[#ffffff] hover:text-[#000000] text-xs font-semibold uppercase tracking-widest rounded-xl transition-all shadow-md cursor-pointer mt-3"
                >
                  Add 50 ML Bottle to Bag
                </button>
              </div>
            </div>
          </div>
        </div>
      )}"""

# Pass onSelectProduct to components in App.tsx
app_content = app_content.replace(
    'const [isAccountOpen, setIsAccountOpen] = useState(false);',
    'const [isAccountOpen, setIsAccountOpen] = useState(false);\n' + modal_state_code
)

app_content = app_content.replace(
    '<BestSellers\n            cartItems={cartItems}\n            onAddToCart={handleAddToCart}\n            onUpdateCartQuantity={handleUpdateCartQuantity}\n            onNavigate={handleNavigate}\n          />',
    '<BestSellers\n            cartItems={cartItems}\n            onAddToCart={handleAddToCart}\n            onUpdateCartQuantity={handleUpdateCartQuantity}\n            onNavigate={handleNavigate}\n            onSelectProduct={(p) => setSelectedProductModal(p)}\n          />'
)

app_content = app_content.replace(
    '<NewArrivals\n            cartItems={cartItems}\n            onAddToCart={handleAddToCart}\n            onUpdateCartQuantity={handleUpdateCartQuantity}\n            onNavigate={handleNavigate}\n          />',
    '<NewArrivals\n            cartItems={cartItems}\n            onAddToCart={handleAddToCart}\n            onUpdateCartQuantity={handleUpdateCartQuantity}\n            onNavigate={handleNavigate}\n            onSelectProduct={(p) => setSelectedProductModal(p)}\n          />'
)

# Insert modal before end of App return
end_app_div = "      <AccountDrawerModal"
app_content = app_content.replace(end_app_div, quick_view_modal_code + "\n" + end_app_div)

with open(app_path, 'w', encoding='utf-8') as f:
    f.write(app_content)

print("SUCCESS: Added Product Quick View Modal to App.tsx")
