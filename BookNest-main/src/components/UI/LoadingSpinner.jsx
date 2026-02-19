import { motion } from 'framer-motion';

const LoadingSpinner = ({ 
  size = 'md', 
  className = '', 
  variant = 'primary',
  withBackground = false
}) => {
  // Size classes with perfect proportions
  const sizeClasses = {
    xs: 'w-4 h-4 border-[1.5px]',
    sm: 'w-6 h-6 border-2',
    md: 'w-8 h-8 border-[3px]',
    lg: 'w-12 h-12 border-[4px]',
    xl: 'w-16 h-16 border-[5px]'
  };

  // Variant-specific styling
  const variantClasses = {
    primary: 'border-t-primary-600 border-r-primary-600/70',
    secondary: 'border-t-gray-600 border-r-gray-600/70',
    danger: 'border-t-error-600 border-r-error-600/70',
    premium: 'border-t-amber-500 border-r-amber-500/70',
    light: 'border-t-white border-r-white/70'
  };

  // Background styles
  const backgroundClasses = {
    xs: 'p-1',
    sm: 'p-1.5',
    md: 'p-2',
    lg: 'p-3',
    xl: 'p-4'
  };

  return (
    <motion.div 
      className={`flex items-center justify-center ${className}`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      {withBackground ? (
        <div className={`rounded-full bg-gray-100/80 backdrop-blur-sm ${backgroundClasses[size]}`}>
          <motion.div
            className={`${sizeClasses[size]} rounded-full animate-spin ${variantClasses[variant]} border-b-transparent border-l-transparent`}
            animate={{ rotate: 360 }}
            transition={{ 
              duration: 0.8, 
              repeat: Infinity, 
              ease: "linear" 
            }}
          />
        </div>
      ) : (
        <motion.div
          className={`${sizeClasses[size]} rounded-full animate-spin ${variantClasses[variant]} border-b-transparent border-l-transparent`}
          animate={{ rotate: 360 }}
          transition={{ 
            duration: 0.8, 
            repeat: Infinity, 
            ease: "linear" 
          }}
        />
      )}
    </motion.div>
  );
};

export default LoadingSpinner;