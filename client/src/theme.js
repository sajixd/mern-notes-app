// theme.js - Theme with Dark/Light Mode Support
const getTheme = (isDark) => ({
  colors: {
    // Background
    background: isDark ? '#1a1a2e' : '#f5f7fa',

    // Card colors (adjusted for dark mode)
    cardColors: isDark ? [
      '#3d2645', // Dark Pink
      '#1e3a5f', // Dark Blue
      '#4a4a2e', // Dark Yellow
      '#3a2f5f', // Dark Purple
      '#2e4a3d', // Dark Green
      '#4a3a2e', // Dark Orange
      '#4a2e3d', // Dark Light Pink
      '#2e3a4a', // Dark Light Blue
    ] : [
      '#ffd6e0', // Pink
      '#c9e4ff', // Blue
      '#fff4c9', // Yellow
      '#e4d4ff', // Purple
      '#d4ffea', // Green
      '#ffd4c9', // Orange
      '#ffe4f0', // Light Pink
      '#d4e4ff', // Light Blue
    ],

    // Text
    text: isDark ? '#e4e4e7' : '#2d3748',
    textLight: isDark ? '#a1a1aa' : '#718096',
    textMuted: isDark ? '#71717a' : '#a0aec0',

    // UI Elements
    border: isDark ? '#3f3f46' : '#e2e8f0',
    hover: isDark ? '#27272a' : '#edf2f7',
    white: isDark ? '#18181b' : '#ffffff',
    cardBg: isDark ? '#27272a' : '#ffffff',

    // Actions
    primary: '#667eea',
    danger: '#f56565',
    success: '#48bb78',
  },

  shadows: {
    card: isDark
      ? '0 2px 8px rgba(0, 0, 0, 0.3)'
      : '0 2px 8px rgba(0, 0, 0, 0.08)',
    cardHover: isDark
      ? '0 4px 16px rgba(0, 0, 0, 0.4)'
      : '0 4px 16px rgba(0, 0, 0, 0.12)',
    fab: isDark
      ? '0 4px 12px rgba(102, 126, 234, 0.5)'
      : '0 4px 12px rgba(102, 126, 234, 0.4)',
    modal: isDark
      ? '0 10px 40px rgba(0, 0, 0, 0.5)'
      : '0 10px 40px rgba(0, 0, 0, 0.15)',
  },

  timing: {
    fast: 150,
    normal: 250,
    slow: 350,
    spring: { type: 'spring', stiffness: 260, damping: 20 },
  },

  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 24,
  },

  borderRadius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
  },

  breakpoints: {
    mobile: 600,
    tablet: 960,
    desktop: 1280,
  },

  maxWidth: 1200,
});

export default getTheme;
