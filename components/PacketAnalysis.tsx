import React from 'react'
import { Alert } from '../types/alert'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface PacketAnalysisProps {
  latestAlert: Alert | null
}

const PacketAnalysis: React.FC<PacketAnalysisProps> = ({ latestAlert }) => {
  if (!latestAlert) return null

  return (
    <Card>
      <CardHeader>
        <CardTitle>Real-time Packet Analysis</CardTitle>
        <CardDescription>Latest packet details</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="font-semibold">Source IP:</span>
            <span>{latestAlert.sourceIp}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Destination IP:</span>
            <span>{latestAlert.destinationIp}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Protocol:</span>
            <Badge>{latestAlert.protocol}</Badge>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Port:</span>
            <span>{latestAlert.port}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Activity:</span>
            <span>{latestAlert.activity}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Critical Level:</span>
            <Badge variant="outline" className={
              latestAlert.criticalLevel === 'Low' ? 'bg-green-100 text-green-800' :
              latestAlert.criticalLevel === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
              latestAlert.criticalLevel === 'High' ? 'bg-orange-100 text-orange-800' :
              'bg-red-100 text-red-800'
            }>
              {latestAlert.criticalLevel}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default PacketAnalysis

