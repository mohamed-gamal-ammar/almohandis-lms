/**
 * Al-Muhandis Platform - Reusable UI Components
 * Master Specification - Phase 0 (Professional Polish Theme)
 */

import React from 'react';

// ----------------------------------------------------
// BUTTON COMPONENT
// ----------------------------------------------------
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost' | 'blue';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-semibold transition-all duration-150 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/40 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap active:scale-[0.98] cursor-pointer';

  const sizeStyles: Record<string, string> = {
    sm: 'px-3 py-1.5 text-xs gap-1.5 min-h-[34px]',
    md: 'px-4 py-2 text-sm gap-2 min-h-[40px]',
    lg: 'px-6 py-3 text-base gap-2.5 min-h-[48px]',
  };

  const variantStyles: Record<string, string> = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow active:bg-blue-800',
    blue: 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow',
    secondary: 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 shadow-sm active:bg-slate-100',
    outline: 'border border-slate-300 hover:bg-slate-50 text-slate-700 hover:border-slate-400',
    danger: 'bg-rose-600 hover:bg-rose-700 text-white shadow-sm',
    ghost: 'text-slate-600 hover:text-slate-900 hover:bg-slate-100',
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size] || sizeStyles.md} ${variantStyles[variant] || variantStyles.primary} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <svg className="animate-spin h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
        </svg>
      ) : (
        <>
          {leftIcon}
          <span>{children}</span>
          {rightIcon}
        </>
      )}
    </button>
  );
};

// ----------------------------------------------------
// CARD COMPONENT
// ----------------------------------------------------
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'glass';
  isInteractive?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  isInteractive = false,
  className = '',
  ...props
}) => {
  const base = 'rounded-xl transition-all duration-150 overflow-hidden';
  const variants: Record<string, string> = {
    default: 'bg-white border border-slate-200 shadow-sm',
    elevated: 'bg-white border border-slate-200 shadow-md',
    glass: 'bg-white/90 backdrop-blur-sm border border-slate-200 shadow-sm',
  };
  const interactiveStyle = isInteractive ? 'hover:border-blue-300 hover:shadow-md cursor-pointer' : '';

  return (
    <div className={`${base} ${variants[variant] || variants.default} ${interactiveStyle} ${className}`} {...props}>
      {children}
    </div>
  );
};

// ----------------------------------------------------
// BADGE COMPONENT
// ----------------------------------------------------
interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'success' | 'warning' | 'info' | 'danger' | 'neutral' | 'amber' | 'blue' | 'dark-emerald' | 'dark-blue';
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  size = 'md',
  className = '',
  ...props
}) => {
  const sizes: Record<string, string> = {
    sm: 'px-2 py-0.5 text-[11px] font-medium',
    md: 'px-2.5 py-1 text-xs font-semibold',
  };

  const variants: Record<string, string> = {
    success: 'bg-emerald-50 text-emerald-700 border border-emerald-200/80',
    warning: 'bg-amber-50 text-amber-700 border border-amber-200/80',
    info: 'bg-sky-50 text-sky-700 border border-sky-200/80',
    danger: 'bg-rose-50 text-rose-700 border border-rose-200/80',
    neutral: 'bg-slate-100 text-slate-700 border border-slate-200',
    amber: 'bg-amber-50 text-amber-800 border border-amber-200',
    blue: 'bg-blue-50 text-blue-700 border border-blue-200',
    'dark-emerald': 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-mono',
    'dark-blue': 'bg-blue-500/20 text-blue-400 border border-blue-500/30 font-mono',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md whitespace-nowrap ${sizes[size] || sizes.md} ${variants[variant] || variants.neutral} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};
