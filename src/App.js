import { useState, useEffect } from "react";

// ─── GLOBAL STYLES ────────────────────────────────────────────────────────────
const globalStyle = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --ink: #0D0D12;
    --ink2: #1C1C28;
    --surface: #F7F6F2;
    --card: #FFFFFF;
    --accent: #E8FF47;
    --accent2: #FF6B35;
    --muted: #8A8A99;
    --border: #E4E4EC;
    --green: #2ECC71;
    --blue: #3B82F6;
    --orange: #F59E0B;
    --red: #EF4444;
    --radius: 14px;
    --font-head: 'Syne', sans-serif;
    --font-body: 'DM Sans', sans-serif;
  }

  body { font-family: var(--font-body); background: var(--surface); color: var(--ink); }

  .app { display: flex; min-height: 100vh; }

  /* NAV */
  .nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    background: var(--ink); color: white;
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 32px; height: 60px;
    border-bottom: 2px solid #222;
  }
  .nav-logo { font-family: var(--font-head); font-size: 20px; font-weight: 800; color: var(--accent); letter-spacing: -0.5px; }
  .nav-links { display: flex; gap: 4px; }
  .nav-btn {
    background: none; border: none; color: #aaa; font-family: var(--font-body);
    font-size: 13px; padding: 7px 14px; border-radius: 8px; cursor: pointer;
    transition: all 0.15s;
  }
  .nav-btn:hover, .nav-btn.active { background: #fff2; color: white; }
  .nav-right { display: flex; align-items: center; gap: 10px; }
  .role-badge {
    font-size: 11px; font-weight: 600; padding: 4px 10px; border-radius: 20px;
    letter-spacing: 0.5px; text-transform: uppercase;
  }
  .role-customer { background: #3B82F620; color: #60A5FA; border: 1px solid #3B82F640; }
  .role-designer { background: #F4C43020; color: #F4C430; border: 1px solid #F4C43040; }
  .logout-btn {
    background: #fff1; border: 1px solid #fff2; color: #aaa;
    font-size: 12px; padding: 5px 12px; border-radius: 8px; cursor: pointer;
    font-family: var(--font-body); transition: all 0.15s;
  }
  .logout-btn:hover { background: #fff2; color: white; }

  /* SIDEBAR */
  .sidebar {
    position: fixed; top: 60px; left: 0; bottom: 0; width: 220px;
    background: var(--ink2); padding: 24px 12px;
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
  .sidebar-icon { font-size: 16px; width: 20px; text-align: center; }

  /* MAIN */
  .main { margin-left: 220px; margin-top: 60px; flex: 1; padding: 32px; min-height: calc(100vh - 60px); }

  /* CARDS */
  .card {
    background: var(--card); border-radius: var(--radius);
    border: 1px solid var(--border); padding: 24px;
  }
  .card-sm { padding: 16px; }

  /* BUTTONS */
  .btn {
    font-family: var(--font-body); font-size: 14px; font-weight: 600;
    padding: 10px 20px; border-radius: 10px; cursor: pointer; border: none;
    transition: all 0.15s; display: inline-flex; align-items: center; gap: 7px;
  }
  .btn-primary { background: var(--ink); color: var(--accent); }
  .btn-primary:hover { background: #333; }
  .btn-accent { background: var(--accent); color: var(--ink); }
  .btn-accent:hover { background: #d4eb30; }
  .btn-outline { background: transparent; color: var(--ink); border: 1.5px solid var(--border); }
  .btn-outline:hover { border-color: #aaa; }
  .btn-danger { background: #fee2e2; color: var(--red); }
  .btn-danger:hover { background: #fecaca; }
  .btn-sm { font-size: 12px; padding: 7px 14px; border-radius: 8px; }
  .btn-full { width: 100%; justify-content: center; }

  /* BADGE */
  .badge {
    font-size: 11px; font-weight: 700; padding: 3px 9px; border-radius: 20px;
    text-transform: uppercase; letter-spacing: 0.4px;
  }
  .badge-pending { background: #FEF3C7; color: #92400E; }
  .badge-progress { background: #DBEAFE; color: #1E40AF; }
  .badge-revision { background: #FEE2E2; color: #991B1B; }
  .badge-done { background: #D1FAE5; color: #065F46; }
  .badge-paid { background: #D1FAE5; color: #065F46; }

  /* FORM */
  .form-group { display: flex; flex-direction: column; gap: 6px; margin-bottom: 18px; }
  .form-label { font-size: 13px; font-weight: 600; color: #444; }
  .form-input, .form-select, .form-textarea {
    font-family: var(--font-body); font-size: 14px; padding: 10px 14px;
    border: 1.5px solid var(--border); border-radius: 10px; background: white;
    color: var(--ink); outline: none; transition: border 0.15s; width: 100%;
  }
  .form-input:focus, .form-select:focus, .form-textarea:focus { border-color: var(--ink); }
  .form-textarea { resize: vertical; min-height: 90px; }

  /* PROGRESS BAR */
  .progress-track { display: flex; align-items: center; gap: 0; margin: 20px 0; }
  .progress-step { display: flex; flex-direction: column; align-items: center; flex: 1; }
  .progress-circle {
    width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center;
    justify-content: center; font-size: 13px; font-weight: 700; z-index: 1;
    border: 2px solid var(--border); background: white; color: var(--muted);
  }
  .progress-circle.done { background: var(--green); border-color: var(--green); color: white; }
  .progress-circle.active { background: var(--ink); border-color: var(--ink); color: var(--accent); }
  .progress-label { font-size: 11px; color: var(--muted); margin-top: 6px; text-align: center; font-weight: 500; }
  .progress-line { flex: 1; height: 2px; background: var(--border); margin: 0 -1px; position: relative; top: -10px; }
  .progress-line.done { background: var(--green); }

  /* EMPTY STATE */
  .empty { text-align: center; padding: 64px 32px; color: var(--muted); }
  .empty-icon { font-size: 48px; margin-bottom: 16px; }
  .empty h3 { font-family: var(--font-head); font-size: 20px; color: var(--ink); margin-bottom: 8px; }
  .empty p { font-size: 14px; line-height: 1.6; max-width: 360px; margin: 0 auto 24px; }

  /* MODAL */
  .modal-overlay {
    position: fixed; inset: 0; background: #0009; z-index: 200;
    display: flex; align-items: center; justify-content: center; padding: 20px;
  }
  .modal {
    background: white; border-radius: 20px; width: 100%; max-width: 560px;
    max-height: 90vh; overflow-y: auto; padding: 32px;
    box-shadow: 0 25px 60px #0003;
  }
  .modal-title { font-family: var(--font-head); font-size: 22px; font-weight: 800; margin-bottom: 24px; }

  /* CHAT */
  .chat-area { display: flex; flex-direction: column; gap: 10px; max-height: 240px; overflow-y: auto; padding: 4px; }
  .chat-msg { max-width: 75%; padding: 10px 14px; border-radius: 14px; font-size: 13px; line-height: 1.5; }
  .chat-msg.from-me { background: var(--ink); color: var(--accent); align-self: flex-end; border-bottom-right-radius: 4px; }
  .chat-msg.from-other { background: #F3F3F7; color: var(--ink); align-self: flex-start; border-bottom-left-radius: 4px; }
  .chat-meta { font-size: 10px; color: var(--muted); margin-top: 3px; }

  /* GRID */
  .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  .grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; }
  .grid-auto { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 16px; }

  /* STAT */
  .stat-card { background: var(--ink); color: white; border-radius: var(--radius); padding: 20px 24px; }
  .stat-label { font-size: 12px; color: #888; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; }
  .stat-value { font-family: var(--font-head); font-size: 28px; font-weight: 800; color: var(--accent); margin-top: 4px; }

  /* PAGE TITLE */
  .page-title { font-family: var(--font-head); font-size: 28px; font-weight: 800; margin-bottom: 6px; }
  .page-sub { font-size: 14px; color: var(--muted); margin-bottom: 28px; }

  /* AUTH */
  .auth-wrap { display: flex; min-height: 100vh; align-items: center; justify-content: center; background: var(--ink); }
  .auth-box { background: white; border-radius: 24px; padding: 48px; width: 100%; max-width: 420px; box-shadow: 0 30px 80px #0005; }
  .auth-logo { font-family: var(--font-head); font-size: 28px; font-weight: 800; color: var(--ink); margin-bottom: 8px; }
  .auth-logo span { color: var(--accent2); }
  .auth-sub { font-size: 14px; color: var(--muted); margin-bottom: 32px; }
  .auth-title { font-family: var(--font-head); font-size: 20px; font-weight: 700; margin-bottom: 24px; }
  .auth-switch { text-align: center; margin-top: 20px; font-size: 13px; color: var(--muted); }
  .auth-switch button { background: none; border: none; color: var(--ink); font-weight: 600; cursor: pointer; text-decoration: underline; }
  .role-pick { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 20px; }
  .role-option {
    border: 2px solid var(--border); border-radius: 12px; padding: 16px;
    cursor: pointer; text-align: center; transition: all 0.15s; background: white;
  }
  .role-option.selected { border-color: var(--ink); background: var(--ink); color: white; }
  .role-option-icon { font-size: 24px; margin-bottom: 6px; }
  .role-option-label { font-size: 13px; font-weight: 700; }
  .role-option-sub { font-size: 11px; color: #888; margin-top: 2px; }
  .role-option.selected .role-option-sub { color: #aaa; }

  /* RECEIPT */
  .receipt-paper {
    background: white; border: 1px dashed #ccc; border-radius: 12px;
    padding: 32px; max-width: 480px; margin: 0 auto;
    font-family: 'Courier New', monospace;
  }
  .receipt-header { text-align: center; border-bottom: 2px dashed #eee; padding-bottom: 20px; margin-bottom: 20px; }
  .receipt-logo { font-size: 20px; font-weight: 900; letter-spacing: 2px; }
  .receipt-tagline { font-size: 11px; color: #888; margin-top: 4px; }
  .receipt-row { display: flex; justify-content: space-between; font-size: 13px; margin-bottom: 8px; }
  .receipt-divider { border: none; border-top: 1px dashed #ddd; margin: 12px 0; }
  .receipt-total { font-size: 16px; font-weight: 900; }
  .receipt-status { text-align: center; margin-top: 20px; padding-top: 16px; border-top: 2px dashed #eee; }

  .tab-bar { display: flex; gap: 4px; background: #F0F0F5; border-radius: 12px; padding: 4px; margin-bottom: 24px; }
  .tab-item {
    flex: 1; text-align: center; padding: 9px; border-radius: 9px; cursor: pointer;
    font-size: 13px; font-weight: 600; color: var(--muted); border: none; background: none;
    transition: all 0.15s; font-family: var(--font-body);
  }
  .tab-item.active { background: white; color: var(--ink); box-shadow: 0 1px 4px #0001; }

  .divider { height: 1px; background: var(--border); margin: 20px 0; }

  .service-card {
    border: 1.5px solid var(--border); border-radius: var(--radius); padding: 20px;
    background: white; transition: all 0.2s; cursor: default;
  }
  .service-card:hover { border-color: #aaa; box-shadow: 0 4px 16px #0001; }

  .community-post {
    background: white; border: 1px solid var(--border); border-radius: var(--radius);
    padding: 20px; transition: box-shadow 0.15s;
  }
  .community-post:hover { box-shadow: 0 4px 16px #0001; }

  .flex { display: flex; }
  .flex-col { flex-direction: column; }
  .items-center { align-items: center; }
  .justify-between { justify-content: space-between; }
  .gap-8 { gap: 8px; }
  .gap-12 { gap: 12px; }
  .gap-16 { gap: 16px; }
  .gap-20 { gap: 20px; }
  .mt-8 { margin-top: 8px; }
  .mt-12 { margin-top: 12px; }
  .mt-16 { margin-top: 16px; }
  .mt-24 { margin-top: 24px; }
  .mb-8 { margin-bottom: 8px; }
  .mb-16 { margin-bottom: 16px; }
  .fw-700 { font-weight: 700; }
  .fw-600 { font-weight: 600; }
  .text-sm { font-size: 13px; }
  .text-xs { font-size: 11px; }
  .text-muted { color: var(--muted); }
  .text-green { color: var(--green); }
  .text-accent2 { color: var(--accent2); }
`;

// ─── SERVICES DATA ─────────────────────────────────────────────────────────────
const SERVICES = [
  { id: 1, name: "Logo Design", category: "Logo", price: 150000, days: "3–5", revisions: 3, desc: "Custom logo dengan konsep unik, vector format, semua variasi warna." },
  { id: 2, name: "Brand Identity Kit", category: "Brand", price: 450000, days: "7–10", revisions: 3, desc: "Full brand kit: logo, warna, tipografi, panduan penggunaan brand." },
  { id: 3, name: "Social Media Kit", category: "Social Media", price: 200000, days: "3–5", revisions: 2, desc: "Template feed, story, highlight cover, konsisten satu tema." },
  { id: 4, name: "Banner & Flyer", category: "Print", price: 100000, days: "1–2", revisions: 2, desc: "Desain banner digital atau cetak, ukuran custom sesuai kebutuhan." },
  { id: 5, name: "UI/UX Design", category: "UI/UX", price: 750000, days: "10–14", revisions: 3, desc: "Wireframe + desain interface aplikasi atau website, Figma deliverable." },
  { id: 6, name: "Illustration", category: "Illustration", price: 300000, days: "5–7", revisions: 2, desc: "Ilustrasi digital custom, berbagai gaya sesuai kebutuhan klien." },
];

const CATEGORIES = ["Semua", "Logo", "Brand", "Social Media", "Print", "UI/UX", "Illustration"];

const STEPS = ["Brief Masuk", "In Progress", "Revision", "Final Delivery"];

const fmt = (n) => "Rp " + n.toLocaleString("id-ID");

// ─── MAIN APP ──────────────────────────────────────────────────────────────────
export default function App() {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [page, setPage] = useState("home");
  const [orders, setOrders] = useState([]);
  const [jobs, setJobs] = useState([
    { id: 1, title: "Social Media Designer", skills: ["Canva", "Illustrator"], type: "Per-project", range: "Rp 150rb–300rb/order", applicants: [] },
    { id: 2, title: "UI/UX Designer", skills: ["Figma", "Prototyping"], type: "Long-term", range: "Rp 500rb–1jt/project", applicants: [] },
    { id: 3, title: "Brand Identity Designer", skills: ["Illustrator", "Photoshop"], type: "Per-project", range: "Rp 300rb–600rb/project", applicants: [] },
  ]);
  const [posts, setPosts] = useState([]);
  const [modal, setModal] = useState(null);
  const [authMode, setAuthMode] = useState("login");

  const openModal = (m) => setModal(m);
  const closeModal = () => setModal(null);

  const login = (email, password) => {
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) return "Email atau password salah.";
    setCurrentUser(user);
    setPage(user.role === "customer" ? "orders" : "dashboard");
    return null;
  };

  const register = (data) => {
    if (users.find(u => u.email === data.email)) return "Email sudah terdaftar.";
    const newUser = { ...data, id: Date.now(), joinedAt: new Date().toLocaleDateString("id-ID") };
    setUsers(prev => [...prev, newUser]);
    setCurrentUser(newUser);
    setPage(data.role === "customer" ? "services" : "dashboard");
    return null;
  };

  const logout = () => { setCurrentUser(null); setPage("home"); };

  const placeOrder = (serviceId, brief, userName) => {
    const svc = SERVICES.find(s => s.id === serviceId);
    const orderId = "ORD-" + Date.now().toString().slice(-6);
    const newOrder = {
      id: orderId, serviceId, serviceName: svc.name, price: svc.price,
      fee: Math.round(svc.price * 0.1), brief, status: 0, revisionNote: "",
      customerId: currentUser.id, customerName: currentUser.name,
      designerId: null, designerName: null,
      messages: [], createdAt: new Date().toLocaleDateString("id-ID"),
      paidAt: new Date().toLocaleDateString("id-ID"),
    };
    setOrders(prev => [...prev, newOrder]);
    closeModal();
    setPage("orders");
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
  };

  const assignDesigner = (orderId) => {
    setOrders(prev => prev.map(o =>
      o.id === orderId ? { ...o, designerId: currentUser.id, designerName: currentUser.name, status: 1 } : o
    ));
  };

  const sendMessage = (orderId, text) => {
    const msg = { from: currentUser.name, role: currentUser.role, text, time: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }) };
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, messages: [...o.messages, msg] } : o));
  };

  const applyJob = (jobId) => {
    setJobs(prev => prev.map(j =>
      j.id === jobId ? { ...j, applicants: [...j.applicants, { id: currentUser.id, name: currentUser.name, appliedAt: new Date().toLocaleDateString("id-ID") }] } : j
    ));
  };

  const addPost = (post) => {
    const newPost = { ...post, id: Date.now(), authorId: currentUser.id, authorName: currentUser.name, authorRole: currentUser.role, likes: 0, replies: [], likedBy: [], createdAt: new Date().toLocaleDateString("id-ID") };
    setPosts(prev => [newPost, ...prev]);
    closeModal();
  };

  const toggleLike = (postId) => {
    setPosts(prev => prev.map(p => {
      if (p.id !== postId) return p;
      const liked = p.likedBy.includes(currentUser.id);
      return { ...p, likes: liked ? p.likes - 1 : p.likes + 1, likedBy: liked ? p.likedBy.filter(x => x !== currentUser.id) : [...p.likedBy, currentUser.id] };
    }));
  };

  const addReply = (postId, text) => {
    setPosts(prev => prev.map(p =>
      p.id === postId ? { ...p, replies: [...p.replies, { name: currentUser.name, role: currentUser.role, text, time: new Date().toLocaleDateString("id-ID") }] } : p
    ));
  };

  if (!currentUser) return (
    <>
      <style>{globalStyle}</style>
      <AuthPage mode={authMode} setMode={setAuthMode} login={login} register={register} />
    </>
  );

  const myOrders = orders.filter(o => currentUser.role === "customer" ? o.customerId === currentUser.id : true);
  const designerOrders = orders.filter(o => currentUser.role === "designer" ? (o.designerId === currentUser.id || o.designerId === null) : []);

  const navItems = currentUser.role === "customer"
    ? [
        { id: "services", icon: "🎨", label: "Services" },
        { id: "orders", icon: "📦", label: "My Orders" },
        { id: "community", icon: "💬", label: "Community" },
      ]
    : [
        { id: "dashboard", icon: "📊", label: "Dashboard" },
        { id: "worker-orders", icon: "📋", label: "Manage Orders" },
        { id: "jobs", icon: "💼", label: "Job Board" },
        { id: "community", icon: "💬", label: "Community" },
      ];

  return (
    <>
      <style>{globalStyle}</style>
      <div>
        {/* NAV */}
        <nav className="nav">
          <div className="nav-logo">✦ PixelCraft</div>
          <div className="nav-right">
            <span className={`role-badge ${currentUser.role === "customer" ? "role-customer" : "role-designer"}`}>
              {currentUser.role === "customer" ? "Customer" : "Designer"}
            </span>
            <span style={{ fontSize: 13, color: "#ccc" }}>{currentUser.name}</span>
            <button className="logout-btn" onClick={logout}>Keluar</button>
          </div>
        </nav>

        {/* SIDEBAR */}
        <aside className="sidebar">
          {navItems.map(item => (
            <button key={item.id} className={`sidebar-item ${page === item.id ? "active" : ""}`} onClick={() => setPage(item.id)}>
              <span className="sidebar-icon">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </aside>

        {/* MAIN */}
        <main className="main">
          {page === "services" && <ServicesPage services={SERVICES} categories={CATEGORIES} openModal={openModal} />}
          {page === "orders" && <OrdersPage orders={myOrders} currentUser={currentUser} openModal={openModal} sendMessage={sendMessage} updateOrderStatus={updateOrderStatus} />}
          {page === "dashboard" && <DesignerDashboard orders={orders} currentUser={currentUser} />}
          {page === "worker-orders" && <WorkerOrdersPage orders={orders} currentUser={currentUser} assignDesigner={assignDesigner} updateOrderStatus={updateOrderStatus} sendMessage={sendMessage} />}
          {page === "jobs" && <JobBoardPage jobs={jobs} currentUser={currentUser} applyJob={applyJob} />}
          {page === "community" && <CommunityPage posts={posts} currentUser={currentUser} openModal={openModal} toggleLike={toggleLike} addReply={addReply} />}
        </main>

        {/* MODALS */}
        {modal?.type === "order" && <OrderModal service={modal.service} currentUser={currentUser} onClose={closeModal} onSubmit={placeOrder} />}
        {modal?.type === "receipt" && <ReceiptModal order={modal.order} onClose={closeModal} />}
        {modal?.type === "post" && <NewPostModal onClose={closeModal} onSubmit={addPost} />}
        {modal?.type === "chat" && <ChatModal order={modal.order} currentUser={currentUser} onClose={closeModal} onSend={sendMessage} />}
      </div>
    </>
  );
}

// ─── AUTH PAGE ─────────────────────────────────────────────────────────────────
function AuthPage({ mode, setMode, login, register }) {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "customer" });
  const [error, setError] = useState("");
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const handleSubmit = () => {
    setError("");
    if (mode === "login") {
      const err = login(form.email, form.password);
      if (err) setError(err);
    } else {
      if (!form.name || !form.email || !form.password) { setError("Semua field wajib diisi."); return; }
      const err = register(form);
      if (err) setError(err);
    }
  };

  return (
    <div className="auth-wrap">
      <div className="auth-box">
        <div className="auth-logo">✦ Pixel<span>Craft</span></div>
        <div className="auth-sub">Platform desain kreatif untuk semua</div>

        <div className="auth-title">{mode === "login" ? "Masuk ke akun" : "Buat akun baru"}</div>

        {mode === "register" && (
          <>
            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 10, color: "#444" }}>Saya adalah:</div>
            <div className="role-pick">
              {[{ v: "customer", icon: "🛍️", label: "Customer", sub: "Saya mau pesan desain" }, { v: "designer", icon: "🎨", label: "Designer", sub: "Saya mau terima order" }].map(r => (
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
          </>
        )}

        <div className="form-group">
          <label className="form-label">Email</label>
          <input className="form-input" type="email" placeholder="email@contoh.com" value={form.email} onChange={e => set("email", e.target.value)} />
        </div>
        <div className="form-group">
          <label className="form-label">Password</label>
          <input className="form-input" type="password" placeholder="••••••••" value={form.password} onChange={e => set("password", e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleSubmit()} />
        </div>

        {error && <div style={{ background: "#fee2e2", color: "#991b1b", borderRadius: 8, padding: "10px 14px", fontSize: 13, marginBottom: 16 }}>{error}</div>}

        <button className="btn btn-primary btn-full" style={{ padding: "12px 20px" }} onClick={handleSubmit}>
          {mode === "login" ? "Masuk →" : "Daftar Sekarang →"}
        </button>

        <div className="auth-switch">
          {mode === "login" ? <>Belum punya akun? <button onClick={() => { setMode("register"); setError(""); }}>Daftar di sini</button></> : <>Sudah punya akun? <button onClick={() => { setMode("login"); setError(""); }}>Masuk</button></>}
        </div>
      </div>
    </div>
  );
}

// ─── SERVICES PAGE ─────────────────────────────────────────────────────────────
function ServicesPage({ services, categories, openModal }) {
  const [cat, setCat] = useState("Semua");
  const filtered = cat === "Semua" ? services : services.filter(s => s.category === cat);

  return (
    <div>
      <div className="page-title">🎨 Order Desain</div>
      <div className="page-sub">Pilih layanan, isi brief, dan pantau progresnya real-time.</div>

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 24 }}>
        {categories.map(c => (
          <button key={c} onClick={() => setCat(c)}
            className="btn btn-sm"
            style={{ background: cat === c ? "#0D0D12" : "white", color: cat === c ? "#E8FF47" : "#666", border: "1.5px solid " + (cat === c ? "#0D0D12" : "#e4e4ec") }}>
            {c}
          </button>
        ))}
      </div>

      <div className="grid-auto">
        {filtered.map(svc => (
          <div key={svc.id} className="service-card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
              <div>
                <div style={{ fontSize: 13, color: "var(--muted)", fontWeight: 600, marginBottom: 4 }}>{svc.category}</div>
                <div style={{ fontFamily: "var(--font-head)", fontSize: 18, fontWeight: 700 }}>{svc.name}</div>
              </div>
              <span className="badge badge-pending">{svc.revisions}x Revisi</span>
            </div>
            <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.6, marginBottom: 16 }}>{svc.desc}</p>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <div>
                <div style={{ fontSize: 11, color: "var(--muted)" }}>Mulai dari</div>
                <div style={{ fontFamily: "var(--font-head)", fontSize: 20, fontWeight: 800 }}>{fmt(svc.price)}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 11, color: "var(--muted)" }}>Estimasi</div>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{svc.days} hari</div>
              </div>
            </div>
            <button className="btn btn-primary btn-full" onClick={() => openModal({ type: "order", service: svc })}>
              Order Sekarang →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── ORDERS PAGE (CUSTOMER) ────────────────────────────────────────────────────
function OrdersPage({ orders, currentUser, openModal, sendMessage, updateOrderStatus }) {
  const [activeTab, setActiveTab] = useState("active");
  const active = orders.filter(o => o.status < 3);
  const done = orders.filter(o => o.status === 3);
  const shown = activeTab === "active" ? active : done;

  return (
    <div>
      <div className="page-title">📦 My Orders</div>
      <div className="page-sub">Pantau semua orderan kamu dan komunikasikan langsung sama designer.</div>

      <div className="tab-bar">
        <button className={`tab-item ${activeTab === "active" ? "active" : ""}`} onClick={() => setActiveTab("active")}>
          Aktif ({active.length})
        </button>
        <button className={`tab-item ${activeTab === "done" ? "active" : ""}`} onClick={() => setActiveTab("done")}>
          Selesai ({done.length})
        </button>
      </div>

      {shown.length === 0 ? (
        <div className="empty">
          <div className="empty-icon">{activeTab === "active" ? "📭" : "🎉"}</div>
          <h3>{activeTab === "active" ? "Belum ada order aktif" : "Belum ada order selesai"}</h3>
          <p>{activeTab === "active" ? "Yuk, pesan desain pertamamu! Browse layanan kami dan mulai orderan." : "Order yang sudah selesai akan muncul di sini."}</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {shown.map(order => (
            <OrderCard key={order.id} order={order} currentUser={currentUser} openModal={openModal} sendMessage={sendMessage} updateOrderStatus={updateOrderStatus} />
          ))}
        </div>
      )}
    </div>
  );
}

function OrderCard({ order, currentUser, openModal, sendMessage, updateOrderStatus }) {
  const [chatOpen, setChatOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const svc = SERVICES.find(s => s.id === order.serviceId);

  const statusBadge = ["badge-pending", "badge-progress", "badge-revision", "badge-done"][order.status];
  const statusLabel = ["Brief Masuk", "In Progress", "Revision", "Selesai"][order.status];

  const send = () => { if (msg.trim()) { sendMessage(order.id, msg.trim()); setMsg(""); } };

  return (
    <div className="card">
      <div className="flex justify-between items-center mb-8">
        <div>
          <div style={{ fontSize: 11, color: "var(--muted)", fontWeight: 600 }}>#{order.id}</div>
          <div style={{ fontFamily: "var(--font-head)", fontSize: 18, fontWeight: 700, marginTop: 2 }}>{order.serviceName}</div>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <span className={`badge ${statusBadge}`}>{statusLabel}</span>
          <button className="btn btn-sm btn-outline" onClick={() => openModal({ type: "receipt", order })}>🧾 Receipt</button>
        </div>
      </div>

      <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
        <div style={{ flex: 1, background: "#F7F6F2", borderRadius: 10, padding: "12px 14px" }}>
          <div style={{ fontSize: 11, color: "var(--muted)", fontWeight: 600, marginBottom: 4 }}>BRIEF</div>
          <div style={{ fontSize: 13, lineHeight: 1.6 }}>{order.brief}</div>
        </div>
        <div style={{ minWidth: 130, background: "#F7F6F2", borderRadius: 10, padding: "12px 14px" }}>
          <div style={{ fontSize: 11, color: "var(--muted)", fontWeight: 600, marginBottom: 4 }}>TOTAL BAYAR</div>
          <div style={{ fontFamily: "var(--font-head)", fontSize: 16, fontWeight: 800 }}>{fmt(order.price + order.fee)}</div>
          <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 4 }}>{order.designerName ? `Designer: ${order.designerName}` : "Menunggu designer"}</div>
        </div>
      </div>

      {/* Progress */}
      <div className="progress-track">
        {STEPS.map((step, i) => (
          <div key={step} style={{ display: "flex", alignItems: "center", flex: 1 }}>
            <div className="progress-step">
              <div className={`progress-circle ${order.status > i ? "done" : order.status === i ? "active" : ""}`}>
                {order.status > i ? "✓" : i + 1}
              </div>
              <div className="progress-label">{step}</div>
            </div>
            {i < STEPS.length - 1 && <div className={`progress-line ${order.status > i ? "done" : ""}`} />}
          </div>
        ))}
      </div>

      {/* Actions */}
      {currentUser.role === "customer" && order.status === 1 && (
        <div style={{ marginTop: 12 }}>
          <button className="btn btn-sm btn-outline" onClick={() => updateOrderStatus(order.id, 2)}>
            🔄 Minta Revisi
          </button>
        </div>
      )}

      {/* Chat */}
      <div className="divider" />
      <button className="btn btn-sm btn-outline" onClick={() => setChatOpen(!chatOpen)}>
        💬 {chatOpen ? "Tutup Chat" : `Chat dengan ${order.designerName || "Designer"}`}
        {order.messages.length > 0 && <span style={{ background: "var(--accent2)", color: "white", borderRadius: "50%", width: 18, height: 18, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 10 }}>{order.messages.length}</span>}
      </button>

      {chatOpen && (
        <div style={{ marginTop: 12, background: "#F7F6F2", borderRadius: 12, padding: 16 }}>
          <div className="chat-area">
            {order.messages.length === 0 && <div style={{ textAlign: "center", fontSize: 13, color: "var(--muted)", padding: 16 }}>Belum ada pesan. Mulai komunikasi dengan designer kamu!</div>}
            {order.messages.map((m, i) => (
              <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: m.name === currentUser.name ? "flex-end" : "flex-start" }}>
                <div className={`chat-msg ${m.name === currentUser.name ? "from-me" : "from-other"}`}>{m.text}</div>
                <div className="chat-meta">{m.name} · {m.time}</div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
            <input className="form-input" style={{ flex: 1 }} placeholder="Tulis pesan..." value={msg} onChange={e => setMsg(e.target.value)} onKeyDown={e => e.key === "Enter" && send()} />
            <button className="btn btn-primary btn-sm" onClick={send}>Kirim</button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── DESIGNER DASHBOARD ────────────────────────────────────────────────────────
function DesignerDashboard({ orders, currentUser }) {
  const myOrders = orders.filter(o => o.designerId === currentUser.id);
  const earned = myOrders.filter(o => o.status === 3).reduce((s, o) => s + Math.round(o.price * 0.85), 0);
  const pending = myOrders.filter(o => o.status < 3).reduce((s, o) => s + Math.round(o.price * 0.85), 0);

  return (
    <div>
      <div className="page-title">📊 Designer Hub</div>
      <div className="page-sub">Selamat datang, {currentUser.name}! Ini ringkasan aktivitasmu.</div>

      <div className="grid-3" style={{ marginBottom: 24 }}>
        <div className="stat-card">
          <div className="stat-label">Total Earned</div>
          <div className="stat-value">{fmt(earned)}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Pending</div>
          <div className="stat-value">{fmt(pending)}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Order Selesai</div>
          <div className="stat-value">{myOrders.filter(o => o.status === 3).length}</div>
        </div>
      </div>

      {myOrders.length === 0 ? (
        <div className="card">
          <div className="empty">
            <div className="empty-icon">📋</div>
            <h3>Belum ada order aktif</h3>
            <p>Kamu belum menerima order apapun. Pergi ke "Manage Orders" untuk melihat order yang tersedia dan mulai bekerja!</p>
          </div>
        </div>
      ) : (
        <div className="card">
          <div style={{ fontFamily: "var(--font-head)", fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Order Aktif</div>
          {myOrders.filter(o => o.status < 3).map(o => (
            <div key={o.id} style={{ padding: "14px 0", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontWeight: 600 }}>{o.serviceName}</div>
                <div style={{ fontSize: 12, color: "var(--muted)" }}>Client: {o.customerName} · #{o.id}</div>
              </div>
              <span className={`badge badge-${["pending", "progress", "revision", "done"][o.status]}`}>
                {["Brief Masuk", "In Progress", "Revision", "Selesai"][o.status]}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── WORKER ORDERS PAGE ────────────────────────────────────────────────────────
function WorkerOrdersPage({ orders, currentUser, assignDesigner, updateOrderStatus, sendMessage }) {
  const [tab, setTab] = useState("available");
  const available = orders.filter(o => o.designerId === null);
  const myOrders = orders.filter(o => o.designerId === currentUser.id);

  return (
    <div>
      <div className="page-title">📋 Manage Orders</div>
      <div className="page-sub">Ambil order baru atau kelola order yang sedang berjalan.</div>

      <div className="tab-bar">
        <button className={`tab-item ${tab === "available" ? "active" : ""}`} onClick={() => setTab("available")}>Order Tersedia ({available.length})</button>
        <button className={`tab-item ${tab === "mine" ? "active" : ""}`} onClick={() => setTab("mine")}>Order Saya ({myOrders.length})</button>
      </div>

      {tab === "available" && (
        available.length === 0 ? (
          <div className="empty"><div className="empty-icon">🎯</div><h3>Tidak ada order tersedia</h3><p>Saat ini belum ada order masuk. Pantau terus halaman ini!</p></div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {available.map(o => (
              <div key={o.id} className="card">
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <div style={{ fontSize: 11, color: "var(--muted)" }}>#{o.id}</div>
                    <div style={{ fontFamily: "var(--font-head)", fontSize: 17, fontWeight: 700 }}>{o.serviceName}</div>
                  </div>
                  <div style={{ fontFamily: "var(--font-head)", fontSize: 18, fontWeight: 800, color: "var(--green)" }}>{fmt(Math.round(o.price * 0.85))}</div>
                </div>
                <div style={{ background: "#F7F6F2", borderRadius: 10, padding: "10px 14px", marginBottom: 14, fontSize: 13, color: "#444" }}>
                  <span style={{ fontWeight: 600, color: "var(--muted)", fontSize: 11 }}>BRIEF: </span>{o.brief}
                </div>
                <div className="flex justify-between items-center">
                  <div style={{ fontSize: 12, color: "var(--muted)" }}>Client: {o.customerName} · {o.createdAt}</div>
                  <button className="btn btn-accent btn-sm" onClick={() => assignDesigner(o.id)}>✋ Ambil Order</button>
                </div>
              </div>
            ))}
          </div>
        )
      )}

      {tab === "mine" && (
        myOrders.length === 0 ? (
          <div className="empty"><div className="empty-icon">📭</div><h3>Belum ada order aktif</h3><p>Ambil order dari tab "Order Tersedia" untuk mulai bekerja.</p></div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {myOrders.map(o => <WorkerOrderCard key={o.id} order={o} currentUser={currentUser} updateOrderStatus={updateOrderStatus} sendMessage={sendMessage} />)}
          </div>
        )
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

  const nextAction = () => {
    if (order.status === 0) return { label: "▶ Mulai Pengerjaan", next: 1 };
    if (order.status === 1) return { label: "📤 Submit ke Client", next: 2 };
    if (order.status === 2) return { label: "✅ Tandai Selesai", next: 3 };
    return null;
  };
  const action = nextAction();

  return (
    <div className="card">
      <div className="flex justify-between items-center mb-8">
        <div>
          <div style={{ fontSize: 11, color: "var(--muted)" }}>#{order.id}</div>
          <div style={{ fontFamily: "var(--font-head)", fontSize: 17, fontWeight: 700 }}>{order.serviceName}</div>
          <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 2 }}>Client: {order.customerName}</div>
        </div>
        <span className={`badge ${statusBadge}`}>{statusLabel}</span>
      </div>

      <div style={{ background: "#F7F6F2", borderRadius: 10, padding: "10px 14px", marginBottom: 14, fontSize: 13 }}>
        <span style={{ fontWeight: 600, color: "var(--muted)", fontSize: 11 }}>BRIEF: </span>{order.brief}
      </div>

      <div className="progress-track">
        {STEPS.map((step, i) => (
          <div key={step} style={{ display: "flex", alignItems: "center", flex: 1 }}>
            <div className="progress-step">
              <div className={`progress-circle ${order.status > i ? "done" : order.status === i ? "active" : ""}`}>
                {order.status > i ? "✓" : i + 1}
              </div>
              <div className="progress-label">{step}</div>
            </div>
            {i < STEPS.length - 1 && <div className={`progress-line ${order.status > i ? "done" : ""}`} />}
          </div>
        ))}
      </div>

      <div className="flex gap-8 mt-12">
        {action && order.status < 3 && (
          <button className="btn btn-accent btn-sm" onClick={() => updateOrderStatus(order.id, action.next)}>{action.label}</button>
        )}
        <button className="btn btn-sm btn-outline" onClick={() => setChatOpen(!chatOpen)}>
          💬 Chat Client {order.messages.length > 0 && `(${order.messages.length})`}
        </button>
      </div>

      {chatOpen && (
        <div style={{ marginTop: 12, background: "#F7F6F2", borderRadius: 12, padding: 16 }}>
          <div className="chat-area">
            {order.messages.length === 0 && <div style={{ textAlign: "center", fontSize: 13, color: "var(--muted)", padding: 16 }}>Belum ada pesan.</div>}
            {order.messages.map((m, i) => (
              <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: m.name === currentUser.name ? "flex-end" : "flex-start" }}>
                <div className={`chat-msg ${m.name === currentUser.name ? "from-me" : "from-other"}`}>{m.text}</div>
                <div className="chat-meta">{m.name} · {m.time}</div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
            <input className="form-input" style={{ flex: 1 }} placeholder="Tulis pesan..." value={msg} onChange={e => setMsg(e.target.value)} onKeyDown={e => e.key === "Enter" && send()} />
            <button className="btn btn-primary btn-sm" onClick={send}>Kirim</button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── JOB BOARD ─────────────────────────────────────────────────────────────────
function JobBoardPage({ jobs, currentUser, applyJob }) {
  const isDesigner = currentUser.role === "designer";

  return (
    <div>
      <div className="page-title">💼 Job Board</div>
      <div className="page-sub">{isDesigner ? "Daftar posisi terbuka untuk designer freelance PixelCraft." : "Lihat posisi desainer yang tersedia di platform kami."}</div>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {jobs.map(job => {
          const alreadyApplied = job.applicants.some(a => a.id === currentUser.id);
          return (
            <div key={job.id} className="card">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <div style={{ fontFamily: "var(--font-head)", fontSize: 18, fontWeight: 700 }}>{job.title}</div>
                  <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 2 }}>{job.type} · {job.range}</div>
                </div>
                {isDesigner && (
                  alreadyApplied
                    ? <span className="badge badge-done">✓ Applied</span>
                    : <button className="btn btn-primary btn-sm" onClick={() => applyJob(job.id)}>Apply Now</button>
                )}
              </div>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 }}>
                {job.skills.map(s => (
                  <span key={s} style={{ background: "#F0F0F5", color: "#444", fontSize: 12, fontWeight: 600, padding: "4px 10px", borderRadius: 8 }}>{s}</span>
                ))}
              </div>
              {job.applicants.length > 0 && (
                <div style={{ fontSize: 12, color: "var(--muted)", borderTop: "1px solid var(--border)", paddingTop: 12, marginTop: 4 }}>
                  👥 {job.applicants.length} pelamar · Terakhir: {job.applicants[job.applicants.length - 1].name}
                </div>
              )}
              {job.applicants.length === 0 && (
                <div style={{ fontSize: 12, color: "var(--muted)" }}>👥 Belum ada pelamar</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── COMMUNITY ─────────────────────────────────────────────────────────────────
function CommunityPage({ posts, currentUser, openModal, toggleLike, addReply }) {
  const [filter, setFilter] = useState("Semua");
  const [replyOpen, setReplyOpen] = useState(null);
  const [replyText, setReplyText] = useState("");
  const TAGS = ["Semua", "Font Talk", "Color Theory", "Tool Tips", "Kritik Karya", "Testimoni"];

  const filtered = filter === "Semua" ? posts : posts.filter(p => p.tag === filter);

  const submitReply = (postId) => {
    if (replyText.trim()) { addReply(postId, replyText.trim()); setReplyText(""); setReplyOpen(null); }
  };

  return (
    <div>
      <div className="flex justify-between items-center" style={{ marginBottom: 6 }}>
        <div className="page-title" style={{ marginBottom: 0 }}>💬 Community</div>
        <button className="btn btn-accent" onClick={() => openModal({ type: "post" })}>+ Post Baru</button>
      </div>
      <div className="page-sub">Diskusi desain, minta feedback, berbagi tips — untuk semua member.</div>

      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 24 }}>
        {TAGS.map(t => (
          <button key={t} onClick={() => setFilter(t)}
            className="btn btn-sm"
            style={{ background: filter === t ? "#0D0D12" : "white", color: filter === t ? "#E8FF47" : "#666", border: "1.5px solid " + (filter === t ? "#0D0D12" : "#e4e4ec") }}>
            {t}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="empty">
          <div className="empty-icon">🌱</div>
          <h3>Komunitas masih sepi</h3>
          <p>Jadi yang pertama posting! Bagikan tips, minta feedback desain, atau tanya soal font & warna.</p>
          <button className="btn btn-primary" onClick={() => openModal({ type: "post" })}>+ Buat Post Pertama</button>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {filtered.map(post => (
            <div key={post.id} className="community-post">
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-8">
                  <div style={{ width: 34, height: 34, background: post.authorRole === "designer" ? "#F4C430" : "#3B82F6", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 13, color: "white" }}>
                    {post.authorName[0]}
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{post.authorName}</div>
                    <div className="flex items-center gap-8">
                      <span className={`role-badge ${post.authorRole === "customer" ? "role-customer" : "role-designer"}`} style={{ fontSize: 10 }}>
                        {post.authorRole === "customer" ? "Customer" : "Designer"}
                      </span>
                      <span style={{ fontSize: 11, color: "var(--muted)" }}>{post.createdAt}</span>
                    </div>
                  </div>
                </div>
                {post.tag && <span style={{ background: "#F0F0F5", color: "#555", fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 8 }}>{post.tag}</span>}
              </div>

              <p style={{ fontSize: 14, lineHeight: 1.7, marginBottom: 14 }}>{post.content}</p>

              <div className="flex items-center gap-12">
                <button onClick={() => toggleLike(post.id)}
                  style={{ background: "none", border: "none", cursor: "pointer", fontSize: 13, color: post.likedBy.includes(currentUser.id) ? "var(--accent2)" : "var(--muted)", fontWeight: 600, fontFamily: "var(--font-body)" }}>
                  {post.likedBy.includes(currentUser.id) ? "❤️" : "🤍"} {post.likes}
                </button>
                <button onClick={() => setReplyOpen(replyOpen === post.id ? null : post.id)}
                  style={{ background: "none", border: "none", cursor: "pointer", fontSize: 13, color: "var(--muted)", fontWeight: 600, fontFamily: "var(--font-body)" }}>
                  💬 {post.replies.length} Balasan
                </button>
              </div>

              {post.replies.length > 0 && (
                <div style={{ marginTop: 12, borderTop: "1px solid var(--border)", paddingTop: 12, display: "flex", flexDirection: "column", gap: 8 }}>
                  {post.replies.map((r, i) => (
                    <div key={i} style={{ background: "#F7F6F2", borderRadius: 10, padding: "10px 14px" }}>
                      <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 3 }}>{r.name} <span style={{ fontWeight: 400, color: "var(--muted)" }}>· {r.time}</span></div>
                      <div style={{ fontSize: 13 }}>{r.text}</div>
                    </div>
                  ))}
                </div>
              )}

              {replyOpen === post.id && (
                <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
                  <input className="form-input" style={{ flex: 1 }} placeholder="Tulis balasan..." value={replyText} onChange={e => setReplyText(e.target.value)} onKeyDown={e => e.key === "Enter" && submitReply(post.id)} />
                  <button className="btn btn-primary btn-sm" onClick={() => submitReply(post.id)}>Balas</button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── MODAL: ORDER FORM ─────────────────────────────────────────────────────────
function OrderModal({ service, currentUser, onClose, onSubmit }) {
  const [brief, setBrief] = useState("");
  const [step, setStep] = useState(1); // 1=form, 2=confirm
  const fee = Math.round(service.price * 0.1);
  const total = service.price + fee;

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        {step === 1 && (
          <>
            <div className="modal-title">📝 Isi Brief Order</div>
            <div style={{ background: "#F7F6F2", borderRadius: 12, padding: "14px 16px", marginBottom: 20 }}>
              <div style={{ fontFamily: "var(--font-head)", fontSize: 16, fontWeight: 700 }}>{service.name}</div>
              <div style={{ fontSize: 13, color: "var(--muted)", marginTop: 4 }}>Mulai dari {fmt(service.price)} · {service.days} hari · {service.revisions}x revisi</div>
            </div>

            <div className="form-group">
              <label className="form-label">Nama / Brand *</label>
              <input className="form-input" placeholder="Nama brand atau project kamu" />
            </div>
            <div className="form-group">
              <label className="form-label">Deskripsi / Brief Lengkap *</label>
              <textarea className="form-textarea" placeholder="Ceritakan tentang bisnismu, target market, style yang kamu inginkan, referensi, warna preferensi, dll. Makin detail, hasil makin sesuai!" value={brief} onChange={e => setBrief(e.target.value)} style={{ minHeight: 130 }} />
            </div>
            <div className="form-group">
              <label className="form-label">Referensi / Inspirasi (opsional)</label>
              <input className="form-input" placeholder="Link referensi, nama brand, atau describe style-nya" />
            </div>

            <div className="flex gap-8">
              <button className="btn btn-outline btn-sm" onClick={onClose}>Batal</button>
              <button className="btn btn-primary" style={{ flex: 1 }} onClick={() => { if (!brief.trim()) return alert("Brief wajib diisi!"); setStep(2); }}>
                Lanjut ke Konfirmasi →
              </button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <div className="modal-title">✅ Konfirmasi Order</div>
            <div style={{ background: "#F7F6F2", borderRadius: 12, padding: 20, marginBottom: 20 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <span style={{ fontSize: 13, color: "var(--muted)" }}>Layanan</span>
                <span style={{ fontSize: 13, fontWeight: 600 }}>{service.name}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <span style={{ fontSize: 13, color: "var(--muted)" }}>Harga</span>
                <span style={{ fontSize: 13, fontWeight: 600 }}>{fmt(service.price)}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                <span style={{ fontSize: 13, color: "var(--muted)" }}>Platform fee (10%)</span>
                <span style={{ fontSize: 13, fontWeight: 600 }}>{fmt(fee)}</span>
              </div>
              <div style={{ borderTop: "1.5px dashed #ddd", paddingTop: 12, display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontWeight: 700 }}>Total Bayar</span>
                <span style={{ fontFamily: "var(--font-head)", fontSize: 18, fontWeight: 800 }}>{fmt(total)}</span>
              </div>
            </div>
            <div style={{ background: "#DBEAFE", borderRadius: 10, padding: "12px 14px", marginBottom: 20, fontSize: 13, color: "#1E40AF" }}>
              💡 Dengan menekan "Konfirmasi", kamu menyetujui order ini dan brief akan langsung diteruskan ke designer kami.
            </div>
            <div className="flex gap-8">
              <button className="btn btn-outline btn-sm" onClick={() => setStep(1)}>← Kembali</button>
              <button className="btn btn-accent" style={{ flex: 1, padding: "12px 20px" }} onClick={() => onSubmit(service.id, brief, currentUser.name)}>
                Konfirmasi & Order 🎉
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ─── MODAL: RECEIPT ────────────────────────────────────────────────────────────
function ReceiptModal({ order, onClose }) {
  const fee = order.fee;
  const total = order.price + fee;

  const downloadReceipt = () => {
    const html = `<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<title>Receipt #${order.id}</title>
<style>
  body { font-family: 'Courier New', monospace; max-width: 480px; margin: 40px auto; padding: 32px; background: white; color: #111; }
  .logo { font-size: 22px; font-weight: 900; letter-spacing: 3px; text-align: center; margin-bottom: 4px; }
  .tagline { text-align: center; font-size: 11px; color: #888; margin-bottom: 24px; }
  .divider { border: none; border-top: 1px dashed #ccc; margin: 16px 0; }
  .row { display: flex; justify-content: space-between; font-size: 13px; margin-bottom: 8px; }
  .total { font-size: 16px; font-weight: 900; }
  .status { text-align: center; margin-top: 20px; font-size: 18px; font-weight: 900; letter-spacing: 2px; color: #2ECC71; }
  .footer { text-align: center; font-size: 11px; color: #aaa; margin-top: 20px; }
  @media print { body { margin: 0; } }
</style>
</head>
<body>
  <div class="logo">★ PIXELCRAFT ★</div>
  <div class="tagline">Design Agency Platform</div>
  <hr class="divider">
  <div class="row"><span>Receipt No.</span><span>${order.id}</span></div>
  <div class="row"><span>Tanggal</span><span>${order.paidAt}</span></div>
  <hr class="divider">
  <div class="row"><span>Customer</span><span>${order.customerName}</span></div>
  <div class="row"><span>Layanan</span><span>${order.serviceName}</span></div>
  <div class="row"><span>Designer</span><span>${order.designerName || "Belum assigned"}</span></div>
  <hr class="divider">
  <div class="row"><span>Subtotal</span><span>Rp ${order.price.toLocaleString("id-ID")}</span></div>
  <div class="row"><span>Platform Fee (10%)</span><span>Rp ${fee.toLocaleString("id-ID")}</span></div>
  <hr class="divider">
  <div class="row total"><span>TOTAL BAYAR</span><span>Rp ${total.toLocaleString("id-ID")}</span></div>
  <div class="status">✓ LUNAS</div>
  <hr class="divider">
  <div class="footer">Terima kasih telah menggunakan PixelCraft Studio!<br>Untuk pertanyaan: support@pixelcraft.id</div>
</body>
</html>`;

    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Receipt-${order.id}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    // Also trigger print dialog for PDF
    const win = window.open(url, "_blank");
    if (win) setTimeout(() => win.print(), 500);
  };

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal" style={{ maxWidth: 520 }}>
        <div className="modal-title">🧾 Receipt Order</div>
        <div className="receipt-paper">
          <div className="receipt-header">
            <div className="receipt-logo">★ PIXELCRAFT ★</div>
            <div className="receipt-tagline">Design Agency Platform</div>
          </div>
          <div className="receipt-row"><span>Receipt No.</span><span style={{ fontWeight: 700 }}>#{order.id}</span></div>
          <div className="receipt-row"><span>Tanggal</span><span>{order.paidAt}</span></div>
          <hr className="receipt-divider" />
          <div className="receipt-row"><span>Customer</span><span>{order.customerName}</span></div>
          <div className="receipt-row"><span>Layanan</span><span>{order.serviceName}</span></div>
          <div className="receipt-row"><span>Designer</span><span>{order.designerName || "—"}</span></div>
          <hr className="receipt-divider" />
          <div className="receipt-row"><span>Subtotal</span><span>{fmt(order.price)}</span></div>
          <div className="receipt-row"><span>Platform Fee (10%)</span><span>{fmt(fee)}</span></div>
          <hr className="receipt-divider" />
          <div className="receipt-row receipt-total"><span>TOTAL BAYAR</span><span>{fmt(total)}</span></div>
          <div className="receipt-status">
            <span style={{ background: "#D1FAE5", color: "#065F46", padding: "6px 20px", borderRadius: 8, fontWeight: 800, fontSize: 14, letterSpacing: 1 }}>✓ LUNAS</span>
          </div>
        </div>

        <div style={{ marginTop: 20, display: "flex", gap: 8 }}>
          <button className="btn btn-outline btn-sm" onClick={onClose}>Tutup</button>
          <button className="btn btn-primary" style={{ flex: 1 }} onClick={downloadReceipt}>
            ⬇ Download Receipt (Print/PDF)
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── MODAL: NEW POST ───────────────────────────────────────────────────────────
function NewPostModal({ onClose, onSubmit }) {
  const [content, setContent] = useState("");
  const [tag, setTag] = useState("Font Talk");
  const TAGS = ["Font Talk", "Color Theory", "Tool Tips", "Kritik Karya", "Testimoni"];

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-title">✏️ Buat Post Baru</div>
        <div className="form-group">
          <label className="form-label">Kategori</label>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {TAGS.map(t => (
              <button key={t} onClick={() => setTag(t)}
                style={{ fontSize: 12, padding: "6px 12px", borderRadius: 8, border: "1.5px solid " + (tag === t ? "#0D0D12" : "#e4e4ec"), background: tag === t ? "#0D0D12" : "white", color: tag === t ? "#E8FF47" : "#666", cursor: "pointer", fontFamily: "var(--font-body)", fontWeight: 600 }}>
                {t}
              </button>
            ))}
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Isi Post</label>
          <textarea className="form-textarea" style={{ minHeight: 120 }} placeholder="Bagikan pikiran, tips, pertanyaan, atau minta feedback desainmu di sini..." value={content} onChange={e => setContent(e.target.value)} />
        </div>
        <div className="flex gap-8">
          <button className="btn btn-outline btn-sm" onClick={onClose}>Batal</button>
          <button className="btn btn-primary" style={{ flex: 1 }} onClick={() => { if (!content.trim()) return; onSubmit({ content, tag }); }}>
            Post 🚀
          </button>
        </div>
      </div>
    </div>
  );
}
