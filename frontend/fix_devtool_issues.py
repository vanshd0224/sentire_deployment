import os
import re

base_dir = r'C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\src'

def update_file(rel_path, replacements):
    fpath = os.path.join(base_dir, rel_path)
    if not os.path.exists(fpath):
        print(f"File not found: {fpath}")
        return
    with open(fpath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    modified = content
    for old, new in replacements:
        if old in modified:
            modified = modified.replace(old, new)
        else:
            print(f"Target not found in {rel_path}:\n  {old[:60]}...")
    
    if modified != content:
        with open(fpath, 'w', encoding='utf-8') as f:
            f.write(modified)
        print(f"Updated {rel_path}")
    else:
        print(f"No changes in {rel_path}")

# 1. AccountDrawerModal.tsx
update_file('components/AccountDrawerModal.tsx', [
    ('<input\n                type="tel"\n                placeholder="Enter 10-digit Mobile Number"',
     '<input\n                id="account-drawer-phone"\n                name="phone"\n                autocomplete="tel"\n                type="tel"\n                placeholder="Enter 10-digit Mobile Number"'),
    ('<input\n                type="text"\n                placeholder="Enter Your Full Name (e.g. Vansh Dhamija)"',
     '<input\n                id="account-drawer-name"\n                name="name"\n                autocomplete="name"\n                type="text"\n                placeholder="Enter Your Full Name (e.g. Vansh Dhamija)"')
])

# 2. AccountPage.tsx
update_file('components/AccountPage.tsx', [
    ('value={profileData.firstName}\n                      onChange={(e) =>',
     'id="profile-first-name"\n                      name="firstName"\n                      autocomplete="given-name"\n                      value={profileData.firstName}\n                      onChange={(e) =>'),
    ('value={profileData.email}\n                      onChange={(e) =>',
     'id="profile-email"\n                      name="email"\n                      autocomplete="email"\n                      value={profileData.email}\n                      onChange={(e) =>'),
    ('placeholder="Full Name"\n                    value={newAddr.name}',
     'id="address-full-name"\n                    name="addressName"\n                    autocomplete="name"\n                    placeholder="Full Name"\n                    value={newAddr.name}'),
    ('placeholder="Flat / House No / Street Address"\n                    value={newAddr.street}',
     'id="address-street"\n                    name="addressStreet"\n                    autocomplete="street-address"\n                    placeholder="Flat / House No / Street Address"\n                    value={newAddr.street}'),
    ('placeholder="City"\n                    value={newAddr.city}',
     'id="address-city"\n                    name="addressCity"\n                    autocomplete="address-level2"\n                    placeholder="City"\n                    value={newAddr.city}'),
    ('placeholder="Pincode"\n                    value={newAddr.pincode}',
     'id="address-pincode"\n                    name="addressPincode"\n                    autocomplete="postal-code"\n                    placeholder="Pincode"\n                    value={newAddr.pincode}'),
    ('placeholder="Mobile Number"\n                    value={newAddr.phone}',
     'id="address-phone"\n                    name="addressPhone"\n                    autocomplete="tel"\n                    placeholder="Mobile Number"\n                    value={newAddr.phone}')
])

# 3. BestSellersPage.tsx & NewArrivalsPage.tsx
for p in ['components/BestSellersPage.tsx', 'components/NewArrivalsPage.tsx']:
    prefix = 'bestsellers' if 'BestSellers' in p else 'newarrivals'
    update_file(p, [
        ('value={selectedMood}\n                  onChange={(e) =>',
         f'id="{prefix}-mood-filter"\n                  name="moodFilter"\n                  value={{selectedMood}}\n                  onChange={{(e) =>'),
        ('value={selectedFamily}\n                  onChange={(e) =>',
         f'id="{prefix}-family-filter"\n                  name="familyFilter"\n                  value={{selectedFamily}}\n                  onChange={{(e) =>'),
        ('value={sortBy}\n                  onChange={(e) =>',
         f'id="{prefix}-sort-by"\n                  name="sortBy"\n                  value={{sortBy}}\n                  onChange={{(e) =>')
    ])

# 4. ByobPage.tsx
update_file('components/ByobPage.tsx', [
    ('placeholder="Search scent..."\n              value={searchQuery}',
     'id="byob-scent-search"\n              name="scentSearch"\n              placeholder="Search scent..."\n              value={searchQuery}')
])

# 5. CartDrawer.tsx
update_file('components/CartDrawer.tsx', [
    ('placeholder="ENTER PROMO CODE"\n                  value={couponInput}',
     'id="cart-drawer-promo"\n                  name="promoCode"\n                  placeholder="ENTER PROMO CODE"\n                  value={couponInput}'),
    ('placeholder="Enter promo code"\n                      value={couponInput}',
     'id="cart-drawer-promo-2"\n                      name="promoCode2"\n                      placeholder="Enter promo code"\n                      value={couponInput}'),
    ('value={\n                      engraveTargetKey ||\n                      `${items[0]?.productId}-${items[0]?.size}`\n                    }\n                    onChange={(e) =>',
     'id="cart-drawer-engrave-target"\n                    name="engraveTarget"\n                    value={\n                      engraveTargetKey ||\n                      `${items[0]?.productId}-${items[0]?.size}`\n                    }\n                    onChange={(e) =>'),
    ('maxLength={12}\n                    value={engraveName}',
     'id="cart-drawer-engrave-name"\n                    name="engraveName"\n                    maxLength={12}\n                    value={engraveName}'),
    ('maxLength={10}\n                    value={engraveDate}',
     'id="cart-drawer-engrave-date"\n                    name="engraveDate"\n                    maxLength={10}\n                    value={engraveDate}')
])

# 6. CartPage.tsx
update_file('components/CartPage.tsx', [
    ('value={\n                    engraveTargetKey ||\n                    `${engravingEligibleItems[0]?.productId}-${engravingEligibleItems[0]?.size}`\n                  }\n                  onChange={(e) =>',
     'id="cart-page-engrave-target"\n                  name="engraveTarget"\n                  value={\n                    engraveTargetKey ||\n                    `${engravingEligibleItems[0]?.productId}-${engravingEligibleItems[0]?.size}`\n                  }\n                  onChange={(e) =>'),
    ('maxLength={12}\n                  value={engraveName}',
     'id="cart-page-engrave-name"\n                  name="engraveName"\n                  maxLength={12}\n                  value={engraveName}'),
    ('maxLength={10}\n                  value={engraveDate}',
     'id="cart-page-engrave-date"\n                  name="engraveDate"\n                  maxLength={10}\n                  value={engraveDate}'),
    ('placeholder="ENTER PROMO CODE"\n                  value={couponInput}',
     'id="cart-page-promo"\n                  name="promoCode"\n                  placeholder="ENTER PROMO CODE"\n                  value={couponInput}'),
    ('maxLength={6}\n                  value={pincodeInput}',
     'id="cart-page-pincode"\n                  name="pincode"\n                  autocomplete="postal-code"\n                  maxLength={6}\n                  value={pincodeInput}')
])

# 7. ClientServicesPage.tsx
update_file('components/ClientServicesPage.tsx', [
    ('type="file"\n                onChange={handleFileChange}',
     'id="client-services-file"\n                name="attachment"\n                type="file"\n                onChange={handleFileChange}'),
    ('className="w-full bg-white border border-black/15 rounded-[4px] px-3.5 py-2.5 text-xs text-ink outline-none">\n                <option value="">Select Category</option>',
     'id="client-services-category"\n                name="category"\n                className="w-full bg-white border border-black/15 rounded-[4px] px-3.5 py-2.5 text-xs text-ink outline-none">\n                <option value="">Select Category</option>'),
    ('className="w-full bg-white border border-black/15 rounded-[4px] px-3.5 py-2.5 text-xs text-ink outline-none">\n                <option value="low">General Enquiry</option>',
     'id="client-services-priority"\n                name="priority"\n                className="w-full bg-white border border-black/15 rounded-[4px] px-3.5 py-2.5 text-xs text-ink outline-none">\n                <option value="low">General Enquiry</option>')
])

# 8. Navbar.tsx
update_file('components/Navbar.tsx', [
    ('ref={searchRef}\n                type="text"',
     'ref={searchRef}\n                id="nav-search-input"\n                name="search"\n                type="text"')
])

# 9. PersonalisationPage.tsx
update_file('components/PersonalisationPage.tsx', [
    ('ref={fileInputRef}\n              type="file"',
     'ref={fileInputRef}\n              id="personalisation-photo-upload"\n              name="photoUpload"\n              type="file"')
])

# 10. ProductDetailModal.tsx
update_file('components/ProductDetailModal.tsx', [
    ('type="email"\n                    required\n                    placeholder="Enter your email address"',
     'id="pdm-notify-email"\n                    name="notifyEmail"\n                    autocomplete="email"\n                    type="email"\n                    required\n                    placeholder="Enter your email address"'),
    ('maxLength={15}\n                    value={engravingText}',
     'id="pdm-engraving-text"\n                    name="engravingText"\n                    maxLength={15}\n                    value={engravingText}'),
    ('type="date"\n                    value={engravingDate}',
     'id="pdm-engraving-date"\n                    name="engravingDate"\n                    type="date"\n                    value={engravingDate}'),
    ('maxLength={6}\n                placeholder="Enter 6-digit Pincode"',
     'id="pdm-pincode"\n                name="pincode"\n                autocomplete="postal-code"\n                maxLength={6}\n                placeholder="Enter 6-digit Pincode"'),
    ('type="text"\n                    required\n                    value={newReviewAuthor}',
     'id="pdm-review-author"\n                    name="reviewAuthor"\n                    autocomplete="name"\n                    type="text"\n                    required\n                    value={newReviewAuthor}'),
    ('value={newReviewRating}\n                    onChange={(e) =>',
     'id="pdm-review-rating"\n                    name="reviewRating"\n                    value={newReviewRating}\n                    onChange={(e) =>'),
    ('type="text"\n                    required\n                    value={newReviewTitle}',
     'id="pdm-review-title"\n                    name="reviewTitle"\n                    type="text"\n                    required\n                    value={newReviewTitle}'),
    ('<textarea\n                    required\n                    rows={3}',
     '<textarea\n                    id="pdm-review-comment"\n                    name="reviewComment"\n                    required\n                    rows={3}')
])

# 11. TrackOrderPage.tsx
update_file('components/TrackOrderPage.tsx', [
    ('value={orderQuery}\n                  onChange={(e) =>',
     'id="track-order-id-input"\n                  name="orderId"\n                  value={orderQuery}\n                  onChange={(e) =>'),
    ('value={contactQuery}\n                  onChange={(e) =>',
     'id="track-order-contact-input"\n                  name="contactInfo"\n                  value={contactQuery}\n                  onChange={(e) =>')
])

# 12. WatchAndBuy.tsx
update_file('components/WatchAndBuy.tsx', [
    ('type="text"\n                    readOnly\n                    value={`${window.location.origin}/perfumes/${shareModalReel.id}`}',
     'id="watch-buy-share-link"\n                    name="shareLink"\n                    type="text"\n                    readOnly\n                    value={`${window.location.origin}/perfumes/${shareModalReel.id}`}')
])

print("\n--- PATCHING LAZY IMAGES ---")
# Lazy Images explicit width and height attributes

update_file('components/DiscoverySetPage.tsx', [
    ('<img src={f.img} alt={f.name} loading="lazy" className="h-full w-full object-cover" />',
     '<img src={f.img} alt={f.name} loading="lazy" width="600" height="750" className="h-full w-full object-cover" />')
])

update_file('components/Hero.tsx', [
    ('<img loading="lazy" src="/images/ganesh/benefit_ganesh.webp" alt="Divine Blessings" className="h-[30px] w-auto object-contain"',
     '<img loading="lazy" src="/images/ganesh/benefit_ganesh.webp" alt="Divine Blessings" width="30" height="30" className="h-[30px] w-auto object-contain"'),
    ('<img loading="lazy" src="/images/ganesh/benefit_lotus.webp" alt="New Beginnings" className="h-[28px] w-auto object-contain"',
     '<img loading="lazy" src="/images/ganesh/benefit_lotus.webp" alt="New Beginnings" width="28" height="28" className="h-[28px] w-auto object-contain"'),
    ('<img loading="lazy" src="/images/ganesh/benefit_perfume.webp" alt="Crafted With Passion" className="h-[30px] w-auto object-contain"',
     '<img loading="lazy" src="/images/ganesh/benefit_perfume.webp" alt="Crafted With Passion" width="30" height="30" className="h-[30px] w-auto object-contain"')
])

update_file('components/WatchAndBuy.tsx', [
    ('<img src={reel.thumb} alt={reel.product} className="h-full w-full object-cover" loading="lazy" />',
     '<img src={reel.thumb} alt={reel.product} width="400" height="600" className="h-full w-full object-cover" loading="lazy" />')
])

update_file('editorial/Atelier.tsx', [
    ('loading="lazy"\n            decoding="async"\n            className={`absolute inset-0 hidden h-full w-full object-cover',
     'width="800"\n            height="1000"\n            loading="lazy"\n            decoding="async"\n            className={`absolute inset-0 hidden h-full w-full object-cover'),
    ('loading="lazy"\n            decoding="async"\n            className="h-full w-full object-cover"',
     'width="800"\n            height="1000"\n            loading="lazy"\n            decoding="async"\n            className="h-full w-full object-cover"')
])

update_file('editorial/Collections.tsx', [
    ('<img\n          src={entry.image}\n          alt={entry.title}\n          loading="lazy"\n          decoding="async"',
     '<img\n          src={entry.image}\n          alt={entry.title}\n          width="600"\n          height="800"\n          loading="lazy"\n          decoding="async"')
])

update_file('editorial/ProductCard.tsx', [
    ('<img\n          src={hoverImage}\n          alt=""\n          aria-hidden\n          loading="lazy"\n          decoding="async"',
     '<img\n          src={hoverImage}\n          alt=""\n          aria-hidden\n          width="600"\n          height="750"\n          loading="lazy"\n          decoding="async"')
])

update_file('editorial/discovery/Coverflow.tsx', [
    ('loading="lazy"\n            draggable={false}\n            className="h-full w-full object-cover"',
     'width="400"\n            height="500"\n            loading="lazy"\n            draggable={false}\n            className="h-full w-full object-cover"')
])

update_file('editorial/discovery/ScentReel.tsx', [
    ('loading="lazy"\n            className="h-full w-full object-cover"',
     'width="400"\n            height="500"\n            loading="lazy"\n            className="h-full w-full object-cover"')
])

update_file('editorial/discovery/Turntable.tsx', [
    ('<img src={a.img} alt="" loading="lazy" className="h-full w-full object-cover" />',
     '<img src={a.img} alt="" loading="lazy" width="400" height="500" className="h-full w-full object-cover" />')
])

update_file('editorial/discovery/Unboxing.tsx', [
    ('loading="lazy"\n                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"',
     'width="400"\n                height="500"\n                loading="lazy"\n                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"'),
    ('<img src={f.img} alt={f.name} loading="lazy" className="h-full w-full object-cover" />',
     '<img src={f.img} alt={f.name} loading="lazy" width="400" height="500" className="h-full w-full object-cover" />')
])

update_file('editorial/home/DiveHero.tsx', [
    ('<img\n            src={it.value}\n            alt=""\n            loading="lazy"\n            decoding="async"',
     '<img\n            src={it.value}\n            alt=""\n            width="320"\n            height="400"\n            loading="lazy"\n            decoding="async"')
])

update_file('editorial/home/HeroRing.tsx', [
    ('decoding="async"\n        loading="lazy"\n        className="absolute inset-0',
     'width="232"\n        height="300"\n        decoding="async"\n        loading="lazy"\n        className="absolute inset-0')
])
