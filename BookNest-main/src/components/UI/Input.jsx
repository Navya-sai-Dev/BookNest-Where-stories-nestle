import { motion } from 'framer-motion';

const Input = ({ 
  label, 
  error, 
  helperText, 
  className = '', 
  icon,
  variant = 'default',
  ...props 
}) => {
  // Base styles with premium materials
  const baseClasses = `
    w-full px-4 py-3
    rounded-xl
    border
    bg-white/90 backdrop-blur-sm
    text-gray-900
    transition-all duration-300
    focus:outline-none focus:ring-2 focus:ring-offset-1
    placeholder-gray-400
  `;

  // Variant-specific styles
  const variants = {
    default: `
      border-gray-300/60
      hover:border-gray-400/60
      focus:border-primary-500/50
      focus:ring-primary-400/30
      ${error ? 'border-error-500/60 focus:border-error-500/50 focus:ring-error-400/30' : ''}
    `,
    glass: `
      border-white/30
      bg-white/80 backdrop-blur-md
      hover:bg-white/90
      focus:border-primary-500/30
      focus:ring-primary-400/20
      shadow-sm
      ${error ? 'border-error-500/50 focus:border-error-500/30 focus:ring-error-400/20' : ''}
    `,
    premium: `
      border-gray-300/40
      bg-white/95 backdrop-blur-sm
      hover:border-primary-400/50
      focus:border-primary-500/60
      focus:ring-primary-400/40
      shadow-xs
      ${error ? 'border-error-500/60 focus:border-error-500/60 focus:ring-error-400/40' : ''}
    `
  };

  return (
    <motion.div 
      className={`space-y-1.5 ${className}`}
      whileHover={!props.disabled ? { y: -1 } : {}}
    >
      {label && (
        <label className={`block text-sm font-medium ${
          error ? 'text-error-600' : 'text-gray-700'
        }`}>
          {label}
        </label>
      )}

      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {icon}
          </div>
        )}
        <input
          className={`${baseClasses} ${variants[variant]} ${
            icon ? 'pl-10' : ''
          } ${props.disabled ? 'opacity-70 cursor-not-allowed' : ''}`}
          {...props}
        />
      </div>

      {error && (
        <motion.p 
          className="text-sm text-error-600"
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {error}
        </motion.p>
      )}
      {helperText && !error && (
        <p className="text-sm text-gray-500/90">
          {helperText}
        </p>
      )}
    </motion.div>
  );
};

export default Input;