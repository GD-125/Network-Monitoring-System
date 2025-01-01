'use client'

import React, { useMemo } from 'react'
import Globe from 'react-globe.gl'
import { Alert } from '../types/alert'
import { scaleLinear } from 'd3-scale'

interface GlobeVisualizationProps {
  alerts: Alert[]
}

const GlobeVisualization: React.FC<GlobeVisualizationProps> = ({ alerts }) => {
  const data = useMemo(() => {
    const locationMap = new Map<string, { lat: number; lng: number; count: number }>()
    
    alerts.forEach(alert => {
      if (alert.geolocation) {
        const key = `${alert.geolocation.latitude},${alert.geolocation.longitude}`
        if (locationMap.has(key)) {
          locationMap.get(key)!.count++
        } else {
          locationMap.set(key, {
            lat: alert.geolocation.latitude,
            lng: alert.geolocation.longitude,
            count: 1
          })
        }
      }
    })

    return Array.from(locationMap.values())
  }, [alerts])

  const maxCount = Math.max(...data.map(d => d.count))
  const colorScale = scaleLinear<string>()
    .domain([0, maxCount])
    .range(['#FFA500', '#FF0000'])

  return (
    <div style={{ height: '600px', width: '100%' }}>
      <Globe
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
        pointsData={data}
        pointLat="lat"
        pointLng="lng"
        pointColor={d => colorScale(d.count)}
        pointRadius={d => Math.sqrt(d.count) * 0.5}
        pointAltitude={0.01}
        pointLabel={d => `${d.lat}, ${d.lng}: ${d.count} alerts`}
      />
    </div>
  )
}

export default GlobeVisualization

