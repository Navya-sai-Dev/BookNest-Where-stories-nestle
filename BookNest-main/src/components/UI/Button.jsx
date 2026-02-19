import { motion } from 'framer-motion';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  disabled = false, 
  loading = false,
  className = '', 
  icon,
  iconPosition = 'left',
  fullWidth = false,
  ...props 
}) => {
  // Base classes with premium styling
  const baseClasses = `
    inline-flex items-center justify-center font-medium rounded-xl
    transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden relative
    group ${fullWidth ? 'w-full' : ''}
  `;
  
  // Premium variants with gradient and shadow effects
  const variants = {
    primary: `
      bg-gradient-to-r from-primary-600 to-primary-700 text-white
      hover:from-primary-500 hover:to-primary-600 focus:ring-primary-400/50
      shadow-lg hover:shadow-xl
      after:absolute after:inset-0 after:bg-gradient-to-r after:from-white/10 after:to-transparent
      after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-300
    `,
    secondary: `
      bg-white/90 backdrop-blur-sm text-gray-800 border border-gray-300/50
      hover:bg-white hover:border-gray-400/50 focus:ring-gray-400/30
      shadow-md hover:shadow-lg
      after:absolute after:inset-0 after:bg-gradient-to-b after:from-white/30 after:to-transparent
      after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-300
    `,
    ghost: `
      text-gray-700 hover:text-gray-900 hover:bg-gray-100/50
      focus:ring-gray-300/30
      after:absolute after:inset-0 after:bg-gray-100/50
      after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-300
    `,
    danger: `
      bg-gradient-to-r from-error-600 to-error-700 text-white
      hover:from-error-500 hover:to-error-600 focus:ring-error-400/50
      shadow-lg hover:shadow-xl
      after:absolute after:inset-0 after:bg-gradient-to-r after:from-white/10 after:to-transparent
      after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-300
    `,
    premium: `
      bg-gradient-to-r from-amber-600 to-amber-500 text-white
      hover:from-amber-500 hover:to-amber-400 focus:ring-amber-400/50
      shadow-xl hover:shadow-2xl
      after:absolute after:inset-0 after:bg-gradient-to-r after:from-white/15 after:to-transparent
      after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-300
    `
  };
  
  // Precise sizing with proper padding and typography
  const sizes = {
    xs: 'px-3 py-1.5 text-xs',
    sm: 'px-4 py-2 text-sm',
    md: 'px-5 py-2.5 text-base',
    lg: 'px-6 py-3 text-lg',
    xl: 'px-8 py-4 text-xl'
  };

  // Icon sizing based on button size
  const iconSizes = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
    xl: 'w-7 h-7'
  };

  // Loading spinner animation
  const LoadingSpinner = () => (
    <motion.div
      className={`${iconSizes[size]} rounded-full border-2 border-white/30 border-t-white mr-2`}
      animate={{ rotate: 360 }}
      transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
    />
  );

  return (
    <motion.button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || loading}
      whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
      whileHover={disabled || loading ? {} : { y: -1 }}
      {...props}
    >
      {/* Loading state */}
      {loading && <LoadingSpinner />}
      
      {/* Icon before text */}
      {icon && iconPosition === 'left' && !loading && (
        <span className={`${iconSizes[size]} mr-2`}>
          {icon}
        </span>
      )}
      
      {/* Button text */}
      <span className="relative z-10">{children}</span>
      
      {/* Icon after text */}
      {icon && iconPosition === 'right' && !loading && (
        <span className={`${iconSizes[size]} ml-2`}>
          {icon}
        </span>
      )}
      
      {/* Premium shimmer effect */}
      {variant === 'premium' && (
        <motion.span
          className="absolute inset-0 bg-gradient-to-r from-white/30 via-white/0 to-white/30"
          initial={{ x: '-100%' }}
          animate={{ x: '100%' }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      )}
    </motion.button>
  );
};

export default Button;