import React, { useState, useEffect } from 'react'
import {
  Box,
  Typography,
  Button,
  Paper,
  Alert,
  CircularProgress,
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  Divider
} from '@mui/material'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../config/firebase'

const RaffleDrawer = () => {
  const [rsvps, setRsvps] = useState([])
  const [loading, setLoading] = useState(false)
  const [winners, setWinners] = useState([])
  const [drawing, setDrawing] = useState(false)
  const [showWinners, setShowWinners] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchRSVPs()
  }, [])

  const fetchRSVPs = async () => {
    try {
      setLoading(true)
      const querySnapshot = await getDocs(collection(db, 'rsvps'))
      const rsvpData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        timestamp: doc.data().timestamp?.toDate?.() || new Date(doc.data().timestamp)
      }))
      setRsvps(rsvpData)
    } catch (error) {
      console.error('Error fetching RSVPs:', error)
      setError('Failed to load RSVP data')
    } finally {
      setLoading(false)
    }
  }

  const drawWinners = (count = 1) => {
    if (rsvps.length === 0) {
      setError('No RSVPs available for drawing')
      return
    }

    setDrawing(true)
    setError('')

    // Simulate drawing animation
    setTimeout(() => {
      const shuffled = [...rsvps].sort(() => 0.5 - Math.random())
      const selectedWinners = shuffled.slice(0, count)
      setWinners(selectedWinners)
      setDrawing(false)
      setShowWinners(true)
    }, 2000)
  }

  const drawMultipleWinners = () => {
    const count = Math.min(3, rsvps.length) // Draw up to 3 winners
    drawWinners(count)
  }

  const resetWinners = () => {
    setWinners([])
    setShowWinners(false)
  }

  const exportWinners = () => {
    const headers = ['Email', 'Raffle Code', 'Timestamp', 'Event Title']
    const csvContent = [
      headers.join(','),
      ...winners.map(winner => [
        winner.email,
        winner.raffleCode,
        winner.timestamp.toLocaleString(),
        winner.eventTitle
      ].join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `raffle-winners-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Box sx={{ p: 3, maxWidth: '800px', margin: '0 auto' }}>
      <Typography variant="h4" sx={{ mb: 3, color: 'white', textAlign: 'center' }}>
        Raffle Drawing
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Card sx={{ mb: 3, backgroundColor: 'rgba(107, 181, 255, 0.2)', 
        borderRadius: '20px',
      }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2, textAlign: 'center' }}>
            Total RSVPs: {rsvps.length}
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              onClick={() => drawWinners(1)}
              disabled={drawing || rsvps.length === 0}
              sx={{
                background: 'linear-gradient(135deg, #4CAF50, #45a049)',
                color: 'white',
                '&:hover': {
                  background: 'linear-gradient(135deg, #45a049, #4CAF50)',
                },
                '&:disabled': {
                  background: 'rgba(0, 0, 0, 0.12)',
                },
              }}
            >
              {drawing ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Draw 1 Winner'}
            </Button>
            
            <Button
              variant="contained"
              onClick={drawMultipleWinners}
              disabled={drawing || rsvps.length === 0}
              sx={{
                background: 'linear-gradient(135deg, #2196F3, #1976D2)',
                color: 'white',
                '&:hover': {
                  background: 'linear-gradient(135deg, #1976D2, #2196F3)',
                },
                '&:disabled': {
                  background: 'rgba(0, 0, 0, 0.12)',
                },
              }}
            >
              {drawing ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Draw 3 Winners'}
            </Button>
            
            <Button
              variant="outlined"
              onClick={fetchRSVPs}
              disabled={drawing}
              sx={{
                borderColor: '#9C27B0',
                color: '#9C27B0',
                '&:hover': {
                  borderColor: '#7B1FA2',
                  backgroundColor: 'rgba(156, 39, 176, 0.04)',
                },
              }}
            >
              Refresh Data
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Winners Dialog */}
      <Dialog
        open={showWinners}
        onClose={() => setShowWinners(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle sx={{ textAlign: 'center', background: 'linear-gradient(135deg, #4CAF50, #45a049)', color: 'white', borderRadius: '20px' }}>
          Raffle Winners!
        </DialogTitle>
        <DialogContent>
          <List>
            {winners.map((winner, index) => (
              <React.Fragment key={winner.id}>
                <ListItem>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', gap: 2 }}>
                        <Chip 
                          label={`Winner ${index + 1}`} 
                          color="success" 
                          size="small"
                        />
                        <Typography fontFamily="Rubik Vinyl" fontSize="2rem" color="black">
                          {winner.email}
                        </Typography>
                      </Box>
                    }
                    secondary={
                      <Box sx={{ mt: 1 }}>
                        <Typography variant="body2" color="text.secondary">
                          Raffle Code: <strong>{winner.raffleCode}</strong>
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          RSVP Date: {winner.timestamp.toLocaleString()}
                        </Typography>
                      </Box>
                    }
                  />
                </ListItem>
                {index < winners.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        </DialogContent>
        <DialogActions sx={{ p: 3, gap: 2 }}>
          <Button
            onClick={exportWinners}
            variant="contained"
            sx={{
              background: 'linear-gradient(135deg, #FF9800, #F57C00)',
              color: 'white',
              '&:hover': {
                background: 'linear-gradient(135deg, #F57C00, #FF9800)',
              },
            }}
          >
            Export Winners
          </Button>
          <Button
            onClick={resetWinners}
            variant="outlined"
            color="primary"
          >
            Draw Again
          </Button>
          <Button
            onClick={() => setShowWinners(false)}
            variant="outlined"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Instructions */}
      <Paper sx={{ p: 3, backgroundColor: 'rgba(107, 181, 255, 0.2)', borderRadius: '20px' }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          How to Use:
        </Typography>
        <Typography variant="body2" sx={{ mb: 1 }}>
          1. Click "Draw 1 Winner" to randomly select one winner from all RSVPs
        </Typography>
        <Typography variant="body2" sx={{ mb: 1 }}>
          2. Click "Draw 3 Winners" to randomly select up to 3 winners
        </Typography>
        <Typography variant="body2" sx={{ mb: 1 }}>
          3. Winners are selected completely randomly using JavaScript's Math.random()
        </Typography>
        <Typography variant="body2" sx={{ mb: 1 }}>
          4. You can export the winners list to CSV for record keeping
        </Typography>
        <Typography variant="body2" sx={{ mb: 1 }}>
          5. Use "Draw Again" to perform another drawing
        </Typography>
      </Paper>
    </Box>
  )
}

export default RaffleDrawer 