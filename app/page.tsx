import NetworkMonitor from '../components/NetworkMonitor'
import EducationalCards from '../components/EducationalCards'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-8 bg-gray-100">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center text-blue-600"> Network Monitoring System </h1>
      <div className="w-full max-w-7xl mx-auto">
        <EducationalCards />
        <NetworkMonitor />
      </div>
    </main>
  )
}

