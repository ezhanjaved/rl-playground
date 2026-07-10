import React from 'react';

export function StatusBadge({ type, value }) {
  const getStyles = () => {
    const val = value.toLowerCase();
    
    if (type === 'active' || type === 'onetime' || type === 'available' || type === 'completed') {
      if (val === 'yes' || val === 'true' || val === 'active' || val === 'completed' || val === 'trained') {
        return 'bg-emerald-50 text-emerald-700 border-emerald-100';
      }
      return 'bg-rose-50 text-rose-700 border-rose-100';
    }

    if (type === 'status_account') {
        if (val === 'training') return 'bg-amber-50 text-amber-700 border-amber-100 animate-pulse';
        if (val === 'completed' || val === 'trained') return 'bg-emerald-50 text-emerald-700 border-emerald-100';
        return 'bg-zinc-50 text-zinc-700 border-zinc-100';
    }

    return 'bg-indigo-50 text-indigo-700 border-indigo-100';
  };

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold border ${getStyles()}`}>
      {value}
    </span>
  );
}
