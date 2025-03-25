'use client'

import { useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
})

interface Train {
  trainNumber: number
  location: {
    coordinates: [number, number]
  }
  speed?: number
  timestamp?: string
}

export default function TrainMap({ trains }: { trains: Train[] }) {
  const [isFullscreen, setIsFullscreen] = useState(false)

  return (
    <div className="relative">
      <button
        className="absolute z-[1000] top-3 right-3 bg-white px-3 py-1 rounded shadow text-sm font-medium border hover:bg-gray-100 transition"
        onClick={() => setIsFullscreen(!isFullscreen)}
      >
        {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
      </button>

      <MapContainer
        center={[62.2426, 25.7473]}
        zoom={6}
        scrollWheelZoom={true}
        className={`${isFullscreen ? 'h-screen' : 'h-[600px]'} w-full rounded shadow`}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {trains.map((train, idx) => (
          <Marker key={idx} position={[train.location.coordinates[1], train.location.coordinates[0]]}>
            <Popup>
              <div className="text-sm">
                <p><strong>Train:</strong> #{train.trainNumber}</p>
                {train.speed && <p><strong>Speed:</strong> {Math.round(train.speed)} km/h</p>}
                {train.timestamp && (
                  <p><strong>Time:</strong> {new Date(train.timestamp).toLocaleTimeString()}</p>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}
