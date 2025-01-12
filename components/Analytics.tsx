import { useState } from 'react'
import { XCircle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Packet } from '../utils/mockPacketGenerator'
import { Bar, BarChart, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'

const criticalLevelColors: Record<string, string> = {
  Low: '#4CAF50',    // Green
  Medium: '#FFC107', // Yellow
  High: '#FF5252'    // Red
}

// Ensure consistent order
const criticalLevelOrder = ['Low', 'Medium', 'High']
const protocolOrder = ['TCP', 'UDP', 'HTTP', 'DNS', 'ICMP']

const protocolColors: Record<string, string> = {
  TCP: '#FF6B6B',   // Coral Red
  UDP: '#4ECDC4',   // Turquoise
  HTTP: '#45B7D1',  // Sky Blue
  DNS: '#96CEB4',   // Sage Green
  ICMP: '#FFEEAD'   // Light Yellow
}

interface AnalyticsProps {
  packets: Packet[]
  onClose: () => void
}

export default function Analytics({ packets, onClose }: AnalyticsProps) {
  const [chartType, setChartType] = useState<'protocol' | 'criticalLevel'>('protocol')

  const getOrderedData = () => {
    const rawData = packets.reduce((acc, packet) => {
      const key = chartType === 'protocol' ? packet.protocol : packet.criticalLevel
      acc[key] = (acc[key] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    const orderArray = chartType === 'protocol' ? protocolOrder : criticalLevelOrder
    return orderArray.map(name => ({
      name,
      value: rawData[name] || 0
    }))
  }

  const chartData = getOrderedData()
  const maxValue = Math.max(...chartData.map(d => d.value))
  const yAxisTicks = Array.from({ length: 5 }, (_, i) => Math.round((maxValue / 4) * i))

  const getColor = (name: string) => {
    return chartType === 'protocol' ? protocolColors[name] : criticalLevelColors[name]
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload || !payload.length) return null

    return (
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-3 shadow-lg">
        <p className="text-white font-medium mb-1">{label}</p>
        <p className="text-sm" style={{ color: getColor(label) }}>
          Count: {payload[0].value}
        </p>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-900 rounded-lg p-6 w-full max-w-3xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-white">Network Analytics</h2>
          <Button variant="ghost" onClick={onClose}>
            <XCircle className="h-6 w-6 text-gray-400 hover:text-white" />
          </Button>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          <Button 
            variant={chartType === 'protocol' ? 'default' : 'outline'}
            onClick={() => setChartType('protocol')}
            className={chartType === 'protocol' ? 'bg-blue-600 hover:bg-blue-700' : ''}
          >
            Protocol Distribution
          </Button>
          <Button 
            variant={chartType === 'criticalLevel' ? 'default' : 'outline'}
            onClick={() => setChartType('criticalLevel')}
            className={chartType === 'criticalLevel' ? 'bg-blue-600 hover:bg-blue-700' : ''}
          >
            Critical Level Distribution
          </Button>
        </div>
        <div className="h-64 w-full bg-gray-800 rounded-lg p-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <XAxis 
                dataKey="name" 
                stroke="#fff"
                tick={{ fill: '#fff' }}
                interval={0}
              />
              <YAxis 
                stroke="#fff"
                tick={{ fill: '#fff' }}
                ticks={yAxisTicks}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`}
                    fill={getColor(entry.name)}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-4 flex flex-wrap gap-4 justify-center">
          {chartData.map((item, index) => (
            <div key={index} className="flex items-center">
              <div 
                className="w-4 h-4 rounded mr-2"
                style={{ backgroundColor: getColor(item.name) }}
              />
              <span className="text-white">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

