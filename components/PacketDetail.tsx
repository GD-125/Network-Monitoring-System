import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Packet } from '../utils/mockPacketGenerator'

interface PacketDetailProps {
  packet: Packet | null
}

export default function PacketDetail({ packet }: PacketDetailProps) {
  if (!packet) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Packet Details</CardTitle>
          <CardDescription>Select a packet to view details</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Packet Details</CardTitle>
        <CardDescription>Detailed information about the selected packet</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="font-semibold">Time:</p>
            <p>{new Date(packet.timestamp).toLocaleString()}</p>
          </div>
          <div>
            <p className="font-semibold">Source:</p>
            <p>{packet.source}</p>
          </div>
          <div>
            <p className="font-semibold">Destination:</p>
            <p>{packet.destination}</p>
          </div>
          <div>
            <p className="font-semibold">Protocol:</p>
            <p>{packet.protocol}</p>
          </div>
          <div>
            <p className="font-semibold">Port:</p>
            <p>{packet.port}</p>
          </div>
          <div>
            <p className="font-semibold">Action:</p>
            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${packet.action === 'Allow' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {packet.action}
            </span>
          </div>
          <div>
            <p className="font-semibold">Critical Level:</p>
            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
              packet.criticalLevel === 'Low' ? 'bg-blue-100 text-blue-800' :
              packet.criticalLevel === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              {packet.criticalLevel}
            </span>
          </div>
          <div>
            <p className="font-semibold">Length:</p>
            <p>{packet.length} bytes</p>
          </div>
        </div>
        <div className="mt-4">
          <p className="font-semibold">Data:</p>
          <p className="break-all text-xs bg-gray-100 p-2 rounded">{packet.data}</p>
        </div>
      </CardContent>
    </Card>
  )
}

