import React, { useState, useEffect } from "react";
import { auth } from "../lib/firebase";
import { signOut, onAuthStateChanged, User, updateProfile } from "firebase/auth";

interface AccountPageProps {
  onNavigate: (page: any) => void;
  onOpenLoginModal?: () => void;
}

type TabType = "overview" | "orders" | "addresses" | "profile";

interface Address {
  id: string;
  name: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
}

export default function AccountPage({ onNavigate, onOpenLoginModal }: AccountPageProps) {
  const [user, setUser] = useState<User | null>(auth.currentUser);
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  
  // Stored Name & Profile Data (No raw phone number fallbacks!)
  const rawStoredName = localStorage.getItem("sentire_user_name") || user?.displayName || "";
  const storedName = rawStoredName.startsWith("+") ? "" : rawStoredName;
  const storedPhone = user?.phoneNumber || localStorage.getItem("sentire_user_phone") || "";
  const storedEmail = user?.email || localStorage.getItem("sentire_user_email") || "";

  const [profileData, setProfileData] = useState({
    firstName: storedName || "Sentire Member",
    phone: storedPhone,
    email: storedEmail,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  // Address State & Modal
  const [addresses, setAddresses] = useState<Address[]>(() => {
    const saved = localStorage.getItem("sentire_user_addresses");
    return saved ? JSON.parse(saved) : [];
  });
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [newAddr, setNewAddr] = useState({
    name: profileData.firstName,
    phone: profileData.phone,
    street: "",
    city: "",
    state: "",
    pincode: "",
  });

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      const rawName = u?.displayName || localStorage.getItem("sentire_user_name") || "";
      const name = rawName.startsWith("+") ? "" : rawName;
      const phone = u?.phoneNumber || localStorage.getItem("sentire_user_phone") || "";
      const email = u?.email || localStorage.getItem("sentire_user_email") || "";

      setProfileData({
        firstName: name || "Sentire Member",
        phone: phone,
        email: email,
      });
    });
    return () => unsub();
  }, []);

  const handleSaveProfile = async () => {
    localStorage.setItem("sentire_user_name", profileData.firstName);
    if (auth.currentUser) {
      try {
        await updateProfile(auth.currentUser, { displayName: profileData.firstName });
      } catch (e) {
        console.log("Firebase profile update notice:", e);
      }
    }
    setIsEditing(false);
    setSaveMessage("Profile updated successfully!");
    setTimeout(() => setSaveMessage(""), 3000);
  };

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddr.street || !newAddr.city || !newAddr.pincode) return;

    const created: Address = {
      id: Date.now().toString(),
      name: newAddr.name || profileData.firstName,
      phone: newAddr.phone || profileData.phone,
      street: newAddr.street,
      city: newAddr.city,
      state: newAddr.state || "Rajasthan",
      pincode: newAddr.pincode,
      isDefault: addresses.length === 0,
    };

    const updated = [...addresses, created];
    setAddresses(updated);
    localStorage.setItem("sentire_user_addresses", JSON.stringify(updated));
    setIsAddressModalOpen(false);
    setNewAddr({ name: profileData.firstName, phone: profileData.phone, street: "", city: "", state: "", pincode: "" });
  };

  const handleLogout = async () => {
    localStorage.removeItem("sentire_is_logged_in");
    localStorage.removeItem("sentire_user_phone");
    localStorage.removeItem("sentire_user_name");
    localStorage.removeItem("sentire_user_email");
    localStorage.removeItem("sentire_user_addresses");
    try {
      await signOut(auth);
    } catch (e) {}
    setUser(null);
    onNavigate("home");
  };

  const isStoredLoggedIn = localStorage.getItem("sentire_is_logged_in") === "true";

  if (!user && !isStoredLoggedIn) {
    return (
      <div className="min-h-[75vh] bg-[#f8f5f1] flex flex-col items-center justify-center p-6 text-center">
        <div className="max-w-md w-full bg-[#ffffff] p-8 sm:p-10 rounded-3xl border border-[#e5dfd5] shadow-sm">
          <div className="w-16 h-16 bg-[#f4efe8] rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
            👤
          </div>
          <h2 className="text-2xl font-serif font-bold text-[#1e1e1e] mb-2">My Account</h2>
          <p className="text-xs text-[#666666] mb-8 leading-relaxed">
            Log in with your Mobile Number or Google account to view orders, track shipments, and manage saved addresses.
          </p>
          <button
            onClick={() => onOpenLoginModal?.()}
            className="w-full py-4 bg-[#1e1e1e] hover:bg-[#c89b5a] text-[#ffffff] hover:text-[#000000] font-semibold text-xs uppercase tracking-widest rounded-xl transition-all shadow-md cursor-pointer"
          >
            Login / Sign Up Now
          </button>
        </div>
      </div>
    );
  }

  const userPhone = profileData.phone;
  const displayName = profileData.firstName;

  return (
    <div className="min-h-screen bg-[#f8f5f1] text-[#1e1e1e] pt-8 pb-16 px-4 sm:px-8 max-w-7xl mx-auto">
      {/* Breadcrumb Navigation */}
      <div className="mb-6 flex items-center gap-2 text-xs text-[#777777]">
        <button onClick={() => onNavigate("home")} className="hover:text-[#1e1e1e] cursor-pointer">
          Home
        </button>
        <span>/</span>
        <span className="font-semibold text-[#1e1e1e]">Account</span>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Left Sidebar */}
        <div className="w-full lg:w-80 bg-[#ffffff] p-6 rounded-2xl border border-[#e5dfd5] shadow-sm shrink-0">
          <div className="bg-[#faf8f5] p-4 rounded-xl border border-[#ece7de] mb-6">
            <div className="flex items-center justify-between">
              <div>
                <button
                  onClick={() => setActiveTab("profile")}
                  className="font-bold text-sm text-[#1e1e1e] hover:text-[#c89b5a] transition-colors flex items-center gap-1 cursor-pointer"
                >
                  Hey, {displayName} &gt;
                </button>
                <p className="text-[11px] text-[#666666] mt-0.5">Logged with {userPhone}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-[#1e1e1e] text-[#c89b5a] font-bold text-base flex items-center justify-center">
                {displayName.charAt(0).toUpperCase()}
              </div>
            </div>
          </div>

          <div className="bg-[#ffffff] p-4 rounded-xl border border-[#ece7de] text-center mb-6">
            <span className="text-2xl font-bold text-[#1e1e1e]">0</span>
            <p className="text-[10px] text-[#777777] uppercase font-semibold tracking-wider mt-0.5">
              Total Orders
            </p>
          </div>

          <nav className="space-y-1.5">
            <button
              onClick={() => setActiveTab("overview")}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === "overview"
                  ? "bg-[#1e1e1e] text-[#ffffff] shadow-md"
                  : "text-[#555555] hover:bg-[#faf8f5]"
              }`}
            >
              <div className="flex items-center gap-3">
                <span>🏠</span> Overview
              </div>
              <span className="text-xs">&gt;</span>
            </button>

            <button
              onClick={() => setActiveTab("orders")}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === "orders"
                  ? "bg-[#1e1e1e] text-[#ffffff] shadow-md"
                  : "text-[#555555] hover:bg-[#faf8f5]"
              }`}
            >
              <div className="flex items-center gap-3">
                <span>🛍️</span> My Orders
              </div>
              <span className="text-xs">&gt;</span>
            </button>

            <button
              onClick={() => setActiveTab("addresses")}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === "addresses"
                  ? "bg-[#1e1e1e] text-[#ffffff] shadow-md"
                  : "text-[#555555] hover:bg-[#faf8f5]"
              }`}
            >
              <div className="flex items-center gap-3">
                <span>📍</span> My Address
              </div>
              <span className="text-xs">&gt;</span>
            </button>

            <button
              onClick={() => setActiveTab("profile")}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === "profile"
                  ? "bg-[#1e1e1e] text-[#ffffff] shadow-md"
                  : "text-[#555555] hover:bg-[#faf8f5]"
              }`}
            >
              <div className="flex items-center gap-3">
                <span>👤</span> Profile Details
              </div>
              <span className="text-xs">&gt;</span>
            </button>
          </nav>

          <button
            onClick={handleLogout}
            className="w-full mt-8 py-3 px-4 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-xl flex items-center justify-start gap-3 transition-all cursor-pointer border border-red-100"
          >
            <span>🚪</span> Logout
          </button>
        </div>

        {/* Right Main Content Area */}
        <div className="w-full bg-[#ffffff] p-6 sm:p-8 rounded-2xl border border-[#e5dfd5] shadow-sm min-h-[500px]">
          {activeTab === "overview" && (
            <div className="space-y-8">
              <h2 className="text-2xl font-serif font-bold text-[#1e1e1e]">Overview</h2>

              <div className="space-y-3">
                <h3 className="text-xs font-bold text-[#1e1e1e] uppercase tracking-wider">
                  My Orders
                </h3>
                <div className="bg-[#faf8f5] p-8 rounded-2xl border border-[#ece7de] text-center">
                  <div className="w-14 h-14 bg-[#ffffff] border border-[#e5dfd5] rounded-2xl flex items-center justify-center mx-auto mb-3 text-3xl">
                    📦
                  </div>
                  <h4 className="text-sm font-bold text-[#1e1e1e]">No Past Orders Yet</h4>
                  <p className="text-xs text-[#777777] mt-1 mb-4">
                    Start your first order to see it here.
                  </p>
                  <button
                    onClick={() => onNavigate("perfumes")}
                    className="px-6 py-2.5 bg-[#1e1e1e] hover:bg-[#c89b5a] text-[#ffffff] hover:text-[#000000] text-xs font-semibold rounded-xl transition-all shadow-sm cursor-pointer"
                  >
                    Shop Now
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-[#1e1e1e] uppercase tracking-wider">
                    Saved Addresses
                  </h3>
                  <button
                    onClick={() => setIsAddressModalOpen(true)}
                    className="text-xs font-semibold text-[#c89b5a] hover:underline cursor-pointer"
                  >
                    + Add New
                  </button>
                </div>

                {addresses.length === 0 ? (
                  <div className="bg-[#faf8f5] p-8 rounded-2xl border border-[#ece7de] text-center">
                    <div className="w-14 h-14 bg-[#ffffff] border border-[#e5dfd5] rounded-2xl flex items-center justify-center mx-auto mb-3 text-3xl">
                      📍
                    </div>
                    <h4 className="text-sm font-bold text-[#1e1e1e]">No Address Saved Yet</h4>
                    <p className="text-xs text-[#777777] mt-1 mb-4">
                      Tap to add and shop faster.
                    </p>
                    <button
                      onClick={() => setIsAddressModalOpen(true)}
                      className="px-6 py-2.5 bg-[#1e1e1e] hover:bg-[#c89b5a] text-[#ffffff] hover:text-[#000000] text-xs font-semibold rounded-xl transition-all shadow-sm cursor-pointer"
                    >
                      Add New Address Now
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {addresses.map((addr) => (
                      <div key={addr.id} className="bg-[#faf8f5] p-5 rounded-xl border border-[#e5dfd5] space-y-1 text-xs">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-bold text-sm text-[#1e1e1e]">{addr.name}</span>
                          {addr.isDefault && (
                            <span className="bg-[#c89b5a]/15 text-[#c89b5a] px-2 py-0.5 rounded text-[10px] font-bold uppercase">Default</span>
                          )}
                        </div>
                        <p className="text-[#555]">{addr.street}</p>
                        <p className="text-[#555]">{addr.city}, {addr.state} - {addr.pincode}</p>
                        <p className="text-[#777] pt-1">Phone: {addr.phone}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === "orders" && (
            <div>
              <h2 className="text-2xl font-serif font-bold text-[#1e1e1e] mb-6">My Orders</h2>
              <div className="bg-[#faf8f5] p-12 rounded-2xl border border-[#ece7de] text-center">
                <div className="w-16 h-16 bg-[#ffffff] border border-[#e5dfd5] rounded-2xl flex items-center justify-center mx-auto mb-4 text-3xl">
                  🛍️
                </div>
                <h3 className="text-base font-bold text-[#1e1e1e]">No Active Orders</h3>
                <p className="text-xs text-[#666666] mt-1 mb-6 max-w-sm mx-auto">
                  You haven't placed any orders yet. Discover our luxury perfumes collection.
                </p>
                <button
                  onClick={() => onNavigate("perfumes")}
                  className="px-8 py-3 bg-[#1e1e1e] hover:bg-[#c89b5a] text-[#ffffff] text-xs font-semibold rounded-xl transition-all shadow-md cursor-pointer"
                >
                  Explore Perfumes Collection
                </button>
              </div>
            </div>
          )}

          {activeTab === "addresses" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-serif font-bold text-[#1e1e1e]">Saved Addresses</h2>
                <button
                  onClick={() => setIsAddressModalOpen(true)}
                  className="px-4 py-2 bg-[#1e1e1e] hover:bg-[#c89b5a] text-[#ffffff] text-xs font-semibold rounded-xl transition-all cursor-pointer"
                >
                  + Add New Address
                </button>
              </div>

              {addresses.length === 0 ? (
                <div className="bg-[#faf8f5] p-8 rounded-2xl border border-[#ece7de] text-center">
                  <p className="text-xs text-[#666666] mb-4">No default shipping address configured.</p>
                  <button
                    onClick={() => setIsAddressModalOpen(true)}
                    className="px-6 py-2.5 bg-[#c89b5a] text-[#000000] text-xs font-semibold rounded-xl"
                  >
                    Add Shipping Address
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {addresses.map((addr) => (
                    <div key={addr.id} className="bg-[#faf8f5] p-5 rounded-xl border border-[#e5dfd5] space-y-1 text-xs">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-sm text-[#1e1e1e]">{addr.name}</span>
                        {addr.isDefault && (
                          <span className="bg-[#c89b5a]/15 text-[#c89b5a] px-2 py-0.5 rounded text-[10px] font-bold uppercase">Default</span>
                        )}
                      </div>
                      <p className="text-[#555]">{addr.street}</p>
                      <p className="text-[#555]">{addr.city}, {addr.state} - {addr.pincode}</p>
                      <p className="text-[#777] pt-1">Phone: {addr.phone}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "profile" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-serif font-bold text-[#1e1e1e]">Profile Details</h2>
                <button
                  onClick={() => {
                    if (isEditing) handleSaveProfile();
                    else setIsEditing(true);
                  }}
                  className="px-5 py-2.5 bg-[#c89b5a] hover:bg-[#1e1e1e] text-[#000000] hover:text-[#ffffff] text-xs font-bold rounded-xl transition-all cursor-pointer shadow-sm"
                >
                  {isEditing ? "Save Changes" : "Edit Profile"}
                </button>
              </div>

              {saveMessage && (
                <div className="p-3 bg-green-50 text-green-700 text-xs rounded-xl mb-4 text-center font-semibold">
                  {saveMessage}
                </div>
              )}

              <div className="space-y-4">
                <div className="p-4 bg-[#faf8f5] rounded-xl border border-[#ece7de] flex justify-between items-center">
                  <span className="text-xs text-[#666666] font-medium">First Name</span>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profileData.firstName}
                      onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                      className="px-3 py-1.5 bg-[#ffffff] border border-[#c89b5a] rounded-lg text-xs outline-none text-[#1e1e1e] font-semibold"
                    />
                  ) : (
                    <span className="text-xs font-semibold text-[#1e1e1e]">{displayName}</span>
                  )}
                </div>

                <div className="p-4 bg-[#faf8f5] rounded-xl border border-[#ece7de] flex justify-between items-center">
                  <span className="text-xs text-[#666666] font-medium">Phone Number</span>
                  <span className="text-xs font-semibold text-[#1e1e1e]">{userPhone}</span>
                </div>

                <div className="p-4 bg-[#faf8f5] rounded-xl border border-[#ece7de] flex justify-between items-center">
                  <span className="text-xs text-[#666666] font-medium">Email ID</span>
                  {isEditing ? (
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                      className="px-3 py-1.5 bg-[#ffffff] border border-[#c89b5a] rounded-lg text-xs outline-none text-[#1e1e1e] font-semibold"
                    />
                  ) : (
                    <span className="text-xs font-semibold text-[#1e1e1e]">{profileData.email}</span>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add Address Modal */}
      {isAddressModalOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/50 p-4">
          <div className="bg-[#ffffff] text-[#1e1e1e] p-6 sm:p-8 rounded-2xl max-w-md w-full shadow-2xl border border-[#e5dfd5]">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-serif font-bold">Add Shipping Address</h3>
              <button onClick={() => setIsAddressModalOpen(false)} className="text-xl leading-none">&times;</button>
            </div>
            <form onSubmit={handleAddAddress} className="space-y-3 text-xs">
              <input
                type="text"
                placeholder="Full Name"
                value={newAddr.name}
                onChange={(e) => setNewAddr({ ...newAddr, name: e.target.value })}
                className="w-full p-3 border border-[#ccc] rounded-xl outline-none"
                required
              />
              <input
                type="text"
                placeholder="Flat / House No / Street Address"
                value={newAddr.street}
                onChange={(e) => setNewAddr({ ...newAddr, street: e.target.value })}
                className="w-full p-3 border border-[#ccc] rounded-xl outline-none"
                required
              />
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="City"
                  value={newAddr.city}
                  onChange={(e) => setNewAddr({ ...newAddr, city: e.target.value })}
                  className="w-full p-3 border border-[#ccc] rounded-xl outline-none"
                  required
                />
                <input
                  type="text"
                  placeholder="Pincode"
                  value={newAddr.pincode}
                  onChange={(e) => setNewAddr({ ...newAddr, pincode: e.target.value })}
                  className="w-full p-3 border border-[#ccc] rounded-xl outline-none"
                  required
                />
              </div>
              <input
                type="tel"
                placeholder="Mobile Number"
                value={newAddr.phone}
                onChange={(e) => setNewAddr({ ...newAddr, phone: e.target.value })}
                className="w-full p-3 border border-[#ccc] rounded-xl outline-none"
                required
              />
              <button
                type="submit"
                className="w-full py-3.5 bg-[#1e1e1e] hover:bg-[#c89b5a] text-[#ffffff] font-semibold text-xs rounded-xl transition-all mt-2"
              >
                Save Shipping Address
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
