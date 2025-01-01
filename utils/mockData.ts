import { Alert, CriticalLevel, PacketType } from '../types/alert';

const activities = [
  'SSH Access Attempt',
  'Port Scan Detected',
  'Unusual Data Transfer',
  'Potential DDoS Attack',
  'Firewall Rule Violation',
  'Malware Communication Attempt',
  'DNS Query Flood',
  'ARP Spoofing Detected',
  'SSL/TLS Vulnerability Exploit'
];

const protocols = ['TCP', 'UDP', 'HTTP', 'HTTPS', 'FTP', 'SMTP', 'DNS', 'ICMP'];
const criticalLevels: CriticalLevel[] = ['Low', 'Medium', 'High', 'Critical'];
const packetTypes: PacketType[] = ['TCP', 'UDP', 'ICMP', 'HTTP', 'HTTPS', 'DNS', 'Other'];

const generateRandomIp = () => {
  return Array(4).fill(0).map(() => Math.floor(Math.random() * 256)).join('.');
};

export const generateMockAlert = (): Alert => ({
  id: Math.random().toString(36).substr(2, 9),
  sourceIp: generateRandomIp(),
  destinationIp: generateRandomIp(),
  timestamp: Date.now(),
  activity: activities[Math.floor(Math.random() * activities.length)],
  port: Math.floor(Math.random() * 65535),
  protocol: protocols[Math.floor(Math.random() * protocols.length)],
  criticalLevel: criticalLevels[Math.floor(Math.random() * criticalLevels.length)],
  packetType: packetTypes[Math.floor(Math.random() * packetTypes.length)],
  packetSize: Math.floor(Math.random() * 1500),
  latency: Math.random() * 100,
  payload: Math.random() < 0.5 ? btoa(Math.random().toString(36).substring(7)) : undefined
});

