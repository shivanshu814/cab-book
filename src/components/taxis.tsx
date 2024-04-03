/** @format */

import React from 'react';
import TaxiOption from '@/components/TaxiOption';

const Taxis: React.FC<{
	shortestDistance: number;
	source: string;
	destination: string;
}> = ({ shortestDistance, source, destination }) => {
	const taxiOptions = [
		{
			basePrice: 10,
			imageUrl:
				'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ33XPUHRXS_g4ASon21yJ4ZiSr9bcVb5lKOw&s',
		},
		{
			basePrice: 20,
			imageUrl:
				'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSPjR8ZadzqkTsnUPD8M88ErqM4yY9lreAHA&s',
		},
		{
			basePrice: 50,
			imageUrl:
				'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN7A8oAggr6XHGwBNj7Ed5ons6Mifdr_IeSw&s',
		},
		{
			basePrice: 100,
			imageUrl:
				'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSC97NxFO0wJA2ky9OAikp-l99o-3vuWE7Kxw&s',
		},
		{
			basePrice: 150,
			imageUrl:
				'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3gvmr--jbuv0LI6p-57y76JLfybasHiAFCQ&s',
		},
	];
	const calculatePrice = (basePrice: number) => basePrice * shortestDistance;

	return (
		<div>
			<main className='container mx-auto px-4 mt-8'>
				<h1 className='text-4xl font-bold mb-8 text-center'>Choose a Taxi</h1>
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
					{taxiOptions.map((option, index) => (
						<TaxiOption
							shortestDistance={shortestDistance}
							key={index}
							price={calculatePrice(option.basePrice)}
							imageUrl={option.imageUrl}
							source={source}
							destination={destination}
						/>
					))}
				</div>
			</main>
		</div>
	);
};

export default Taxis;
