import { createTheme } from '@mui/material/styles'

// Simplified color palette to avoid initialization issues
const colors = {
    primary: {
        main: '#FF6B6B',
        light: '#FF8E8E',
        dark: '#E55A5A',
        contrastText: '#FFFFFF'
    },
    secondary: {
        main: '#FECA57',
        light: '#FFD93D',
        dark: '#E6B800',
        contrastText: '#000000'
    },
    text: {
        primary: '#FFFFFF',
        secondary: 'rgba(255,255,255,0.9)',
        disabled: 'rgba(255,255,255,0.6)'
    },
    background: {
        default: 'transparent',
        paper: 'rgba(255,255,255,0.15)'
    },
    info: {
        main: '#4A90E2',
        light: '#6BA3E8',
        dark: '#3A7BC8',
        contrastText: '#FFFFFF'
    }
}

const theme = createTheme({
    palette: {
        primary: colors.primary,
        secondary: colors.secondary,
        text: colors.text,
        background: colors.background,
        info: colors.info
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
    },
})

export default theme;
export { colors };