'use client'

import React, { useMemo } from 'react';
import { Alert, CriticalLevel } from '../types/alert';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface ActivityGraphProps {
  alerts: Alert[];
}

const ActivityGraph: React.FC<ActivityGraphProps> = ({ alerts }) => {
  const graphData = useMemo(() => {
    const data: Record<number, Record<CriticalLevel, number>> = {};
    alerts.forEach(alert => {
      const minute = Math.floor(alert.timestamp / 60000) * 60000;
      if (!data[minute]) {
        data[minute] = { Low: 0, Medium: 0, High: 0, Critical: 0 };
      }
      data[minute][alert.criticalLevel]++;
    });

    return Object.entries(data).map(([time, levels]) => ({
      time: new Date(parseInt(time)).toLocaleTimeString(),
      ...levels
    }));
  }, [alerts]);

  return (
    <Card className="w-full bg-black text-white">
      <CardHeader>
        <CardTitle className="text-white">Severity Levels Over Time</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={graphData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="time" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip contentStyle={{ backgroundColor: '#333', border: '1px solid #555', color: '#fff' }} />
              <Legend />
              <Line type="monotone" dataKey="Low" stroke="#2ecc71" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="Medium" stroke="#f39c12" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="High" stroke="#e67e22" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="Critical" stroke="#e74c3c" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivityGraph;

