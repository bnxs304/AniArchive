import { createTheme } from '@mui/material/styles'

// Standardized color palette for consistency and accessibility
const colors = {
    primary: {
        main: '#FF6B6B', // Coral red - primary brand color
        light: '#FF8E8E',
        dark: '#E55A5A',
        contrastText: '#FFFFFF'
    },
    secondary: {
        main: '#FECA57', // Golden yellow - secondary brand color
        light: '#FFD93D',
        dark: '#E6B800',
        contrastText: '#000000'
    },
    accent: {
        main: '#667EEA', // Purple blue
        light: '#8B9AFF',
        dark: '#5A6FD8',
        contrastText: '#FFFFFF'
    },
    success: {
        main: '#4CAF50',
        light: '#66BB6A',
        dark: '#388E3C',
        contrastText: '#FFFFFF'
    },
    warning: {
        main: '#FF9800',
        light: '#FFB74D',
        dark: '#F57C00',
        contrastText: '#000000'
    },
    error: {
        main: '#F44336',
        light: '#EF5350',
        dark: '#D32F2F',
        contrastText: '#FFFFFF'
    },
    info: {
        main: '#2196F3',
        light: '#42A5F5',
        dark: '#1976D2',
        contrastText: '#FFFFFF'
    },
    text: {
        primary: '#FFFFFF',
        secondary: 'rgba(255,255,255,0.9)',
        disabled: 'rgba(255,255,255,0.6)',
        hint: 'rgba(255,255,255,0.5)'
    },
    background: {
        default: 'transparent',
        paper: 'rgba(255,255,255,0.15)',
        paperHover: 'rgba(255,255,255,0.2)',
        overlay: 'rgba(255,255,255,0.1)'
    },
    border: {
        light: 'rgba(255,255,255,0.1)',
        medium: 'rgba(255,255,255,0.2)',
        strong: 'rgba(255,255,255,0.3)'
    },
    shadow: {
        light: '0 4px 20px rgba(0,0,0,0.08)',
        medium: '0 8px 25px rgba(0,0,0,0.12)',
        strong: '0 20px 40px rgba(0,0,0,0.15)'
    }
}

const theme = createTheme({
    palette: {
        primary: colors.primary,
        secondary: colors.secondary,
        success: colors.success,
        warning: colors.warning,
        error: colors.error,
        info: colors.info,
        text: colors.text,
        background: colors.background,
        divider: colors.border.light
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 960,
            lg: 1280,
            xl: 1920,
        },
    },
    typography: {
        fontFamily: 'Rubik Vinyl, cursive',
        h6: {
            fontFamily: 'Rubik Vinyl, cursive',
            textTransform: 'uppercase',
            textAlign: 'center',
            fontSize: '5rem',
            color: 'white',
            fontWeight: 'bold',

            '@media (max-width: 950px)': {
                fontSize: '3rem',
            },
            '@media (max-width: 600px)': {
                fontSize: '2rem',
            },
        },
        body1: {
            fontFamily: 'Freeman, sans-serif',
            fontSize: '1.2rem',
            '@media (max-width: 600px)': {
                fontSize: '1rem',
            },
        },
        body2: {
            fontFamily: 'Freeman, sans-serif',
            fontSize: '1.1rem',
            '@media (max-width: 600px)': {
                fontSize: '1rem',
            },
        },
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    backgroundImage: `url('/images/lblue.png')`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center top',
                    backgroundAttachment: 'fixed',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    marginTop: '80px',

                    '@media (max-width: 768px)': {
                        marginTop: '50px',
                        // backgroundPosition: 'center',
                    },
                    '@media (max-width: 600px)': {
                        marginTop: '60px',
                        gap: '5px',
                        backgroundImage: `url('/images/cloudsticker.gif'), url('/images/lblue.png')`,
                        backgroundSize: '100vw, cover',
                        backgroundRepeat: 'repeat, no-repeat',
                        backgroundPosition: 'top center, center top',
                    },
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    border: 'none',
                    boxShadow: 'none',
                    background: 'transparent',
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    background: colors.background.paper,
                    backdropFilter: 'blur(20px)',
                    borderRadius: '20px',
                    border: `1px solid ${colors.border.medium}`,
                    boxShadow: colors.shadow.light,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                        background: colors.background.paperHover,
                        boxShadow: colors.shadow.medium,
                        transform: 'translateY(-2px)',
                    },
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '12px',
                    textTransform: 'none',
                    fontWeight: 600,
                    padding: '12px 24px',
                    fontSize: '1rem',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                        transform: 'translateY(-1px)',
                        boxShadow: colors.shadow.medium,
                    },
                },
                contained: {
                    background: `linear-gradient(135deg, ${colors.primary.main} 0%, ${colors.primary.dark} 100%)`,
                    color: colors.primary.contrastText,
                    '&:hover': {
                        background: `linear-gradient(135deg, ${colors.primary.dark} 0%, ${colors.primary.main} 100%)`,
                    },
                },
                outlined: {
                    borderColor: colors.primary.main,
                    color: colors.primary.main,
                    '&:hover': {
                        borderColor: colors.primary.dark,
                        backgroundColor: `${colors.primary.main}20`,
                    },
                },
            },
        },
        MuiTypography: {
            styleOverrides: {
                h1: {
                    color: colors.text.primary,
                    fontWeight: 900,
                    textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                    background: 'linear-gradient(45deg, #ffffff 30%, #f0f0f0 90%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                },
                h2: {
                    color: colors.text.secondary,
                    fontWeight: 300,
                    textShadow: '1px 1px 2px rgba(0,0,0,0.2)',
                },
                h3: {
                    color: colors.text.primary,
                    fontWeight: 700,
                    textShadow: '1px 1px 2px rgba(0,0,0,0.2)',
                },
                h4: {
                    color: colors.text.primary,
                    fontWeight: 600,
                },
                h5: {
                    color: colors.text.primary,
                    fontWeight: 600,
                },
                h6: {
                    color: colors.primary.main,
                    fontWeight: 600,
                    textShadow: '0 1px 2px rgba(0,0,0,1)',
                },
                body1: {
                    color: colors.text.secondary,
                    lineHeight: 1.7,
                    fontWeight: 400,
                    textShadow: '0 1px 2px rgba(0,0,0,0.1)',
                },
                body2: {
                    color: colors.text.secondary,
                    lineHeight: 1.6,
                    fontWeight: 400,
                },
            },
        },
        MuiAccordion: {
            styleOverrides: {
                root: {
                    background: colors.background.overlay,
                    backdropFilter: 'blur(10px)',
                    border: `1px solid ${colors.border.light}`,
                    borderRadius: '12px',
                    marginBottom: '16px',
                    '&:before': {
                        display: 'none',
                    },
                    '&:hover': {
                        background: colors.background.paperHover,
                    },
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        borderRadius: '12px',
                        backgroundColor: colors.background.overlay,
                        backdropFilter: 'blur(10px)',
                        '& fieldset': {
                            borderColor: colors.border.light,
                        },
                        '&:hover fieldset': {
                            borderColor: colors.border.medium,
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: colors.primary.main,
                        },
                    },
                    '& .MuiInputLabel-root': {
                        color: colors.text.secondary,
                        '&.Mui-focused': {
                            color: colors.primary.main,
                        },
                    },
                    '& .MuiInputBase-input': {
                        color: colors.text.primary,
                    },
                },
            },
        },
        MuiCheckbox: {
            styleOverrides: {
                root: {
                    color: colors.border.medium,
                    '&.Mui-checked': {
                        color: colors.secondary.main,
                    },
                },
            },
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    backgroundColor: colors.background.overlay,
                    color: colors.text.primary,
                    border: `1px solid ${colors.border.light}`,
                    borderRadius: '20px',
                    '&:hover': {
                        backgroundColor: colors.background.paperHover,
                    },
                },
            },
        },
    },
})

export default theme;
export { colors };