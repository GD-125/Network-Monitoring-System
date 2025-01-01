import React, { useState } from 'react';
import { Alert, CriticalLevel } from '../types/alert';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

interface AlertTableProps {
  alerts: Alert[];
}

const AlertTable: React.FC<AlertTableProps> = ({ alerts }) => {
  const [filter, setFilter] = useState<CriticalLevel | 'All'>('All');

  const filteredAlerts = filter === 'All' ? alerts : alerts.filter(alert => alert.criticalLevel === filter);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {['All', 'Low', 'Medium', 'High', 'Critical'].map((level) => (
          <Button
            key={level}
            onClick={() => setFilter(level as CriticalLevel | 'All')}
            variant={filter === level ? "default" : "outline"}
          >
            {level}
          </Button>
        ))}
      </div>
      <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-bold">Time</TableHead>
              <TableHead className="font-bold">Source IP</TableHead>
              <TableHead className="font-bold">Destination IP</TableHead>
              <TableHead className="font-bold">Activity</TableHead>
              <TableHead className="font-bold">Protocol</TableHead>
              <TableHead className="font-bold">Port</TableHead>
              <TableHead className="font-bold">Critical Level</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAlerts.map((alert) => (
              <TableRow key={alert.id}>
                <TableCell>
                  {new Date(alert.timestamp).toLocaleString()}
                </TableCell>
                <TableCell>{alert.sourceIp}</TableCell>
                <TableCell>{alert.destinationIp}</TableCell>
                <TableCell>{alert.activity}</TableCell>
                <TableCell>{alert.protocol}</TableCell>
                <TableCell>{alert.port}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded text-white ${
                    alert.criticalLevel === 'Low' ? 'bg-green-500' :
                    alert.criticalLevel === 'Medium' ? 'bg-yellow-500' :
                    alert.criticalLevel === 'High' ? 'bg-orange-500' :
                    'bg-red-500'
                  }`}>
                    {alert.criticalLevel}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AlertTable;

