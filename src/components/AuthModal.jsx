import React, { useState, useEffect } from 'react';
import { 
  X, User, Mail, ShieldCheck, Sparkles, CheckCircle2, 
  ArrowRight, LogOut, Calendar, MapPin, Compass, AlertCircle,
  RefreshCw, Check, Lock, Eye, EyeOff, UserPlus, LogIn
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { 
  sendEmailOtp, 
  verifyEmailOtp, 
  getCurrentUser, 
  logoutUser, 
  loginWithPassword,
  registerWithPasswordAndOtp,
  confirmRegistrationOtp,
  setPasswordForCurrentUser,
  getUserBookings, 
  getUserCustomTrips 
} from '../lib/supabaseClient';

export default function AuthModal({ isOpen, onClose, onOpenBooking, onOpenPayment }) {
  const [user, setUser] = useState(getCurrentUser());
  
  // Auth navigation mode: 'login' | 'register' | 'otp_login' | 'register_verify'
  const [mode, setMode] = useState('login');
  
  // Login State
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  // Register State
  const [regUsername, setRegUsername] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [showRegPassword, setShowRegPassword] = useState(false);
  const [pendingRegData, setPendingRegData] = useState(null); // { email, username, passwordHash, salt }

  // OTP Login State
  const [otpEmail, setOtpEmail] = useState('');
  const [otpUsername, setOtpUsername] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [lastDispatchedOtp, setLastDispatchedOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [countdown, setCountdown] = useState(0);

  // Change Password State (Dashboard)
  const [newPassword, setNewPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [passwordUpdateSuccess, setPasswordUpdateSuccess] = useState('');

  // UI state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Dashboard Data State
  const [userBookings, setUserBookings] = useState([]);
  const [userCustomTrips, setUserCustomTrips] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [activeTab, setActiveTab] = useState('bookings'); // 'bookings' | 'trips' | 'security'

  // Sync auth state
  useEffect(() => {
    const handleAuthChange = (e) => {
      setUser(e.detail);
      if (e.detail) {
        loadUserData(e.detail);
      }
    };
    window.addEventListener('himyatra-auth-changed', handleAuthChange);
    return () => window.removeEventListener('himyatra-auth-changed', handleAuthChange);
  }, []);

  // Load history if user is logged in
  useEffect(() => {
    if (isOpen && user) {
      loadUserData(user);
    }
  }, [isOpen, user]);

  // Resend countdown timer
  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setInterval(() => setCountdown((c) => c - 1), 1000);
    return () => clearInterval(timer);
  }, [countdown]);

  const loadUserData = async (activeUser) => {
    if (!activeUser) return;
    setLoadingHistory(true);
    try {
      const [bookings, trips] = await Promise.all([
        getUserBookings(activeUser.username, activeUser.email),
        getUserCustomTrips(activeUser.username)
      ]);
      setUserBookings(bookings || []);
      setUserCustomTrips(trips || []);
    } catch (err) {
      console.warn('Error loading user history:', err);
    } finally {
      setLoadingHistory(false);
    }
  };

  if (!isOpen) return null;

  // -------------------------------------------------------------
  // 1. Handle Username & Password Login
  // -------------------------------------------------------------
  const handlePasswordLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    if (!loginIdentifier.trim()) {
      setError('Please enter your username or Gmail address.');
      return;
    }
    if (!loginPassword) {
      setError('Please enter your account password.');
      return;
    }

    setLoading(true);
    try {
      const res = await loginWithPassword(loginIdentifier, loginPassword);
      setUser(res.user);
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      setSuccessMsg(`🎉 Welcome back, @${res.user.username}!`);
      loadUserData(res.user);
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  // -------------------------------------------------------------
  // 2. Handle Create Account (Submit Form -> Send OTP)
  // -------------------------------------------------------------
  const handleStartRegistration = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    if (regPassword !== regConfirmPassword) {
      setError('Passwords do not match. Please retype carefully.');
      return;
    }
    if (regPassword.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);
    try {
      const res = await registerWithPasswordAndOtp(regEmail, regUsername, regPassword);
      setPendingRegData(res);
      setLastDispatchedOtp(res.otpCode);
      setMode('register_verify');
      setCountdown(60);
      setSuccessMsg(`✅ Verification code sent to ${res.email}! Please enter the 6-digit OTP to activate your account.`);
    } catch (err) {
      setError(err.message || 'Registration failed. Please check inputs.');
    } finally {
      setLoading(false);
    }
  };

  // -------------------------------------------------------------
  // 3. Confirm Registration OTP
  // -------------------------------------------------------------
  const handleConfirmRegistrationOtp = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    if (!otpCode.trim() || otpCode.trim().length !== 6) {
      setError('Please enter the complete 6-digit OTP code.');
      return;
    }
    if (!pendingRegData) {
      setError('Session expired. Please restart account creation.');
      setMode('register');
      return;
    }

    setLoading(true);
    try {
      const res = await confirmRegistrationOtp(
        pendingRegData.email,
        otpCode,
        pendingRegData.username,
        pendingRegData.passwordHash,
        pendingRegData.salt
      );
      setUser(res.user);
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
      setSuccessMsg(`🎉 Account created! Welcome to HimYatra, @${res.user.username}.`);
      loadUserData(res.user);
    } catch (err) {
      setError(err.message || 'Invalid verification code.');
    } finally {
      setLoading(false);
    }
  };

  // -------------------------------------------------------------
  // 4. Quick OTP Login Handlers
  // -------------------------------------------------------------
  const handleSendQuickOtp = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    if (!otpEmail.trim() || !otpEmail.includes('@')) {
      setError('Please enter a valid Gmail address.');
      return;
    }

    setLoading(true);
    try {
      const res = await sendEmailOtp(otpEmail, otpUsername);
      setLastDispatchedOtp(res.otpCode);
      setIsOtpSent(true);
      setCountdown(60);
      setSuccessMsg(`✅ 6-Digit security OTP sent to ${otpEmail}! Valid for 10 minutes.`);
    } catch (err) {
      setError(err.message || 'Could not send OTP.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyQuickOtp = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    if (!otpCode.trim() || otpCode.trim().length !== 6) {
      setError('Please enter the 6-digit OTP code.');
      return;
    }

    setLoading(true);
    try {
      const res = await verifyEmailOtp(otpEmail, otpCode, otpUsername);
      setUser(res.user);
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      setSuccessMsg(`🎉 Verified successfully! Welcome, @${res.user.username}.`);
      loadUserData(res.user);
    } catch (err) {
      setError(err.message || 'Invalid or expired OTP.');
    } finally {
      setLoading(false);
    }
  };

  // -------------------------------------------------------------
  // 5. Update Password in Dashboard
  // -------------------------------------------------------------
  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setPasswordUpdateSuccess('');
    setError('');

    if (!newPassword || newPassword.length < 6) {
      setError('New password must be at least 6 characters.');
      return;
    }

    setLoading(true);
    try {
      await setPasswordForCurrentUser(user.username, newPassword);
      setPasswordUpdateSuccess('✅ Password successfully saved! You can now log in anytime using your password.');
      setNewPassword('');
    } catch (err) {
      setError(err.message || 'Could not update password.');
    } finally {
      setLoading(false);
    }
  };

  // -------------------------------------------------------------
  // 6. Logout
  // -------------------------------------------------------------
  const handleLogout = () => {
    logoutUser();
    setUser(null);
    setMode('login');
    setError('');
    setSuccessMsg('');
    setLoginIdentifier('');
    setLoginPassword('');
    setRegUsername('');
    setRegEmail('');
    setRegPassword('');
    setRegConfirmPassword('');
    setOtpCode('');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-xl flex items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl sm:max-w-2xl bg-slate-900 border border-teal-500/30 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl shadow-black/95 my-3 sm:my-6 text-white max-h-[92vh] flex flex-col">
        
        {/* Top Header */}
        <div className="shrink-0 relative bg-gradient-to-r from-slate-900 via-teal-950/50 to-slate-900 p-4 sm:p-5 md:p-6 border-b border-teal-500/20 flex items-center justify-between">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-teal-500/15 border border-teal-500/30 text-teal-400 flex items-center justify-center shadow-lg shadow-teal-500/20 shrink-0">
              {user ? <User className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
            </div>
            <div>
              <h3 className="text-base sm:text-lg md:text-xl font-bold font-['Outfit'] text-white">
                {user 
                  ? 'Customer Travel Portal' 
                  : mode === 'login' 
                    ? 'Sign In to Your Account' 
                    : mode === 'register' 
                      ? 'Create New Travel Account' 
                      : 'Security Verification'}
              </h3>
              <p className="text-[11px] sm:text-xs text-teal-300/80">
                {user 
                  ? `Logged in as @${user.username}` 
                  : 'Access your Himalayan tour bookings, receipts, and custom itineraries'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Modal Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-7">
          
          {/* ======================================================== */}
          {/* VIEW A: LOGGED IN USER DASHBOARD (ALL SCREEN SIZES) */}
          {/* ======================================================== */}
          {user ? (
            <div className="space-y-4 sm:space-y-6">
              {/* Profile Card */}
              <div className="bg-gradient-to-br from-slate-950 to-teal-950/40 border border-teal-500/30 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-gradient-to-tr from-teal-400 to-emerald-400 text-slate-950 font-black text-base sm:text-lg flex items-center justify-center shadow-lg shadow-teal-500/20 shrink-0">
                    {user.username.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-white text-sm sm:text-base">@{user.username}</span>
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold bg-teal-500/20 text-teal-300 border border-teal-500/30 px-2 py-0.5 rounded-full">
                        <ShieldCheck className="w-3 h-3 text-teal-400" /> Verified Traveler
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5 truncate flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                      <span className="truncate">{user.email}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onOpenBooking?.(null);
                    }}
                    className="flex-1 sm:flex-none text-xs font-bold px-3.5 py-2 rounded-xl bg-teal-400 hover:bg-teal-300 text-slate-950 shadow-md transition text-center cursor-pointer"
                  >
                    + Book New Trip
                  </button>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-300 transition cursor-pointer"
                    title="Log out of account"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>

              {/* Statistics Overview (Phone: 2 cols, Tablet/PC: 3 cols) */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3">
                <div className="p-3 sm:p-3.5 rounded-2xl bg-slate-950/70 border border-white/10">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Booked Services</span>
                  <div className="text-xl sm:text-2xl font-black text-teal-300 font-['Outfit'] mt-1">
                    {userBookings.length}
                    <span className="text-xs font-normal text-slate-400"> Trips</span>
                  </div>
                </div>

                <div className="p-3 sm:p-3.5 rounded-2xl bg-slate-950/70 border border-white/10">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Custom Itineraries</span>
                  <div className="text-xl sm:text-2xl font-black text-emerald-300 font-['Outfit'] mt-1">
                    {userCustomTrips.length}
                    <span className="text-xs font-normal text-slate-400"> Plans</span>
                  </div>
                </div>

                <div className="p-3 sm:p-3.5 rounded-2xl bg-slate-950/70 border border-white/10 col-span-2 sm:col-span-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Loyalty Club</span>
                  <div className="text-xs sm:text-sm font-bold text-white mt-1.5 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Himalayan Gold</span>
                  </div>
                </div>
              </div>

              {/* Tab Selector */}
              <div className="flex items-center gap-1 sm:gap-2 border-b border-white/10 pb-2 overflow-x-auto">
                <button
                  type="button"
                  onClick={() => setActiveTab('bookings')}
                  className={`text-xs font-bold px-3 py-1.5 rounded-xl transition cursor-pointer whitespace-nowrap ${
                    activeTab === 'bookings'
                      ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  My Tour Bookings ({userBookings.length})
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('trips')}
                  className={`text-xs font-bold px-3 py-1.5 rounded-xl transition cursor-pointer whitespace-nowrap ${
                    activeTab === 'trips'
                      ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Custom Trips ({userCustomTrips.length})
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('security')}
                  className={`text-xs font-bold px-3 py-1.5 rounded-xl transition cursor-pointer whitespace-nowrap ${
                    activeTab === 'security'
                      ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Password & Security
                </button>
              </div>

              {/* Tab Content */}
              {loadingHistory ? (
                <div className="py-8 text-center text-xs text-slate-400 flex items-center justify-center gap-2">
                  <RefreshCw className="w-4 h-4 animate-spin text-teal-400" />
                  <span>Loading your records from Supabase...</span>
                </div>
              ) : activeTab === 'bookings' ? (
                userBookings.length === 0 ? (
                  <div className="py-8 text-center bg-slate-950/40 rounded-2xl border border-white/5 space-y-2 p-4">
                    <Compass className="w-8 h-8 text-slate-500 mx-auto" />
                    <p className="text-sm font-semibold text-slate-300">No bookings found yet under @{user.username}</p>
                    <p className="text-xs text-slate-500 max-w-md mx-auto">Every tour reservation you make on HimYatra automatically links to your username.</p>
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onOpenBooking?.(null);
                      }}
                      className="mt-2 text-xs font-bold px-4 py-2 rounded-xl bg-teal-500/20 border border-teal-500/40 text-teal-300 hover:bg-teal-500/30 transition cursor-pointer inline-flex items-center gap-1.5"
                    >
                      <span>Explore & Book Packages</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                    {userBookings.map((b) => (
                      <div key={b.id || b.booking_reference} className="p-3.5 sm:p-4 rounded-2xl bg-slate-950/80 border border-white/10 hover:border-teal-500/30 transition space-y-2">
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                          <div>
                            <span className="text-[10px] font-mono uppercase bg-white/5 text-teal-300 border border-white/10 px-2 py-0.5 rounded-lg">
                              {b.booking_reference}
                            </span>
                            <h4 className="text-sm font-bold text-white mt-1">{b.package_title}</h4>
                            <p className="text-[11px] text-slate-400 flex items-center gap-1.5 mt-0.5">
                              <MapPin className="w-3 h-3 text-teal-400 shrink-0" />
                              <span className="truncate">{b.state} • Pickup: {b.pickup_city}</span>
                            </p>
                          </div>
                          <div className="sm:text-right">
                            <div className="text-sm sm:text-base font-extrabold text-teal-300 font-['Outfit']">
                              ₹{Number(b.total_price || 0).toLocaleString('en-IN')}
                            </div>
                            <span className={`inline-block text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full mt-0.5 ${
                              b.status === 'token_paid' || b.utr_reference
                                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                                : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                            }`}>
                              {b.status === 'token_paid' || b.utr_reference ? 'Paid Token Verified' : 'Token Pending'}
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-white/5 text-[11px] text-slate-400">
                          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3 text-slate-400" />
                              <span>{b.travel_date || 'Flexible Date'}</span>
                            </span>
                            <span>•</span>
                            <span>{b.adults_count || 1} Adults, {b.children_count || 0} Children</span>
                          </div>

                          {(!b.utr_reference && b.status !== 'token_paid') && onOpenPayment && (
                            <button
                              type="button"
                              onClick={() => {
                                onClose();
                                onOpenPayment({
                                  bookingRef: b.booking_reference,
                                  amount: b.advance_token || 2000,
                                  packageName: b.package_title
                                });
                              }}
                              className="text-[10px] font-bold text-emerald-400 hover:text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 px-2 py-1 rounded-lg transition"
                            >
                              Verify Advance Payment →
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )
              ) : activeTab === 'trips' ? (
                userCustomTrips.length === 0 ? (
                  <div className="py-8 text-center bg-slate-950/40 rounded-2xl border border-white/5 space-y-2 p-4">
                    <Compass className="w-8 h-8 text-slate-500 mx-auto" />
                    <p className="text-sm font-semibold text-slate-300">No custom itineraries generated yet</p>
                    <p className="text-xs text-slate-500">Plan a custom Himalayan route in our Custom Trip Builder to track it here.</p>
                  </div>
                ) : (
                  <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                    {userCustomTrips.map((t) => (
                      <div key={t.id} className="p-3.5 sm:p-4 rounded-2xl bg-slate-950/80 border border-white/10 space-y-2">
                        <div className="flex items-start justify-between">
                          <div>
                            <span className="text-[10px] font-bold text-teal-400 uppercase tracking-wider">{t.region} Custom Plan</span>
                            <h4 className="text-xs sm:text-sm font-semibold text-white mt-0.5">
                              {Array.isArray(t.destinations) ? t.destinations.join(' ➔ ') : t.region}
                            </h4>
                          </div>
                          <span className="text-xs sm:text-sm font-bold text-emerald-300 shrink-0">
                            ₹{Number(t.estimated_budget || 0).toLocaleString('en-IN')}/person
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-[11px] text-slate-400">
                          <span>{t.duration_days} Days</span>
                          <span>•</span>
                          <span>{t.vehicle}</span>
                          <span>•</span>
                          <span>{t.travelers_count} Travelers</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )
              ) : (
                /* Tab 3: Security & Set Password */
                <form onSubmit={handleUpdatePassword} className="space-y-4 p-4 rounded-2xl bg-slate-950/60 border border-white/10">
                  <div>
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <Lock className="w-4 h-4 text-teal-400" />
                      <span>Set or Update Account Password</span>
                    </h4>
                    <p className="text-xs text-slate-400 mt-1">
                      Set a password so you can instantly log in to your HimYatra account on any phone, laptop, or desktop computer.
                    </p>
                  </div>

                  {passwordUpdateSuccess && (
                    <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs">
                      {passwordUpdateSuccess}
                    </div>
                  )}

                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">New Password (Min 6 Characters)</label>
                    <div className="relative">
                      <input
                        type={showNewPassword ? 'text' : 'password'}
                        required
                        placeholder="••••••••"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full bg-slate-950 border border-white/15 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-teal-400 pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                      >
                        {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2.5 rounded-xl bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold text-xs shadow-md transition cursor-pointer"
                  >
                    {loading ? 'Saving Password...' : 'Save Password'}
                  </button>
                </form>
              )}
            </div>
          ) : (
            /* ======================================================== */
            /* VIEW B: AUTHENTICATION FORMS (LOGIN / REGISTER / OTP)   */
            /* ======================================================== */
            <div>
              {/* Alert Notifications */}
              {error && (
                <div className="mb-4 p-3 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {successMsg && (
                <div className="mb-4 p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{successMsg}</span>
                </div>
              )}

              {/* Mode Toggle Buttons (I Have Account vs Create Account) */}
              {mode !== 'register_verify' && (
                <div className="grid grid-cols-2 gap-2 p-1 bg-slate-950 rounded-2xl border border-white/10 mb-5">
                  <button
                    type="button"
                    onClick={() => {
                      setMode('login');
                      setError('');
                    }}
                    className={`py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                      mode === 'login' || mode === 'otp_login'
                        ? 'bg-gradient-to-r from-teal-500/30 to-emerald-500/30 text-teal-300 border border-teal-500/40 shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <LogIn className="w-3.5 h-3.5" />
                    <span>I Have an Account (Login)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setMode('register');
                      setError('');
                    }}
                    className={`py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                      mode === 'register'
                        ? 'bg-gradient-to-r from-teal-500/30 to-emerald-500/30 text-teal-300 border border-teal-500/40 shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <UserPlus className="w-3.5 h-3.5" />
                    <span>Create Account (Sign Up)</span>
                  </button>
                </div>
              )}

              {/* -------------------------------------------------- */}
              {/* FORM 1: LOGIN WITH USERNAME & PASSWORD             */}
              {/* -------------------------------------------------- */}
              {mode === 'login' && (
                <form onSubmit={handlePasswordLogin} className="space-y-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">
                      Username or Gmail Address <span className="text-teal-400">*</span>
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        placeholder="e.g. rahul_verma or rahul@gmail.com"
                        value={loginIdentifier}
                        onChange={(e) => setLoginIdentifier(e.target.value)}
                        className="w-full bg-slate-950 border border-white/10 rounded-xl pl-10 pr-3.5 py-2.5 sm:py-3 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-teal-400 transition"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-semibold text-slate-300">
                        Password <span className="text-teal-400">*</span>
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          setMode('otp_login');
                          setError('');
                        }}
                        className="text-[11px] text-teal-400 hover:underline cursor-pointer"
                      >
                        Forgot password? Use Gmail OTP
                      </button>
                    </div>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type={showLoginPassword ? 'text' : 'password'}
                        required
                        placeholder="••••••••"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        className="w-full bg-slate-950 border border-white/10 rounded-xl pl-10 pr-10 py-2.5 sm:py-3 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-teal-400 transition"
                      />
                      <button
                        type="button"
                        onClick={() => setShowLoginPassword(!showLoginPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white cursor-pointer"
                      >
                        {showLoginPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 sm:py-3.5 px-4 rounded-xl bg-gradient-to-r from-teal-400 to-emerald-400 hover:from-teal-300 hover:to-emerald-300 text-slate-950 font-extrabold text-xs sm:text-sm shadow-xl shadow-teal-500/20 transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Signing In...</span>
                      </>
                    ) : (
                      <>
                        <LogIn className="w-4 h-4" />
                        <span>Sign In with Username & Password</span>
                      </>
                    )}
                  </button>

                  <div className="text-center pt-2 border-t border-white/5 space-y-2">
                    <button
                      type="button"
                      onClick={() => {
                        setMode('otp_login');
                        setError('');
                      }}
                      className="text-xs text-teal-300 hover:text-teal-200 font-semibold cursor-pointer"
                    >
                      Or Login instantly with 6-Digit Gmail OTP →
                    </button>
                  </div>
                </form>
              )}

              {/* -------------------------------------------------- */}
              {/* FORM 2: CREATE NEW ACCOUNT (USERNAME, EMAIL, PASS)  */}
              {/* -------------------------------------------------- */}
              {mode === 'register' && (
                <form onSubmit={handleStartRegistration} className="space-y-3.5">
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">
                      Choose Your Unique Username <span className="text-teal-400">*</span>
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        placeholder="e.g. rahul_verma"
                        value={regUsername}
                        onChange={(e) => setRegUsername(e.target.value.toLowerCase().replace(/\s+/g, '_'))}
                        className="w-full bg-slate-950 border border-white/10 rounded-xl pl-10 pr-3.5 py-2.5 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-teal-400 transition"
                      />
                    </div>
                    <span className="text-[10px] text-slate-400 mt-0.5 block">Your trips and booking counts will be permanently saved to this username.</span>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">
                      Gmail Address <span className="text-teal-400">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        required
                        placeholder="e.g. rahul@gmail.com"
                        value={regEmail}
                        onChange={(e) => setRegEmail(e.target.value)}
                        className="w-full bg-slate-950 border border-white/10 rounded-xl pl-10 pr-3.5 py-2.5 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-teal-400 transition"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1">
                        Password (Min 6 Chars) <span className="text-teal-400">*</span>
                      </label>
                      <div className="relative">
                        <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type={showRegPassword ? 'text' : 'password'}
                          required
                          placeholder="••••••••"
                          value={regPassword}
                          onChange={(e) => setRegPassword(e.target.value)}
                          className="w-full bg-slate-950 border border-white/10 rounded-xl pl-10 pr-9 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-teal-400 transition"
                        />
                        <button
                          type="button"
                          onClick={() => setShowRegPassword(!showRegPassword)}
                          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white cursor-pointer"
                        >
                          {showRegPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1">
                        Confirm Password <span className="text-teal-400">*</span>
                      </label>
                      <div className="relative">
                        <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type={showRegPassword ? 'text' : 'password'}
                          required
                          placeholder="••••••••"
                          value={regConfirmPassword}
                          onChange={(e) => setRegConfirmPassword(e.target.value)}
                          className="w-full bg-slate-950 border border-white/10 rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-teal-400 transition"
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 sm:py-3.5 px-4 rounded-xl bg-gradient-to-r from-teal-400 to-emerald-400 hover:from-teal-300 hover:to-emerald-300 text-slate-950 font-extrabold text-xs sm:text-sm shadow-xl shadow-teal-500/20 transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-2"
                  >
                    {loading ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Sending Security OTP...</span>
                      </>
                    ) : (
                      <>
                        <UserPlus className="w-4 h-4" />
                        <span>Verify Gmail & Create Account</span>
                      </>
                    )}
                  </button>

                  <p className="text-[10px] text-slate-400 text-center">
                    We will send a 6-digit real OTP to your Gmail to verify your identity.
                  </p>
                </form>
              )}

              {/* -------------------------------------------------- */}
              {/* FORM 3: REGISTRATION OTP VERIFICATION              */}
              {/* -------------------------------------------------- */}
              {mode === 'register_verify' && (
                <form onSubmit={handleConfirmRegistrationOtp} className="space-y-4">
                  <div className="text-center p-3 rounded-2xl bg-teal-500/10 border border-teal-500/20">
                    <p className="text-xs text-slate-300">
                      Enter the 6-digit code sent to: <strong className="text-teal-300">{pendingRegData?.email}</strong>
                    </p>
                    <button
                      type="button"
                      onClick={() => setMode('register')}
                      className="text-[11px] text-teal-400 hover:underline mt-1 font-semibold"
                    >
                      ← Back / Edit Details
                    </button>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1 text-center">
                      6-Digit Security OTP Code
                    </label>
                    <input
                      type="text"
                      maxLength={6}
                      required
                      autoFocus
                      placeholder="• • • • • •"
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
                      className="w-full text-center tracking-[0.4em] sm:tracking-[0.5em] text-xl sm:text-2xl font-mono font-bold bg-slate-950 border border-teal-500/40 rounded-xl py-3 text-teal-300 focus:outline-none focus:border-teal-400 transition"
                    />
                  </div>

                  {lastDispatchedOtp && (
                    <div className="text-[11px] text-slate-400 text-center bg-slate-950/60 p-2 rounded-xl border border-white/5">
                      <span>Email taking a moment? Instant verification code: </span>
                      <strong className="text-teal-400 font-mono font-bold text-xs">{lastDispatchedOtp}</strong>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading || otpCode.length !== 6}
                    className="w-full py-3 sm:py-3.5 px-4 rounded-xl bg-gradient-to-r from-teal-400 to-emerald-400 hover:from-teal-300 hover:to-emerald-300 text-slate-950 font-extrabold text-xs sm:text-sm shadow-xl shadow-teal-500/20 transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Creating Account...</span>
                      </>
                    ) : (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Confirm OTP & Activate Account</span>
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-between text-xs pt-1">
                    <button
                      type="button"
                      disabled={countdown > 0}
                      onClick={handleStartRegistration}
                      className="text-teal-400 hover:text-teal-300 font-semibold disabled:text-slate-500 cursor-pointer disabled:cursor-not-allowed"
                    >
                      {countdown > 0 ? `Resend Code in ${countdown}s` : 'Resend OTP'}
                    </button>
                    <span className="text-[11px] text-slate-500">Valid for 10 mins</span>
                  </div>
                </form>
              )}

              {/* -------------------------------------------------- */}
              {/* FORM 4: QUICK GMAIL OTP LOGIN                      */}
              {/* -------------------------------------------------- */}
              {mode === 'otp_login' && (
                <div className="space-y-4">
                  {!isOtpSent ? (
                    <form onSubmit={handleSendQuickOtp} className="space-y-3.5">
                      <div>
                        <label className="text-xs font-semibold text-slate-300 block mb-1">
                          Gmail / Email Address <span className="text-teal-400">*</span>
                        </label>
                        <div className="relative">
                          <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                          <input
                            type="email"
                            required
                            placeholder="e.g. rahul@gmail.com"
                            value={otpEmail}
                            onChange={(e) => setOtpEmail(e.target.value)}
                            className="w-full bg-slate-950 border border-white/10 rounded-xl pl-10 pr-3.5 py-2.5 sm:py-3 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-teal-400 transition"
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 sm:py-3.5 px-4 rounded-xl bg-gradient-to-r from-teal-400 to-emerald-400 hover:from-teal-300 hover:to-emerald-300 text-slate-950 font-extrabold text-xs sm:text-sm shadow-xl shadow-teal-500/20 transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                      >
                        {loading ? 'Sending Security Code...' : 'Send 6-Digit Real OTP'}
                      </button>

                      <div className="text-center pt-1">
                        <button
                          type="button"
                          onClick={() => {
                            setMode('login');
                            setError('');
                          }}
                          className="text-xs text-slate-400 hover:text-white"
                        >
                          ← Back to Password Login
                        </button>
                      </div>
                    </form>
                  ) : (
                    <form onSubmit={handleVerifyQuickOtp} className="space-y-4">
                      <div className="text-center p-3 rounded-2xl bg-teal-500/10 border border-teal-500/20">
                        <p className="text-xs text-slate-300">
                          Enter the 6-digit code sent to: <strong className="text-teal-300">{otpEmail}</strong>
                        </p>
                        <button
                          type="button"
                          onClick={() => setIsOtpSent(false)}
                          className="text-[11px] text-teal-400 hover:underline mt-1 font-semibold"
                        >
                          Change Email
                        </button>
                      </div>

                      <div>
                        <input
                          type="text"
                          maxLength={6}
                          required
                          autoFocus
                          placeholder="• • • • • •"
                          value={otpCode}
                          onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
                          className="w-full text-center tracking-[0.4em] sm:tracking-[0.5em] text-xl sm:text-2xl font-mono font-bold bg-slate-950 border border-teal-500/40 rounded-xl py-3 text-teal-300 focus:outline-none focus:border-teal-400 transition"
                        />
                      </div>

                      {lastDispatchedOtp && (
                        <div className="text-[11px] text-slate-400 text-center bg-slate-950/60 p-2 rounded-xl border border-white/5">
                          <span>Instant verification code: </span>
                          <strong className="text-teal-400 font-mono font-bold text-xs">{lastDispatchedOtp}</strong>
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={loading || otpCode.length !== 6}
                        className="w-full py-3 sm:py-3.5 px-4 rounded-xl bg-gradient-to-r from-teal-400 to-emerald-400 hover:from-teal-300 hover:to-emerald-300 text-slate-950 font-extrabold text-xs sm:text-sm shadow-xl shadow-teal-500/20 transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                      >
                        {loading ? 'Verifying...' : 'Verify OTP & Log In'}
                      </button>

                      <div className="flex items-center justify-between text-xs pt-1">
                        <button
                          type="button"
                          disabled={countdown > 0}
                          onClick={handleSendQuickOtp}
                          className="text-teal-400 hover:text-teal-300 font-semibold disabled:text-slate-500 cursor-pointer"
                        >
                          {countdown > 0 ? `Resend Code in ${countdown}s` : 'Resend OTP'}
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setMode('login');
                            setIsOtpSent(false);
                          }}
                          className="text-slate-400 hover:text-white"
                        >
                          Use Password
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
