import React from 'react';
import { Alert } from '../types/alert';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ThreatFeedProps {
  alerts: Alert[];
}

const ThreatFeed: React.FC<ThreatFeedProps> = ({ alerts }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Real-time Threat Feed</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {alerts.map((alert) => (
            <div key={alert.id} className="flex items-center space-x-4">
              <div className={`w-3 h-3 rounded-full ${
                alert.criticalLevel === 'Low' ? 'bg-green-500' :
                alert.criticalLevel === 'Medium' ? 'bg-yellow-500' :
                alert.criticalLevel === 'High' ? 'bg-orange-500' :
                'bg-red-500'
              }`} />
              <div>
                <p className="font-semibold">{alert.activity}</p>
                <p className="text-sm text-gray-500">
                  {alert.sourceIp} → {alert.destinationIp}
                </p>
                <p className="text-xs text-gray-400">
                  {new Date(alert.timestamp).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ThreatFeed;

