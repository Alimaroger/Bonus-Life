import styled, { keyframes, createGlobalStyle } from 'styled-components';

// 🎯 BONUS LIFE DESIGN SYSTEM - Modern Fitness App
// Complete responsive redesign for all devices

// 🌈 GLOBAL STYLES
export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    line-height: 1.6;
    color: #1a202c;
    background: #f7fafc;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
  }

  html {
    scroll-behavior: smooth;
  }
`;

// 🎨 ANIMATIONS
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
`;

const shimmer = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`;

const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
`;

const slideInRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

// 🌈 DARK PURPLE THEME COLOR SYSTEM
export const colors = {
  primary: {
    50: '#f3f0ff',
    100: '#ede9fe',
    200: '#ddd6fe',
    300: '#c4b5fd',
    400: '#a78bfa',
    500: '#8b5cf6',
    600: '#7c3aed',
    700: '#6d28d9',
    800: '#5b21b6',
    900: '#4c1d95',
  },
  secondary: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
  },
  purple: {
    50: '#faf5ff',
    100: '#f3e8ff',
    200: '#e9d5ff',
    300: '#d8b4fe',
    400: '#c084fc',
    500: '#a855f7',
    600: '#9333ea',
    700: '#7c2d12',
    800: '#6b21a8',
    900: '#581c87',
  },
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },
  success: {
    50: '#f0fdf4',
    500: '#22c55e',
    600: '#16a34a',
  },
  warning: {
    50: '#fffbeb',
    500: '#f59e0b',
    600: '#d97706',
  },
  error: {
    50: '#fef2f2',
    500: '#ef4444',
    600: '#dc2626',
  },
  white: '#ffffff',
  black: '#000000',
};

// 📱 RESPONSIVE BREAKPOINTS
export const breakpoints = {
  xs: '320px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

// 🎨 TYPOGRAPHY SYSTEM
export const fonts = {
  heading: "'Montserrat', 'Inter', system-ui, sans-serif",
  body: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  mono: "'JetBrains Mono', 'Fira Code', monospace",
};

export const fontSizes = {
  xs: '0.75rem',    // 12px
  sm: '0.875rem',   // 14px
  base: '1rem',     // 16px
  lg: '1.125rem',   // 18px
  xl: '1.25rem',    // 20px
  '2xl': '1.5rem',  // 24px
  '3xl': '1.875rem', // 30px
  '4xl': '2.25rem', // 36px
  '5xl': '3rem',    // 48px
  '6xl': '3.75rem', // 60px
  '7xl': '4.5rem',  // 72px
};

// 🏗️ FITNESS APP LAYOUT COMPONENTS - DARK PURPLE THEME
export const Page = styled.div`
  min-height: 100vh;
  background:
    linear-gradient(135deg, #1a1a2e 0%, #16213e 25%, #0f3460 50%, #533483 75%, #7209b7 100%);
  position: relative;
  overflow-x: hidden;
  font-family: ${fonts.body};

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background:
      radial-gradient(circle at 20% 20%, rgba(114, 9, 183, 0.2) 0%, transparent 50%),
      radial-gradient(circle at 80% 80%, rgba(83, 52, 131, 0.15) 0%, transparent 50%),
      radial-gradient(circle at 40% 60%, rgba(22, 33, 62, 0.3) 0%, transparent 50%);
    pointer-events: none;
    animation: ${pulse} 8s ease-in-out infinite;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"><g fill="none" stroke="rgba(114,9,183,0.1)" stroke-width="1"><circle cx="200" cy="200" r="100"/><circle cx="800" cy="300" r="150"/><circle cx="400" cy="700" r="80"/><circle cx="700" cy="800" r="120"/></g></svg>');
    opacity: 0.4;
    animation: ${float} 20s ease-in-out infinite;
    pointer-events: none;
  }
`;

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  position: relative;
  z-index: 1;

  @media (min-width: ${breakpoints.sm}) {
    padding: 0 1.5rem;
  }

  @media (min-width: ${breakpoints.md}) {
    padding: 0 2rem;
  }

  @media (min-width: ${breakpoints.lg}) {
    padding: 0 2.5rem;
  }
`;

export const ContainerLg = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 1rem;
  position: relative;
  z-index: 1;

  @media (min-width: ${breakpoints.sm}) {
    padding: 0 1.5rem;
  }

  @media (min-width: ${breakpoints.md}) {
    padding: 0 2rem;
  }

  @media (min-width: ${breakpoints.lg}) {
    padding: 0 3rem;
  }
`;

export const Section = styled.section`
  padding: 4rem 0;
  position: relative;

  @media (max-width: ${breakpoints.md}) {
    padding: 2rem 0;
  }
`;

export const Grid = styled.div`
  display: grid;
  gap: 2rem;

  ${props => props.cols === 1 && `
    grid-template-columns: 1fr;
  `}

  ${props => props.cols === 2 && `
    grid-template-columns: 1fr;

    @media (min-width: ${breakpoints.md}) {
      grid-template-columns: repeat(2, 1fr);
    }
  `}

  ${props => props.cols === 3 && `
    grid-template-columns: 1fr;

    @media (min-width: ${breakpoints.md}) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (min-width: ${breakpoints.lg}) {
      grid-template-columns: repeat(3, 1fr);
    }
  `}

  ${props => props.cols === 4 && `
    grid-template-columns: 1fr;

    @media (min-width: ${breakpoints.sm}) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (min-width: ${breakpoints.lg}) {
      grid-template-columns: repeat(4, 1fr);
    }
  `}

  @media (max-width: ${breakpoints.sm}) {
    gap: 1rem;
  }
`;

// 🧭 FITNESS APP NAVIGATION SYSTEM
export const Nav = styled.nav`
  background: rgba(15, 15, 35, 0.95);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(233, 69, 96, 0.3);
  padding: 1rem 0;
  position: sticky;
  top: 0;
  z-index: 100;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);

  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, #e94560, transparent);
  }

  @media (max-width: ${breakpoints.md}) {
    padding: 0.75rem 0;
  }
`;

export const NavContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: ${breakpoints.md}) {
    padding: 0 1rem;
  }
`;

export const NavLogo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

export const LogoIcon = styled.div`
  width: 3rem;
  height: 3rem;
  background: linear-gradient(135deg, #e94560 0%, #ff6b6b 50%, #ffa726 100%);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: bold;
  color: ${colors.white};
  box-shadow:
    0 8px 25px rgba(233, 69, 96, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  animation: ${float} 3s ease-in-out infinite;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(135deg, #e94560, #ff6b6b, #ffa726);
    border-radius: 18px;
    z-index: -1;
    opacity: 0.7;
    filter: blur(8px);
  }

  @media (max-width: ${breakpoints.md}) {
    width: 2.5rem;
    height: 2.5rem;
    font-size: 1.25rem;
  }
`;

export const LogoText = styled.span`
  font-family: ${fonts.heading};
  font-weight: 900;
  font-size: 1.75rem;
  background: linear-gradient(135deg, #ffffff 0%, #a855f7 50%, #c084fc 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 0 30px rgba(168, 85, 247, 0.5);
  letter-spacing: -0.5px;

  @media (max-width: ${breakpoints.md}) {
    font-size: 1.5rem;
  }
`;

export const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;

  @media (max-width: ${breakpoints.md}) {
    gap: 1rem;
  }

  @media (max-width: ${breakpoints.sm}) {
    gap: 0.5rem;
  }
`;

export const NavLink = styled.button`
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  padding: 0.75rem 1.25rem;
  border-radius: 12px;
  transition: all 0.3s ease;
  position: relative;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(233, 69, 96, 0.2), rgba(255, 107, 107, 0.1));
    border-radius: 12px;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    color: #ffffff;
    transform: translateY(-2px);
    text-shadow: 0 0 10px rgba(233, 69, 96, 0.8);

    &::before {
      opacity: 1;
    }
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: ${breakpoints.md}) {
    padding: 0.5rem 0.75rem;
    font-size: 0.875rem;
  }
`;

export const NavButton = styled.button`
  background: linear-gradient(135deg, ${colors.primary[600]} 0%, ${colors.primary[700]} 100%);
  color: ${colors.white};
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 12px;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(220, 38, 38, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(220, 38, 38, 0.4);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: ${breakpoints.md}) {
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
  }
`;

// 🎨 MODERN BUTTON SYSTEM
export const Button = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.875rem 2rem;
  border-radius: 12px;
  font-weight: 600;
  text-decoration: none;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;
  font-family: ${fonts.body};
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transition: left 0.5s;
  }

  &:hover::before {
    left: 100%;
  }

  @media (max-width: ${breakpoints.md}) {
    padding: 0.75rem 1.5rem;
    font-size: 0.95rem;
  }
`;

export const PrimaryButton = styled(Button)`
  background: linear-gradient(135deg, ${colors.primary[600]} 0%, ${colors.primary[700]} 100%);
  color: ${colors.white};
  box-shadow: 0 4px 15px rgba(114, 9, 183, 0.4);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(114, 9, 183, 0.6);
    background: linear-gradient(135deg, ${colors.primary[500]} 0%, ${colors.primary[600]} 100%);
  }

  &:active {
    transform: translateY(-1px);
  }
`;

export const SecondaryButton = styled(Button)`
  background: rgba(26, 26, 46, 0.8);
  color: ${colors.white};
  border: 2px solid rgba(114, 9, 183, 0.4);
  backdrop-filter: blur(10px);

  &:hover {
    background: rgba(26, 26, 46, 0.95);
    border-color: ${colors.primary[500]};
    color: ${colors.primary[300]};
    transform: translateY(-2px);
  }
`;

export const OutlineButton = styled(Button)`
  background: transparent;
  color: ${colors.primary[400]};
  border: 2px solid ${colors.primary[500]};

  &:hover {
    background: ${colors.primary[600]};
    color: ${colors.white};
    transform: translateY(-2px);
  }
`;

// 🃏 MODERN CARD SYSTEM
export const Card = styled.div`
  background: rgba(26, 26, 46, 0.85);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 2rem;
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.4),
    0 4px 16px rgba(114, 9, 183, 0.2);
  border: 1px solid rgba(114, 9, 183, 0.3);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  color: white;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, ${colors.primary[600]}, ${colors.primary[500]});
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow:
      0 20px 40px rgba(0, 0, 0, 0.5),
      0 8px 24px rgba(114, 9, 183, 0.4);
    background: rgba(26, 26, 46, 0.95);
    border-color: rgba(114, 9, 183, 0.5);
  }

  @media (max-width: ${breakpoints.md}) {
    padding: 1.5rem;
    border-radius: 16px;
  }
`;

export const StatsCard = styled(Card)`
  text-align: center;
  background: linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.9) 100%);

  &:hover {
    transform: translateY(-8px) scale(1.02);
  }
`;

export const FeatureCard = styled(Card)`
  text-align: center;

  &:hover {
    transform: translateY(-10px);

    .icon {
      transform: scale(1.1) rotate(5deg);
    }
  }
`;

export const DashboardCard = styled(Card)`
  background: linear-gradient(135deg,
    rgba(255, 255, 255, 0.95) 0%,
    rgba(255, 255, 255, 0.85) 100%
  );

  &.featured {
    background: linear-gradient(135deg,
      ${colors.primary[600]} 0%,
      ${colors.primary[700]} 100%
    );
    color: ${colors.white};

    &::before {
      background: linear-gradient(90deg, rgba(255,255,255,0.3), rgba(255,255,255,0.1));
    }
  }
`;

// ContainerLg already defined above - removed duplicate

// Hero Section
export const Hero = styled.div`
  text-align: center;
  padding: 5rem 0 4rem;
`;

export const HeroTitle = styled.h1`
  font-family: ${fonts.heading};
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 900;
  color: ${colors.white};
  line-height: 1.1;
  margin-bottom: 1.5rem;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
`;

export const HeroSubtitle = styled.p`
  font-size: 1.125rem;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.7;
  max-width: 42rem;
  margin: 0 auto 3rem;
`;

export const HeroButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 5rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    
    ${Button} {
      width: 100%;
      max-width: 300px;
    }
  }
`;

// Card already defined above - removed duplicate

export const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const FeatureIcon = styled.div`
  width: 4rem;
  height: 4rem;
  background: ${colors.red[100]};
  border-radius: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  font-size: 1.5rem;
`;

export const FeatureTitle = styled.h3`
  font-family: ${fonts.heading};
  font-size: 1.25rem;
  font-weight: 700;
  color: ${colors.white};
  margin-bottom: 0.75rem;
`;

export const FeatureText = styled.p`
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.875rem;
  line-height: 1.6;
`;

// Stats Section
export const StatsSection = styled.div`
  background: ${colors.red[600]};
  border-radius: 1.5rem;
  padding: 2rem;
  color: ${colors.white};
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 2rem;
`;

export const StatItem = styled.div`
  text-align: center;
  padding: 2rem 1.5rem;
  background:
    linear-gradient(135deg, rgba(233, 69, 96, 0.2) 0%, rgba(15, 52, 96, 0.15) 100%);
  border-radius: 20px;
  backdrop-filter: blur(20px);
  border: 2px solid rgba(233, 69, 96, 0.3);
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
    transition: left 0.6s ease;
  }

  &:hover {
    transform: translateY(-8px) scale(1.02);
    background: linear-gradient(135deg, rgba(233, 69, 96, 0.3) 0%, rgba(15, 52, 96, 0.2) 100%);
    box-shadow: 0 20px 40px rgba(233, 69, 96, 0.3);

    &::before {
      left: 100%;
    }
  }

  @media (max-width: ${breakpoints.md}) {
    padding: 1.5rem 1rem;
  }
`;

export const StatValue = styled.div`
  font-family: ${fonts.heading};
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 900;
  background: linear-gradient(135deg, #ffffff 0%, #e94560 50%, #ff6b6b 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.75rem;
  text-shadow: 0 4px 20px rgba(233, 69, 96, 0.3);
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 50%;
    transform: translateX(-50%);
    width: 40px;
    height: 2px;
    background: linear-gradient(90deg, #e94560, #ff6b6b);
    border-radius: 1px;
  }
`;

export const StatLabel = styled.div`
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-top: 0.5rem;
`;

// Form Elements
export const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

export const FormLabel = styled.label`
  display: block;
  font-weight: 600;
  color: ${colors.gray[900]};
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
`;

export const FormInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid ${colors.gray[300]};
  border-radius: 0.75rem;
  font-size: 1rem;
  color: ${colors.gray[900]};
  transition: all 0.3s ease;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: ${colors.red[500]};
    box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.1);
  }
`;

// Alert
export const Alert = styled.div`
  padding: 1rem;
  border-radius: 0.75rem;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const AlertError = styled(Alert)`
  background: ${colors.red[50]};
  border: 1px solid ${colors.red[100]};
  color: ${colors.red[700]};
`;

// Utility
export const TextCenter = styled.div`
  text-align: center;
`;

// 📊 FITNESS DASHBOARD COMPONENTS
export const DashboardWelcome = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  background:
    linear-gradient(135deg, rgba(233, 69, 96, 0.15) 0%, rgba(15, 52, 96, 0.1) 100%),
    url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="hexagon" width="20" height="20" patternUnits="userSpaceOnUse"><polygon points="10,2 18,7 18,13 10,18 2,13 2,7" fill="none" stroke="rgba(233,69,96,0.1)" stroke-width="0.5"/></pattern></defs><rect width="100" height="100" fill="url(%23hexagon)"/></svg>');
  border-radius: 32px;
  margin-bottom: 3rem;
  backdrop-filter: blur(30px);
  border: 2px solid rgba(233, 69, 96, 0.3);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #e94560, #ff6b6b, #ffa726, #ff6b6b, #e94560);
    background-size: 200% 100%;
    animation: ${shimmer} 3s linear infinite;
  }

  &::after {
    content: '💪';
    position: absolute;
    top: 2rem;
    right: 2rem;
    font-size: 3rem;
    opacity: 0.1;
    animation: ${pulse} 4s ease-in-out infinite;
  }

  @media (max-width: ${breakpoints.md}) {
    padding: 2.5rem 1.5rem;
    margin-bottom: 2rem;
  }
`;

export const WelcomeTitle = styled.h1`
  font-family: ${fonts.heading};
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 900;
  background: linear-gradient(135deg, #ffffff 0%, #a855f7 50%, #c084fc 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1.5rem;
  text-shadow: 0 4px 20px rgba(168, 85, 247, 0.4);
  letter-spacing: -1px;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 4px;
    background: linear-gradient(90deg, #a855f7, #c084fc);
    border-radius: 2px;
  }
`;

export const WelcomeSubtitle = styled.p`
  font-size: clamp(1.125rem, 3vw, 1.5rem);
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 2.5rem;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  font-weight: 400;
  line-height: 1.6;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
`;

// Stats components already defined above - removed duplicates

export const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: rgba(255,255,255,0.2);
  border-radius: 4px;
  overflow: hidden;
  margin: 1rem 0;
`;

export const ProgressFill = styled.div`
  height: 100%;
  background: linear-gradient(90deg, ${colors.primary[500]} 0%, ${colors.secondary[500]} 100%);
  border-radius: 4px;
  transition: width 0.8s ease;
  width: ${props => props.percentage || 0}%;
`;

export const ErrorMessage = styled.div`
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.3);
  color: ${colors.error[600]};
  padding: 1rem 1.5rem;
  border-radius: 12px;
  margin: 1rem 0;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  backdrop-filter: blur(10px);

  .icon {
    font-size: 1.25rem;
  }
`;

export const LoadingSpinner = styled.div`
  width: 40px;
  height: 40px;
  border: 3px solid rgba(255,255,255,0.3);
  border-top: 3px solid ${colors.primary[600]};
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 2rem auto;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

export const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  &.success {
    background: ${colors.success[50]};
    color: ${colors.success[600]};
  }

  &.warning {
    background: ${colors.warning[50]};
    color: ${colors.warning[600]};
  }

  &.error {
    background: ${colors.error[50]};
    color: ${colors.error[600]};
  }

  &.primary {
    background: ${colors.primary[50]};
    color: ${colors.primary[600]};
  }
`;

export const Flex = styled.div`
  display: flex;
`;

export const FlexCenter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const FlexBetween = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
