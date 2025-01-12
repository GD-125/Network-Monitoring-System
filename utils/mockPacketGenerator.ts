export interface Packet {
  timestamp: string
  source: string
  destination: string
  protocol: string
  port: number
  action: 'Allow' | 'Block'
  criticalLevel: 'Low' | 'Medium' | 'High'
  length: number
  data: string
}

const protocols = ['TCP', 'UDP', 'HTTP', 'DNS', 'ICMP']
const actions: Packet['action'][] = ['Allow', 'Block']
const criticalLevels: Packet['criticalLevel'][] = ['Low', 'Medium', 'High']

function randomIP() {
  return `${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`
}

function randomPort() {
  return Math.floor(Math.random() * 65535) + 1
}

function generateMockData(protocol: string, length: number): string {
  switch (protocol) {
    case 'HTTP':
      return `GET /index.html HTTP/1.1\r\nHost: example.com\r\nUser-Agent: Mozilla/5.0\r\n\r\n`.slice(0, length)
    case 'DNS':
      return `QUERY example.com A IN`.slice(0, length)
    default:
      return Array(length).fill(0).map(() => Math.floor(Math.random() * 256).toString(16).padStart(2, '0')).join('')
  }
}

export function generateMockPacket(): Packet {
  const protocol = protocols[Math.floor(Math.random() * protocols.length)]
  const length = Math.floor(Math.random() * 1000) + 64 // Minimum packet size is 64 bytes
  const port = randomPort()
  const action = actions[Math.floor(Math.random() * actions.length)]
  const criticalLevel = criticalLevels[Math.floor(Math.random() * criticalLevels.length)]
  
  return {
    timestamp: new Date().toISOString(),
    source: randomIP(),
    destination: randomIP(),
    protocol,
    port,
    action,
    criticalLevel,
    length,
    data: generateMockData(protocol, length)
  }
}

