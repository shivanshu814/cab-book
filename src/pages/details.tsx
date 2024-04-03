/** @format */

import React from 'react';
import { useRouter } from 'next/router';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Details: React.FC = () => {
	const router = useRouter();
	const { totalKilometers, source, destination, price } = router.query;

	const handleCancel = () => {
		toast.info('Your cab has been canceled.', { autoClose: 3000 });
		setTimeout(() => {
			router.back();
		}, 3000);
	};

	return (
		<div className='container mx-auto px-4 mt-8'>
			<h1 className='text-4xl font-bold mb-8 text-center text-gray-800 dark:text-white'>
				Booking Details
			</h1>
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
				<div className='bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md p-6'>
					<h2 className='text-xl font-semibold mb-2 text-gray-800 dark:text-white'>
						Total Kilometers
					</h2>
					<p className='text-gray-700 dark:text-gray-300'>
						{totalKilometers} km
					</p>
				</div>
				<div className='bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md p-6'>
					<h2 className='text-xl font-semibold mb-2 text-gray-800 dark:text-white'>
						Source
					</h2>
					<p className='text-gray-700 dark:text-gray-300'>{source}</p>
				</div>
				<div className='bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md p-6'>
					<h2 className='text-xl font-semibold mb-2 text-gray-800 dark:text-white'>
						Destination
					</h2>
					<p className='text-gray-700 dark:text-gray-300'>{destination}</p>
				</div>
				<div className='bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md p-6'>
					<h2 className='text-xl font-semibold mb-2 text-gray-800 dark:text-white'>
						Total Price
					</h2>
					<p className='text-gray-700 dark:text-gray-300'>Rs {price}</p>
				</div>
			</div>
			<div className='mt-8 text-center'>
				<button
					onClick={handleCancel}
					className='bg-red-500 hover:bg-red-600 text-white py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out'>
					Cancel Booking
				</button>
			</div>
			<ToastContainer />
		</div>
	);
};

export default Details;
