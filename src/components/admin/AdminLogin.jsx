import React, { useState } from 'react'
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Alert,
  CircularProgress,
  Card,
  CardContent
} from '@mui/material'
import { adminLogin } from '../../config/firebase'

const AdminLogin = ({ onLogin }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const result = await adminLogin(email, password)
      
      if (result.success) {
        // Store authentication in session storage for persistence
        sessionStorage.setItem('adminAuthenticated', 'true')
        onLogin(true)
      } else {
        setError(result.error || 'Invalid credentials. Please try again.')
      }
    } catch (error) {
      console.error('Login error:', error)
      setError('An error occurred during login. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box sx={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh',
      background: 'transparent'
    }}>
      <Card sx={{ 
        maxWidth: '400px', 
        width: '100%', 
        mx: 2,
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
        borderRadius: '20px'
      }}>
        <CardContent sx={{ p: 4 }}>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography variant="h4" sx={{ 
              fontWeight: 'bold', 
              color: '#333',
              mb: 1
            }}>
              🔐 Admin Access
            </Typography>
            <Typography variant="body1" sx={{ 
              color: '#666',
              fontSize: '1.1rem'
            }}>
              Enter your admin credentials to continue
            </Typography>
          </Box>

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              sx={{
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  borderRadius: '10px',
                  '& fieldset': {
                    borderColor: 'rgba(0, 0, 0, 0.2)',
                  },
                  '&:hover fieldset': {
                    borderColor: 'rgba(0, 0, 0, 0.4)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#667eea',
                  },
                },
                '& .MuiInputLabel-root': {
                  '&.Mui-focused': {
                    color: '#667eea',
                  },
                },
              }}
            />

            <TextField
              fullWidth
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              sx={{
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  borderRadius: '10px',
                  '& fieldset': {
                    borderColor: 'rgba(0, 0, 0, 0.2)',
                  },
                  '&:hover fieldset': {
                    borderColor: 'rgba(0, 0, 0, 0.4)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#667eea',
                  },
                },
                '& .MuiInputLabel-root': {
                  '&.Mui-focused': {
                    color: '#667eea',
                  },
                },
              }}
            />

            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading || !email.trim() || !password.trim()}
              sx={{
                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                color: 'white',
                borderRadius: '10px',
                padding: '12px',
                textTransform: 'none',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  background: 'linear-gradient(135deg, #764ba2, #667eea)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 20px rgba(102, 126, 234, 0.6)',
                },
                '&:disabled': {
                  background: 'rgba(0, 0, 0, 0.12)',
                  color: 'rgba(0, 0, 0, 0.38)',
                },
              }}
            >
              {loading ? (
                <CircularProgress size={24} sx={{ color: 'white' }} />
              ) : (
                'Access Admin Panel'
              )}
            </Button>
          </form>

          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Typography variant="body2" sx={{ color: '#999' }}>
              Contact the administrator for credentials
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
}

export default AdminLogin 