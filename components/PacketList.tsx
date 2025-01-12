import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Packet } from '../utils/mockPacketGenerator'

interface PacketListProps {
  packets: Packet[]
  onSelectPacket: (packet: Packet) => void
}

export default function PacketList({ packets, onSelectPacket }: PacketListProps) {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">No.</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Source</TableHead>
            <TableHead>Destination</TableHead>
            <TableHead>Protocol</TableHead>
            <TableHead>Port</TableHead>
            <TableHead>Action</TableHead>
            <TableHead>Critical Level</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {packets.map((packet, index) => (
            <TableRow 
              key={index} 
              onClick={() => onSelectPacket(packet)} 
              className="hover:bg-gray-50 cursor-pointer transition-colors duration-150"
            >
              <TableCell>{index + 1}</TableCell>
              <TableCell>{new Date(packet.timestamp).toLocaleTimeString()}</TableCell>
              <TableCell>{packet.source}</TableCell>
              <TableCell>{packet.destination}</TableCell>
              <TableCell>{packet.protocol}</TableCell>
              <TableCell>{packet.port}</TableCell>
              <TableCell>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${packet.action === 'Allow' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {packet.action}
                </span>
              </TableCell>
              <TableCell>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  packet.criticalLevel === 'Low' ? 'bg-blue-100 text-blue-800' :
                  packet.criticalLevel === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {packet.criticalLevel}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

