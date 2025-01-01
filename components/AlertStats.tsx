import React, { useMemo } from 'react';
import { Alert } from '../types/alert';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface AlertStatsProps {
  alerts: Alert[];
}

const AlertStats: React.FC<AlertStatsProps> = ({ alerts }) => {
  const stats = useMemo(() => {
    const criticalLevels = { Low: 0, Medium: 0, High: 0, Critical: 0 };
    const protocols = {};
    const uniqueIPs = new Set();
    
    alerts.forEach(alert => {
      criticalLevels[alert.criticalLevel]++;
      protocols[alert.protocol] = (protocols[alert.protocol] || 0) + 1;
      uniqueIPs.add(alert.sourceIp);
      uniqueIPs.add(alert.destinationIp);
    });

    const criticalLevelData = Object.entries(criticalLevels).map(([name, value]) => ({ name, value }));
    const protocolData = Object.entries(protocols).map(([name, value]) => ({ name, value }));

    return {
      totalAlerts: alerts.length,
      criticalAlerts: criticalLevels.Critical,
      uniqueIPs: uniqueIPs.size,
      criticalLevelData,
      protocolData
    };
  }, [alerts]);

  const COLORS = ['#00C49F', '#FFBB28', '#FF8042', '#FF0000'];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <Card>
        <CardHeader>
          <CardTitle>Total Alerts</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{stats.totalAlerts}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Critical Alerts</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold text-red-500">{stats.criticalAlerts}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Unique IPs</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{stats.uniqueIPs}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Alert Distribution</CardTitle>
        </CardHeader>
        <CardContent className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={stats.criticalLevelData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {stats.criticalLevelData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default AlertStats;

