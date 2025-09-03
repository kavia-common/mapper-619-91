import React from 'react';
import clsx from 'clsx';

type BadgeColor = 'gray' | 'primary' | 'success' | 'warning' | 'error' | 'info';

interface BadgeProps {
  color?: BadgeColor;
  children: React.ReactNode;
  className?: string;
}

const colorClasses: Record<BadgeColor, string> = {
  gray: 'badge-gray',
  primary: 'badge-info', // Re-using info for primary
  success: 'badge-success',
  warning: 'badge-warning',
  error: 'badge-error',
  info: 'badge-info',
};

// PUBLIC_INTERFACE
const Badge: React.FC<BadgeProps> = ({ color = 'gray', children, className }) => {
  return (
    <span
      className={clsx(
        'badge',
        colorClasses[color],
        className,
      )}
    >
      {children}
    </span>
  );
};

export default Badge;
