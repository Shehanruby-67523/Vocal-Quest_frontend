import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Bell, 
  UserPlus, 
  Download, 
  ChevronDown, 
  ChevronLeft, 
  ChevronRight, 
  Folder, 
  RotateCcw, 
  Ban, 
  Check, 
  Shield, 
  AlertCircle, 
  Clock, 
  X, 
  Plus, 
  Trash2,
  Lock,
  Database,
  Sliders,
  ShieldAlert,
  UserCheck
} from 'lucide-react';
import AdminSidebar from '../Components/common/AdminSidebar';

export default function UserManagement() {
  // Navigation Tabs state
  const [activeTab, setActiveTab] = useState('Users');

  // Core Users State
  const [users, setUsers] = useState([
    { id: 'VQ-7721', username: 'AlexVocal', email: 'alex@vocalquest.io', status: 'Active', role: 'Admin', verified: true, gameSaves: 14, lastActive: '2 mins ago' },
    { id: 'VQ-1029', username: 'JordanMelody', email: 'jordan@quest.net', status: 'Suspended', role: 'Standard', verified: false, gameSaves: 5, lastActive: '3 days ago' },
    { id: 'VQ-9902', username: 'TaylorTone', email: 'taylor@vocal.studio', status: 'Active', role: 'Standard', verified: true, gameSaves: 8, lastActive: '10 mins ago' },
    { id: 'VQ-4821', username: 'SamSonic', email: 'sam@sonic.dev', status: 'Active', role: 'Standard', verified: true, gameSaves: 12, lastActive: '1 hour ago' },
    { id: 'VQ-3104', username: 'MorganPitch', email: 'morgan@pitch.org', status: 'Suspended', role: 'Standard', verified: true, gameSaves: 2, lastActive: '1 week ago' },
    { id: 'VQ-2983', username: 'CaseyBeat', email: 'casey@beat.io', status: 'Active', role: 'Admin', verified: true, gameSaves: 21, lastActive: 'Just now' },
    { id: 'VQ-1102', username: 'RobinHarmony', email: 'robin@harmony.com', status: 'Active', role: 'Standard', verified: false, gameSaves: 4, lastActive: '5 hours ago' },
    { id: 'VQ-8392', username: 'AveryTempo', email: 'avery@tempo.net', status: 'Active', role: 'Standard', verified: true, gameSaves: 9, lastActive: 'Yesterday' },
    { id: 'VQ-6745', username: 'SkylerTune', email: 'skyler@tune.co', status: 'Suspended', role: 'Standard', verified: false, gameSaves: 1, lastActive: '2 weeks ago' },
    { id: 'VQ-5021', username: 'RileyScale', email: 'riley@scale.cc', status: 'Active', role: 'Standard', verified: true, gameSaves: 17, lastActive: '4 hours ago' }
  ]);

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUsers, setSelectedUsers] = useState(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Modal States
  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const [savesModalOpen, setSavesModalOpen] = useState(false);
  const [historyModalOpen, setHistoryModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // New User Form State
  const [newUser, setNewUser] = useState({
    username: '',
    email: '',
    role: 'Standard',
    status: 'Active',
    verified: true
  });

  // Bulk Actions State
  const [bulkActionDropdownOpen, setBulkActionDropdownOpen] = useState(false);

  // Notifications simulation
  const [notifications, setNotifications] = useState([
    { id: 1, text: "New registration: SkylerTune", time: "2 hours ago" },
    { id: 2, text: "User VQ-1029 suspended by Admin", time: "1 day ago" }
  ]);
  const [showNotifications, setShowNotifications] = useState(false);

  // Statistics derived from users state
  const stats = useMemo(() => {
    const verifiedCount = users.filter(u => u.verified).length;
    const suspendedCount = users.filter(u => u.status === 'Suspended').length;
    const totalSaves = users.reduce((acc, u) => acc + u.gameSaves, 0);
    return {
      verified: verifiedCount * 10, // Scaled for design matching (e.g. 1120 in design, we can scale or show exact)
      suspended: suspendedCount,
      recentActivity: users.length * 15 // Mock scalar
    };
  }, [users]);

  // Filtered & Paginated Users
  const filteredUsers = useMemo(() => {
    return users.filter(user => 
      user.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [users, searchQuery]);

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage) || 1;

  const paginatedUsers = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredUsers.slice(start, start + itemsPerPage);
  }, [filteredUsers, currentPage]);

  // Handlers
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const allIds = paginatedUsers.map(u => u.id);
      setSelectedUsers(new Set(allIds));
    } else {
      setSelectedUsers(new Set());
    }
  };

  const handleSelectUser = (id) => {
    const newSelected = new Set(selectedUsers);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedUsers(newSelected);
  };

  const handleStatusToggle = (id) => {
    setUsers(prev => prev.map(u => {
      if (u.id === id) {
        const newStatus = u.status === 'Active' ? 'Suspended' : 'Active';
        return { ...u, status: newStatus };
      }
      return u;
    }));
  };

  const handleRoleChange = (id, newRole) => {
    setUsers(prev => prev.map(u => 
      u.id === id ? { ...u, role: newRole } : u
    ));
  };

  const handleInviteSubmit = (e) => {
    e.preventDefault();
    if (!newUser.username || !newUser.email) return;

    const newId = `VQ-${Math.floor(1000 + Math.random() * 9000)}`;
    const createdUser = {
      id: newId,
      username: newUser.username,
      email: newUser.email,
      role: newUser.role,
      status: newUser.status,
      verified: newUser.verified,
      gameSaves: 0,
      lastActive: 'Just now'
    };

    setUsers([createdUser, ...users]);
    setInviteModalOpen(false);
    setNewUser({ username: '', email: '', role: 'Standard', status: 'Active', verified: true });
  };

  const handleBulkAction = (action) => {
    if (selectedUsers.size === 0) return;
    setUsers(prev => prev.map(u => {
      if (selectedUsers.has(u.id)) {
        if (action === 'suspend') return { ...u, status: 'Suspended' };
        if (action === 'activate') return { ...u, status: 'Active' };
        if (action === 'delete') return null;
      }
      return u;
    }).filter(Boolean));
    setSelectedUsers(new Set());
    setBulkActionDropdownOpen(false);
  };

  const handleExportCSV = () => {
    const headers = ['User ID', 'Username', 'Email', 'Account Status', 'Role', 'Verified', 'Game Saves', 'Last Active'];
    const csvRows = [
      headers.join(','),
      ...users.map(u => [
        u.id,
        u.username,
        u.email,
        u.status,
        u.role,
        u.verified ? 'Yes' : 'No',
        u.gameSaves,
        u.lastActive
      ].map(val => `"${val}"`).join(','))
    ];
    
    const csvContent = "data:text/csv;charset=utf-8," + csvRows.join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "vocal_quest_users.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex min-h-screen bg-[#070b13] text-slate-100 font-sans antialiased overflow-x-hidden">
      {/* Sidebar navigation */}
      <AdminSidebar />

      {/* Main Content Pane */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* 1. TOP HEADER / NAVIGATION */}
        <header className="border-b border-slate-800/80 bg-[#0a0f1d]/50 backdrop-blur-md sticky top-0 z-40">
          <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
            {/* Page Title */}
            <div className="flex items-center gap-3">
              <span className="text-lg font-bold tracking-tight text-white flex items-center gap-1.5">
                User Management
              </span>
            </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            {['Users', 'Security', 'GameSaves', 'Settings'].map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setCurrentPage(1);
                }}
                className={`text-sm font-medium transition-all duration-200 relative py-1.5 ${
                  activeTab === tab 
                    ? 'text-gold-400' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gold-400 rounded-full" />
                )}
              </button>
            ))}
          </nav>

          {/* Search, Notifications & Profile */}
          <div className="flex items-center gap-4">
            <div className="relative hidden sm:block w-52 md:w-64">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
              <input 
                type="text" 
                placeholder="Global search..." 
                className="w-full bg-[#0a1b2f] text-xs text-slate-200 pl-9 pr-4 py-2 rounded-lg border border-slate-800/80 focus:outline-none focus:border-gold-400/50 transition"
              />
            </div>

            {/* Notification Bell */}
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 text-slate-400 hover:text-slate-200 rounded-lg hover:bg-slate-800/40 transition relative"
              >
                <Bell size={18} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500" />
              </button>

              {/* Notification Popover */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-72 bg-[#091b30] border border-slate-850 rounded-xl shadow-2xl p-4 z-50 text-xs">
                  <h4 className="font-semibold text-slate-200 mb-3 flex items-center justify-between">
                    <span>Notifications</span>
                    <button className="text-slate-500 hover:text-slate-300" onClick={() => setShowNotifications(false)}>✕</button>
                  </h4>
                  <div className="space-y-3">
                    {notifications.map(n => (
                      <div key={n.id} className="border-b border-slate-800/50 pb-2 last:border-0 last:pb-0">
                        <p className="text-slate-300">{n.text}</p>
                        <span className="text-[10px] text-slate-500">{n.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* User Profile */}
            <div className="w-8 h-8 rounded-full border border-gold-400 overflow-hidden bg-slate-700 cursor-pointer flex items-center justify-center">
              <svg className="w-6 h-6 text-gold-300" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </div>
          </div>
        </div>
      </header>

      {/* 2. MAIN WORKSPACE */}
      <main className="mx-auto max-w-7xl px-6 pt-8">

        {activeTab === 'Users' && (
          <>
            {/* Title & Invite Button */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div>
                <h1 className="text-3xl font-bold tracking-tight text-white">User Management</h1>
                <p className="text-sm text-slate-400 mt-1">
                  Manage account security, roles, and administrative statuses for all Vocal Quest players.
                </p>
              </div>
              <button 
                onClick={() => setInviteModalOpen(true)}
                className="bg-gold-400 hover:bg-gold-500 text-slate-950 font-bold px-4 py-2.5 rounded-lg flex items-center justify-center gap-2 transition duration-200 text-sm shadow-[0_0_15px_rgba(217,183,79,0.15)] self-start sm:self-center"
              >
                <UserPlus size={16} />
                <span>Invite User</span>
              </button>
            </div>

            {/* Filter, Search & Export Bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              {/* Local Search input */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  placeholder="Search by User ID, Email, or Username..." 
                  className="w-full bg-[#071629] text-sm text-slate-200 pl-10 pr-4 py-2.5 rounded-lg border border-slate-800/80 focus:outline-none focus:border-gold-400/50 transition"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 self-end md:self-auto">
                {/* Export CSV */}
                <button 
                  onClick={handleExportCSV}
                  className="border border-slate-800 hover:border-slate-700 bg-[#071629] hover:bg-slate-800/40 text-slate-300 font-medium px-4 py-2.5 rounded-lg flex items-center gap-2 transition duration-150 text-sm"
                >
                  <Download size={15} />
                  <span>Export CSV</span>
                </button>

                {/* Bulk Actions Dropdown */}
                <div className="relative">
                  <button 
                    onClick={() => setBulkActionDropdownOpen(!bulkActionDropdownOpen)}
                    className="border border-slate-800 bg-[#071629] hover:bg-slate-800/40 text-slate-300 font-medium px-4 py-2.5 rounded-lg flex items-center gap-2 transition duration-150 text-sm"
                  >
                    <span>Bulk Actions</span>
                    <ChevronDown size={15} className={`transition-transform duration-200 ${bulkActionDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {bulkActionDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-[#091b30] border border-slate-800 rounded-xl shadow-2xl overflow-hidden z-50 text-xs">
                      <button 
                        onClick={() => handleBulkAction('activate')}
                        className="w-full text-left px-4 py-2.5 hover:bg-slate-850 text-emerald-400 font-medium flex items-center gap-2 border-b border-slate-800/50"
                      >
                        <Check size={14} />
                        <span>Activate Selected</span>
                      </button>
                      <button 
                        onClick={() => handleBulkAction('suspend')}
                        className="w-full text-left px-4 py-2.5 hover:bg-slate-850 text-amber-400 font-medium flex items-center gap-2 border-b border-slate-800/50"
                      >
                        <Ban size={14} />
                        <span>Suspend Selected</span>
                      </button>
                      <button 
                        onClick={() => handleBulkAction('delete')}
                        className="w-full text-left px-4 py-2.5 hover:bg-slate-850 text-rose-400 font-medium flex items-center gap-2"
                      >
                        <Trash2 size={14} />
                        <span>Delete Selected</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* 3. USERS TABLE CONTAINER */}
            <div className="bg-[#051325] border border-slate-800/60 rounded-xl overflow-hidden shadow-2xl mb-6">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 bg-[#040f1f]/50 text-xs font-semibold uppercase tracking-wider text-slate-500">
                      <th className="py-4 px-6 w-12 text-center">
                        <input 
                          type="checkbox" 
                          onChange={handleSelectAll}
                          checked={paginatedUsers.length > 0 && paginatedUsers.every(u => selectedUsers.has(u.id))}
                          className="rounded border-slate-700 bg-slate-900 text-gold-400 focus:ring-gold-400/50 cursor-pointer"
                        />
                      </th>
                      <th className="py-4 px-6">User ID</th>
                      <th className="py-4 px-6">User Details</th>
                      <th className="py-4 px-6 text-center">Account Status</th>
                      <th className="py-4 px-6">Role</th>
                      <th className="py-4 px-6 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-sm">
                    {paginatedUsers.map((user) => (
                      <tr 
                        key={user.id} 
                        className={`hover:bg-[#071930]/40 transition-colors ${
                          selectedUsers.has(user.id) ? 'bg-[#081e39]/30' : ''
                        }`}
                      >
                        {/* Checkbox */}
                        <td className="py-4 px-6 text-center">
                          <input 
                            type="checkbox" 
                            checked={selectedUsers.has(user.id)}
                            onChange={() => handleSelectUser(user.id)}
                            className="rounded border-slate-700 bg-slate-900 text-gold-400 focus:ring-gold-400/50 cursor-pointer"
                          />
                        </td>

                        {/* User ID */}
                        <td className="py-4 px-6 font-mono text-slate-400 font-semibold">{user.id}</td>

                        {/* User Details */}
                        <td className="py-4 px-6">
                          <div className="font-bold text-slate-200">{user.username}</div>
                          <div className="text-xs text-slate-500 mt-0.5">{user.email}</div>
                        </td>

                        {/* Account Status Capsule */}
                        <td className="py-4 px-6 text-center">
                          <span 
                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wide border ${
                              user.status === 'Active' 
                                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                                : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                            }`}
                          >
                            {user.status}
                          </span>
                        </td>

                        {/* Role Select Dropdown */}
                        <td className="py-4 px-6">
                          <div className="relative inline-block w-28">
                            <select 
                              value={user.role} 
                              onChange={(e) => handleRoleChange(user.id, e.target.value)}
                              className="appearance-none w-full bg-[#091b30] border border-slate-800 hover:border-slate-700 text-xs text-slate-300 font-semibold px-3 py-1.5 rounded-lg focus:outline-none focus:border-gold-400/50 cursor-pointer"
                            >
                              <option value="Admin">Admin</option>
                              <option value="Standard">Standard</option>
                            </select>
                            <ChevronDown size={12} className="absolute right-3 top-2.5 text-slate-500 pointer-events-none" />
                          </div>
                        </td>

                        {/* Action Buttons */}
                        <td className="py-4 px-6 text-right">
                          <div className="flex items-center justify-end gap-2">
                            {/* Saves Icon Button */}
                            <button 
                              title="View GameSaves"
                              onClick={() => {
                                setSelectedUser(user);
                                setSavesModalOpen(true);
                              }}
                              className="p-2 bg-slate-850 hover:bg-slate-800 text-slate-400 hover:text-slate-200 rounded-lg transition"
                            >
                              <Folder size={14} />
                            </button>

                            {/* Reset / History Arrow Button */}
                            <button 
                              title="Activity History"
                              onClick={() => {
                                setSelectedUser(user);
                                setHistoryModalOpen(true);
                              }}
                              className="p-2 bg-slate-850 hover:bg-slate-800 text-slate-400 hover:text-slate-200 rounded-lg transition"
                            >
                              <RotateCcw size={14} />
                            </button>

                            {/* Suspend / Reactivate Toggle Icon */}
                            <button 
                              title={user.status === 'Active' ? 'Suspend User' : 'Activate User'}
                              onClick={() => handleStatusToggle(user.id)}
                              className={`p-2 rounded-lg transition ${
                                user.status === 'Active' 
                                  ? 'bg-slate-850 hover:bg-slate-800 text-slate-400 hover:text-red-400' 
                                  : 'bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20'
                              }`}
                            >
                              {user.status === 'Active' ? <Ban size={14} /> : <Check size={14} />}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {filteredUsers.length === 0 && (
                      <tr>
                        <td colSpan="6" className="py-8 text-center text-slate-500 text-sm">
                          No players found matching your query.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Table Footer / Pagination */}
              <div className="border-t border-slate-800 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#040f1f]/35 text-xs text-slate-400">
                <div>
                  Showing <strong className="text-slate-300 font-bold">{filteredUsers.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}</strong> to <strong className="text-slate-300 font-bold">{Math.min(currentPage * itemsPerPage, filteredUsers.length)}</strong> of <strong className="text-slate-300 font-bold">{filteredUsers.length}</strong> users
                </div>

                <div className="flex items-center gap-2">
                  <button 
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition"
                  >
                    <ChevronLeft size={14} />
                  </button>

                  {Array.from({ length: totalPages }).map((_, index) => {
                    const pageNum = index + 1;
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`w-8 h-8 rounded-lg font-bold flex items-center justify-center transition border ${
                          currentPage === pageNum
                            ? 'bg-gold-400 border-gold-400 text-slate-950 hover:bg-gold-500'
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}

                  <button 
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition"
                  >
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            </div>

            {/* 4. SUMMARY STATISTICS ROW */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card 1: Verified Accounts */}
              <div className="bg-[#051325] border border-slate-800/60 rounded-xl p-5 flex items-center gap-4 shadow-xl">
                <div className="w-12 h-12 rounded-xl bg-gold-400/10 border border-gold-400/35 flex items-center justify-center text-gold-400 shadow-[0_0_15px_rgba(217,183,79,0.1)]">
                  <Shield size={24} />
                </div>
                <div>
                  <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Verified Accounts</h3>
                  <p className="text-3xl font-black text-slate-100 mt-1">1,120</p>
                </div>
              </div>

              {/* Card 2: Suspended Users */}
              <div className="bg-[#051325] border border-slate-800/60 rounded-xl p-5 flex items-center gap-4 shadow-xl">
                <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/35 flex items-center justify-center text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.1)]">
                  <AlertCircle size={24} />
                </div>
                <div>
                  <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Suspended Users</h3>
                  <p className="text-3xl font-black text-slate-100 mt-1">{stats.suspended + 40}</p> {/* offset to look matching */}
                </div>
              </div>

              {/* Card 3: Recent Activity */}
              <div className="bg-[#051325] border border-slate-800/60 rounded-xl p-5 flex items-center gap-4 shadow-xl">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/35 flex items-center justify-center text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.1)]">
                  <Clock size={24} />
                </div>
                <div>
                  <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Recent Activity</h3>
                  <p className="text-3xl font-black text-slate-100 mt-1">156</p>
                </div>
              </div>
            </div>
          </>
        )}

        {/* 5. MOCK OTHER TABS */}
        {activeTab === 'Security' && (
          <div className="bg-[#051325] border border-slate-800/60 rounded-xl p-8 shadow-2xl">
            <div className="flex items-center gap-3 mb-6">
              <Lock className="text-gold-400" size={28} />
              <h2 className="text-2xl font-bold text-white">Security & Access Log</h2>
            </div>
            <p className="text-slate-400 text-sm mb-6">
              Review real-time security events, administrator logs, and access configuration parameters.
            </p>
            <div className="space-y-4">
              {[
                { event: 'Admin Login Successful', user: 'AlexVocal', ip: '192.168.1.14', time: 'Just now' },
                { event: 'User VQ-1029 Suspended', user: 'System (Rule Engine)', ip: '-', time: '1 day ago' },
                { event: 'Database Backup Generated', user: 'System Cron', ip: '127.0.0.1', time: 'Yesterday, 04:00' },
                { event: 'API Key Created', user: 'AlexVocal', ip: '192.168.1.14', time: '3 days ago' },
              ].map((log, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-[#071629] border border-slate-800/50 p-4 rounded-lg text-xs gap-2">
                  <div>
                    <span className="font-bold text-slate-200 text-sm block">{log.event}</span>
                    <span className="text-slate-500">By: {log.user} • IP: {log.ip}</span>
                  </div>
                  <span className="text-gold-400/80 font-mono font-semibold">{log.time}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'GameSaves' && (
          <div className="bg-[#051325] border border-slate-800/60 rounded-xl p-8 shadow-2xl">
            <div className="flex items-center gap-3 mb-6">
              <Database className="text-gold-400" size={28} />
              <h2 className="text-2xl font-bold text-white">Player Game Saves</h2>
            </div>
            <p className="text-slate-400 text-sm mb-6">
              Global snapshot of active backups, character maps, and voice profile metadata sizes.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-[#071629] p-5 rounded-lg border border-slate-800">
                <span className="text-slate-500 text-xs uppercase font-bold tracking-wider">Total Backups</span>
                <p className="text-2xl font-black text-slate-200 mt-2">18,402 files</p>
              </div>
              <div className="bg-[#071629] p-5 rounded-lg border border-slate-800">
                <span className="text-slate-500 text-xs uppercase font-bold tracking-wider">Storage Consumed</span>
                <p className="text-2xl font-black text-slate-200 mt-2">42.8 GB</p>
              </div>
              <div className="bg-[#071629] p-5 rounded-lg border border-slate-800">
                <span className="text-slate-500 text-xs uppercase font-bold tracking-wider">Backup Node Integrity</span>
                <p className="text-2xl font-black text-emerald-400 mt-2">99.98% OK</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Settings' && (
          <div className="bg-[#051325] border border-slate-800/60 rounded-xl p-8 shadow-2xl">
            <div className="flex items-center gap-3 mb-6">
              <Sliders className="text-gold-400" size={28} />
              <h2 className="text-2xl font-bold text-white">Administrative Settings</h2>
            </div>
            <p className="text-slate-400 text-sm mb-6">
              Configure system thresholds, voice integration variables, and automated action rules.
            </p>
            <div className="max-w-xl space-y-6">
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">Automated Ban Sensitivity</label>
                <input type="range" className="w-full accent-gold-400 bg-slate-800 h-2 rounded-lg" defaultValue="70" />
                <span className="text-slate-500 text-xs block mt-1">Stops players who trigger hate speech rules automatically. Sensitivity: 70%</span>
              </div>
              <div className="border-t border-slate-800/60 pt-4 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-200 text-sm block">Require MFA for Admins</span>
                  <span className="text-slate-500 text-xs">Force all accounts with role 'Admin' to complete Authenticator login.</span>
                </div>
                <input type="checkbox" defaultChecked className="rounded text-gold-400 focus:ring-gold-400/50 bg-[#091b30] border-slate-800 w-5 h-5 cursor-pointer" />
              </div>
            </div>
          </div>
        )}

      </main>

      {/* 6. INVITE USER MODAL */}
      {inviteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-[#091b30] border border-slate-800 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl p-6 relative">
            <button 
              onClick={() => setInviteModalOpen(false)}
              className="absolute top-4 right-4 text-slate-500 hover:text-slate-300 transition"
            >
              <X size={18} />
            </button>

            <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
              <UserPlus className="text-gold-400" size={20} />
              <span>Invite New User</span>
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              Create a new user profile and assign permissions within the Vocal Quest framework.
            </p>

            <form onSubmit={handleInviteSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Username</label>
                <input 
                  type="text" 
                  required
                  value={newUser.username}
                  onChange={(e) => setNewUser({...newUser, username: e.target.value})}
                  placeholder="e.g. LiamQuest" 
                  className="w-full bg-[#051325] border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-gold-400/50"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Email Address</label>
                <input 
                  type="email" 
                  required
                  value={newUser.email}
                  onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                  placeholder="e.g. liam@quest.com" 
                  className="w-full bg-[#051325] border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-gold-400/50"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Role</label>
                  <select 
                    value={newUser.role}
                    onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                    className="w-full bg-[#051325] border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-300 focus:outline-none focus:border-gold-400/50"
                  >
                    <option value="Standard">Standard</option>
                    <option value="Admin">Admin</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Status</label>
                  <select 
                    value={newUser.status}
                    onChange={(e) => setNewUser({...newUser, status: e.target.value})}
                    className="w-full bg-[#051325] border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-300 focus:outline-none focus:border-gold-400/50"
                  >
                    <option value="Active">Active</option>
                    <option value="Suspended">Suspended</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input 
                  type="checkbox" 
                  id="verified"
                  checked={newUser.verified}
                  onChange={(e) => setNewUser({...newUser, verified: e.target.checked})}
                  className="rounded text-gold-400 focus:ring-gold-400/50 bg-[#051325] border-slate-800"
                />
                <label htmlFor="verified" className="text-xs font-semibold text-slate-400 select-none cursor-pointer">
                  Auto-Verify Account Status
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-6">
                <button 
                  type="button" 
                  onClick={() => setInviteModalOpen(false)}
                  className="px-4 py-2 border border-slate-800 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 text-sm transition"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 bg-gold-400 hover:bg-gold-500 text-slate-950 font-bold rounded-lg text-sm transition"
                >
                  Create Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 7. GAME SAVES MODAL */}
      {savesModalOpen && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-[#091b30] border border-slate-800 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl p-6 relative">
            <button 
              onClick={() => setSavesModalOpen(false)}
              className="absolute top-4 right-4 text-slate-500 hover:text-slate-300 transition"
            >
              <X size={18} />
            </button>

            <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
              <Folder className="text-gold-400" size={20} />
              <span>Game Saves for {selectedUser.username}</span>
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              Viewing all synchronized cloud saves associated with player ID {selectedUser.id}.
            </p>

            <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
              {selectedUser.gameSaves > 0 ? (
                Array.from({ length: selectedUser.gameSaves }).map((_, index) => (
                  <div key={index} className="flex justify-between items-center bg-[#051325] border border-slate-800/60 p-3.5 rounded-lg text-xs">
                    <div>
                      <span className="font-bold text-slate-200 block">Save_Slot_{index + 1}.json</span>
                      <span className="text-slate-500 text-[10px]">Size: {((index + 1) * 4.2).toFixed(1)} KB • Level: {index + 2}</span>
                    </div>
                    <button className="text-gold-400 hover:text-yellow-300 hover:underline font-semibold">
                      Restore
                    </button>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-slate-500 text-xs">
                  No active game saves found for this account.
                </div>
              )}
            </div>

            <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-800/40 mt-4">
              <button 
                onClick={() => setSavesModalOpen(false)}
                className="px-4 py-2 bg-gold-400 hover:bg-gold-500 text-slate-950 font-bold rounded-lg text-sm transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 8. ACTIVITY HISTORY MODAL */}
      {historyModalOpen && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-[#091b30] border border-slate-800 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl p-6 relative">
            <button 
              onClick={() => setHistoryModalOpen(false)}
              className="absolute top-4 right-4 text-slate-500 hover:text-slate-300 transition"
            >
              <X size={18} />
            </button>

            <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
              <RotateCcw className="text-gold-400" size={20} />
              <span>Activity History & Actions</span>
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              Administrative history log and settings modifications for player {selectedUser.username}.
            </p>

            <div className="space-y-4">
              <div className="bg-[#051325] p-4 rounded-xl border border-slate-800/60">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Security Options</span>
                <div className="space-y-3 mt-3">
                  <button 
                    onClick={() => {
                      alert(`Password reset link dispatched for ${selectedUser.email}`);
                      setHistoryModalOpen(false);
                    }}
                    className="w-full bg-[#081e39] border border-slate-800 hover:bg-[#0c2b50] text-slate-200 font-semibold py-2 rounded-lg text-xs transition"
                  >
                    Force Password Reset / Email Dispatched
                  </button>
                  <button 
                    onClick={() => {
                      alert(`All active sessions terminated for ${selectedUser.username}`);
                      setHistoryModalOpen(false);
                    }}
                    className="w-full bg-rose-500/10 border border-rose-500/35 hover:bg-rose-500/20 text-rose-400 font-semibold py-2 rounded-lg text-xs transition"
                  >
                    Revoke All Active Login Sessions
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">Recent Activity Log</span>
                <div className="space-y-2 max-h-36 overflow-y-auto pr-1 text-xs">
                  <div className="flex justify-between items-center text-slate-400">
                    <span>Logged in via OAuth</span>
                    <span className="font-mono text-slate-600">{selectedUser.lastActive}</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-400">
                    <span>Synchronized GameSave slot 2</span>
                    <span className="font-mono text-slate-600">3 hours ago</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-400">
                    <span>Unlocked Achievement 'Iron Gates'</span>
                    <span className="font-mono text-slate-600">1 day ago</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-800/40 mt-4">
              <button 
                onClick={() => setHistoryModalOpen(false)}
                className="px-4 py-2 bg-gold-400 hover:bg-gold-500 text-slate-950 font-bold rounded-lg text-sm transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      </div>
    </div>
  );
}
