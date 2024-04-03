/** @format */

import React, { useState } from 'react';
import { useRouter } from 'next/router';

interface TaxiOptionProps {
	shortestDistance: number;
	destination: string;
	source: string;
	price: number;
	imageUrl: string;
}

const TaxiOption: React.FC<TaxiOptionProps> = ({
	shortestDistance,
	destination,
	source,
	price,
	imageUrl,
}) => {
	const router = useRouter();
	const [email, setEmail] = useState('');

	const handleBook = async () => {
		const bookingDetails = {
			totalKilometers: shortestDistance,
			source: `Your source location: ${source}`,
			destination: `Your destination location: ${destination}`,
			price: price * shortestDistance,
			email: email,
		};

		try {
			const response = await fetch('/api/mailing', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(bookingDetails),
			});

			if (response.ok) {
				console.log('Booking successful. Email sent.');
				router.push({
					pathname: '/details',
					query: bookingDetails,
				});
			} else {
				console.error('Error:', response.statusText);
			}
		} catch (error) {
			console.error('Error:', error);
		}
	};

	return (
		<div className='border rounded-lg overflow-hidden shadow-lg transition duration-300 ease-in-out transform hover:scale-105'>
			<div className='w-full h-64'>
				<img src={imageUrl} alt='Taxi' className='object-cover w-full h-full' />
			</div>
			<div className='p-4 bg-gray-800 text-white'>
				<p className='text-xl font-semibold mb-2'>${price} per km</p>
				<input
					type='email'
					placeholder='Enter your email'
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					className='bg-white rounded-md px-3 py-2 mb-2 w-full'
					style={{ color: 'black' }}
				/>
				<button
					onClick={handleBook}
					className='bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition duration-300 ease-in-out'>
					Book Cab
				</button>
			</div>
		</div>
	);
};

export default TaxiOption;
