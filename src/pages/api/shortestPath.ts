/** @format */

import { NextApiRequest, NextApiResponse } from 'next';

const makeEdgesBidirectional = (
	edges: { target: any; source: any; time: any; distance: any }[]
) => {
	const bidirectionalEdges: {
		source: any;
		target: any;
		time: any;
		distance: any;
	}[] = [];
	edges.forEach(
		(edge: { target: any; source: any; time: any; distance: any }) => {
			const reverseEdge = {
				source: edge.target,
				target: edge.source,
				time: edge.time,
				distance: edge.distance,
			};
			bidirectionalEdges.push(edge);
			bidirectionalEdges.push(reverseEdge);
		}
	);
	return bidirectionalEdges;
};

const graphData = {
	nodes: ['A', 'B', 'C', 'D', 'E', 'F'],
	edges: makeEdgesBidirectional([
		{ source: 'A', target: 'B', time: 5, distance: 1.5 },
		{ source: 'A', target: 'C', time: 10, distance: 2.5 },
		{ source: 'B', target: 'D', time: 15, distance: 3.2 },
		{ source: 'D', target: 'F', time: 20, distance: 4.5 },
		{ source: 'F', target: 'E', time: 10, distance: 2.3 },
		{ source: 'E', target: 'C', time: 35, distance: 7 },
		{ source: 'C', target: 'A', time: 7, distance: 2 },
		{ source: 'B', target: 'E', time: 20, distance: 4.6 },
		{ source: 'C', target: 'D', time: 5, distance: 1.5 },
	]),
};

const findShortestPath = (source: string, destination: string) => {
	const nodes = graphData.nodes;
	const edges = graphData.edges.reduce((acc: any, edge: any) => {
		acc[edge.source] = [...(acc[edge.source] || []), edge];
		acc[edge.target] = [
			...(acc[edge.target] || []),
			{ ...edge, source: edge.target, target: edge.source },
		];
		return acc;
	}, {});

	const visitedForward: any = {};
	const visitedBackward: any = {};
	const distancesForward: any = {};
	const distancesBackward: any = {};
	const previousForward: any = {};
	const previousBackward: any = {};
	let intersectionNode: string | null = null;
	let minTotalDistance = Infinity;

	nodes.forEach((node: string) => {
		distancesForward[node] = Infinity;
		distancesBackward[node] = Infinity;
		previousForward[node] = null;
		previousBackward[node] = null;
	});

	distancesForward[source] = 0;
	distancesBackward[destination] = 0;

	while (true) {
		let currentNodeForward: string | null = null;
		let minDistanceForward = Infinity;
		for (const node of Object.keys(distancesForward)) {
			if (
				!visitedForward[node] &&
				distancesForward[node] < minDistanceForward
			) {
				currentNodeForward = node;
				minDistanceForward = distancesForward[node];
			}
		}

		if (currentNodeForward === null || minDistanceForward === Infinity) break;
		visitedForward[currentNodeForward] = true;

		if (visitedBackward[currentNodeForward]) {
			const totalDistance =
				distancesForward[currentNodeForward] +
				distancesBackward[currentNodeForward];
			if (totalDistance < minTotalDistance) {
				minTotalDistance = totalDistance;
				intersectionNode = currentNodeForward;
			}
		}

		if (currentNodeForward !== null && edges[currentNodeForward]) {
			edges[currentNodeForward].forEach((edge: any) => {
				const distance = distancesForward[currentNodeForward] + edge.time;
				if (distance < distancesForward[edge.target]) {
					distancesForward[edge.target] = distance;
					previousForward[edge.target] = currentNodeForward;
				}
			});
		}

		let currentNodeBackward: string | null = null;
		let minDistanceBackward = Infinity;
		for (const node of Object.keys(distancesBackward)) {
			if (
				!visitedBackward[node] &&
				distancesBackward[node] < minDistanceBackward
			) {
				currentNodeBackward = node;
				minDistanceBackward = distancesBackward[node];
			}
		}

		if (currentNodeBackward === null || minDistanceBackward === Infinity) break;
		visitedBackward[currentNodeBackward] = true;

		if (visitedForward[currentNodeBackward]) {
			const totalDistance =
				distancesForward[currentNodeBackward] +
				distancesBackward[currentNodeBackward];
			if (totalDistance < minTotalDistance) {
				minTotalDistance = totalDistance;
				intersectionNode = currentNodeBackward;
			}
		}

		if (currentNodeBackward !== null && edges[currentNodeBackward]) {
			edges[currentNodeBackward].forEach((edge: any) => {
				const distance = distancesBackward[currentNodeBackward] + edge.time;
				if (distance < distancesBackward[edge.target]) {
					distancesBackward[edge.target] = distance;
					previousBackward[edge.target] = currentNodeBackward;
				}
			});
		}
	}

	if (intersectionNode === null) {
		console.log('No intersection found. Unable to find a path.');
		return null;
	}

	let pathForward: string[] = [];
	let currentForward = intersectionNode;
	while (currentForward !== null) {
		pathForward.unshift(currentForward);
		currentForward = previousForward[currentForward];
	}

	let pathBackward: string[] = [];
	let currentBackward = intersectionNode;
	while (currentBackward !== null) {
		pathBackward.push(currentBackward);
		currentBackward = previousBackward[currentBackward];
	}

	const fullPath = pathForward.concat(pathBackward.slice(1));

	const totalTime = fullPath.reduce((acc, node, index) => {
		if (index > 0) {
			const edge = graphData.edges.find(
				(e: any) => e.source === fullPath[index - 1] && e.target === node
			);
			if (edge) {
				return acc + edge.time;
			}
		}
		return acc;
	}, 0);

	const totalDistance = fullPath.reduce((acc, node, index) => {
		if (index > 0) {
			const edge = graphData.edges.find(
				(e: any) => e.source === fullPath[index - 1] && e.target === node
			);
			if (edge) {
				return acc + edge.distance;
			}
		}
		return acc;
	}, 0);

	return {
		path: fullPath,
		time: totalTime,
		distance: totalDistance,
	};
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const { source, destination } = req.query;
	const shortestPath = findShortestPath(String(source), String(destination));

	res.status(200).json(shortestPath);
};
