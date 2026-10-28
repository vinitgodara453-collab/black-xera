import React from 'react';
import { BlackXeraProduct } from '../types/blackxera';
import { Send, MessageCircle, KeyRound, Rocket, Star, Gamepad2, Sparkles, CheckCircle2 } from 'lucide-react';

interface BlackXeraProductCardProps {
  product: BlackXeraProduct;
  onSelectProduct: (product: BlackXeraProduct) => void;
}

export const BlackXeraProductCard: React.FC<BlackXeraProductCardProps> = ({
  product,
  onSelectProduct
}) => {
  // Render exact icon styling as in QuickCodes screenshot
  const renderIcon = () => {
    switch (product.iconType) {
      case 'russia':
        return (
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-rose-600 p-[2px] shadow-lg shadow-indigo-500/25 flex items-center justify-center relative">
            <div className="w-full h-full bg-[#0a0f1d] rounded-[14px] flex items-center justify-center relative overflow-hidden">
              <span className="absolute text-xl">🇷🇺</span>
              <Send className="w-5 h-5 text-white/90 translate-x-[2px] translate-y-[-2px] relative z-10" />
            </div>
          </div>
        );
      case 'tg_premium':
        return (
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#1d90f5] to-[#28a8ea] flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Send className="w-6 h-6 text-white translate-x-[-1px] translate-y-[1px]" />
          </div>
        );
      case 'tg_bulk':
        return (
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-slate-600 to-slate-500 flex items-center justify-center shadow-md">
            <Send className="w-6 h-6 text-slate-100 translate-x-[-1px] translate-y-[1px]" />
          </div>
        );
      case 'whatsapp':
        return (
          <div className="w-12 h-12 rounded-2xl bg-[#25D366] flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <MessageCircle className="w-6 h-6 text-white" />
          </div>
        );
      case 'otp':
        return (
          <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-md">
            <KeyRound className="w-6 h-6 text-slate-900" />
          </div>
        );
      case 'smm':
        return (
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-rose-500 via-orange-500 to-amber-400 flex items-center justify-center shadow-lg shadow-orange-500/25">
            <Rocket className="w-6 h-6 text-white" />
          </div>
        );
      case 'star':
        return (
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-300 flex items-center justify-center shadow-lg shadow-amber-500/25">
            <Star className="w-6 h-6 text-slate-950 fill-slate-950" />
          </div>
        );
      case 'game':
        return (
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-600 to-blue-500 flex items-center justify-center shadow-lg shadow-cyan-500/20">
            <Gamepad2 className="w-6 h-6 text-white" />
          </div>
        );
      default:
        return (
          <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
        );
    }
  };

  // Badge styling
  const renderBadge = () => {
    if (product.badgeType === 'russia') {
      return (
        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase bg-gradient-to-r from-blue-950 to-indigo-950 border border-indigo-500/40 text-cyan-300 flex items-center gap-1 shadow-sm">
          <span>🇷🇺</span> {product.badge}
        </span>
      );
    }

    if (product.badgeType === 'low_price') {
      return (
        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase bg-emerald-950/80 border border-emerald-500/30 text-emerald-300">
          {product.badge}
        </span>
      );
    }

    return (
      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase bg-[#141C2E] border border-blue-500/30 text-blue-400">
        {product.badge}
      </span>
    );
  };

  const isFullWidth = product.category === 'smm' || product.category === 'tg_stars';

  return (
    <div
      onClick={() => onSelectProduct(product)}
      className={`group relative overflow-hidden bg-[#0D121D] hover:bg-[#111726] border border-slate-800/80 hover:border-blue-500/50 rounded-3xl p-5 transition-all duration-200 cursor-pointer shadow-lg active:scale-[0.99] flex flex-col justify-between ${
        isFullWidth ? 'sm:col-span-2' : ''
      }`}
    >
      <div>
        {/* Top Header Row with Icon and Badge */}
        <div className="flex items-start justify-between gap-2 mb-4">
          {renderIcon()}
          {renderBadge()}
        </div>

        {/* Title & Subtitle (Exact layout as screenshot) */}
        <div className="space-y-1">
          <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-blue-300 transition-colors">
            {product.title}
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 line-clamp-2 leading-relaxed">
            {product.subtitle}
          </p>
        </div>
      </div>

      {/* Pricing & Stock Footer */}
      <div className="pt-4 mt-3 border-t border-slate-800/60 flex items-center justify-between">
        <div className="space-y-0.5">
          <div className="flex items-baseline gap-1.5">
            <span className="text-lg font-black text-white font-sans">
              ₹{product.priceInr}
            </span>
            <span className="text-xs text-slate-500 line-through font-sans">
              ₹{product.originalPriceInr}
            </span>
            <span className="text-[10px] text-slate-400">
              /{product.unit}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-medium">
            <CheckCircle2 className="w-3 h-3" />
            <span>Instant Delivery ({product.stock} in stock)</span>
          </div>
        </div>

        <button
          className="px-3.5 py-1.5 rounded-xl bg-blue-600/20 group-hover:bg-blue-600 text-blue-400 group-hover:text-white border border-blue-500/30 text-xs font-bold font-sans transition-all"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};
