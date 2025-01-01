import React, { useMemo } from 'react';
import { Alert, PacketType } from '../types/alert';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface NetworkAnalysisProps {
  alerts: Alert[];
}

const PACKET_COLORS = {
  TCP: '#FF6384',
  UDP: '#36A2EB',
  ICMP: '#FFCE56',
  HTTP: '#4BC0C0',
  HTTPS: '#9966FF',
  DNS: '#FF9F40',
  Other: '#C9CBCF'
};

const PROTOCOL_COLORS = {
  TCP: '#FF6384',
  UDP: '#36A2EB',
  HTTP: '#4BC0C0',
  HTTPS: '#9966FF',
  FTP: '#FF9F40',
  SMTP: '#FFCE56',
  DNS: '#C9CBCF',
  ICMP: '#4D5360'
};

const NetworkAnalysis: React.FC<NetworkAnalysisProps> = ({ alerts }) => {
  const analysisData = useMemo(() => {
    const packetTypes: PacketType[] = ['TCP', 'UDP', 'ICMP', 'HTTP', 'HTTPS', 'DNS', 'Other'];
    const protocols = ['TCP', 'UDP', 'HTTP', 'HTTPS', 'FTP', 'SMTP', 'DNS', 'ICMP'];

    const packetSizes = packetTypes.reduce((acc, type) => {
      acc[type] = alerts.filter(alert => alert.packetType === type)
                        .reduce((sum, alert) => sum + alert.packetSize, 0);
      return acc;
    }, {} as Record<PacketType, number>);

    const protocolDistribution = protocols.reduce((acc, protocol) => {
      acc[protocol] = alerts.filter(alert => alert.protocol === protocol).length;
      return acc;
    }, {} as Record<string, number>);

    const avgLatency = alerts.reduce((sum, alert) => sum + alert.latency, 0) / alerts.length;

    return {
      packetSizes: Object.entries(packetSizes).map(([name, value]) => ({ name, value })),
      protocolDistribution: Object.entries(protocolDistribution).map(([name, value]) => ({ name, value })),
      avgLatency: avgLatency.toFixed(2)
    };
  }, [alerts]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Packet Size Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analysisData.packetSizes}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value">
                  {analysisData.packetSizes.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={PACKET_COLORS[entry.name as PacketType]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Protocol Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analysisData.protocolDistribution}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value">
                  {analysisData.protocolDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={PROTOCOL_COLORS[entry.name]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Network Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">Average Latency: {analysisData.avgLatency} ms</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default NetworkAnalysis;

