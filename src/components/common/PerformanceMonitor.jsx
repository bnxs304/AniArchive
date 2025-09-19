import React, { useEffect, useState, useRef } from 'react'
import { Box, Typography, Chip, IconButton, Tooltip } from '@mui/material'
import { DragIndicator, Close } from '@mui/icons-material'

const PerformanceMonitor = ({ showDetails = false }) => {
  const [metrics, setMetrics] = useState({})
  const [position, setPosition] = useState({ x: 10, y: 10 })
  const [isDragging, setIsDragging] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const dragRef = useRef(null)
  const startPos = useRef({ x: 0, y: 0 })

  // Drag and drop functionality + keyboard shortcuts
  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return

    const handleMouseDown = (e) => {
      if (e.target.closest('[data-drag-handle]')) {
        setIsDragging(true)
        startPos.current = {
          x: e.clientX - position.x,
          y: e.clientY - position.y
        }
        e.preventDefault()
      }
    }

    const handleMouseMove = (e) => {
      if (isDragging) {
        const newX = e.clientX - startPos.current.x
        const newY = e.clientY - startPos.current.y
        
        // Keep within viewport bounds
        const maxX = window.innerWidth - 300 // maxWidth of monitor
        const maxY = window.innerHeight - 200 // estimated height
        
        setPosition({
          x: Math.max(0, Math.min(newX, maxX)),
          y: Math.max(0, Math.min(newY, maxY))
        })
      }
    }

    const handleMouseUp = () => {
      setIsDragging(false)
    }

    // Keyboard shortcut: Ctrl+Shift+P to toggle performance monitor
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'P') {
        e.preventDefault()
        setIsVisible(prev => !prev)
      }
    }

    document.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isDragging, position])

  useEffect(() => {
    // Only run in development
    if (process.env.NODE_ENV !== 'development') return

    const measurePerformance = () => {
      // Core Web Vitals
      const vitals = {}

      // First Contentful Paint
      if ('PerformanceObserver' in window) {
        const observer = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry) => {
            if (entry.entryType === 'paint') {
              vitals[entry.name] = Math.round(entry.startTime)
            }
          })
        })
        observer.observe({ entryTypes: ['paint'] })
      }

      // Largest Contentful Paint
      if ('PerformanceObserver' in window) {
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries()
          const lastEntry = entries[entries.length - 1]
          vitals.lcp = Math.round(lastEntry.startTime)
        })
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })
      }

      // First Input Delay
      if ('PerformanceObserver' in window) {
        const fidObserver = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry) => {
            vitals.fid = Math.round(entry.processingStart - entry.startTime)
          })
        })
        fidObserver.observe({ entryTypes: ['first-input'] })
      }

      // Cumulative Layout Shift
      if ('PerformanceObserver' in window) {
        let clsValue = 0
        const clsObserver = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry) => {
            if (!entry.hadRecentInput) {
              clsValue += entry.value
            }
          })
          vitals.cls = Math.round(clsValue * 1000) / 1000
        })
        clsObserver.observe({ entryTypes: ['layout-shift'] })
      }

      // Resource loading times
      const resources = performance.getEntriesByType('resource')
      const totalResourceSize = resources.reduce((total, resource) => {
        return total + (resource.transferSize || 0)
      }, 0)

      vitals.totalResources = resources.length
      vitals.totalSize = Math.round(totalResourceSize / 1024) // KB

      // Bundle size estimation
      const scripts = resources.filter(r => r.name.includes('.js'))
      const totalScriptSize = scripts.reduce((total, script) => {
        return total + (script.transferSize || 0)
      }, 0)

      vitals.bundleSize = Math.round(totalScriptSize / 1024) // KB

      setMetrics(vitals)
    }

    // Measure after page load
    if (document.readyState === 'complete') {
      measurePerformance()
    } else {
      window.addEventListener('load', measurePerformance)
    }

    return () => {
      window.removeEventListener('load', measurePerformance)
    }
  }, [])

  // Only render in development mode
  if (process.env.NODE_ENV !== 'development') return null

  // Show toggle button when monitor is hidden
  if (!isVisible) {
    return (
      <Box
        sx={{
          position: 'fixed',
          bottom: 10,
          right: 10,
          zIndex: 9999,
        }}
      >
        <Tooltip title="Show Performance Monitor (Ctrl+Shift+P)" placement="top">
          <IconButton
            onClick={() => setIsVisible(true)}
            sx={{
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              color: 'white',
              padding: '8px',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.9)',
              },
            }}
          >
            dev
          </IconButton>
        </Tooltip>
      </Box>
    )
  }

  const getPerformanceColor = (metric, value) => {
    const thresholds = {
      fcp: { good: 1800, poor: 3000 },
      lcp: { good: 2500, poor: 4000 },
      fid: { good: 100, poor: 300 },
      cls: { good: 0.1, poor: 0.25 }
    }

    const threshold = thresholds[metric]
    if (!threshold) return 'default'

    if (value <= threshold.good) return 'success'
    if (value <= threshold.poor) return 'warning'
    return 'error'
  }

  const formatMetric = (metric, value) => {
    if (metric === 'cls') return value.toFixed(3)
    if (metric.includes('Size') || metric === 'totalResources') return value
    return `${value}ms`
  }

  return (
    <Box
      ref={dragRef}
      sx={{
        position: 'fixed',
        left: position.x,
        top: position.y,
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        color: 'white',
        padding: 1,
        borderRadius: 2,
        zIndex: 9999,
        fontSize: '0.75rem',
        maxWidth: 300,
        minWidth: 250,
        cursor: isDragging ? 'grabbing' : 'default',
        userSelect: 'none',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
        transition: isDragging ? 'none' : 'box-shadow 0.2s ease',
        '&:hover': {
          boxShadow: '0 6px 25px rgba(0, 0, 0, 0.4)',
        },
      }}
    >
      {/* Drag Handle Header */}
      <Box
        data-drag-handle
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 1,
          padding: '4px 8px',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          borderRadius: 1,
          cursor: 'grab',
          '&:active': {
            cursor: 'grabbing',
          },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <DragIndicator sx={{ fontSize: '1rem', color: 'rgba(255, 255, 255, 0.7)' }} />
          <Typography variant="h6" sx={{ fontSize: '0.875rem', fontWeight: 'bold' }}>
            Performance Monitor
          </Typography>
        </Box>
        <Tooltip title="Hide Performance Monitor (Ctrl+Shift+P)" placement="bottom">
          <IconButton
            size="small"
            onClick={() => setIsVisible(false)}
            sx={{
              color: 'rgba(255, 255, 255, 0.7)',
              padding: '2px',
              '&:hover': {
                color: 'white',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              },
            }}
          >
            <Close sx={{ fontSize: '0.875rem' }} />
          </IconButton>
        </Tooltip>
      </Box>
      
      {/* Metrics */}
      <Box sx={{ padding: '0 8px' }}>
        {Object.entries(metrics).map(([metric, value]) => (
          <Box key={metric} sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
            <Typography variant="body2" sx={{ textTransform: 'capitalize', fontSize: '0.7rem' }}>
              {metric.replace(/([A-Z])/g, ' $1').trim()}:
            </Typography>
            <Chip
              label={formatMetric(metric, value)}
              size="small"
              color={getPerformanceColor(metric, value)}
              sx={{ height: 18, fontSize: '0.65rem' }}
            />
          </Box>
        ))}

        {showDetails && (
          <Box sx={{ mt: 1, pt: 1, borderTop: '1px solid rgba(255,255,255,0.2)' }}>
            <Typography variant="caption" sx={{ fontSize: '0.6rem', lineHeight: 1.2 }}>
              💡 Optimizations: Code splitting, lazy loading, image optimization, memoization
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default PerformanceMonitor
