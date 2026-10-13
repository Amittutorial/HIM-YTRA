import React, { useState } from 'react';
import { X, QrCode, Copy, Check, MessageSquare, ShieldCheck, Smartphone, CheckCircle2, ArrowRight } from 'lucide-react';

export default function PaymentModal({ initialAmount, bookingRef, packageName, onClose }) {
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [amount, setAmount] = useState(initialAmount || 5000);
  const [paidConfirmed, setPaidConfirmed] = useState(false);

  const upiId = 'amitpatel42203@okhdfcbank';
  const payeeName = 'Amit Patel';
  const bankName = 'Central Bank of India 3744';
  const whatsappNumber = '917619917057';

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(upiId);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2500);
  };

  const upiDeepLink = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(payeeName)}&am=${amount}&cu=INR&tn=${encodeURIComponent(bookingRef ? `Booking ${bookingRef}` : 'HimYatra Tour Advance')}`;

  const whatsappMessage = encodeURIComponent(
    `Hello Amit Patel! I have made a UPI payment of ₹${amount.toLocaleString('en-IN')}${bookingRef ? ` for Booking Ref: ${bookingRef}` : ''}${packageName ? ` (${packageName})` : ''}. Please find my payment screenshot attached.`
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-slate-900 border border-teal-500/30 rounded-3xl overflow-hidden shadow-2xl shadow-black/95 my-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-slate-950/80 border border-white/20 text-slate-300 hover:text-white hover:bg-slate-800 flex items-center justify-center transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="p-6 bg-gradient-to-br from-slate-950 via-slate-900 to-teal-950/50 border-b border-white/10 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30 text-xs font-bold uppercase tracking-wider mb-2">
            <QrCode className="w-3.5 h-3.5" /> Instant Online UPI Payment
          </div>
          <h2 className="text-2xl font-black text-white font-['Outfit']">
            Scan & Pay with Any UPI App
          </h2>
          <p className="text-xs text-slate-300 mt-1">
            Google Pay, PhonePe, Paytm, BHIM, Cred, or Mobile Banking
          </p>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          
          {/* QR Code Container */}
          <div className="bg-slate-950 p-5 rounded-2xl border border-white/10 text-center space-y-3">
            <div className="flex items-center justify-center gap-2 text-white font-bold text-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Verified Payee: {payeeName}</span>
            </div>

            {/* QR Image */}
            <div className="relative mx-auto w-64 sm:w-72 rounded-2xl overflow-hidden border-2 border-teal-400/50 shadow-xl bg-black p-2">
              <img
                src="/payment-qr.jpg"
                alt="Amit Patel UPI QR Code"
                className="w-full h-auto object-contain rounded-xl"
              />
            </div>

            <div className="text-[11px] text-slate-400 flex items-center justify-center gap-1">
              <span>Linked Account:</span>
              <strong className="text-slate-200">{bankName}</strong>
            </div>
          </div>

          {/* Amount Box */}
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-white/10 flex items-center justify-between gap-4">
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-semibold block">Payment Amount (INR)</span>
              <div className="text-xl sm:text-2xl font-black text-teal-300 font-['Outfit']">
                ₹{Number(amount).toLocaleString('en-IN')}
              </div>
            </div>

            <div className="text-right">
              <label className="text-[10px] text-slate-400 uppercase font-semibold block mb-1">Edit Amount</label>
              <input
                type="number"
                min="100"
                step="500"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-28 bg-slate-900 border border-teal-500/30 rounded-xl px-2.5 py-1 text-xs text-white font-bold text-right focus:outline-none focus:border-teal-400"
              />
            </div>
          </div>

          {/* UPI ID Copy Box */}
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-white/10 flex items-center justify-between gap-3">
            <div className="overflow-hidden">
              <span className="text-[10px] text-slate-400 uppercase font-semibold block">UPI ID</span>
              <div className="font-mono text-xs sm:text-sm font-bold text-white truncate" title={upiId}>
                {upiId}
              </div>
            </div>

            <button
              onClick={handleCopyUpi}
              className="px-3.5 py-2 rounded-xl bg-teal-500/20 hover:bg-teal-500/30 text-teal-300 text-xs font-bold flex items-center gap-1.5 transition cursor-pointer shrink-0"
            >
              {copiedUpi ? (
                <>
                  <Check className="w-3.5 h-3.5 text-teal-400" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy UPI ID</span>
                </>
              )}
            </button>
          </div>

          {/* Direct UPI App intent button for mobile devices */}
          <div className="sm:hidden">
            <a
              href={upiDeepLink}
              className="w-full py-3 px-4 rounded-xl bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition"
            >
              <Smartphone className="w-4 h-4" />
              <span>Tap to Open in UPI App (GPay / PhonePe)</span>
            </a>
          </div>

          {/* Steps instructions */}
          <div className="p-4 rounded-2xl bg-slate-950/50 border border-white/5 space-y-2 text-xs text-slate-300">
            <span className="text-[11px] font-bold uppercase text-teal-400 block">3 Easy Steps to Complete:</span>
            <div className="flex items-start gap-2">
              <span className="font-bold text-teal-400">1.</span>
              <span>Scan the QR code above or copy UPI ID <strong>{upiId}</strong>.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-bold text-teal-400">2.</span>
              <span>Enter the token/package amount and complete payment to <strong>Amit Patel</strong>.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-bold text-teal-400">3.</span>
              <span>Take a screenshot and share it on WhatsApp for instant booking confirmation & voucher.</span>
            </div>
          </div>

          {/* WhatsApp Share Screenshot Action */}
          <div className="pt-2">
            <a
              href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
              target="_blank"
              rel="noreferrer"
              className="w-full py-3.5 px-6 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-sm flex items-center justify-center gap-2 shadow-xl shadow-emerald-500/20 transition"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Share Payment Screenshot on WhatsApp</span>
            </a>
          </div>

          <div className="flex items-center justify-center gap-2 text-[10px] text-slate-400">
            <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
            <span>100% Safe & Direct Bank Transfer via NPCI UPI</span>
          </div>

        </div>

      </div>
    </div>
  );
}
