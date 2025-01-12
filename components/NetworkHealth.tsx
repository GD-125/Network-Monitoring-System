import { XCircle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Packet } from '../utils/mockPacketGenerator'

interface NetworkHealthProps {
  packets: Packet[]
  onClose: () => void
}

export default function NetworkHealth({ packets, onClose }: NetworkHealthProps) {
  const totalPackets = packets.length
  const blockedPackets = packets.filter(p => p.action === 'Block').length
  const criticalPackets = packets.filter(p => p.criticalLevel === 'High').length

  const healthScore = Math.max(0, 100 - (blockedPackets / totalPackets * 50) - (criticalPackets / totalPackets * 50))

  const getHealthStatus = (score: number) => {
    if (score > 80) return { status: 'Excellent', color: '#4CAF50' }
    if (score > 60) return { status: 'Good', color: '#2196F3' }
    if (score > 40) return { status: 'Fair', color: '#FFC107' }
    return { status: 'Poor', color: '#FF5252' }
  }

  const { status, color } = getHealthStatus(healthScore)

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-[#1a1f2e] rounded-lg p-8 w-full max-w-md">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-white">Network Health</h2>
          <Button variant="ghost" onClick={onClose} className="text-gray-400 hover:text-white">
            <XCircle className="h-6 w-6" />
          </Button>
        </div>
        
        <div className="space-y-8 text-center">
          <div>
            <p className="text-gray-400 mb-2">Health Score</p>
            <p className="text-5xl font-bold" style={{ color }}>
              {healthScore.toFixed(2)}
            </p>
          </div>
          
          <div>
            <p className="text-gray-400 mb-2">Status</p>
            <p className="text-3xl font-bold" style={{ color }}>
              {status}
            </p>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-gray-400 text-sm mb-1">Total Packets</p>
              <p className="text-xl font-semibold text-white">{totalPackets}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm mb-1">Blocked Packets</p>
              <p className="text-xl font-semibold text-red-500">{blockedPackets}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm mb-1">Critical Packets</p>
              <p className="text-xl font-semibold text-yellow-500">{criticalPackets}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

