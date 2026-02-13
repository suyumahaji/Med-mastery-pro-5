import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { GraphNode, GraphLink } from './types.ts';

const KnowledgeGraph: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  const data: { nodes: GraphNode[], links: GraphLink[] } = {
    nodes: [
      { id: 'Heart Failure', group: 1, label: 'Congestive Heart Failure' },
      { id: 'Dyspnea', group: 2, label: 'Dyspnea' },
      { id: 'Edema', group: 2, label: 'Peripheral Edema' },
      { id: 'S3 Gallop', group: 2, label: 'S3 Gallop' },
      { id: 'Furosemide', group: 3, label: 'Furosemide' },
      { id: 'ACE Inhibitor', group: 3, label: 'Lisinopril' },
      { id: 'Echocardiogram', group: 4, label: 'Echo' },
      { id: 'EF < 40%', group: 4, label: 'Low EF' },
      { id: 'HFrEF', group: 1, label: 'HFrEF' },
    ],
    links: [
      { source: 'Heart Failure', target: 'Dyspnea', value: 1 },
      { source: 'Heart Failure', target: 'Edema', value: 1 },
      { source: 'Heart Failure', target: 'S3 Gallop', value: 1 },
      { source: 'Heart Failure', target: 'HFrEF', value: 1 },
      { source: 'HFrEF', target: 'Furosemide', value: 1 },
      { source: 'HFrEF', target: 'ACE Inhibitor', value: 1 },
      { source: 'Heart Failure', target: 'Echocardiogram', value: 1 },
      { source: 'Echocardiogram', target: 'EF < 40%', value: 1 },
    ]
  };

  useEffect(() => {
    if (!svgRef.current) return;

    const width = 800;
    const height = 600;

    const svg = d3.select(svgRef.current)
      .attr('viewBox', `0 0 ${width} ${height}`)
      .style('width', '100%')
      .style('height', '100%');

    svg.selectAll("*").remove();

    const simulation = d3.forceSimulation<GraphNode>(data.nodes)
      .force('link', d3.forceLink<GraphNode, GraphLink>(data.links).id(d => d.id).distance(120))
      .force('charge', d3.forceManyBody().strength(-300))
      .force('center', d3.forceCenter(width / 2, height / 2));

    const link = svg.append('g')
      .attr('stroke', '#e2e8f0')
      .attr('stroke-opacity', 0.6)
      .selectAll('line')
      .data(data.links)
      .join('line')
      .attr('stroke-width', d => Math.sqrt(d.value) * 2);

    const node = svg.append('g')
      .attr('stroke', '#fff')
      .attr('stroke-width', 2)
      .selectAll('g')
      .data(data.nodes)
      .join('g')
      .call(d3.drag<any, any>()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended));

    node.append('circle')
      .attr('r', 8)
      .attr('fill', d => {
        const colors = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444'];
        return colors[d.group % colors.length];
      });

    node.append('text')
      .text(d => d.label)
      .attr('x', 12)
      .attr('y', 4)
      .style('font-size', '12px')
      .style('font-family', 'Inter')
      .style('font-weight', '500')
      .style('fill', '#475569')
      .style('stroke', 'none');

    simulation.on('tick', () => {
      link
        .attr('x1', (d: any) => d.source.x)
        .attr('y1', (d: any) => d.source.y)
        .attr('x2', (d: any) => d.target.x)
        .attr('y2', (d: any) => d.target.y);

      node.attr('transform', (d: any) => `translate(${d.x},${d.y})`);
    });

    function dragstarted(event: any) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }

    function dragged(event: any) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }

    function dragended(event: any) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }

    return () => simulation.stop();
  }, []);

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-white">
      <header className="p-6 border-b border-slate-100 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Knowledge Graph</h2>
          <p className="text-sm text-slate-500">Visualizing clinical correlations and physiological pathways.</p>
        </div>
      </header>
      <div className="flex-1 relative bg-slate-50 cursor-grab active:cursor-grabbing">
        <svg ref={svgRef} className="w-full h-full" />
        <div className="absolute bottom-6 right-6 bg-white/80 backdrop-blur border border-slate-200 p-4 rounded-xl space-y-2 text-xs shadow-xl">
          <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-blue-500"></span> Disease</div>
          <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-emerald-500"></span> Symptom</div>
          <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-amber-500"></span> Treatment</div>
          <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-purple-500"></span> Diagnostic</div>
        </div>
      </div>
    </div>
  );
};

export default KnowledgeGraph;