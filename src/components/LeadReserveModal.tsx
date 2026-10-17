import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import { FabricSwatch, WoodSwatch, BRAND_CONFIG } from '../data/config';

interface LeadReserveModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedFabric: FabricSwatch;
  selectedWood: WoodSwatch;
  totalPrice: number;
}

export const LeadReserveModal: React.FC<LeadReserveModalProps> = ({
  isOpen,
  onClose,
  selectedFabric,
  selectedWood,
  totalPrice,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !city.trim()) {
      setErrorMsg('Please complete all required fields (Name, Email, City).');
      return;
    }
    if (!email.includes('@') || !email.includes('.')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    setErrorMsg('');
    setIsSubmitting(true);

    // Mock API submission response
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 900);
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setCity('');
    setNotes('');
    setIsSuccess(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-[#1C1612] text-[#F5EFE6] rounded-xl overflow-hidden shadow-2xl border border-[#B08D57]/40 p-6 md:p-8">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 text-[#D4C2A6] hover:text-white rounded-md hover:bg-white/10 transition-colors"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {!isSuccess ? (
          <div>
            <div className="mb-6">
              <span className="text-[10px] font-mono tracking-widest uppercase text-[#B08D57] block">
                Direct Atelier Commission · Stellar Works
              </span>
              <h3 className="font-serif-luxury text-3xl font-medium tracking-tight text-[#F5EFE6] mt-1">
                Reserve the ARC Lounge Chair
              </h3>
              <p className="text-xs text-[#D4C2A6] mt-1 leading-relaxed">
                No immediate payment required today. Your build queue slot is reserved while our dedicated concierge coordinates complimentary physical fabric swatches, space clearance verification, and delivery preferences.
              </p>
            </div>

            {/* Selected Configuration Summary Box */}
            <div className="bg-[#2A1D14] p-4 rounded-lg border border-[#F5EFE6]/10 mb-6 flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase text-[#B08D57] block">
                  Configuration Summary
                </span>
                <div className="text-sm font-serif-luxury text-[#F5EFE6]">
                  {BRAND_CONFIG.heroProduct.name}
                </div>
                <div className="text-xs text-[#D4C2A6]">
                  {selectedFabric.name} · Solid {selectedWood.name}
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs font-mono text-[#D4C2A6] block">Total Commission</span>
                <span className="text-xl font-mono font-medium text-[#F5EFE6] tabular-nums block">
                  ${totalPrice.toLocaleString()} USD
                </span>
                <span className="text-[9px] font-mono text-[#B08D57]">No deposit required today</span>
              </div>
            </div>

            {/* Reservation Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMsg && (
                <div className="text-xs text-[#F28B82] bg-[#F28B82]/10 border border-[#F28B82]/30 p-2.5 rounded">
                  {errorMsg}
                </div>
              )}

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#D4C2A6] mb-1.5">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Helena Berg"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#16110E] border border-[#F5EFE6]/20 rounded px-3.5 py-2.5 text-sm text-[#F5EFE6] placeholder-[#D4C2A6]/40 focus:outline-none focus:border-[#B08D57]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#D4C2A6] mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="helena@studio.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#16110E] border border-[#F5EFE6]/20 rounded px-3.5 py-2.5 text-sm text-[#F5EFE6] placeholder-[#D4C2A6]/40 focus:outline-none focus:border-[#B08D57]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#D4C2A6] mb-1.5">
                    City / Country *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Stockholm, Sweden"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-[#16110E] border border-[#F5EFE6]/20 rounded px-3.5 py-2.5 text-sm text-[#F5EFE6] placeholder-[#D4C2A6]/40 focus:outline-none focus:border-[#B08D57]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#D4C2A6] mb-1.5">
                  Architectural Notes / Delivery Specs (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Specify interior delivery requirements or matching suite requests..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-[#16110E] border border-[#F5EFE6]/20 rounded px-3.5 py-2 text-sm text-[#F5EFE6] placeholder-[#D4C2A6]/40 focus:outline-none focus:border-[#B08D57]"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-[#F5EFE6] hover:bg-[#E8DCC8] text-[#1C1612] font-medium text-xs uppercase tracking-widest rounded-sm transition-all shadow-md cursor-pointer disabled:opacity-50 mt-2 font-mono"
              >
                {isSubmitting ? 'Confirming Atelier Queue...' : 'Confirm Reservation Request · No Payment Required Today'}
              </button>
            </form>

            {/* Trust Badges */}
            <div className="mt-6 pt-5 border-t border-[#F5EFE6]/10 grid grid-cols-3 gap-2 text-center text-[10px] font-mono text-[#D4C2A6]">
              <div className="flex flex-col items-center gap-1">
                <Truck size={14} className="text-[#B08D57]" />
                <span>White-Glove Included</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <ShieldCheck size={14} className="text-[#B08D57]" />
                <span>10-Yr Frame Guarantee</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <RotateCcw size={14} className="text-[#B08D57]" />
                <span>30-Day Home Trial</span>
              </div>
            </div>
          </div>
        ) : (
          /* Confirmation Success State */
          <div className="py-8 text-center space-y-4">
            <div className="w-14 h-14 bg-[#B08D57]/20 border border-[#B08D57] rounded-full flex items-center justify-center mx-auto text-[#B08D57]">
              <CheckCircle2 size={32} />
            </div>

            <span className="text-[10px] font-mono tracking-widest uppercase text-[#B08D57] block">
              Reservation Allocation #ARC-2026-084
            </span>

            <h3 className="font-serif-luxury text-3xl font-medium text-[#F5EFE6]">
              Thank you, {name}.
            </h3>

            <p className="text-xs text-[#D4C2A6] max-w-md mx-auto leading-relaxed">
              We have reserved your handcrafted <strong>ARC Lounge Chair</strong> in{' '}
              <span className="text-[#F5EFE6]">{selectedFabric.name}</span> with{' '}
              <span className="text-[#F5EFE6]">{selectedWood.name}</span> legs for delivery to{' '}
              <span className="text-[#F5EFE6]">{city}</span>.
            </p>

            <div className="bg-[#2A1D14] p-4 rounded-lg border border-[#F5EFE6]/10 max-w-sm mx-auto text-left text-xs font-mono text-[#D4C2A6] space-y-1">
              <div>Confirmation sent to: <span className="text-[#F5EFE6]">{email}</span></div>
              <div>Estimated completion: <span className="text-[#B08D57]">{BRAND_CONFIG.heroProduct.leadTime}</span></div>
              <div>Dedicated Concierge: <span className="text-[#F5EFE6]">atelier@forma-living.design</span></div>
            </div>

            <button
              type="button"
              onClick={handleReset}
              className="mt-4 px-6 py-2.5 bg-[#F5EFE6] text-[#1C1612] text-xs font-mono uppercase tracking-wider rounded-sm hover:bg-[#E8DCC8] transition-colors"
            >
              Return to Showcase
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
