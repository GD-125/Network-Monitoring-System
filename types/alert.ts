export type CriticalLevel = 'Low' | 'Medium' | 'High' | 'Critical';
export type PacketType = 'TCP' | 'UDP' | 'ICMP' | 'HTTP' | 'HTTPS' | 'DNS' | 'Other';

export interface Alert {
  id: string;
  sourceIp: string;
  destinationIp: string;
  timestamp: number;
  activity: string;
  port: number;
  protocol: string;
  criticalLevel: CriticalLevel;
  packetType: PacketType;
  packetSize: number;
  latency: number;
  payload?: string;
}

