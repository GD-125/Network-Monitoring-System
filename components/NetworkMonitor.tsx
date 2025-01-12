'use client'

import { useState, useEffect } from 'react'
import PacketList from './PacketList'
import PacketDetail from './PacketDetail'
import FilterKeys from './FilterKeys'
import SearchBar from './SearchBar'
import Analytics from './Analytics'
import NetworkHealth from './NetworkHealth'
import NetworkInsights from './NetworkInsights'
import { Button } from "@/components/ui/button"
import { generateMockPacket, Packet } from '../utils/mockPacketGenerator'
import { BarChart, Activity } from 'lucide-react'

export default function NetworkMonitor() {
  const [packets, setPackets] = useState<Packet[]>([])
  const [selectedPacket, setSelectedPacket] = useState<Packet | null>(null)
  const [isMonitoring, setIsMonitoring] = useState(false)
  const [filter, setFilter] = useState('')
  const [search, setSearch] = useState('')
  const [showAnalytics, setShowAnalytics] = useState(false)
  const [showNetworkHealth, setShowNetworkHealth] = useState(false)

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isMonitoring) {
      interval = setInterval(() => {
        setPackets(prevPackets => {
          const newPackets = [...prevPackets, generateMockPacket()]
          return newPackets.slice(-100) // Keep only the last 100 packets
        })
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isMonitoring])

  const filteredPackets = packets.filter(packet => 
    (filter === '' || packet.protocol === filter) &&
    (search === '' || 
      packet.source.includes(search) || 
      packet.destination.includes(search) ||
      packet.protocol.includes(search))
  )

  const toggleMonitoring = () => {
    setIsMonitoring(!isMonitoring)
  }

  const downloadPackets = () => {
    const content = JSON.stringify(packets, null, 2)
    const blob = new Blob([content], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'network_packets.json'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="w-full space-y-6">
      <div className="flex flex-wrap justify-between items-center gap-4">
        <Button 
          onClick={toggleMonitoring}
          className={`${isMonitoring ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'} text-white`}
        >
          {isMonitoring ? 'Stop Monitoring' : 'Start Monitoring'}
        </Button>
        <div className="flex flex-wrap gap-2">
          <Button onClick={downloadPackets} variant="outline">
            Download Packets
          </Button>
          <Button variant="outline" onClick={() => setShowAnalytics(true)}>
            <BarChart className="mr-2 h-4 w-4" /> View Analytics
          </Button>
          <Button variant="outline" onClick={() => setShowNetworkHealth(true)}>
            <Activity className="mr-2 h-4 w-4" /> Network Health
          </Button>
        </div>
      </div>
      
      <NetworkInsights packets={packets} />
      
      <FilterKeys onFilterChange={setFilter} activeFilter={filter} />
      <PacketDetail packet={selectedPacket} />
      <div className="flex justify-end mb-4">
        <SearchBar onSearch={setSearch} />
      </div>
      <PacketList 
        packets={filteredPackets} 
        onSelectPacket={setSelectedPacket}
      />
      {showAnalytics && (
        <Analytics packets={packets} onClose={() => setShowAnalytics(false)} />
      )}
      {showNetworkHealth && (
        <NetworkHealth packets={packets} onClose={() => setShowNetworkHealth(false)} />
      )}
    </div>
  )
}

