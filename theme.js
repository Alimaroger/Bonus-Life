// 🎨 SINGLE SOURCE OF TRUTH - Design System
// Following DRY and Single Responsibility Principles

export const theme = {
  // Colors - Centralized (DRY Principle)
  colors: {
    primary: '#dc2626',
    primaryLight: '#ef4444', 
    primaryDark: '#b91c1c',
    white: '#ffffff',
    gray50: '#f9fafb',
    gray100: '#f3f4f6',
    gray200: '#e5e7eb',
    gray300: '#d1d5db',
    gray600: '#4b5563',
    gray700: '#374151',
    gray900: '#111827',
    success: '#10b981',
    warning: '#f59e0b',
    danger: '#ef4444'
  },

  // Typography - Centralized
  fonts: {
    primary: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    heading: "'Montserrat', sans-serif"
  },

  // Spacing - Consistent Scale
  spacing: {
    xs: '0.5rem',
    sm: '1rem', 
    md: '1.5rem',
    lg: '2rem',
    xl: '3rem',
    xxl: '4rem'
  },

  // Shadows - Reusable
  shadows: {
    sm: '0 2px 4px rgba(0, 0, 0, 0.1)',
    md: '0 4px 15px rgba(220, 38, 38, 0.2)',
    lg: '0 8px 25px rgba(220, 38, 38, 0.3)',
    xl: '0 15px 35px rgba(220, 38, 38, 0.4)'
  },

  // Border Radius - Consistent
  radius: {
    sm: '8px',
    md: '12px', 
    lg: '16px',
    full: '50%'
  },

  // Breakpoints - Mobile First
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px'
  },

  // Transitions - Consistent
  transitions: {
    fast: 'all 0.2s ease',
    normal: 'all 0.3s ease',
    slow: 'all 0.5s ease'
  }
};

// 🎨 ATOMIC COMPONENTS - Reusable Building Blocks
export const atomicStyles = {
  // Buttons - Single Responsibility
  button: {
    base: `
      padding: ${theme.spacing.sm} ${theme.spacing.md};
      border-radius: ${theme.radius.sm};
      font-weight: 600;
      cursor: pointer;
      transition: ${theme.transitions.normal};
      border: none;
      font-family: ${theme.fonts.primary};
    `,
    primary: `
      background: linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.primaryLight});
      color: ${theme.colors.white};
      box-shadow: ${theme.shadows.md};
      &:hover {
        transform: translateY(-2px);
        box-shadow: ${theme.shadows.lg};
      }
    `,
    secondary: `
      background: ${theme.colors.white};
      color: ${theme.colors.gray700};
      border: 2px solid ${theme.colors.gray200};
      &:hover {
        border-color: ${theme.colors.primary};
        transform: translateY(-1px);
      }
    `
  },

  // Cards - Reusable
  card: {
    base: `
      background: ${theme.colors.white};
      border-radius: ${theme.radius.lg};
      box-shadow: ${theme.shadows.sm};
      padding: ${theme.spacing.md};
      transition: ${theme.transitions.normal};
    `,
    hover: `
      &:hover {
        transform: translateY(-4px);
        box-shadow: ${theme.shadows.md};
      }
    `
  },

  // Layout - Consistent
  layout: {
    container: `
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 ${theme.spacing.md};
    `,
    section: `
      padding: ${theme.spacing.xl} 0;
    `,
    grid: `
      display: grid;
      gap: ${theme.spacing.md};
    `
  },

  // Typography - Hierarchical
  text: {
    h1: `
      font-size: 3rem;
      font-weight: 900;
      font-family: ${theme.fonts.heading};
      color: ${theme.colors.gray900};
      line-height: 1.1;
      @media (max-width: ${theme.breakpoints.md}) {
        font-size: 2rem;
      }
    `,
    h2: `
      font-size: 2rem;
      font-weight: 700;
      font-family: ${theme.fonts.heading};
      color: ${theme.colors.gray900};
    `,
    body: `
      font-size: 1rem;
      color: ${theme.colors.gray600};
      line-height: 1.6;
    `,
    small: `
      font-size: 0.875rem;
      color: ${theme.colors.gray600};
    `
  }
};

// 🎨 UTILITY FUNCTIONS - DRY Principle
export const utils = {
  // Responsive helper
  responsive: (mobile, desktop) => `
    ${mobile}
    @media (min-width: ${theme.breakpoints.md}) {
      ${desktop}
    }
  `,

  // Gradient helper
  gradient: (color1, color2) => `
    background: linear-gradient(135deg, ${color1}, ${color2});
  `,

  // Flex helpers
  flexCenter: `
    display: flex;
    align-items: center;
    justify-content: center;
  `,

  flexBetween: `
    display: flex;
    align-items: center;
    justify-content: space-between;
  `,

  // Grid helpers
  gridCols: (cols) => `
    display: grid;
    grid-template-columns: repeat(${cols}, 1fr);
    gap: ${theme.spacing.md};
  `
};

export default theme;