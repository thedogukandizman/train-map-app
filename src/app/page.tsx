'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

// importing the map dynamically
const TrainMap = dynamic(() => import('./TrainMap'), { ssr: false })

interface Train {
  trainNumber: number
  location: {
    coordinates: [number, number]
  }
  speed?: number
  timestamp?: string
}

export default function Home() {
  const [trainData, setTrainData] = useState<Train[]>([])

  useEffect(() => {
    async function fetchData() {
      const res = await fetch('https://rata.digitraffic.fi/api/v1/train-locations/latest/')
      const data = await res.json()
      setTrainData(data)
    }

    fetchData()
    const interval = setInterval(fetchData, 30000) // refresh every 30 sec

    return () => clearInterval(interval) // cleaning up interval
  }, [])

  return (
    <main className="max-w-5xl mx-auto p-4 space-y-4">
      <h1 className="text-3xl font-bold text-center">Train Tracker Map</h1>
      {trainData.length > 0 ? (
        <TrainMap trains={trainData} />
      ) : (
        <p className="text-center text-gray-600">Loading train data...</p>
      )}
    </main>
  )
}
