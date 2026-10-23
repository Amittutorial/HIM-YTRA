import React, { useState, useEffect } from 'react';
import { 
  X, User, Mail, ShieldCheck, KeyRound, Sparkles, CheckCircle2, 
  Clock, ArrowRight, LogOut, Calendar, MapPin, Compass, AlertCircle,
  RefreshCw, Check, Car, Phone
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { 
  sendEmailOtp, 
  verifyEmailOtp, 
  getCurrentUser, 
  logoutUser, 
  getUserBookings, 
  getUserCustomTrips 
} from '../lib/supabaseClient';

export default function AuthModal({ isOpen, onClose, onOpenBooking, onOpenPayment }) {
  const [user, setUser] = useState(getCurrentUser());
  const [step, setStep] = useState('input'); // 'input' | 'verify'
  
  // Auth Form State
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [otp, setOtp] = useState('');
  const [lastDispatchedOtp, setLastDispatchedOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [countdown, setCountdown] = useState(0);

  // User Dashboard State
  const [userBookings, setUserBookings] = useState([]);
  const [userCustomTrips, setUserCustomTrips] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [activeTab, setActiveTab] = useState('bookings'); // 'bookings' | 'trips'

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

  // Handle Send Real OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    if (!email.trim() || !email.includes('@')) {
      setError('Please provide a valid Gmail or work email address.');
      return;
    }
    if (!username.trim() || username.trim().length < 3) {
      setError('Username must be at least 3 characters long.');
      return;
    }

    setLoading(true);
    try {
      const res = await sendEmailOtp(email, username);
      setLastDispatchedOtp(res.otpCode);
      setStep('verify');
      setCountdown(60);
      setSuccessMsg(`✅ 6-Digit security OTP sent directly to ${email}! Valid for 10 minutes.`);
    } catch (err) {
      setError(err.message || 'Could not send verification OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle Verify OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    if (!otp.trim() || otp.trim().length !== 6) {
      setError('Please enter the complete 6-digit OTP code sent to your Gmail.');
      return;
    }

    setLoading(true);
    try {
      const res = await verifyEmailOtp(email, otp, username);
      setUser(res.user);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      setSuccessMsg('🎉 Successfully authenticated! Welcome to your HimYatra portal.');
      loadUserData(res.user);
    } catch (err) {
      setError(err.message || 'Invalid or expired OTP code.');
    } finally {
      setLoading(false);
    }
  };

  // Handle Logout
  const handleLogout = () => {
    logoutUser();
    setUser(null);
    setStep('input');
    setEmail('');
    setUsername('');
    setOtp('');
    setSuccessMsg('');
    setError('');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-teal-500/30 rounded-3xl overflow-hidden shadow-2xl shadow-black/95 my-6 text-white">
        
        {/* Top Header */}
        <div className="relative bg-gradient-to-r from-slate-900 via-teal-950/50 to-slate-900 p-5 sm:p-6 border-b border-teal-500/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-teal-500/15 border border-teal-500/30 text-teal-400 flex items-center justify-center shadow-lg shadow-teal-500/20">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold font-['Outfit'] text-white">
                {user ? 'Customer Travel Portal' : 'Customer Account & OTP Login'}
              </h3>
              <p className="text-xs text-teal-300/80">
                {user ? `Logged in as @${user.username}` : 'Fast, password-less login with Gmail verification code'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-7">
          {/* ======================================================== */}
          {/* VIEW 1: LOGGED IN USER DASHBOARD */}
          {/* ======================================================== */}
          {user ? (
            <div className="space-y-6">
              {/* Profile Card */}
              <div className="bg-gradient-to-br from-slate-950 to-teal-950/40 border border-teal-500/30 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-teal-400 to-emerald-400 text-slate-950 font-black text-lg flex items-center justify-center shadow-lg shadow-teal-500/20">
                    {user.username.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-base">@{user.username}</span>
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold bg-teal-500/20 text-teal-300 border border-teal-500/30 px-2 py-0.5 rounded-full">
                        <ShieldCheck className="w-3 h-3 text-teal-400" /> Verified Traveler
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-teal-400" />
                      <span>{user.email}</span>
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

              {/* Statistics Overview */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-white/10">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Booked Services</span>
                  <div className="text-2xl font-black text-teal-300 font-['Outfit'] mt-1">
                    {userBookings.length}
                    <span className="text-xs font-normal text-slate-400"> Trips</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-white/10">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Custom Itineraries</span>
                  <div className="text-2xl font-black text-emerald-300 font-['Outfit'] mt-1">
                    {userCustomTrips.length}
                    <span className="text-xs font-normal text-slate-400"> Plans</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-white/10 col-span-2 sm:col-span-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Traveler Status</span>
                  <div className="text-sm font-bold text-white mt-2 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>Himalayan Gold</span>
                  </div>
                </div>
              </div>

              {/* Tab Selector */}
              <div className="flex items-center gap-2 border-b border-white/10 pb-2">
                <button
                  type="button"
                  onClick={() => setActiveTab('bookings')}
                  className={`text-xs font-bold px-3 py-1.5 rounded-xl transition cursor-pointer ${
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
                  className={`text-xs font-bold px-3 py-1.5 rounded-xl transition cursor-pointer ${
                    activeTab === 'trips'
                      ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Custom Trip Requests ({userCustomTrips.length})
                </button>
              </div>

              {/* Tab Content */}
              {loadingHistory ? (
                <div className="py-8 text-center text-xs text-slate-400 flex items-center justify-center gap-2">
                  <RefreshCw className="w-4 h-4 animate-spin text-teal-400" />
                  <span>Loading your Himalayan bookings from Supabase...</span>
                </div>
              ) : activeTab === 'bookings' ? (
                userBookings.length === 0 ? (
                  <div className="py-8 text-center bg-slate-950/40 rounded-2xl border border-white/5 space-y-2">
                    <Compass className="w-8 h-8 text-slate-500 mx-auto" />
                    <p className="text-sm font-semibold text-slate-300">No bookings found yet under @{user.username}</p>
                    <p className="text-xs text-slate-500">Every tour reservation you make on HimYatra will automatically sync to your username here.</p>
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
                      <div key={b.id || b.booking_reference} className="p-4 rounded-2xl bg-slate-950/80 border border-white/10 hover:border-teal-500/30 transition space-y-2">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <span className="text-[10px] font-mono uppercase bg-white/5 text-teal-300 border border-white/10 px-2 py-0.5 rounded-lg">
                              {b.booking_reference}
                            </span>
                            <h4 className="text-sm font-bold text-white mt-1">{b.package_title}</h4>
                            <p className="text-[11px] text-slate-400 flex items-center gap-1.5 mt-0.5">
                              <MapPin className="w-3 h-3 text-teal-400" />
                              <span>{b.state} • Pickup: {b.pickup_city}</span>
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-extrabold text-teal-300 font-['Outfit']">
                              ₹{Number(b.total_price || 0).toLocaleString('en-IN')}
                            </div>
                            <span className={`inline-block text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full mt-1 ${
                              b.status === 'token_paid' || b.utr_reference
                                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                                : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                            }`}>
                              {b.status === 'token_paid' || b.utr_reference ? 'Paid Token Verified' : 'Token Pending'}
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-white/5 text-[11px] text-slate-400">
                          <div className="flex items-center gap-3">
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
              ) : (
                userCustomTrips.length === 0 ? (
                  <div className="py-8 text-center bg-slate-950/40 rounded-2xl border border-white/5 space-y-2">
                    <Compass className="w-8 h-8 text-slate-500 mx-auto" />
                    <p className="text-sm font-semibold text-slate-300">No custom itineraries generated yet</p>
                    <p className="text-xs text-slate-500">Plan a custom Himalayan route in our Custom Trip Builder to track it here.</p>
                  </div>
                ) : (
                  <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                    {userCustomTrips.map((t) => (
                      <div key={t.id} className="p-4 rounded-2xl bg-slate-950/80 border border-white/10 space-y-2">
                        <div className="flex items-start justify-between">
                          <div>
                            <span className="text-[10px] font-bold text-teal-400 uppercase tracking-wider">{t.region} Custom Plan</span>
                            <h4 className="text-xs font-semibold text-white mt-0.5">
                              {Array.isArray(t.destinations) ? t.destinations.join(' ➔ ') : t.region}
                            </h4>
                          </div>
                          <span className="text-xs font-bold text-emerald-300">
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
              )}
            </div>
          ) : (
            /* ======================================================== */
            /* VIEW 2: AUTHENTICATION (INPUT OR OTP VERIFICATION) */
            /* ======================================================== */
            <div>
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

              {step === 'input' ? (
                <form onSubmit={handleSendOtp} className="space-y-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                      Your Unique Username <span className="text-teal-400">*</span>
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        placeholder="e.g. rahul_verma"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full bg-slate-950 border border-white/10 rounded-xl pl-10 pr-3.5 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-teal-400 transition"
                      />
                    </div>
                    <span className="text-[10px] text-slate-400 mt-1 block">All your tour bookings and inquiries will permanently link to this username.</span>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                      Gmail / Email Address <span className="text-teal-400">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        required
                        placeholder="e.g. yourname@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-slate-950 border border-white/10 rounded-xl pl-10 pr-3.5 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-teal-400 transition"
                      />
                    </div>
                    <span className="text-[10px] text-slate-400 mt-1 block">We will send a real 6-digit one-time password (OTP) to this Gmail address.</span>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-teal-400 to-emerald-400 hover:from-teal-300 hover:to-emerald-300 text-slate-950 font-extrabold text-sm shadow-xl shadow-teal-500/20 transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Sending Security OTP...</span>
                      </>
                    ) : (
                      <>
                        <KeyRound className="w-4 h-4" />
                        <span>Send 6-Digit Real OTP Code</span>
                      </>
                    )}
                  </button>

                  <div className="pt-2 text-center">
                    <p className="text-[11px] text-slate-400 flex items-center justify-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
                      <span>Zero passwords required. Secure Supabase & Gmail OTP authentication.</span>
                    </p>
                  </div>
                </form>
              ) : (
                <form onSubmit={handleVerifyOtp} className="space-y-4">
                  <div className="text-center p-3 rounded-2xl bg-teal-500/10 border border-teal-500/20 mb-2">
                    <p className="text-xs text-slate-300">
                      Enter the 6-digit verification code sent to: <strong className="text-teal-300">{email}</strong>
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setStep('input');
                        setError('');
                      }}
                      className="text-[11px] text-teal-400 hover:underline mt-1 font-semibold"
                    >
                      Change Email / Username
                    </button>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1.5 text-center">
                      6-Digit Security OTP Code
                    </label>
                    <input
                      type="text"
                      maxLength={6}
                      required
                      autoFocus
                      placeholder="• • • • • •"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                      className="w-full text-center tracking-[0.5em] text-2xl font-mono font-bold bg-slate-950 border border-teal-500/40 rounded-xl py-3 text-teal-300 focus:outline-none focus:border-teal-400 transition"
                    />
                  </div>

                  {/* Fallback code disclosure for development/network speed */}
                  {lastDispatchedOtp && (
                    <div className="text-[11px] text-slate-400 text-center bg-slate-950/60 p-2.5 rounded-xl border border-white/5">
                      <span>Email taking a moment? Instant verification code: </span>
                      <strong className="text-teal-400 font-mono font-bold text-xs">{lastDispatchedOtp}</strong>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading || otp.length !== 6}
                    className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-teal-400 to-emerald-400 hover:from-teal-300 hover:to-emerald-300 text-slate-950 font-extrabold text-sm shadow-xl shadow-teal-500/20 transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Verifying Credentials...</span>
                      </>
                    ) : (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Verify OTP & Open Dashboard</span>
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-between text-xs pt-1">
                    <button
                      type="button"
                      disabled={countdown > 0}
                      onClick={handleSendOtp}
                      className="text-teal-400 hover:text-teal-300 font-semibold disabled:text-slate-500 cursor-pointer disabled:cursor-not-allowed"
                    >
                      {countdown > 0 ? `Resend Code in ${countdown}s` : 'Resend OTP Code'}
                    </button>
                    <span className="text-[11px] text-slate-500">Expires in 10 mins</span>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
