import React, { useState, useEffect, useRef } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import { Box, Button, Typography, Alert, CircularProgress } from '@mui/material'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { colors } from '../../styles/theme'

// Fix for default markers in react-leaflet
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

// Custom icons
const createCustomIcon = (color, iconUrl) => {
  return L.divIcon({
    className: 'custom-div-icon',
    html: `<div style="
      background-color: ${color};
      width: 30px;
      height: 30px;
      border-radius: 50% 50% 50% 0;
      border: 3px solid white;
      box-shadow: 0 2px 6px rgba(0,0,0,0.3);
      transform: rotate(-45deg);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      color: white;
      font-weight: bold;
    ">${iconUrl || ''}</div>`,
    iconSize: [30, 30],
    iconAnchor: [15, 30],
  })
}

const venueIcon = createCustomIcon('#FF6B6B', '')
const userIcon = createCustomIcon('#4CAF50', '')

// Component to handle map updates when user location changes
const MapUpdater = ({ userLocation, venueLocation }) => {
  const map = useMap()
  
  useEffect(() => {
    if (userLocation && venueLocation) {
      const bounds = L.latLngBounds([userLocation, venueLocation])
      map.fitBounds(bounds, { padding: [20, 20] })
    } else if (venueLocation) {
      map.setView(venueLocation, 15)
    }
  }, [map, userLocation, venueLocation])
  
  return null
}

const InteractiveMap = ({ venueLocation, venueName, venueAddress }) => {
  const [userLocation, setUserLocation] = useState(null)
  const [locationError, setLocationError] = useState(null)
  const [isLoadingLocation, setIsLoadingLocation] = useState(false)
  const mapRef = useRef(null)

  // Get user's current location
  const getUserLocation = () => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by this browser.')
      return
    }

    setIsLoadingLocation(true)
    setLocationError(null)

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        setUserLocation([latitude, longitude])
        setIsLoadingLocation(false)
      },
      (error) => {
        let errorMessage = 'Unable to retrieve your location.'
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Location access denied by user.'
            break
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Location information is unavailable.'
            break
          case error.TIMEOUT:
            errorMessage = 'Location request timed out.'
            break
        }
        setLocationError(errorMessage)
        setIsLoadingLocation(false)
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes
      }
    )
  }

  // Get directions URL
  const getDirectionsUrl = () => {
    if (userLocation) {
      return `https://www.google.com/maps/dir/${userLocation[0]},${userLocation[1]}/${venueLocation[0]},${venueLocation[1]}`
    }
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venueAddress)}`
  }

  // Calculate distance between two points
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371 // Radius of the Earth in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180
    const dLon = (lon2 - lon1) * Math.PI / 180
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
    return R * c
  }

  const distance = userLocation ? 
    calculateDistance(userLocation[0], userLocation[1], venueLocation[0], venueLocation[1]) : null

  return (
    <Box sx={{ width: '100%', height: '400px', position: 'relative' }}>
      {/* Location Controls */}
      <Box sx={{ 
        position: 'absolute', 
        bottom: 10, 
        left: 10, 
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        gap: 1
      }}>
        <Button
          variant="contained"
          onClick={getUserLocation}
          disabled={isLoadingLocation}
          sx={{
            backgroundColor: '#4CAF50',
            color: 'white',
            fontWeight: 'bold',
            borderRadius: '20px',
            padding: '8px 16px',
            fontSize: '0.8rem',
            textTransform: 'uppercase',
            boxShadow: '0 2px 8px rgba(76, 175, 80, 0.3)',
            '&:hover': {
              backgroundColor: '#45a049',
              transform: 'translateY(-1px)',
              boxShadow: '0 4px 12px rgba(76, 175, 80, 0.4)',
            },
            '&:disabled': {
              backgroundColor: 'rgba(76, 175, 80, 0.6)',
            }
          }}
        >
          {isLoadingLocation ? (
            <CircularProgress size={16} color="inherit" />
          ) : (
            'Find My Location'
          )}
        </Button>

        {userLocation && (
          <Button
            variant="contained"
            href={getDirectionsUrl()}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              backgroundColor: '#FF6B6B',
              color: 'white',
              fontWeight: 'bold',
              borderRadius: '20px',
              padding: '8px 16px',
              fontSize: '0.8rem',
              textTransform: 'uppercase',
              boxShadow: '0 2px 8px rgba(255, 107, 107, 0.3)',
              '&:hover': {
                backgroundColor: '#FF5252',
                transform: 'translateY(-1px)',
                boxShadow: '0 4px 12px rgba(255, 107, 107, 0.4)',
              }
            }}
          >
            Get Directions
          </Button>
        )}
      </Box>

      {/* Distance Display */}
      {distance && (
        <Box sx={{ 
          position: 'absolute', 
          bottom: 10, 
          right: 10, 
          zIndex: 1000,
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          padding: '8px 12px',
          borderRadius: '20px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <Typography variant="body2" sx={{ 
            fontWeight: 'bold', 
            color: colors.text.primary,
            fontSize: '0.8rem'
          }}>
            {distance.toFixed(1)} km away
          </Typography>
        </Box>
      )}

      {/* Error Alert */}
      {locationError && (
        <Alert 
          severity="warning" 
          sx={{ 
            position: 'absolute', 
            bottom: 10, 
            left: 10, 
            right: 10, 
            zIndex: 1000,
            fontSize: '0.8rem'
          }}
        >
          {locationError}
        </Alert>
      )}

      {/* Map */}
      <MapContainer
        center={venueLocation}
        zoom={15}
        style={{ height: '100%', width: '100%', borderRadius: '12px' }}
        ref={mapRef}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* Venue Marker */}
        <Marker position={venueLocation} icon={venueIcon}>
          <Popup>
            <Box sx={{ textAlign: 'center', minWidth: '150px' }}>
              <Typography variant="h6" sx={{ 
                fontWeight: 'bold', 
                color: colors.primary.main,
                fontSize: '1rem',
                mb: 1
              }}>
                {venueName}
              </Typography>
              <Typography variant="body2" sx={{ 
                color: colors.text.secondary,
                fontSize: '0.8rem',
                lineHeight: 1.4
              }}>
                {venueAddress}
              </Typography>
            </Box>
          </Popup>
        </Marker>

        {/* User Location Marker */}
        {userLocation && (
          <Marker position={userLocation} icon={userIcon}>
            <Popup>
              <Box sx={{ textAlign: 'center', minWidth: '120px' }}>
                <Typography variant="h6" sx={{ 
                  fontWeight: 'bold', 
                  color: colors.success.main,
                  fontSize: '1rem',
                  mb: 1
                }}>
                  Your Location
                </Typography>
                <Typography variant="body2" sx={{ 
                  color: colors.text.secondary,
                  fontSize: '0.8rem'
                }}>
                  {userLocation[0].toFixed(4)}, {userLocation[1].toFixed(4)}
                </Typography>
              </Box>
            </Popup>
          </Marker>
        )}

        <MapUpdater userLocation={userLocation} venueLocation={venueLocation} />
      </MapContainer>
    </Box>
  )
}

export default InteractiveMap
