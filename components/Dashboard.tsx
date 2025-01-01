import React, { useState, useEffect, useCallback } from 'react';
import { Alert } from '../types/alert';
import { generateMockAlert } from '../utils/mockData';
import AlertTable from './AlertTable';
import ActivityGraph from './ActivityGraph';
import AlertStats from './AlertStats';
import ThreatFeed from './ThreatFeed';
import { Button } from './ui/button';

const Dashboard: React.FC = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [isMonitoring, setIsMonitoring] = useState(false);

  const addAlert = useCallback(() => {
    const newAlert = generateMockAlert();
    setAlerts(prevAlerts => [newAlert, ...prevAlerts].slice(0, 100));
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isMonitoring) {
      interval = setInterval(addAlert, 2000);
    }
    return () => clearInterval(interval);
  }, [isMonitoring, addAlert]);

  const toggleMonitoring = () => {
    setIsMonitoring(!isMonitoring);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-0">Network Monitoring System</h1>
          <Button onClick={toggleMonitoring} variant={isMonitoring ? "destructive" : "default"}>
            {isMonitoring ? 'Stop Monitoring' : 'Start Monitoring'}
          </Button>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <AlertStats alerts={alerts} />
          <div className="grid grid-cols-1 gap-8 mb-8">
            <ActivityGraph alerts={alerts} />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <ThreatFeed alerts={alerts.slice(0, 10)} />
          </div>
          <AlertTable alerts={alerts} />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

