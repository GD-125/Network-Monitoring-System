import React, { useMemo } from 'react';
import dynamic from 'next/dynamic';
import { Alert } from '../types/alert';
import { scaleOrdinal } from 'd3-scale';
import { schemeCategory10 } from 'd3-scale-chromatic';

const ForceGraph2D = dynamic(() => import('react-force-graph-2d'), { ssr: false });

interface NetworkMapProps {
  alerts: Alert[];
}

interface Node {
  id: string;
  val: number;
  criticalLevel: string;
}

interface Link {
  source: string;
  target: string;
  criticalLevel: string;
}

const NetworkMap: React.FC<NetworkMapProps> = ({ alerts }) => {
  const colorScale = scaleOrdinal(schemeCategory10);

  const graphData = useMemo(() => {
    const nodes: { [key: string]: Node } = {};
    const links: Link[] = [];

    alerts.forEach(alert => {
      if (!nodes[alert.sourceIp]) {
        nodes[alert.sourceIp] = { id: alert.sourceIp, val: 1, criticalLevel: alert.criticalLevel };
      } else {
        nodes[alert.sourceIp].val++;
        if (alert.criticalLevel === 'Critical') {
          nodes[alert.sourceIp].criticalLevel = 'Critical';
        }
      }
      if (!nodes[alert.destinationIp]) {
        nodes[alert.destinationIp] = { id: alert.destinationIp, val: 1, criticalLevel: alert.criticalLevel };
      } else {
        nodes[alert.destinationIp].val++;
        if (alert.criticalLevel === 'Critical') {
          nodes[alert.destinationIp].criticalLevel = 'Critical';
        }
      }
      links.push({ source: alert.sourceIp, target: alert.destinationIp, criticalLevel: alert.criticalLevel });
    });

    return { nodes: Object.values(nodes), links };
  }, [alerts]);

  const getNodeColor = (node: Node) => {
    switch (node.criticalLevel) {
      case 'Critical': return 'red';
      case 'High': return 'orange';
      case 'Medium': return 'yellow';
      case 'Low': return 'green';
      default: return 'gray';
    }
  };

  const getLinkColor = (link: Link) => {
    switch (link.criticalLevel) {
      case 'Critical': return 'rgba(255, 0, 0, 0.5)';
      case 'High': return 'rgba(255, 165, 0, 0.5)';
      case 'Medium': return 'rgba(255, 255, 0, 0.5)';
      case 'Low': return 'rgba(0, 255, 0, 0.5)';
      default: return 'rgba(128, 128, 128, 0.5)';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-4">Network Activity Map</h2>
      <div style={{ height: '400px' }}>
        <ForceGraph2D
          graphData={graphData}
          nodeColor={getNodeColor}
          linkColor={getLinkColor}
          nodeLabel={(node: Node) => `${node.id}\nCritical Level: ${node.criticalLevel}`}
          linkLabel={(link: Link) => `${link.source} → ${link.target}\nCritical Level: ${link.criticalLevel}`}
          nodeCanvasObject={(node: any, ctx, globalScale) => {
            const label = node.id;
            const fontSize = 12/globalScale;
            ctx.font = `${fontSize}px Sans-Serif`;
            const textWidth = ctx.measureText(label).width;
            const bckgDimensions = [textWidth, fontSize].map(n => n + fontSize * 0.2);

            ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
            ctx.fillRect(node.x - bckgDimensions[0] / 2, node.y - bckgDimensions[1] / 2, ...bckgDimensions);

            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = getNodeColor(node);
            ctx.fillText(label, node.x, node.y);
          }}
          nodeCanvasObjectMode={() => 'after'}
        />
      </div>
    </div>
  );
};

export default NetworkMap;

