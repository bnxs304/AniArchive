import { createTheme } from '@mui/material/styles'
import blueBackground from '../images/lblue.png'
import cloudSticker from '../images/cloudsticker.gif'

const theme = createTheme({
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
                    backgroundImage: `url(${blueBackground})`,
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
                        backgroundImage: `url(${cloudSticker}), url(${blueBackground})`,
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
    },
})

export default theme;