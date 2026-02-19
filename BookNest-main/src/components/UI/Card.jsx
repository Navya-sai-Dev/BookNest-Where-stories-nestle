import { motion } from 'framer-motion';

const Card = ({ 
  children, 
  className = '', 
  hoverEffect = true,
  variant = 'default',
  ...props 
}) => {
  // Base styles with premium materials
  const baseClasses = `
    bg-white/90 backdrop-blur-md
    rounded-2xl
    overflow-hidden
    relative
    transition-all duration-300
    ${hoverEffect ? 'hover:shadow-xl' : ''}
  `;

  // Variant-specific styles
  const variants = {
    default: `
      border border-gray-200/40
      shadow-lg
      hover:border-gray-300/50
    `,
    elevated: `
      border border-gray-200/30
      shadow-2xl
      hover:shadow-3xl
    `,
    glass: `
      bg-white/80 backdrop-blur-xl
      border border-white/30
      shadow-lg
    `,
    premium: `
      bg-gradient-to-br from-white to-gray-50
      border border-gray-200/20
      shadow-xl
      hover:shadow-2xl
      after:absolute after:inset-0 after:bg-gradient-to-br after:from-white/30 after:via-transparent after:to-white/10
      after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-500
    `
  };

  return (
    <motion.div
      className={`${baseClasses} ${variants[variant]} ${className}`}
      whileHover={hoverEffect ? { y: -4 } : {}}
      {...props}
    >
      {/* Optional decorative elements for premium variant */}
      {variant === 'premium' && (
        <>
          <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-gray-300/20 rounded-tl-2xl" />
          <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-gray-300/20 rounded-tr-2xl" />
          <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-gray-300/20 rounded-bl-2xl" />
          <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-gray-300/20 rounded-br-2xl" />
        </>
      )}
      {children}
    </motion.div>
  );
};

export default Card;