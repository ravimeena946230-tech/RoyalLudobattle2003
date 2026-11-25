import React, { useState, useEffect } from 'react';
import {
  X,
  BookOpen,
  Swords,
  KeyRound,
  Trophy,
  ShieldAlert,
  Camera,
  Dice6,
  Star,
  Target,
  Wallet,
  CheckCircle2,
  ArrowRight,
  AlertTriangle,
} from 'lucide-react';
import { sounds } from '../lib/soundEffects';

interface HowToPlayModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartBattle?: () => void;
}

type GuideTab = 'platform' | 'ludo' | 'penalties';

export const HowToPlayModal: React.FC<HowToPlayModalProps> = ({
  isOpen,
  onClose,
  onStartBattle,
}) => {
  const [activeTab, setActiveTab] = useState<GuideTab>('platform');

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleTabChange = (tab: GuideTab) => {
    sounds.playClick();
    setActiveTab(tab);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4 bg-slate-950/70 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="how-to-play-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          sounds.playClick();
          onClose();
        }
      }}
    >
      <div className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl border border-slate-200 flex flex-col max-h-[88vh] overflow-hidden">
        {/* Top Modal Header */}
        <div className="px-5 pt-4 pb-3.5 bg-[#0f172a] text-white flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2
                id="how-to-play-title"
                className="font-['Outfit'] font-extrabold text-base tracking-tight text-white leading-tight"
              >
                How to Play
              </h2>
              <p className="text-xs text-slate-300 font-medium">
                Royalludobattle Guide &amp; Ludo Rules
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              sounds.playClick();
              onClose();
            }}
            aria-label="Close How to Play modal"
            className="min-w-[44px] min-h-[44px] rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Segmented Navigation Tabs */}
        <div className="px-4 pt-3 pb-2 bg-slate-50 border-b border-slate-200 shrink-0">
          <div className="grid grid-cols-3 gap-1 p-1 bg-slate-200/80 rounded-xl">
            <button
              type="button"
              onClick={() => handleTabChange('platform')}
              className={`min-h-[40px] px-2 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeTab === 'platform'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Platform Flow
            </button>
            <button
              type="button"
              onClick={() => handleTabChange('ludo')}
              className={`min-h-[40px] px-2 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeTab === 'ludo'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Ludo Rules
            </button>
            <button
              type="button"
              onClick={() => handleTabChange('penalties')}
              className={`min-h-[40px] px-2 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeTab === 'penalties'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Fair Play
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5 text-slate-700">
          {activeTab === 'platform' && (
            <>
              {/* Overview Highlight */}
              <div className="p-3.5 rounded-2xl bg-indigo-50 border border-indigo-100 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-indigo-950 font-['Outfit']">
                    1v1 Real-Money Ludo Battles
                  </span>
                  <span className="text-xs font-bold text-indigo-700 tabular-nums">
                    95% Winner Payout
                  </span>
                </div>
                <p className="text-xs text-indigo-900/80 leading-relaxed">
                  Create or join a 2-player battle on Royalludobattle, play the match inside the Ludo King app using the shared room code, and upload your victory screenshot to claim instant winnings.
                </p>
              </div>

              {/* Step-by-Step Platform Mechanics */}
              <div className="space-y-4 divide-y divide-slate-100">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 font-black text-xs flex items-center justify-center shrink-0 tabular-nums">
                    01
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-1.5">
                      <Wallet className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>Add Cash &amp; Set a Battle</span>
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Deposit funds via UPI, QR, or Bank Transfer (minimum ₹50). Open <strong className="text-slate-800">Classic Battles</strong>, enter an entry amount (₹50 or more) and tap <strong className="text-slate-800">SET</strong>, or tap <strong className="text-slate-800">Play</strong> on any open challenge.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-4">
                  <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-800 font-black text-xs flex items-center justify-center shrink-0 tabular-nums">
                    02
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-1.5">
                      <KeyRound className="w-4 h-4 text-blue-600 shrink-0" />
                      <span>Exchange Ludo King Room Code</span>
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      When both players are ready, the <strong className="text-slate-800">Host (Red)</strong> opens Ludo King, selects <em>Play with Friends &rarr; Create Room</em>, and submits the 8-digit room code here. The <strong className="text-slate-800">Opponent (Green)</strong> copies the code and joins in Ludo King.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-4">
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 font-black text-xs flex items-center justify-center shrink-0 tabular-nums">
                    03
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-1.5">
                      <Camera className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Submit Result &amp; Screenshot</span>
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      After finishing the match in Ludo King, return to the Match Room. Winners tap <strong className="text-emerald-700">I Won</strong> and upload the final scorecard screenshot. Losers tap <strong className="text-rose-600">I Lost</strong> for instant payout release.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-4">
                  <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-800 font-black text-xs flex items-center justify-center shrink-0 tabular-nums">
                    04
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-1.5">
                      <Trophy className="w-4 h-4 text-purple-600 shrink-0" />
                      <span>Prize Payouts &amp; Withdrawals</span>
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Winners receive <strong className="text-slate-800 tabular-nums">1.95x</strong> the entry stake (both stakes minus a 5% platform fee; e.g., ₹50 entry wins ₹97.5). Complete KYC once to withdraw winnings directly to your UPI ID or bank account.
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'ludo' && (
            <>
              <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200/80 space-y-1">
                <span className="text-xs font-extrabold text-amber-950 font-['Outfit'] block">
                  Classic 2-Player Ludo Rules
                </span>
                <p className="text-xs text-amber-900/80 leading-relaxed">
                  Both players start with 4 tokens in their home base. The first player to move all 4 tokens around the board and into the center Home triangle wins the battle.
                </p>
              </div>

              <div className="space-y-4 divide-y divide-slate-100">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center shrink-0">
                    <Dice6 className="w-4 h-4 text-indigo-600" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-sm font-extrabold text-slate-900">
                      Opening &amp; Bonus Rolls
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Roll a <strong className="text-slate-800 tabular-nums">6</strong> to bring a token out onto your starting square. You earn an extra roll whenever you roll a 6, capture an opponent&apos;s token, or move a token safely into the center Home.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-4">
                  <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center shrink-0">
                    <Swords className="w-4 h-4 text-rose-600" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-sm font-extrabold text-slate-900">
                      Capturing Opponent Tokens
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Landing on an opponent&apos;s single token on a non-safe tile sends their token back to their starting base and grants you a bonus turn.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-4">
                  <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center shrink-0">
                    <Star className="w-4 h-4 text-amber-500" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-sm font-extrabold text-slate-900">
                      Safe Zones (Star Tiles)
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Colored starting squares and star-marked squares are safe zones. Tokens resting on safe tiles cannot be captured by your opponent.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-4">
                  <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center shrink-0">
                    <Target className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-sm font-extrabold text-slate-900">
                      Reaching Center Home &amp; 3-Sixes Rule
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Rolling three consecutive <strong className="text-slate-800 tabular-nums">6s</strong> forfeits your turn. To enter the final center triangle, you must roll the exact number of remaining steps.
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'penalties' && (
            <>
              <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200/80 space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-extrabold text-rose-900 font-['Outfit']">
                  <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>Mandatory Match Integrity Rules</span>
                </div>
                <p className="text-xs text-rose-900/80 leading-relaxed">
                  Follow these platform rules on every battle to protect your winnings and avoid automatic account penalties.
                </p>
              </div>

              <div className="space-y-3">
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-extrabold text-slate-900">
                      Record Screen &amp; Save Victory Proof
                    </h4>
                    <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                      Always screen-record your match and capture the clear Ludo King victory screen showing player names. Video proof may be requested by admins during disputes.
                    </p>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-extrabold text-slate-900">
                      Disputes &amp; Admin Arbitration
                    </h4>
                    <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                      If both players tap &quot;I Won&quot; or submit conflicting results, the match enters Dispute status. Admins review uploaded screenshots and video proof within minutes to credit the rightful winner.
                    </p>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-rose-50/60 border border-rose-200 flex items-start gap-3">
                  <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-extrabold text-rose-950">
                      Penalties for False or Missing Updates
                    </h4>
                    <p className="text-xs text-rose-900/80 mt-0.5 leading-relaxed">
                      Submitting a fake win result incurs a strict penalty and potential account suspension. Failing to update your match status after finishing incurs a <strong className="tabular-nums">₹25</strong> penalty.
                    </p>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                  <X className="w-4 h-4 text-slate-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-extrabold text-slate-900">
                      Cancelling Unstarted Matches
                    </h4>
                    <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                      Only use the <strong className="text-slate-800">Cancel</strong> button if the room code wasn&apos;t shared or the opponent never joined in Ludo King before the first move.
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Sticky Modal Footer CTA */}
        <div className="p-4 bg-white border-t border-slate-200 flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={() => {
              sounds.playClick();
              onClose();
            }}
            className="min-h-[44px] px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
          >
            Close
          </button>

          {onStartBattle && (
            <button
              type="button"
              onClick={() => {
                sounds.playClick();
                onClose();
                onStartBattle();
              }}
              className="flex-1 min-h-[44px] px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-black text-xs uppercase tracking-wider shadow-md shadow-amber-500/20 flex items-center justify-center gap-1.5 transition-all active:scale-98 cursor-pointer"
            >
              <span>Go to Play Battles</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
