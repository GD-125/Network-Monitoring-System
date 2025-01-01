'use client'

import { useState, useEffect } from 'react';
import { Alert } from '@/types/alert';
import { generateMockAlert } from '@/utils/mockData';
import { Button } from "@/components/ui/button";
import ActivityGraph from '@/components/ActivityGraph';
import AlertTable from '@/components/AlertTable';
import ThreatFeed from '@/components/ThreatFeed';
import AdvancedStats from '@/components/AdvancedStats';
import NetworkAnalysis from '@/components/NetworkAnalysis';

export default function Home() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [isMonitoring, setIsMonitoring] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isMonitoring) {
      const generateAlert = () => {
        const newAlert = generateMockAlert();
        setAlerts(prev => [newAlert, ...prev].slice(0, 100));
      };

      generateAlert(); // Generate first alert immediately
      interval = setInterval(generateAlert, 2000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isMonitoring]);

  return (
    <>
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex flex-wrap justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-0">Advanced Network Monitoring System</h1>
          <Button 
            onClick={() => setIsMonitoring(!isMonitoring)}
            className={`${isMonitoring ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'} text-white`}
          >
            {isMonitoring ? 'Stop Monitoring' : 'Start Monitoring'}
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          <ActivityGraph alerts={alerts} />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ThreatFeed alerts={alerts.slice(0, 10)} />
            <AdvancedStats alerts={alerts} />
          </div>
          
          <NetworkAnalysis alerts={alerts} />
          
          <AlertTable alerts={alerts} />
        </div>
      </main>
    </>
  );
}

