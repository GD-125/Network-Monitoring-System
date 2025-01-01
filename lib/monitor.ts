import { Alert } from '../types/alert'

let isMonitoring = false
let intervalId: NodeJS.Timeout | null = null
const activities = [
  'SSH Access Attempt',
  'Port Scan Detected',
  'Unusual Data Transfer',
  'Potential DDoS Attack',
  'Firewall Rule Violation',
  'Malware Communication Attempt'
]

const protocols = ['TCP', 'UDP', 'HTTP', 'HTTPS', 'FTP', 'SMTP']

const generateRandomIp = () => {
  return Array(4).fill(0).map(() => Math.floor(Math.random() * 256)).join('.')
}

const generateRandomGeolocation = () => {
  return {
    latitude: Math.random() * 180 - 90,
    longitude: Math.random() * 360 - 180,
    country: ['USA', 'China', 'Russia', 'Germany', 'Brazil', 'Australia'][Math.floor(Math.random() * 6)]
  }
}

const simulateTraffic = (): Alert => {
  const now = new Date()
  return {
    id: Math.random().toString(36).substr(2, 9),
    sourceIp: generateRandomIp(),
    destinationIp: generateRandomIp(),
    date: now.toISOString().split('T')[0],
    time: now.toTimeString().split(' ')[0],
    activity: activities[Math.floor(Math.random() * activities.length)],
    port: Math.floor(Math.random() * 65535),
    protocol: protocols[Math.floor(Math.random() * protocols.length)],
    criticalLevel: ['Low', 'Medium', 'High', 'Critical'][Math.floor(Math.random() * 4)] as Alert['criticalLevel'],
    geolocation: generateRandomGeolocation()
  }
}

export function startMonitoring(onAlert: (alert: Alert) => void) {
  if (isMonitoring) {
    console.warn('Monitoring session already running')
    return
  }

  isMonitoring = true
  intervalId = setInterval(() => {
    const alert = simulateTraffic()
    onAlert(alert)
  }, 2000) // Generate an alert every 2 seconds
}

export function stopMonitoring() {
  if (intervalId) {
    clearInterval(intervalId)
    intervalId = null
  }
  isMonitoring = false
}

