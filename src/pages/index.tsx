/** @format */

import React, { useState } from 'react';
import GraphComponent from '../components/GraphComponent';
import NavBar from '@/components/Navbar';
import Taxis from '@/components/taxis';

const Home: React.FC = () => {
	const [loading, setLoading] = useState<boolean>(false);
	const [source, setSource] = useState<string>('');
	const [destination, setDestination] = useState<string>('');
	const [directionData, setDirectionData] = useState<any>(null);
	const [showTaxis, setShowTaxis] = useState<boolean>(false);
	const [shortestDistance, setShortestDistance] = useState<number | null>(null);
	const [error, setError] = useState<string>('');

	const makeEdgesBidirectional = (edges: any[]) => {
		const bidirectionalEdges: {
			source: any;
			target: any;
			time: any;
			distance: any;
		}[] = [];
		edges.forEach((edge) => {
			const reverseEdge = {
				source: edge.target,
				target: edge.source,
				time: edge.time,
				distance: edge.distance,
			};
			bidirectionalEdges.push(edge);
			bidirectionalEdges.push(reverseEdge);
		});
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

	const handleSubmit = async () => {
		if (!source || !destination) {
			setError('Please enter both source and destination');
			return;
		}

		try {
			setLoading(true);
			const response = await fetch(
				`/api/shortestPath?source=${source.toLocaleUpperCase()}&destination=${destination.toLocaleUpperCase()}`
			);
			const data = await response.json();
			setDirectionData(data);
			setShowTaxis(true);
			setShortestDistance(data.distance);
			const scrollPosition = window.pageYOffset + 600;
			window.scrollTo({ top: scrollPosition, behavior: 'smooth' });
		} catch (error) {
			console.error('Error fetching shortest path:', error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<NavBar />
			<div className='flex flex-col md:flex-row p-8'>
				<div className='md:w-1/2 mr-0 md:mr-4'>
					<div className='space-y-4'>
						<div>
							<label className='block'>Source</label>
							<input
								type='text'
								placeholder='Enter source'
								className='border rounded-md px-4 py-2 w-full'
								value={source}
								onChange={(e) => setSource(e.target.value)}
								style={{ color: 'black' }}
							/>
						</div>
						<div>
							<label className='block'>Destination</label>
							<input
								type='text'
								placeholder='Enter destination'
								className='border rounded-md px-4 py-2 w-full'
								value={destination}
								onChange={(e) => setDestination(e.target.value)}
								style={{ color: 'black' }}
							/>
						</div>

						<button
							className='bg-blue-500 text-white px-4 py-2 rounded-md'
							onClick={handleSubmit}
							disabled={loading}>
							{loading ? 'Loading...' : 'Find Shortest Path'}
						</button>
						{error && <p className='text-red-500'>{error}</p>}
						{directionData && (
							<div className='bg-gray-100 rounded-lg p-4 mt-4'>
								<p className='text-gray-800 font-semibold mb-2'>
									Shortest Time:{' '}
									<span className='text-gray-600'>
										{directionData.time} minutes
									</span>
								</p>
								<p className='text-gray-800 font-semibold'>
									Shortest Distance:{' '}
									<span className='text-gray-600'>
										{directionData.distance} km
									</span>
								</p>
							</div>
						)}
					</div>
				</div>

				<div className='md:w-1/2 mt-4 md:mt-0 ml-0 md:ml-4'>
					<GraphComponent
						graphData={graphData}
						source={source}
						destination={destination}
					/>
				</div>
			</div>
			{showTaxis && (
				<Taxis
					shortestDistance={shortestDistance ?? 0}
					source={source}
					destination={destination}
				/>
			)}
		</>
	);
};

export default Home;
