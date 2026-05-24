import { useState, useEffect } from "react";

const globalStyle = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --ink: #0D0D12; --ink2: #1C1C28; --surface: #F7F6F2; --card: #FFFFFF;
    --accent: #E8FF47; --accent2: #FF6B35; --muted: #8A8A99; --border: #E4E4EC;
    --green: #2ECC71; --blue: #3B82F6; --orange: #F59E0B; --red: #EF4444;
    --radius: 14px; --font-head: 'Syne', sans-serif; --font-body: 'DM Sans', sans-serif;
    --nav-h: 56px; --bot-h: 64px;
  }
  body { font-family: var(--font-body); background: var(--surface); color: var(--ink); }

  /* NAV */
  .nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    background: var(--ink); color: white;
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 20px; height: var(--nav-h);
  }
  .nav-logo { font-family: var(--font-head); font-size: 18px; font-weight: 800; color: var(--accent); }
  .nav-right { display: flex; align-items: center; gap: 8px; }
  .role-badge { font-size: 10px; font-weight: 700; padding: 3px 8px; border-radius: 20px; text-transform: uppercase; }
  .role-customer { background: #3B82F620; color: #60A5FA; border: 1px solid #3B82F640; }
  .role-designer { background: #F4C43020; color: #F4C430; border: 1px solid #F4C43040; }
  .logout-btn { background: #fff1; border: 1px solid #fff2; color: #aaa; font-size: 12px; padding: 5px 10px; border-radius: 8px; cursor: pointer; font-family: var(--font-body); }

  /* DESKTOP SIDEBAR */
  .sidebar {
    position: fixed; top: var(--nav-h); left: 0; bottom: 0; width: 210px;
    background: var(--ink2); padding: 20px 10px;
    display: flex; flex-direction: column; gap: 4px;
    border-right: 1px solid #333;
  }
  .sidebar-item {
    display: flex; align-items: center; gap: 10px;
    padding: 10px 14px; border-radius: 10px; cursor: pointer;
    color: #888; font-size: 14px; font-weight: 500;
    transition: all 0.15s; border: none; background: none;
    width: 100%; text-align: left;
  }
  .sidebar-item:hover { background: #fff1; color: #ccc; }
  .sidebar-item.active { background: var(--accent); color: var(--ink); font-weight: 700; }

  /* MOBILE BOTTOM NAV */
  .bottom-nav {
    display: none;
    position: fixed; bottom: 0; left: 0; right: 0; z-index: 100;
    background: var(--ink2); border-top: 1px solid #333;
    height: var(--bot-h); padding: 0 4px;
    align-items: center; justify-content: space-around;
  }
  .bottom-nav-item {
    display: flex; flex-direction: column; align-items: center; gap: 3px;
    padding: 8px 10px; border-radius: 10px; cursor: pointer;
    color: #666; font-size: 10px; font-weight: 600;
    border: none; background: none; font-family: var(--font-body);
    transition: all 0.15s; flex: 1;
  }
  .bottom-nav-item.active { color: var(--accent); }
  .bottom-nav-icon { font-size: 20px; }

  /* MAIN */
  .main-desktop { margin-left: 210px; margin-top: var(--nav-h); flex: 1; padding: 28px; min-height: calc(100vh - var(--nav-h)); }
  .main-mobile { display: none; margin-top: var(--nav-h); padding: 16px 14px; padding-bottom: calc(var(--bot-h) + 16px); min-height: calc(100vh - var(--nav-h)); }

  /* RESPONSIVE */
  @media (max-width: 768px) {
    .sidebar { display: none !important; }
    .bottom-nav { display: flex !important; }
    .main-desktop { display: none !important; }
    .main-mobile { display: block !important; }
    .grid-3 { grid-template-columns: 1fr !important; }
    .grid-2 { grid-template-columns: 1fr !important; }
    .grid-auto { grid-template-columns: 1fr !important; }
    .modal { padding: 20px !important; margin: 0 8px; }
    .hide-mobile { display: none !important; }
    .progress-label { font-size: 9px !important; }
    .progress-circle { width: 26px !important; height: 26px !important; font-size: 11px !important; }
    .receipt-paper { padding: 20px !important; }
  }

  /* CARDS */
  .card { background: var(--card); border-radius: var(--radius); border: 1px solid var(--border); padding: 20px; }
  .btn { font-family: var(--font-body); font-size: 14px; font-weight: 600; padding: 10px 20px; border-radius: 10px; cursor: pointer; border: none; transition: all 0.15s; display: inline-flex; align-items: center; gap: 7px; }
  .btn-primary { background: var(--ink); color: var(--accent); }
  .btn-primary:hover { background: #333; }
  .btn-accent { background: var(--accent); color: var(--ink); }
  .btn-accent:hover { background: #d4eb30; }
  .btn-outline { background: transparent; color: var(--ink); border: 1.5px solid var(--border); }
  .btn-outline:hover { border-color: #aaa; }
  .btn-sm { font-size: 12px; padding: 7px 12px; border-radius: 8px; }
  .btn-full { width: 100%; justify-content: center; }
  .badge { font-size: 10px; font-weight: 700; padding: 3px 8px; border-radius: 20px; text-transform: uppercase; letter-spacing: 0.4px; white-space: nowrap; }
  .badge-pending { background: #FEF3C7; color: #92400E; }
  .badge-progress { background: #DBEAFE; color: #1E40AF; }
  .badge-revision { background: #FEE2E2; color: #991B1B; }
  .badge-done { background: #D1FAE5; color: #065F46; }

  .form-group { display: flex; flex-direction: column; gap: 6px; margin-bottom: 16px; }
  .form-label { font-size: 13px; font-weight: 600; color: #444; }
  .form-input, .form-select, .form-textarea { font-family: var(--font-body); font-size: 14px; padding: 10px 14px; border: 1.5px solid var(--border); border-radius: 10px; background: white; color: var(--ink); outline: none; transition: border 0.15s; width: 100%; }
  .form-input:focus, .form-select:focus, .form-textarea:focus { border-color: var(--ink); }
  .form-textarea { resize: vertical; min-height: 90px; }

  .progress-track { display: flex; align-items: flex-start; margin: 16px 0; }
  .progress-step { display: flex; flex-direction: column; align-items: center; flex: 1; }
  .progress-circle { width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 700; z-index: 1; border: 2px solid var(--border); background: white; color: var(--muted); }
  .progress-circle.done { background: var(--green); border-color: var(--green); color: white; }
  .progress-circle.active { background: var(--ink); border-color: var(--ink); color: var(--accent); }
  .progress-label { font-size: 10px; color: var(--muted); margin-top: 5px; text-align: center; font-weight: 500; line-height: 1.3; }
  .progress-line { flex: 1; height: 2px; background: var(--border); margin: 0 -1px; position: relative; top: 14px; }
  .progress-line.done { background: var(--green); }

  .empty { text-align: center; padding: 48px 20px; color: var(--muted); }
  .empty-icon { font-size: 42px; margin-bottom: 14px; }
  .empty h3 { font-family: var(--font-head); font-size: 18px; color: var(--ink); margin-bottom: 8px; }
  .empty p { font-size: 13px; line-height: 1.6; max-width: 300px; margin: 0 auto 20px; }

  .modal-overlay { position: fixed; inset: 0; background: #0009; z-index: 200; display: flex; align-items: center; justify-content: center; padding: 16px; }
  .modal { background: white; border-radius: 20px; width: 100%; max-width: 540px; max-height: 92vh; overflow-y: auto; padding: 28px; box-shadow: 0 25px 60px #0003; }
  .modal-title { font-family: var(--font-head); font-size: 20px; font-weight: 800; margin-bottom: 20px; }

  .chat-area { display: flex; flex-direction: column; gap: 8px; max-height: 200px; overflow-y: auto; padding: 4px; }
  .chat-msg { max-width: 80%; padding: 9px 13px; border-radius: 14px; font-size: 13px; line-height: 1.5; }
  .chat-msg.from-me { background: var(--ink); color: var(--accent); align-self: flex-end; border-bottom-right-radius: 4px; }
  .chat-msg.from-other { background: #F3F3F7; color: var(--ink); align-self: flex-start; border-bottom-left-radius: 4px; }
  .chat-meta { font-size: 10px; color: var(--muted); margin-top: 2px; }

  .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
  .grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 14px; }
  .grid-auto { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 14px; }

  .stat-card { background: var(--ink); color: white; border-radius: var(--radius); padding: 18px 20px; }
  .stat-label { font-size: 11px; color: #888; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; }
  .stat-value { font-family: var(--font-head); font-size: 24px; font-weight: 800; color: var(--accent); margin-top: 4px; }

  .page-title { font-family: var(--font-head); font-size: 24px; font-weight: 800; margin-bottom: 4px; }
  .page-sub { font-size: 13px; color: var(--muted); margin-bottom: 22px; }

  .auth-wrap { display: flex; min-height: 100vh; align-items: center; justify-content: center; background: var(--ink); padding: 16px; }
  .auth-box { background: white; border-radius: 20px; padding: 32px 28px; width: 100%; max-width: 400px; box-shadow: 0 30px 80px #0005; }
  .auth-logo { font-family: var(--font-head); font-size: 24px; font-weight: 800; color: var(--ink); margin-bottom: 6px; }
  .auth-logo span { color: var(--accent2); }
  .auth-sub { font-size: 13px; color: var(--muted); margin-bottom: 28px; }
  .auth-title { font-family: var(--font-head); font-size: 18px; font-weight: 700; margin-bottom: 20px; }
  .auth-switch { text-align: center; margin-top: 18px; font-size: 13px; color: var(--muted); }
  .auth-switch button { background: none; border: none; color: var(--ink); font-weight: 600; cursor: pointer; text-decoration: underline; font-family: var(--font-body); }
  .role-pick { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 18px; }
  .role-option { border: 2px solid var(--border); border-radius: 12px; padding: 14px 10px; cursor: pointer; text-align: center; transition: all 0.15s; background: white; }
  .role-option.selected { border-color: var(--ink); background: var(--ink); color: white; }
  .role-option-icon { font-size: 22px; margin-bottom: 5px; }
  .role-option-label { font-size: 13px; font-weight: 700; }
  .role-option-sub { font-size: 11px; color: #888; margin-top: 2px; }
  .role-option.selected .role-option-sub { color: #aaa; }

  .receipt-paper { background: white; border: 1px dashed #ccc; border-radius: 12px; padding: 28px; font-family: 'Courier New', monospace; }
  .receipt-header { text-align: center; border-bottom: 2px dashed #eee; padding-bottom: 16px; margin-bottom: 16px; }
  .receipt-logo { font-size: 18px; font-weight: 900; letter-spacing: 2px; }
  .receipt-tagline { font-size: 11px; color: #888; margin-top: 3px; }
  .receipt-row { display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 7px; gap: 8px; }
  .receipt-divider { border: none; border-top: 1px dashed #ddd; margin: 10px 0; }
  .receipt-total { font-size: 14px; font-weight: 900; }
  .receipt-status { text-align: center; margin-top: 16px; padding-top: 14px; border-top: 2px dashed #eee; }

  .tab-bar { display: flex; gap: 4px; background: #F0F0F5; border-radius: 12px; padding: 4px; margin-bottom: 20px; }
  .tab-item { flex: 1; text-align: center; padding: 8px; border-radius: 9px; cursor: pointer; font-size: 13px; font-weight: 600; color: var(--muted); border: none; background: none; transition: all 0.15s; font-family: var(--font-body); }
  .tab-item.active { background: white; color: var(--ink); box-shadow: 0 1px 4px #0001; }
  .divider { height: 1px; background: var(--border); margin: 16px 0; }

  .service-card { border: 1.5px solid var(--border); border-radius: var(--radius); padding: 18px; background: white; }
  .community-post { background: white; border: 1px solid var(--border); border-radius: var(--radius); padding: 18px; }

  .flex { display: flex; }
  .flex-col { flex-direction: column; }
  .items-center { align-items: center; }
  .justify-between { justify-content: space-between; }
  .gap-8 { gap: 8px; }
  .gap-12 { gap: 12px; }
  .gap-16 { gap: 16px; }
  .mt-8 { margin-top: 8px; }
  .mt-12 { margin-top: 12px; }
  .mt-16 { margin-top: 16px; }
  .mb-8 { margin-bottom: 8px; }
  .mb-16 { margin-bottom: 16px; }
  .fw-700 { font-weight: 700; }
  .text-sm { font-size: 13px; }
  .text-muted { color: var(--muted); }
`;

const SERVICES = [
  { id: 1, name: "Logo Design", category: "Logo", price: 150000, days: "3–5", revisions: 3, desc: "Custom logo vector, semua variasi warna, konsep unik." },
  { id: 2, name: "Brand Identity Kit", category: "Brand", price: 450000, days: "7–10", revisions: 3, desc: "Logo, warna, tipografi, panduan penggunaan brand lengkap." },
  { id: 3, name: "Social Media Kit", category: "Social Media", price: 200000, days: "3–5", revisions: 2, desc: "Template feed, story, highlight cover, satu tema konsisten." },
  { id: 4, name: "Banner & Flyer", category: "Print", price: 100000, days: "1–2", revisions: 2, desc: "Banner digital atau cetak, ukuran custom sesuai kebutuhan." },
  { id: 5, name: "UI/UX Design", category: "UI/UX", price: 750000, days: "10–14", revisions: 3, desc: "Wireframe + desain interface app/website, Figma deliverable." },
  { id: 6, name: "Illustration", category: "Illustration", price: 300000, days: "5–7", revisions: 2, desc: "Ilustrasi digital custom, berbagai gaya sesuai kebutuhan." },
];

const CATEGORIES = ["Semua", "Logo", "Brand", "Social Media", "Print", "UI/UX", "Illustration"];
const STEPS = ["Brief Masuk", "In Progress", "Revision", "Final Delivery"];
const fmt = (n) => "Rp " + n.toLocaleString("id-ID");

function useLocalStorage(key, initial) {
  const [val, setVal] = useState(() => {
    try { const s = localStorage.getItem(key); return s ? JSON.parse(s) : initial; }
    catch { return initial; }
  });
  useEffect(() => { try { localStorage.setItem(key, JSON.stringify(val)); } catch {} }, [key, val]);
  return [val, setVal];
}

export default function App() {
  const [users, setUsers] = useLocalStorage("pc_users", []);
  const [orders, setOrders] = useLocalStorage("pc_orders", []);
  const [jobs, setJobs] = useLocalStorage("pc_jobs", [
    { id: 1, title: "Social Media Designer", skills: ["Canva", "Illustrator"], type: "Per-project", range: "Rp 150rb–300rb/order", applicants: [] },
    { id: 2, title: "UI/UX Designer", skills: ["Figma", "Prototyping"], type: "Long-term", range: "Rp 500rb–1jt/project", applicants: [] },
    { id: 3, title: "Brand Identity Designer", skills: ["Illustrator", "Photoshop"], type: "Per-project", range: "Rp 300rb–600rb/project", applicants: [] },
  ]);
  const [posts, setPosts] = useLocalStorage("pc_posts", []);
  const [currentUserId, setCurrentUserId] = useLocalStorage("pc_session", null);
  const [page, setPage] = useState(null);
  const [modal, setModal] = useState(null);
  const [authMode, setAuthMode] = useState("login");

  const currentUser = users.find(u => u.id === currentUserId) || null;

  useEffect(() => {
    if (currentUser && !page) setPage(currentUser.role === "customer" ? "services" : "dashboard");
  }, [currentUser]);

  const login = (email, password) => {
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) return "Email atau password salah.";
    setCurrentUserId(user.id);
    setPage(user.role === "customer" ? "services" : "dashboard");
    return null;
  };

  const register = (data) => {
    if (users.find(u => u.email === data.email)) return "Email sudah terdaftar.";
    const newUser = { ...data, id: Date.now(), joinedAt: new Date().toLocaleDateString("id-ID") };
    setUsers(prev => [...prev, newUser]);
    setCurrentUserId(newUser.id);
    setPage(data.role === "customer" ? "services" : "dashboard");
    return null;
  };

  const logout = () => { setCurrentUserId(null); setPage(null); };
  const openModal = (m) => setModal(m);
  const closeModal = () => setModal(null);

  const placeOrder = (serviceId, brief) => {
    const svc = SERVICES.find(s => s.id === serviceId);
    const newOrder = {
      id: "ORD-" + Date.now().toString().slice(-6),
      serviceId, serviceName: svc.name, price: svc.price,
      fee: Math.round(svc.price * 0.1), brief, status: 0,
      customerId: currentUser.id, customerName: currentUser.name,
      designerId: null, designerName: null, messages: [],
      createdAt: new Date().toLocaleDateString("id-ID"),
      paidAt: new Date().toLocaleDateString("id-ID"),
    };
    setOrders(prev => [...prev, newOrder]);
    closeModal();
    setPage("orders");
  };

  const updateOrderStatus = (orderId, newStatus) =>
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));

  const assignDesigner = (orderId) =>
    setOrders(prev => prev.map(o =>
      o.id === orderId ? { ...o, designerId: currentUser.id, designerName: currentUser.name, status: 1 } : o
    ));

  const sendMessage = (orderId, text) => {
    const msg = { name: currentUser.name, role: currentUser.role, text, time: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }) };
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, messages: [...o.messages, msg] } : o));
  };

  const applyJob = (jobId) =>
    setJobs(prev => prev.map(j =>
      j.id === jobId ? { ...j, applicants: [...j.applicants, { id: currentUser.id, name: currentUser.name, appliedAt: new Date().toLocaleDateString("id-ID") }] } : j
    ));

  const addPost = (post) => {
    setPosts(prev => [{ ...post, id: Date.now(), authorId: currentUser.id, authorName: currentUser.name, authorRole: currentUser.role, likes: 0, replies: [], likedBy: [], createdAt: new Date().toLocaleDateString("id-ID") }, ...prev]);
    closeModal();
  };

  const toggleLike = (postId) =>
    setPosts(prev => prev.map(p => {
      if (p.id !== postId) return p;
      const liked = p.likedBy.includes(currentUser.id);
      return { ...p, likes: liked ? p.likes - 1 : p.likes + 1, likedBy: liked ? p.likedBy.filter(x => x !== currentUser.id) : [...p.likedBy, currentUser.id] };
    }));

  const addReply = (postId, text) =>
    setPosts(prev => prev.map(p =>
      p.id === postId ? { ...p, replies: [...p.replies, { name: currentUser.name, role: currentUser.role, text, time: new Date().toLocaleDateString("id-ID") }] } : p
    ));

  if (!currentUser) return (
    <><style>{globalStyle}</style>
      <AuthPage mode={authMode} setMode={setAuthMode} login={login} register={register} /></>
  );

  const navItems = currentUser.role === "customer"
    ? [{ id: "services", icon: "🎨", label: "Services" }, { id: "orders", icon: "📦", label: "Orders" }, { id: "community", icon: "💬", label: "Community" }]
    : [{ id: "dashboard", icon: "📊", label: "Dashboard" }, { id: "worker-orders", icon: "📋", label: "Orders" }, { id: "jobs", icon: "💼", label: "Jobs" }, { id: "community", icon: "💬", label: "Community" }];

  const myOrders = orders.filter(o => currentUser.role === "customer" ? o.customerId === currentUser.id : true);

  const pageProps = { orders, currentUser, openModal, sendMessage, updateOrderStatus, assignDesigner, applyJob, addReply, toggleLike, posts, jobs };

  const renderPage = () => {
    if (page === "services") return <ServicesPage services={SERVICES} categories={CATEGORIES} openModal={openModal} />;
    if (page === "orders") return <OrdersPage orders={myOrders} {...pageProps} />;
    if (page === "dashboard") return <DesignerDashboard orders={orders} currentUser={currentUser} />;
    if (page === "worker-orders") return <WorkerOrdersPage {...pageProps} />;
    if (page === "jobs") return <JobBoardPage jobs={jobs} currentUser={currentUser} applyJob={applyJob} />;
    if (page === "community") return <CommunityPage posts={posts} currentUser={currentUser} openModal={openModal} toggleLike={toggleLike} addReply={addReply} />;
    return null;
  };

  return (
    <><style>{globalStyle}</style>
      <nav className="nav">
        <div className="nav-logo">✦ PixelCraft</div>
        <div className="nav-right">
          <span className={`role-badge ${currentUser.role === "customer" ? "role-customer" : "role-designer"}`}>{currentUser.role}</span>
          <span style={{ fontSize: 12, color: "#ccc" }} className="hide-mobile">{currentUser.name}</span>
          <button className="logout-btn" onClick={logout}>Keluar</button>
        </div>
      </nav>

      {/* Desktop sidebar */}
      <aside className="sidebar">
        {navItems.map(item => (
          <button key={item.id} className={`sidebar-item ${page === item.id ? "active" : ""}`} onClick={() => setPage(item.id)}>
            <span>{item.icon}</span>{item.label}
          </button>
        ))}
      </aside>

      {/* Desktop main */}
      <main className="main-desktop">{renderPage()}</main>

      {/* Mobile main */}
      <main className="main-mobile">{renderPage()}</main>

      {/* Mobile bottom nav */}
      <nav className="bottom-nav">
        {navItems.map(item => (
          <button key={item.id} className={`bottom-nav-item ${page === item.id ? "active" : ""}`} onClick={() => setPage(item.id)}>
            <span className="bottom-nav-icon">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>

      {modal?.type === "order" && <OrderModal service={modal.service} currentUser={currentUser} onClose={closeModal} onSubmit={placeOrder} />}
      {modal?.type === "receipt" && <ReceiptModal order={modal.order} onClose={closeModal} />}
      {modal?.type === "post" && <NewPostModal onClose={closeModal} onSubmit={addPost} />}
    </>
  );
}

function AuthPage({ mode, setMode, login, register }) {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "customer" });
  const [error, setError] = useState("");
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));
  const handleSubmit = () => {
    setError("");
    if (mode === "login") { const e = login(form.email, form.password); if (e) setError(e); }
    else {
      if (!form.name || !form.email || !form.password) { setError("Semua field wajib diisi."); return; }
      const e = register(form); if (e) setError(e);
    }
  };
  return (
    <div className="auth-wrap">
      <div className="auth-box">
        <div className="auth-logo">✦ Pixel<span>Craft</span></div>
        <div className="auth-sub">Platform desain kreatif untuk semua</div>
        <div className="auth-title">{mode === "login" ? "Masuk ke akun" : "Buat akun baru"}</div>
        {mode === "register" && (<>
          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8, color: "#444" }}>Saya adalah:</div>
          <div className="role-pick">
            {[{ v: "customer", icon: "🛍️", label: "Customer", sub: "Pesan desain" }, { v: "designer", icon: "🎨", label: "Designer", sub: "Terima order" }].map(r => (
              <button key={r.v} className={`role-option ${form.role === r.v ? "selected" : ""}`} onClick={() => set("role", r.v)}>
                <div className="role-option-icon">{r.icon}</div>
                <div className="role-option-label">{r.label}</div>
                <div className="role-option-sub">{r.sub}</div>
              </button>
            ))}
          </div>
          <div className="form-group">
            <label className="form-label">Nama lengkap</label>
            <input className="form-input" placeholder="Nama kamu" value={form.name} onChange={e => set("name", e.target.value)} />
          </div>
        </>)}
        <div className="form-group">
          <label className="form-label">Email</label>
          <input className="form-input" type="email" placeholder="email@contoh.com" value={form.email} onChange={e => set("email", e.target.value)} />
        </div>
        <div className="form-group">
          <label className="form-label">Password</label>
          <input className="form-input" type="password" placeholder="••••••••" value={form.password} onChange={e => set("password", e.target.value)} onKeyDown={e => e.key === "Enter" && handleSubmit()} />
        </div>
        {error && <div style={{ background: "#fee2e2", color: "#991b1b", borderRadius: 8, padding: "10px 14px", fontSize: 13, marginBottom: 14 }}>{error}</div>}
        <button className="btn btn-primary btn-full" style={{ padding: "12px 20px" }} onClick={handleSubmit}>{mode === "login" ? "Masuk →" : "Daftar →"}</button>
        <div className="auth-switch">
          {mode === "login" ? <>Belum punya akun? <button onClick={() => { setMode("register"); setError(""); }}>Daftar</button></> : <>Sudah punya akun? <button onClick={() => { setMode("login"); setError(""); }}>Masuk</button></>}
        </div>
      </div>
    </div>
  );
}

function ServicesPage({ services, categories, openModal }) {
  const [cat, setCat] = useState("Semua");
  const filtered = cat === "Semua" ? services : services.filter(s => s.category === cat);
  return (
    <div>
      <div className="page-title">🎨 Order Desain</div>
      <div className="page-sub">Pilih layanan, isi brief, pantau progress real-time.</div>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 20 }}>
        {categories.map(c => (
          <button key={c} onClick={() => setCat(c)} className="btn btn-sm"
            style={{ background: cat === c ? "#0D0D12" : "white", color: cat === c ? "#E8FF47" : "#666", border: "1.5px solid " + (cat === c ? "#0D0D12" : "#e4e4ec") }}>
            {c}
          </button>
        ))}
      </div>
      <div className="grid-auto">
        {filtered.map(svc => (
          <div key={svc.id} className="service-card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
              <div>
                <div style={{ fontSize: 11, color: "var(--muted)", fontWeight: 600, marginBottom: 3 }}>{svc.category}</div>
                <div style={{ fontFamily: "var(--font-head)", fontSize: 17, fontWeight: 700 }}>{svc.name}</div>
              </div>
              <span className="badge badge-pending">{svc.revisions}x Revisi</span>
            </div>
            <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.6, marginBottom: 14 }}>{svc.desc}</p>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <div>
                <div style={{ fontSize: 11, color: "var(--muted)" }}>Mulai dari</div>
                <div style={{ fontFamily: "var(--font-head)", fontSize: 18, fontWeight: 800 }}>{fmt(svc.price)}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 11, color: "var(--muted)" }}>Estimasi</div>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{svc.days} hari</div>
              </div>
            </div>
            <button className="btn btn-primary btn-full" onClick={() => openModal({ type: "order", service: svc })}>Order →</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function OrdersPage({ orders, currentUser, openModal, sendMessage, updateOrderStatus }) {
  const [tab, setTab] = useState("active");
  const active = orders.filter(o => o.customerId === currentUser.id && o.status < 3);
  const done = orders.filter(o => o.customerId === currentUser.id && o.status === 3);
  const shown = tab === "active" ? active : done;
  return (
    <div>
      <div className="page-title">📦 My Orders</div>
      <div className="page-sub">Pantau semua orderan kamu.</div>
      <div className="tab-bar">
        <button className={`tab-item ${tab === "active" ? "active" : ""}`} onClick={() => setTab("active")}>Aktif ({active.length})</button>
        <button className={`tab-item ${tab === "done" ? "active" : ""}`} onClick={() => setTab("done")}>Selesai ({done.length})</button>
      </div>
      {shown.length === 0
        ? <div className="empty"><div className="empty-icon">{tab === "active" ? "📭" : "🎉"}</div><h3>{tab === "active" ? "Belum ada order aktif" : "Belum ada order selesai"}</h3><p>{tab === "active" ? "Yuk, pesan desain pertamamu!" : "Order selesai akan muncul di sini."}</p></div>
        : <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>{shown.map(o => <OrderCard key={o.id} order={o} currentUser={currentUser} openModal={openModal} sendMessage={sendMessage} updateOrderStatus={updateOrderStatus} />)}</div>
      }
    </div>
  );
}

function OrderCard({ order, currentUser, openModal, sendMessage, updateOrderStatus }) {
  const [chatOpen, setChatOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const statusBadge = ["badge-pending", "badge-progress", "badge-revision", "badge-done"][order.status];
  const statusLabel = ["Brief Masuk", "In Progress", "Revision", "Selesai"][order.status];
  const send = () => { if (msg.trim()) { sendMessage(order.id, msg.trim()); setMsg(""); } };
  return (
    <div className="card">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
        <div>
          <div style={{ fontSize: 10, color: "var(--muted)", fontWeight: 600 }}>#{order.id}</div>
          <div style={{ fontFamily: "var(--font-head)", fontSize: 16, fontWeight: 700, marginTop: 2 }}>{order.serviceName}</div>
          <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 2 }}>{order.designerName ? `Designer: ${order.designerName}` : "Menunggu designer"}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: "flex-end" }}>
          <span className={`badge ${statusBadge}`}>{statusLabel}</span>
          <button className="btn btn-sm btn-outline" onClick={() => openModal({ type: "receipt", order })}>🧾 Receipt</button>
        </div>
      </div>
      <div style={{ background: "#F7F6F2", borderRadius: 10, padding: "10px 12px", marginBottom: 16, fontSize: 13, lineHeight: 1.6 }}>
        <span style={{ fontWeight: 600, color: "var(--muted)", fontSize: 11 }}>BRIEF: </span>{order.brief}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <div style={{ fontSize: 11, color: "var(--muted)" }}>Total Bayar</div>
        <div style={{ fontFamily: "var(--font-head)", fontSize: 16, fontWeight: 800 }}>{fmt(order.price + order.fee)}</div>
      </div>
      <div className="progress-track">
        {STEPS.map((step, i) => (
          <div key={step} style={{ display: "flex", alignItems: "flex-start", flex: 1 }}>
            <div className="progress-step">
              <div className={`progress-circle ${order.status > i ? "done" : order.status === i ? "active" : ""}`}>{order.status > i ? "✓" : i + 1}</div>
              <div className="progress-label">{step}</div>
            </div>
            {i < STEPS.length - 1 && <div className={`progress-line ${order.status > i ? "done" : ""}`} />}
          </div>
        ))}
      </div>
      {currentUser.role === "customer" && order.status === 1 && (
        <button className="btn btn-sm btn-outline" style={{ marginTop: 10 }} onClick={() => updateOrderStatus(order.id, 2)}>🔄 Minta Revisi</button>
      )}
      <div className="divider" />
      <button className="btn btn-sm btn-outline" onClick={() => setChatOpen(!chatOpen)}>
        💬 {chatOpen ? "Tutup Chat" : `Chat Designer`}
        {order.messages.length > 0 && <span style={{ background: "var(--accent2)", color: "white", borderRadius: "50%", width: 17, height: 17, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 10 }}>{order.messages.length}</span>}
      </button>
      {chatOpen && (
        <div style={{ marginTop: 12, background: "#F7F6F2", borderRadius: 12, padding: 14 }}>
          <div className="chat-area">
            {order.messages.length === 0 && <div style={{ textAlign: "center", fontSize: 13, color: "var(--muted)", padding: 14 }}>Belum ada pesan.</div>}
            {order.messages.map((m, i) => (
              <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: m.name === currentUser.name ? "flex-end" : "flex-start" }}>
                <div className={`chat-msg ${m.name === currentUser.name ? "from-me" : "from-other"}`}>{m.text}</div>
                <div className="chat-meta">{m.name} · {m.time}</div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
            <input className="form-input" style={{ flex: 1, fontSize: 13 }} placeholder="Tulis pesan..." value={msg} onChange={e => setMsg(e.target.value)} onKeyDown={e => e.key === "Enter" && send()} />
            <button className="btn btn-primary btn-sm" onClick={send}>Kirim</button>
          </div>
        </div>
      )}
    </div>
  );
}

function DesignerDashboard({ orders, currentUser }) {
  const myOrders = orders.filter(o => o.designerId === currentUser.id);
  const earned = myOrders.filter(o => o.status === 3).reduce((s, o) => s + Math.round(o.price * 0.85), 0);
  const pending = myOrders.filter(o => o.status < 3).reduce((s, o) => s + Math.round(o.price * 0.85), 0);
  return (
    <div>
      <div className="page-title">📊 Dashboard</div>
      <div className="page-sub">Selamat datang, {currentUser.name}!</div>
      <div className="grid-3" style={{ marginBottom: 20 }}>
        <div className="stat-card"><div className="stat-label">Total Earned</div><div className="stat-value">{fmt(earned)}</div></div>
        <div className="stat-card"><div className="stat-label">Pending</div><div className="stat-value">{fmt(pending)}</div></div>
        <div className="stat-card"><div className="stat-label">Selesai</div><div className="stat-value">{myOrders.filter(o => o.status === 3).length}</div></div>
      </div>
      {myOrders.length === 0
        ? <div className="card"><div className="empty"><div className="empty-icon">📋</div><h3>Belum ada order</h3><p>Pergi ke "Orders" untuk lihat order yang tersedia dan mulai bekerja!</p></div></div>
        : <div className="card">
            <div style={{ fontFamily: "var(--font-head)", fontSize: 15, fontWeight: 700, marginBottom: 14 }}>Order Aktif</div>
            {myOrders.filter(o => o.status < 3).map(o => (
              <div key={o.id} style={{ padding: "12px 0", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div><div style={{ fontWeight: 600, fontSize: 14 }}>{o.serviceName}</div><div style={{ fontSize: 12, color: "var(--muted)" }}>#{o.id} · {o.customerName}</div></div>
                <span className={`badge badge-${["pending","progress","revision","done"][o.status]}`}>{["Brief Masuk","In Progress","Revision","Selesai"][o.status]}</span>
              </div>
            ))}
          </div>
      }
    </div>
  );
}

function WorkerOrdersPage({ orders, currentUser, assignDesigner, updateOrderStatus, sendMessage }) {
  const [tab, setTab] = useState("available");
  const available = orders.filter(o => o.designerId === null);
  const myOrders = orders.filter(o => o.designerId === currentUser.id);
  return (
    <div>
      <div className="page-title">📋 Manage Orders</div>
      <div className="page-sub">Ambil order atau kelola yang sedang berjalan.</div>
      <div className="tab-bar">
        <button className={`tab-item ${tab === "available" ? "active" : ""}`} onClick={() => setTab("available")}>Tersedia ({available.length})</button>
        <button className={`tab-item ${tab === "mine" ? "active" : ""}`} onClick={() => setTab("mine")}>Order Saya ({myOrders.length})</button>
      </div>
      {tab === "available" && (
        available.length === 0
          ? <div className="empty"><div className="empty-icon">🎯</div><h3>Tidak ada order tersedia</h3><p>Belum ada order masuk. Pantau terus!</p></div>
          : <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {available.map(o => (
                <div key={o.id} className="card">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                    <div><div style={{ fontSize: 10, color: "var(--muted)" }}>#{o.id}</div><div style={{ fontFamily: "var(--font-head)", fontSize: 16, fontWeight: 700 }}>{o.serviceName}</div><div style={{ fontSize: 12, color: "var(--muted)" }}>Client: {o.customerName}</div></div>
                    <div style={{ fontFamily: "var(--font-head)", fontSize: 16, fontWeight: 800, color: "var(--green)" }}>{fmt(Math.round(o.price * 0.85))}</div>
                  </div>
                  <div style={{ background: "#F7F6F2", borderRadius: 10, padding: "10px 12px", marginBottom: 12, fontSize: 13, lineHeight: 1.6 }}>
                    <span style={{ fontWeight: 600, color: "var(--muted)", fontSize: 11 }}>BRIEF: </span>{o.brief}
                  </div>
                  <button className="btn btn-accent btn-sm" onClick={() => assignDesigner(o.id)}>✋ Ambil Order</button>
                </div>
              ))}
            </div>
      )}
      {tab === "mine" && (
        myOrders.length === 0
          ? <div className="empty"><div className="empty-icon">📭</div><h3>Belum ada order aktif</h3><p>Ambil order dari tab "Tersedia".</p></div>
          : <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>{myOrders.map(o => <WorkerOrderCard key={o.id} order={o} currentUser={currentUser} updateOrderStatus={updateOrderStatus} sendMessage={sendMessage} />)}</div>
      )}
    </div>
  );
}

function WorkerOrderCard({ order, currentUser, updateOrderStatus, sendMessage }) {
  const [chatOpen, setChatOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const statusLabel = ["Brief Masuk", "In Progress", "Revision", "Selesai"][order.status];
  const statusBadge = ["badge-pending", "badge-progress", "badge-revision", "badge-done"][order.status];
  const send = () => { if (msg.trim()) { sendMessage(order.id, msg.trim()); setMsg(""); } };
  const actions = [{ label: "▶ Mulai", next: 1 }, { label: "📤 Submit", next: 2 }, { label: "✅ Selesai", next: 3 }];
  const action = order.status < 3 ? actions[order.status] : null;
  return (
    <div className="card">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
        <div><div style={{ fontSize: 10, color: "var(--muted)" }}>#{order.id}</div><div style={{ fontFamily: "var(--font-head)", fontSize: 16, fontWeight: 700 }}>{order.serviceName}</div><div style={{ fontSize: 12, color: "var(--muted)" }}>Client: {order.customerName}</div></div>
        <span className={`badge ${statusBadge}`}>{statusLabel}</span>
      </div>
      <div style={{ background: "#F7F6F2", borderRadius: 10, padding: "10px 12px", marginBottom: 14, fontSize: 13, lineHeight: 1.6 }}>
        <span style={{ fontWeight: 600, color: "var(--muted)", fontSize: 11 }}>BRIEF: </span>{order.brief}
      </div>
      <div className="progress-track">
        {STEPS.map((step, i) => (
          <div key={step} style={{ display: "flex", alignItems: "flex-start", flex: 1 }}>
            <div className="progress-step">
              <div className={`progress-circle ${order.status > i ? "done" : order.status === i ? "active" : ""}`}>{order.status > i ? "✓" : i + 1}</div>
              <div className="progress-label">{step}</div>
            </div>
            {i < STEPS.length - 1 && <div className={`progress-line ${order.status > i ? "done" : ""}`} />}
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap" }}>
        {action && <button className="btn btn-accent btn-sm" onClick={() => updateOrderStatus(order.id, action.next)}>{action.label}</button>}
        <button className="btn btn-sm btn-outline" onClick={() => setChatOpen(!chatOpen)}>💬 Chat {order.messages.length > 0 && `(${order.messages.length})`}</button>
      </div>
      {chatOpen && (
        <div style={{ marginTop: 12, background: "#F7F6F2", borderRadius: 12, padding: 14 }}>
          <div className="chat-area">
            {order.messages.length === 0 && <div style={{ textAlign: "center", fontSize: 13, color: "var(--muted)", padding: 14 }}>Belum ada pesan.</div>}
            {order.messages.map((m, i) => (
              <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: m.name === currentUser.name ? "flex-end" : "flex-start" }}>
                <div className={`chat-msg ${m.name === currentUser.name ? "from-me" : "from-other"}`}>{m.text}</div>
                <div className="chat-meta">{m.name} · {m.time}</div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
            <input className="form-input" style={{ flex: 1, fontSize: 13 }} placeholder="Tulis pesan..." value={msg} onChange={e => setMsg(e.target.value)} onKeyDown={e => e.key === "Enter" && send()} />
            <button className="btn btn-primary btn-sm" onClick={send}>Kirim</button>
          </div>
        </div>
      )}
    </div>
  );
}

function JobBoardPage({ jobs, currentUser, applyJob }) {
  return (
    <div>
      <div className="page-title">💼 Job Board</div>
      <div className="page-sub">{currentUser.role === "designer" ? "Posisi terbuka untuk designer freelance." : "Posisi designer yang tersedia."}</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {jobs.map(job => {
          const applied = job.applicants.some(a => a.id === currentUser.id);
          return (
            <div key={job.id} className="card">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                <div><div style={{ fontFamily: "var(--font-head)", fontSize: 16, fontWeight: 700 }}>{job.title}</div><div style={{ fontSize: 12, color: "var(--muted)", marginTop: 2 }}>{job.type} · {job.range}</div></div>
                {currentUser.role === "designer" && (applied ? <span className="badge badge-done">✓ Applied</span> : <button className="btn btn-primary btn-sm" onClick={() => applyJob(job.id)}>Apply</button>)}
              </div>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 10 }}>
                {job.skills.map(s => <span key={s} style={{ background: "#F0F0F5", color: "#444", fontSize: 11, fontWeight: 600, padding: "3px 9px", borderRadius: 8 }}>{s}</span>)}
              </div>
              <div style={{ fontSize: 12, color: "var(--muted)" }}>👥 {job.applicants.length > 0 ? `${job.applicants.length} pelamar` : "Belum ada pelamar"}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function CommunityPage({ posts, currentUser, openModal, toggleLike, addReply }) {
  const [filter, setFilter] = useState("Semua");
  const [replyOpen, setReplyOpen] = useState(null);
  const [replyText, setReplyText] = useState("");
  const TAGS = ["Semua", "Font Talk", "Color Theory", "Tool Tips", "Kritik Karya", "Testimoni"];
  const filtered = filter === "Semua" ? posts : posts.filter(p => p.tag === filter);
  const submitReply = (postId) => { if (replyText.trim()) { addReply(postId, replyText.trim()); setReplyText(""); setReplyOpen(null); } };
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
        <div className="page-title" style={{ marginBottom: 0 }}>💬 Community</div>
        <button className="btn btn-accent btn-sm" onClick={() => openModal({ type: "post" })}>+ Post</button>
      </div>
      <div className="page-sub">Diskusi, tips, dan feedback desain.</div>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 18 }}>
        {TAGS.map(t => <button key={t} onClick={() => setFilter(t)} className="btn btn-sm" style={{ background: filter === t ? "#0D0D12" : "white", color: filter === t ? "#E8FF47" : "#666", border: "1.5px solid " + (filter === t ? "#0D0D12" : "#e4e4ec") }}>{t}</button>)}
      </div>
      {filtered.length === 0
        ? <div className="empty"><div className="empty-icon">🌱</div><h3>Komunitas masih sepi</h3><p>Jadilah yang pertama posting!</p><button className="btn btn-primary" onClick={() => openModal({ type: "post" })}>+ Post Pertama</button></div>
        : <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {filtered.map(post => (
              <div key={post.id} className="community-post">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 32, height: 32, background: post.authorRole === "designer" ? "#F4C430" : "#3B82F6", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 12, color: "white", flexShrink: 0 }}>{post.authorName[0]}</div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 13 }}>{post.authorName}</div>
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <span className={`role-badge ${post.authorRole === "customer" ? "role-customer" : "role-designer"}`} style={{ fontSize: 9 }}>{post.authorRole}</span>
                        <span style={{ fontSize: 10, color: "var(--muted)" }}>{post.createdAt}</span>
                      </div>
                    </div>
                  </div>
                  {post.tag && <span style={{ background: "#F0F0F5", color: "#555", fontSize: 10, fontWeight: 600, padding: "3px 9px", borderRadius: 8, flexShrink: 0 }}>{post.tag}</span>}
                </div>
                <p style={{ fontSize: 13, lineHeight: 1.7, marginBottom: 12 }}>{post.content}</p>
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <button onClick={() => toggleLike(post.id)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 13, color: post.likedBy.includes(currentUser.id) ? "var(--accent2)" : "var(--muted)", fontWeight: 600, fontFamily: "var(--font-body)" }}>
                    {post.likedBy.includes(currentUser.id) ? "❤️" : "🤍"} {post.likes}
                  </button>
                  <button onClick={() => setReplyOpen(replyOpen === post.id ? null : post.id)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 13, color: "var(--muted)", fontWeight: 600, fontFamily: "var(--font-body)" }}>
                    💬 {post.replies.length}
                  </button>
                </div>
                {post.replies.length > 0 && (
                  <div style={{ marginTop: 10, borderTop: "1px solid var(--border)", paddingTop: 10, display: "flex", flexDirection: "column", gap: 7 }}>
                    {post.replies.map((r, i) => (
                      <div key={i} style={{ background: "#F7F6F2", borderRadius: 10, padding: "9px 12px" }}>
                        <div style={{ fontSize: 11, fontWeight: 700, marginBottom: 2 }}>{r.name} <span style={{ fontWeight: 400, color: "var(--muted)" }}>· {r.time}</span></div>
                        <div style={{ fontSize: 13 }}>{r.text}</div>
                      </div>
                    ))}
                  </div>
                )}
                {replyOpen === post.id && (
                  <div style={{ marginTop: 10, display: "flex", gap: 8 }}>
                    <input className="form-input" style={{ flex: 1, fontSize: 13 }} placeholder="Balas..." value={replyText} onChange={e => setReplyText(e.target.value)} onKeyDown={e => e.key === "Enter" && submitReply(post.id)} />
                    <button className="btn btn-primary btn-sm" onClick={() => submitReply(post.id)}>Kirim</button>
                  </div>
                )}
              </div>
            ))}
          </div>
      }
    </div>
  );
}

function OrderModal({ service, currentUser, onClose, onSubmit }) {
  const [brief, setBrief] = useState("");
  const [brandName, setBrandName] = useState("");
  const [ref, setRef] = useState("");
  const [step, setStep] = useState(1);
  const fee = Math.round(service.price * 0.1);
  const total = service.price + fee;
  const fullBrief = `Brand: ${brandName}\n${brief}${ref ? `\nReferensi: ${ref}` : ""}`;
  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        {step === 1 && (<>
          <div className="modal-title">📝 Isi Brief</div>
          <div style={{ background: "#F7F6F2", borderRadius: 10, padding: "12px 14px", marginBottom: 18 }}>
            <div style={{ fontFamily: "var(--font-head)", fontSize: 15, fontWeight: 700 }}>{service.name}</div>
            <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 3 }}>{fmt(service.price)} · {service.days} hari · {service.revisions}x revisi</div>
          </div>
          <div className="form-group">
            <label className="form-label">Nama / Brand *</label>
            <input className="form-input" placeholder="Nama brand atau project" value={brandName} onChange={e => setBrandName(e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">Deskripsi Brief *</label>
            <textarea className="form-textarea" placeholder="Ceritakan bisnis, target market, style, warna preferensi, dll..." value={brief} onChange={e => setBrief(e.target.value)} style={{ minHeight: 110 }} />
          </div>
          <div className="form-group">
            <label className="form-label">Referensi (opsional)</label>
            <input className="form-input" placeholder="Link atau describe referensi..." value={ref} onChange={e => setRef(e.target.value)} />
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button className="btn btn-outline btn-sm" onClick={onClose}>Batal</button>
            <button className="btn btn-primary" style={{ flex: 1 }} onClick={() => { if (!brief.trim() || !brandName.trim()) { alert("Nama brand dan brief wajib diisi!"); return; } setStep(2); }}>Lanjut →</button>
          </div>
        </>)}
        {step === 2 && (<>
          <div className="modal-title">✅ Konfirmasi Order</div>
          <div style={{ background: "#F7F6F2", borderRadius: 12, padding: 18, marginBottom: 18 }}>
            {[["Layanan", service.name], ["Brand", brandName], ["Harga", fmt(service.price)], ["Platform fee (10%)", fmt(fee)]].map(([l, v]) => (
              <div key={l} style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: 13 }}><span style={{ color: "var(--muted)" }}>{l}</span><span style={{ fontWeight: 600 }}>{v}</span></div>
            ))}
            <div style={{ borderTop: "1.5px dashed #ddd", paddingTop: 12, display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontWeight: 700 }}>Total Bayar</span>
              <span style={{ fontFamily: "var(--font-head)", fontSize: 17, fontWeight: 800 }}>{fmt(total)}</span>
            </div>
          </div>
          <div style={{ background: "#DBEAFE", borderRadius: 10, padding: "10px 14px", marginBottom: 18, fontSize: 13, color: "#1E40AF" }}>
            💡 Menekan Konfirmasi berarti kamu menyetujui order ini.
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button className="btn btn-outline btn-sm" onClick={() => setStep(1)}>← Kembali</button>
            <button className="btn btn-accent" style={{ flex: 1, padding: "12px 20px" }} onClick={() => onSubmit(service.id, fullBrief)}>Konfirmasi & Order 🎉</button>
          </div>
        </>)}
      </div>
    </div>
  );
}

function ReceiptModal({ order, onClose }) {
  const fee = order.fee;
  const total = order.price + fee;

  const downloadReceipt = () => {
    const html = `<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Receipt ${order.id}</title>
<style>
  body{font-family:'Courier New',monospace;max-width:420px;margin:32px auto;padding:24px;background:#fff;color:#111;font-size:13px;}
  .logo{font-size:20px;font-weight:900;letter-spacing:3px;text-align:center;margin-bottom:4px;}
  .sub{text-align:center;font-size:10px;color:#888;margin-bottom:20px;}
  hr{border:none;border-top:1px dashed #ccc;margin:12px 0;}
  .row{display:flex;justify-content:space-between;margin-bottom:7px;}
  .total{font-size:15px;font-weight:900;}
  .paid{text-align:center;margin-top:16px;font-size:16px;font-weight:900;color:#059669;letter-spacing:2px;}
  .footer{text-align:center;font-size:10px;color:#aaa;margin-top:16px;}
  @media print{body{margin:0;}}
</style>
</head>
<body>
<div class="logo">★ PIXELCRAFT ★</div>
<div class="sub">Design Agency Platform</div>
<hr>
<div class="row"><span>Receipt No.</span><span><b>#${order.id}</b></span></div>
<div class="row"><span>Tanggal</span><span>${order.paidAt}</span></div>
<hr>
<div class="row"><span>Customer</span><span>${order.customerName}</span></div>
<div class="row"><span>Layanan</span><span style="text-align:right;max-width:55%">${order.serviceName}</span></div>
<div class="row"><span>Designer</span><span>${order.designerName || "Belum assigned"}</span></div>
<hr>
<div class="row"><span>Subtotal</span><span>${fmt(order.price)}</span></div>
<div class="row"><span>Platform Fee (10%)</span><span>${fmt(fee)}</span></div>
<hr>
<div class="row total"><span>TOTAL BAYAR</span><span>${fmt(total)}</span></div>
<div class="paid">✓ LUNAS</div>
<hr>
<div class="footer">Terima kasih menggunakan PixelCraft Studio!<br>support@pixelcraft.id</div>
<script>window.onload=function(){window.print();}</script>
</body>
</html>`;
    const blob = new Blob([html], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Receipt-${order.id}.html`;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => { document.body.removeChild(a); URL.revokeObjectURL(url); }, 200);
  };

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal" style={{ maxWidth: 500 }}>
        <div className="modal-title">🧾 Receipt Order</div>
        <div className="receipt-paper">
          <div className="receipt-header">
            <div className="receipt-logo">★ PIXELCRAFT ★</div>
            <div className="receipt-tagline">Design Agency Platform</div>
          </div>
          <div className="receipt-row"><span>Receipt No.</span><span style={{ fontWeight: 700 }}>#{order.id}</span></div>
          <div className="receipt-row"><span>Tanggal</span><span>{order.paidAt}</span></div>
          <hr className="receipt-divider" />
          <div className="receipt-row"><span>Customer</span><span style={{ fontWeight: 600 }}>{order.customerName}</span></div>
          <div className="receipt-row"><span>Layanan</span><span style={{ fontWeight: 600, textAlign: "right", maxWidth: "60%" }}>{order.serviceName}</span></div>
          <div className="receipt-row"><span>Designer</span><span>{order.designerName || "—"}</span></div>
          <hr className="receipt-divider" />
          <div className="receipt-row"><span>Subtotal</span><span>{fmt(order.price)}</span></div>
          <div className="receipt-row"><span>Platform Fee (10%)</span><span>{fmt(fee)}</span></div>
          <hr className="receipt-divider" />
          <div className="receipt-row receipt-total"><span>TOTAL BAYAR</span><span>{fmt(total)}</span></div>
          <div className="receipt-status">
            <span style={{ background: "#D1FAE5", color: "#065F46", padding: "6px 18px", borderRadius: 8, fontWeight: 800, fontSize: 13, letterSpacing: 1 }}>✓ LUNAS</span>
          </div>
        </div>
        <div style={{ marginTop: 18, display: "flex", gap: 8 }}>
          <button className="btn btn-outline btn-sm" onClick={onClose}>Tutup</button>
          <button className="btn btn-primary" style={{ flex: 1 }} onClick={downloadReceipt}>⬇ Download Receipt</button>
        </div>
      </div>
    </div>
  );
}

function NewPostModal({ onClose, onSubmit }) {
  const [content, setContent] = useState("");
  const [tag, setTag] = useState("Font Talk");
  const TAGS = ["Font Talk", "Color Theory", "Tool Tips", "Kritik Karya", "Testimoni"];
  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-title">✏️ Post Baru</div>
        <div className="form-group">
          <label className="form-label">Kategori</label>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {TAGS.map(t => <button key={t} onClick={() => setTag(t)} style={{ fontSize: 12, padding: "6px 11px", borderRadius: 8, border: "1.5px solid " + (tag === t ? "#0D0D12" : "#e4e4ec"), background: tag === t ? "#0D0D12" : "white", color: tag === t ? "#E8FF47" : "#666", cursor: "pointer", fontFamily: "var(--font-body)", fontWeight: 600 }}>{t}</button>)}
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Isi Post</label>
          <textarea className="form-textarea" style={{ minHeight: 110 }} placeholder="Bagikan tips, pertanyaan, atau minta feedback..." value={content} onChange={e => setContent(e.target.value)} />
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="btn btn-outline btn-sm" onClick={onClose}>Batal</button>
          <button className="btn btn-primary" style={{ flex: 1 }} onClick={() => { if (!content.trim()) return; onSubmit({ content, tag }); }}>Post 🚀</button>
        </div>
      </div>
    </div>
  );
}
