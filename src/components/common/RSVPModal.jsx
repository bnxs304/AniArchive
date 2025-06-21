import React, { useState } from 'react'
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
  Paper,
  IconButton
} from '@mui/material'
import {
  validateEmail,
  checkExistingRSVP,
  addRSVP,
  sendConfirmationEmail
} from '../../services/rsvpService'

const RSVPModal = ({ open, onClose }) => {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })
  const [raffleCode, setRaffleCode] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage({ type: '', text: '' })

    try {
      // Validate email
      if (!validateEmail(email)) {
        setMessage({ type: 'error', text: 'Please enter a valid email address' })
        setLoading(false)
        return
      }

      // Check if email already exists
      const alreadyRSVPed = await checkExistingRSVP(email)
      if (alreadyRSVPed) {
        setMessage({ type: 'warning', text: 'You have already RSVPed for this event!' })
        setLoading(false)
        return
      }

      // Add RSVP to database
      const result = await addRSVP(email)
      
      // Send confirmation email
      await sendConfirmationEmail(email, result.raffleCode)
      
      setRaffleCode(result.raffleCode)
      setMessage({ 
        type: 'success', 
        text: `Thank you! You are now entered in our giveaway. Your raffle code is: ${result.raffleCode}` 
      })
      
      // Clear form
      setEmail('')
      
    } catch (error) {
      console.error('RSVP error:', error)
      setMessage({ 
        type: 'error', 
        text: 'An error occurred. Please try again later.' 
      })
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    setEmail('')
    setMessage({ type: '', text: '' })
    setRaffleCode('')
    onClose()
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
    >
      <Paper
        sx={{
          position: 'relative',
          background: 'rgba(0, 0, 0, 0.9)',
          borderRadius: '20px',
          padding: { xs: '20px', md: '30px' },
          maxWidth: '500px',
          width: '100%',
          border: '2px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
        }}
      >
        <IconButton
          onClick={handleClose}
          sx={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            color: 'white',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
            },
            zIndex: 10,
          }}
        >
          ✕
        </IconButton>

        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Typography
            variant="h4"
            sx={{
              color: 'white',
              fontWeight: 'bold',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)',
              marginBottom: '10px',
              fontSize: { xs: '1.5rem', md: '2rem' },
            }}
          >
            RSVP for AniArchive Coventry
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'rgba(255, 255, 255, 0.8)',
              fontSize: { xs: '0.9rem', md: '1rem' },
            }}
          >
            Enter your email to RSVP and get a raffle ticket for our giveaway!
          </Typography>
        </Box>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            sx={{
              mb: 3,
              '& .MuiOutlinedInput-root': {
                color: 'white',
                '& fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.3)',
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.5)',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#FF6B6B',
                },
              },
              '& .MuiInputLabel-root': {
                color: 'rgba(255, 255, 255, 0.7)',
                '&.Mui-focused': {
                  color: '#FF6B6B',
                },
              },
            }}
          />

          {message.text && (
            <Alert
              severity={message.type}
              sx={{
                mb: 3,
                backgroundColor: message.type === 'success' 
                  ? 'rgba(76, 175, 80, 0.2)' 
                  : message.type === 'warning'
                  ? 'rgba(255, 152, 0, 0.2)'
                  : 'rgba(244, 67, 54, 0.2)',
                color: 'white',
                border: `1px solid ${
                  message.type === 'success' 
                    ? 'rgba(76, 175, 80, 0.5)' 
                    : message.type === 'warning'
                    ? 'rgba(255, 152, 0, 0.5)'
                    : 'rgba(244, 67, 54, 0.5)'
                }`,
              }}
            >
              {message.text}
            </Alert>
          )}

          {raffleCode && (
            <Box
              sx={{
                textAlign: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                margin: 'auto',
                mb: 3,
                p: 2,
                backgroundColor: 'rgba(76, 175, 80, 0.1)',
                borderRadius: '10px',
                border: '1px solid rgba(76, 175, 80, 0.3)',
              }}
            >
              <Typography
                sx={{
                  fontSize: { xs: '1.2rem', md: '1.5rem' },
                  fontFamily: 'Rubik Vinyl',
                  color: '#4CAF50',
                  fontWeight: 'bold',
                  marginBottom: '5px',
                }}
              >
                🎫 Your Raffle Code:
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  color: 'white',
                  fontWeight: 'bold',
                  fontFamily: 'monospace',
                  letterSpacing: '2px',
                }}
              >
                {raffleCode}
              </Typography>
            </Box>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading || !email.trim()}
            sx={{
              background: 'linear-gradient(135deg, #FF6B6B, #FF8E8E)',
              color: 'white',
              fontFamily: 'Freeman',
              borderRadius: '25px',
              padding: '12px 30px',
              textTransform: 'uppercase',
              boxShadow: '0 4px 15px rgba(255, 107, 107, 0.5)',
              transition: 'all 0.3s ease',
              fontSize: { xs: '0.9rem', md: '1rem' },
              '&:hover': {
                background: 'linear-gradient(135deg, #FF4757, #FF6B6B)',
                transform: 'translateY(-2px)',
                boxShadow: '0 6px 20px rgba(255, 107, 107, 0.7)',
              },
              '&:disabled': {
                background: 'rgba(255, 255, 255, 0.1)',
                color: 'rgba(255, 255, 255, 0.5)',
              },
            }}
          >
            {loading ? (
              <CircularProgress size={24} sx={{ color: 'white' }} />
            ) : (
              'RSVP Now'
            )}
          </Button>
        </form>
      </Paper>
    </Modal>
  )
}

export default RSVPModal 