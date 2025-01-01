import React, { useMemo } from 'react';
import { Alert } from '../types/alert';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface AdvancedStatsProps {
  alerts: Alert[];
}

const PROTOCOL_COLORS = ['#FF6384', '#36A2EB', '#4BC0C0', '#FFCE56', '#9966FF', '#FF9F40'];
const CRITICAL_COLORS = ['#2ecc71', '#f1c40f', '#e67e22', '#e74c3c']; // Changed Medium color to yellow

const AdvancedStats: React.FC<AdvancedStatsProps> = ({ alerts }) => {
  const stats = useMemo(() => {
    const protocolCount: Record<string, number> = {};
    const criticalLevelCount: Record<string, number> = { Low: 0, Medium: 0, High: 0, Critical: 0 };
    const criticalIPs: Set<string> = new Set();
    let totalAlerts = alerts.length;
    let uniqueIPs = new Set<string>();
    let totalTime = 0;

    alerts.forEach(alert => {
      protocolCount[alert.protocol] = (protocolCount[alert.protocol] || 0) + 1;
      criticalLevelCount[alert.criticalLevel]++;
      uniqueIPs.add(alert.sourceIp);
      uniqueIPs.add(alert.destinationIp);
      totalTime += Date.now() - alert.timestamp;

      if (alert.criticalLevel === 'Critical') {
        criticalIPs.add(alert.sourceIp);
        criticalIPs.add(alert.destinationIp);
      }
    });

    const protocolData = Object.entries(protocolCount).map(([name, value]) => ({ name, value }));
    const criticalLevelData = Object.entries(criticalLevelCount).map(([name, value]) => ({ name, value }));
    const avgTime = totalAlerts > 0 ? totalTime / totalAlerts : 0;

    return { 
      protocolData, 
      criticalLevelData, 
      totalAlerts, 
      uniqueIPs: uniqueIPs.size, 
      criticalIPs: criticalIPs.size,
      avgTime: Math.round(avgTime / 1000) // Convert to seconds
    };
  }, [alerts]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Protocol Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={stats.protocolData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {stats.protocolData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={PROTOCOL_COLORS[index % PROTOCOL_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Critical Level Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[250px]">
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
                    <Cell key={`cell-${index}`} fill={CRITICAL_COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Total Alerts</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-bold">{stats.totalAlerts}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Unique IPs</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-bold">{stats.uniqueIPs}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-red-600">Critical Level IPs</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-bold text-red-600">{stats.criticalIPs}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Avg. Alert Time</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-bold">{stats.avgTime} s</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdvancedStats;

