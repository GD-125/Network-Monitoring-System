'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, Globe, Shield, Zap } from 'lucide-react'
import { Packet } from '../utils/mockPacketGenerator'

interface NetworkInsightsProps {
  packets: Packet[]
}

interface InsightCard {
  title: string
  description: string
  icon: React.ElementType
  value: string | number
  trend?: 'up' | 'down' | 'stable'
  iconColor: string
  valueColor?: string
}

export default function NetworkInsights({ packets }: NetworkInsightsProps) {
  const [insights, setInsights] = useState<InsightCard[]>([])

  useEffect(() => {
    const calculateInsights = () => {
      const totalPackets = packets.length
      const blockedPackets = packets.filter(p => p.action === 'Block').length
      const criticalPackets = packets.filter(p => p.criticalLevel === 'High').length
      const protocols = new Set(packets.map(p => p.protocol)).size

      return [
        {
          title: 'Network Traffic',
          description: 'Total packets processed',
          icon: Activity,
          value: totalPackets,
          trend: 'up',
          iconColor: '#4CAF50' // Green
        },
        {
          title: 'Security Status',
          description: 'Blocked packets ratio',
          icon: Shield,
          value: `${((blockedPackets / totalPackets) * 100).toFixed(1)}%`,
          trend: blockedPackets > totalPackets * 0.2 ? 'down' : 'up',
          iconColor: '#2196F3' // Blue
        },
        {
          title: 'Protocol Diversity',
          description: 'Active protocols',
          icon: Globe,
          value: protocols,
          trend: 'stable',
          iconColor: '#FF9800' // Orange
        },
        {
          title: 'Critical Events',
          description: 'High priority packets',
          icon: Zap,
          value: criticalPackets,
          trend: criticalPackets < totalPackets * 0.1 ? 'down' : 'up',
          iconColor: '#FF5252', // Red
          valueColor: '#FF5252'  // Red
        }
      ]
    }

    setInsights(calculateInsights())
  }, [packets])

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-8">
      {insights.map((insight, index) => (
        <Card key={index} className="bg-white dark:bg-gray-800 hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {insight.title}
            </CardTitle>
            <insight.icon 
              className="h-4 w-4" 
              style={{ color: insight.iconColor }}
            />
          </CardHeader>
          <CardContent>
            <div 
              className="text-2xl font-bold"
              style={{ color: insight.valueColor }}
            >
              {insight.value}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {insight.description}
            </p>
            {insight.trend && (
              <div className={`mt-2 text-xs flex items-center gap-1 ${
                insight.trend === 'up' ? 'text-green-500' :
                insight.trend === 'down' ? 'text-red-500' :
                'text-yellow-500'
              }`}>
                {insight.trend === 'up' ? '↑' : insight.trend === 'down' ? '↓' : '→'} 
                {insight.trend}
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

