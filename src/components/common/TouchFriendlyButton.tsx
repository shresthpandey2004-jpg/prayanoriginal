import React from 'react';
import { cn } from '@/lib/utils';

interface TouchFriendlyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  isLoading?: boolean;
}

const TouchFriendlyButton: React.FC<TouchFriendlyButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  isLoading = false,
  className,
  disabled,
  ...props
}) => {
  const baseClasses = cn(
    // Base styles
    "relative inline-flex items-center justify-center font-medium transition-all duration-200",
    "focus:outline-none focus:ring-0 border-0 outline-none",
    "active:scale-95 transform-gpu",
    "disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none",
    
    // Touch-friendly sizing
    "min-h-[44px] min-w-[44px]",
    
    // Remove all borders and focus states
    "!border-none !outline-none",
    "focus:!border-none focus:!outline-none",
    "active:!border-none active:!outline-none",
    
    // Tap highlight removal
    "tap-highlight-transparent",
    
    // Size variants
    {
      "px-3 py-2 text-sm rounded-lg": size === 'sm',
      "px-4 py-3 text-base rounded-xl": size === 'md',
      "px-6 py-4 text-lg rounded-2xl": size === 'lg',
    },
    
    // Variant styles
    {
      "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg hover:from-orange-600 hover:to-red-600 hover:shadow-xl": variant === 'primary',
      "bg-gray-100 text-gray-900 hover:bg-gray-200": variant === 'secondary',
      "bg-transparent text-orange-600 ring-1 ring-orange-200 hover:bg-orange-50": variant === 'outline',
      "bg-transparent text-gray-600 hover:bg-gray-100": variant === 'ghost',
    }
  );

  return (
    <button
      className={cn(baseClasses, className)}
      disabled={disabled || isLoading}
      style={{
        WebkitTapHighlightColor: 'transparent',
        outline: 'none',
        border: 'none'
      }}
      {...props}
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      <span className={cn("flex items-center gap-2", isLoading && "opacity-0")}>
        {children}
      </span>
    </button>
  );
};

export default TouchFriendlyButton;