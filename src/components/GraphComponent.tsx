/** @format */

import React from 'react';

const GraphComponent: React.FC<{
	graphData: any;
	source: string;
	destination: string;
}> = ({ graphData, source, destination }) => {
	const calculateDistance = (node1: string, node2: string) => {
		const edge = graphData.edges.find(
			(edge: any) =>
				(edge.source.toLowerCase() === node1.toLowerCase() &&
					edge.target.toLowerCase() === node2.toLowerCase()) ||
				(edge.source.toLowerCase() === node2.toLowerCase() &&
					edge.target.toLowerCase() === node1.toLowerCase())
		);
		return edge ? edge.distance : null;
	};

	return (
		<div>
			<div className='border border-gray-300 p-4 rounded-md'>
				<h2 className='text-xl font-semibold mb-4'>Graph</h2>
				<div className='w-full h-auto md:h-96 bg-gray-200 flex items-center justify-center'>
					<svg viewBox='0 0 800 600' className='w-full h-full'>
						{graphData.edges.map((edge: any, index: number) => {
							const sourceIndex = graphData.nodes.findIndex(
								(node: string) =>
									node.toLowerCase() === edge.source.toLowerCase()
							);
							const targetIndex = graphData.nodes.findIndex(
								(node: string) =>
									node.toLowerCase() === edge.target.toLowerCase()
							);
							const sourceX = (sourceIndex + 1) * 100;
							const targetX = (targetIndex + 1) * 100;
							return (
								<line
									key={index}
									x1={sourceX}
									y1='50%'
									x2={targetX}
									y2='50%'
									stroke='black'
									strokeWidth='2'
								/>
							);
						})}
						{graphData.nodes.map((node: string, index: number) => (
							<React.Fragment key={index}>
								<circle
									cx={(index + 1) * 100}
									cy='50%'
									r='8'
									fill={
										node.toLowerCase() === source.toLowerCase()
											? 'yellow'
											: node.toLowerCase() === destination.toLowerCase()
											? 'green'
											: 'blue'
									}
								/>
								<text
									x={(index + 1) * 100}
									y='60%'
									textAnchor='middle'
									fontSize='14px'
									fill={
										node.toLowerCase() === source.toLowerCase() ||
										node.toLowerCase() === destination.toLowerCase()
											? 'blue'
											: 'black'
									}>
									{node}
								</text>
							</React.Fragment>
						))}
					</svg>
				</div>
			</div>
		</div>
	);
};

export default GraphComponent;
