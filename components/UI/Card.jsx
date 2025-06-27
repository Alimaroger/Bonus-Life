import React from 'react';

const Card = ({ 
  children, 
  className = '', 
  variant = 'default', 
  hover = true,
  padding = 'default',
  ...props 
}) => {
  const cardClasses = [
    'ui-card',
    `ui-card--${variant}`,
    `ui-card--padding-${padding}`,
    hover ? 'ui-card--hover' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={cardClasses} {...props}>
      {children}
    </div>
  );
};

export default Card;
