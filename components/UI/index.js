// 🎯 ATOMIC UI COMPONENTS - Following Single Responsibility Principle
// Each component has ONE job and does it well

import styled from 'styled-components';
import { theme, atomicStyles, utils } from '../../styles/theme';

// 🔴 BUTTONS - Single Responsibility
export const Button = styled.button`
  ${atomicStyles.button.base}
  ${props => props.variant === 'primary' ? atomicStyles.button.primary : atomicStyles.button.secondary}
  ${props => props.fullWidth && 'width: 100%;'}
  ${props => props.size === 'large' && `
    padding: ${theme.spacing.md} ${theme.spacing.lg};
    font-size: 1.1rem;
  `}
`;

// 🔴 CARDS - Reusable
export const Card = styled.div`
  ${atomicStyles.card.base}
  ${props => props.hover && atomicStyles.card.hover}
`;

// 🔴 LAYOUT - Consistent
export const Container = styled.div`
  ${atomicStyles.layout.container}
`;

export const Section = styled.section`
  ${atomicStyles.layout.section}
`;

export const Grid = styled.div`
  ${atomicStyles.layout.grid}
  ${props => props.cols && `grid-template-columns: repeat(${props.cols}, 1fr);`}
  ${props => utils.responsive(
    `grid-template-columns: 1fr;`,
    props.cols && `grid-template-columns: repeat(${props.cols}, 1fr);`
  )}
`;

export const Flex = styled.div`
  display: flex;
  ${props => props.center && utils.flexCenter}
  ${props => props.between && utils.flexBetween}
  ${props => props.column && 'flex-direction: column;'}
  ${props => props.gap && `gap: ${theme.spacing[props.gap] || props.gap};`}
  ${props => utils.responsive(
    'flex-direction: column;',
    props.row && 'flex-direction: row;'
  )}
`;

// 🔴 TYPOGRAPHY - Hierarchical
export const Heading = styled.h1`
  ${props => {
    switch(props.level) {
      case 1: return atomicStyles.text.h1;
      case 2: return atomicStyles.text.h2;
      default: return atomicStyles.text.h1;
    }
  }}
  ${props => props.gradient && `
    background: linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.primaryLight});
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  `}
`;

export const Text = styled.p`
  ${atomicStyles.text.body}
  ${props => props.small && atomicStyles.text.small}
  ${props => props.center && 'text-align: center;'}
  margin: 0;
`;

// 🔴 NAVIGATION - Minimal
export const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid ${theme.colors.gray200};
  z-index: 1000;
  padding: ${theme.spacing.sm} 0;
`;

export const NavLink = styled.a`
  color: ${theme.colors.gray700};
  text-decoration: none;
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: ${theme.radius.sm};
  transition: ${theme.transitions.normal};
  font-weight: 500;

  &:hover, &.active {
    background: linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.primaryLight});
    color: white;
    transform: translateY(-1px);
  }
`;

// 🔴 PAGE WRAPPER - DRY Principle
export const Page = styled.div`
  min-height: 100vh;
  background: ${props => props.gradient ? 
    `linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(249, 250, 251, 0.95)), url('${props.bgImage}') center/cover` :
    theme.colors.white
  };
  color: ${theme.colors.gray900};
  font-family: ${theme.fonts.primary};
  padding-top: 80px; /* Account for fixed nav */
`;

// 🔴 HERO SECTION - Reusable
export const Hero = styled.section`
  ${utils.responsive(
    `
      padding: ${theme.spacing.xl} ${theme.spacing.md};
      text-align: center;
    `,
    `
      padding: ${theme.spacing.xxl} ${theme.spacing.md};
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: ${theme.spacing.xl};
      align-items: center;
    `
  )}
  max-width: 1200px;
  margin: 0 auto;
`;

// 🔴 STATS - Reusable Component
export const StatCard = styled.div`
  ${atomicStyles.card.base}
  text-align: center;
  
  .stat-number {
    font-size: 2rem;
    font-weight: 800;
    color: ${theme.colors.primary};
    font-family: ${theme.fonts.heading};
    display: block;
    margin-bottom: ${theme.spacing.xs};
  }
  
  .stat-label {
    font-size: 0.875rem;
    color: ${theme.colors.gray600};
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
`;

// 🔴 FORM ELEMENTS - Consistent
export const Input = styled.input`
  width: 100%;
  padding: ${theme.spacing.sm};
  border: 2px solid ${theme.colors.gray200};
  border-radius: ${theme.radius.sm};
  font-family: ${theme.fonts.primary};
  transition: ${theme.transitions.normal};
  
  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: ${theme.spacing.sm};
  border: 2px solid ${theme.colors.gray200};
  border-radius: ${theme.radius.sm};
  font-family: ${theme.fonts.primary};
  background: white;
  
  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
  }
`;

// 🔴 LOADING & STATES
export const Loading = styled.div`
  ${utils.flexCenter}
  padding: ${theme.spacing.xl};
  color: ${theme.colors.gray600};
`;

export const ErrorMessage = styled.div`
  background: rgba(239, 68, 68, 0.1);
  color: ${theme.colors.danger};
  padding: ${theme.spacing.sm};
  border-radius: ${theme.radius.sm};
  border: 1px solid rgba(239, 68, 68, 0.2);
`;

// 🔴 ADMIN COMPONENTS - Specialized but Minimal
export const AdminWidget = styled(Card)`
  background: linear-gradient(135deg, rgba(220, 38, 38, 0.1), rgba(239, 68, 68, 0.1));
  border: 2px solid rgba(220, 38, 38, 0.3);
  animation: adminPulse 3s infinite ease-in-out;
  
  @keyframes adminPulse {
    0%, 100% { 
      box-shadow: 0 8px 25px rgba(220, 38, 38, 0.2);
      border-color: rgba(220, 38, 38, 0.3);
    }
    50% { 
      box-shadow: 0 12px 35px rgba(220, 38, 38, 0.4);
      border-color: rgba(220, 38, 38, 0.5);
    }
  }
`;

// 🔴 RESPONSIVE IMAGE
export const ResponsiveImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: ${theme.radius.md};
  transition: ${theme.transitions.normal};
  
  &:hover {
    transform: scale(1.05);
  }
`;

// Export everything for easy importing
export * from '../../styles/theme';
