/** @format */

import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

type BookingDetails = {
	totalKilometers: number;
	source: string;
	destination: string;
	price: number;
	email: string;
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === 'POST') {
		const {
			totalKilometers,
			source,
			destination,
			price,
			email,
		}: BookingDetails = req.body;

		try {
			await sendEmail({ totalKilometers, source, destination, price, email });
			res.status(200).json({ message: 'Booking successful. Email sent.' });
		} catch (error) {
			res.status(500).json({ message: 'Error sending email.' });
		}
	} else {
		res.status(405).json({ message: 'Method not allowed' });
	}
}
async function sendEmail(bookingDetails: BookingDetails) {
	console.log(bookingDetails);
	const transporter = nodemailer.createTransport({
		service: 'gmail',
		host: 'smtp.gmail.com',
		port: 587,
		auth: {
			user: 'shivanshupathak08012004@gmail.com',
			pass: 'kxgg nidq ufhh uouk',
		},
	});

	const mailOptions = {
		from: {
			name: 'Cab Booking Service Shivanshu',
			address: 'shivanshupathak08012004@gmail.com',
		},
		to: [bookingDetails.email],
		subject: 'Booking Confirmation',
		html: `
			<!DOCTYPE html>
			<html
				xmlns:v="urn:schemas-microsoft-com:vml"
				xmlns:o="urn:schemas-microsoft-com:office:office"
				lang="en"
			>
				<head>
					<title></title>
					<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
					<meta name="viewport" content="width=device-width, initial-scale=1.0" />
					<style>
						* {
							box-sizing: border-box;
						}

						body {
							margin: 0;
							padding: 0;
						}

						a[x-apple-data-detectors] {
							color: inherit !important;
							text-decoration: inherit !important;
						}

						#MessageViewBody a {
							color: inherit;
							text-decoration: none;
						}

						p {
							line-height: inherit;
						}

						.desktop_hide,
						.desktop_hide table {
							mso-hide: all;
							display: none;
							max-height: 0px;
							overflow: hidden;
						}

						.image_block img + div {
							display: none;
						}

						@media (max-width: 620px) {
							.desktop_hide table.icons-inner {
								display: inline-block !important;
							}

							.icons-inner {
								text-align: center;
							}

							.icons-inner td {
								margin: 0 auto;
							}

							.image_block div.fullWidth {
								max-width: 100% !important;
							}

							.mobile_hide {
								display: none;
							}

							.row-content {
								width: 100% !important;
							}

							.stack .column {
								width: 100%;
								display: block;
							}

							.mobile_hide {
								min-height: 0;
								max-height: 0;
								max-width: 0;
								overflow: hidden;
								font-size: 0px;
							}

							.desktop_hide,
							.desktop_hide table {
								display: table !important;
								max-height: none !important;
							}
						}
					</style>
				</head>

				<body
					style="
						background-color: #ffffff;
						margin: 0;
						padding: 0;
						-webkit-text-size-adjust: none;
						text-size-adjust: none;
					"
				>
					<table
						class="nl-container"
						width="100%"
						border="0"
						cellpadding="0"
						cellspacing="0"
						role="presentation"
						style="
							mso-table-lspace: 0pt;
							mso-table-rspace: 0pt;
							background-color: #ffffff;
						"
					>
						<tbody>
							<tr>
								<td>
									<table
										class="row row-2"
										align="center"
										width="100%"
										border="0"
										cellpadding="0"
										cellspacing="0"
										role="presentation"
										style="
											mso-table-lspace: 0pt;
											mso-table-rspace: 0pt;
											background-color: #132437;
										"
									>
										<tbody>
											<tr>
												<td>
													<table
														class="row-content stack"
														align="center"
														border="0"
														cellpadding="0"
														cellspacing="0"
														role="presentation"
														style="
															mso-table-lspace: 0pt;
															mso-table-rspace: 0pt;
															background-position: center top;
															color: #000000;
															background-color: #ffffff;
															width: 600px;
															margin: 0 auto;
															margin-top: 100px;
															border-top-left-radius: 50px;
															border-top-right-radius: 50px;
														"
														width="600"
													>
														<tbody>
															<tr>
																<td
																	class="column column-1"
																	width="100%"
																	style="
																		mso-table-lspace: 0pt;
																		mso-table-rspace: 0pt;
																		font-weight: 400;
																		text-align: left;
																		vertical-align: top;
																		border-top: 0px;
																		border-right: 0px;
																		border-bottom: 0px;
																		border-left: 0px;
																	"
																>
																	<table
																		class="image_block block-1"
																		width="100%"
																		border="0"
																		cellpadding="0"
																		cellspacing="0"
																		role="presentation"
																		style="
																			mso-table-lspace: 0pt;
																			mso-table-rspace: 0pt;
																		"
																	>
																		<tr>
																			<td
																				class="pad"
																				style="
																					width: 100%;
																					padding-right: 0px;
																					padding-left: 0px;
																				"
																			>
																				<div
																					class="alignment"
																					align="center"
																					style="line-height: 10px"
																				>
																					<div
																						class="fullWidth"
																						style="max-width: 600px"
																					>
																						<img
																							src="https://images.unsplash.com/flagged/photo-1553505192-acca7d4509be?ixlib=rb-4.0.3"
																							style="
																								display: block;
																								height: auto;
																								border: 0;
																								width: 100%;
																								border-top-left-radius: 50px;
																								border-top-right-radius: 50px;
																							"
																							width="600"
																							height="auto"
																						/>
																					</div>
																				</div>
																			</td>
																		</tr>
																	</table>
																</td>
															</tr>
														</tbody>
													</table>
												</td>
											</tr>
										</tbody>
									</table>
									<table
										class="row row-3"
										align="center"
										width="100%"
										border="0"
										cellpadding="0"
										cellspacing="0"
										role="presentation"
										style="
											mso-table-lspace: 0pt;
											mso-table-rspace: 0pt;
											background-color: #ff7d14;
											background-image: url('https://d1oco4z2z1fhwp.cloudfront.net/templates/default/4011/orange-gradient-wide.png');
											background-repeat: no-repeat;
										"
									>
										<tbody>
											<tr>
												<td>
													<table
														class="row-content stack"
														align="center"
														border="0"
														cellpadding="0"
														cellspacing="0"
														role="presentation"
														style="
															mso-table-lspace: 0pt;
															mso-table-rspace: 0pt;
															background-color: #ffffff;
															color: #000000;
															width: 600px;
															margin: 0 auto;
														"
														width="600"
													>
														<tbody>
															<tr>
																<td
																	class="column column-1"
																	width="100%"
																	style="
																		mso-table-lspace: 0pt;
																		mso-table-rspace: 0pt;
																		font-weight: 400;
																		text-align: left;
																		vertical-align: top;
																		border-top: 0px;
																		border-right: 0px;
																		border-bottom: 0px;
																		border-left: 0px;
																	"
																>
																	<table
																		class="heading_block block-1"
																		width="100%"
																		border="0"
																		cellpadding="0"
																		cellspacing="0"
																		role="presentation"
																		style="
																			mso-table-lspace: 0pt;
																			mso-table-rspace: 0pt;
																		"
																	>
																		<tr>
																			<td
																				class="pad"
																				style="
																					padding-bottom: 5px;
																					padding-top: 25px;
																					text-align: center;
																					width: 100%;
																				"
																			>
																				<h1
																					style="
																						margin: 0;
																						color: #555555;
																						direction: ltr;
																						font-family: Arial, Helvetica Neue,
																							Helvetica, sans-serif;
																						font-size: 36px;
																						font-weight: normal;
																						letter-spacing: normal;
																						line-height: 120%;
																						text-align: center;
																						margin-top: 0;
																						margin-bottom: 0;
																						mso-line-height-alt: 43.199999999999996px;
																					"
																				>
																					Booking confirmed for the cab!&nbsp;
																				</h1>
																			</td>
																		</tr>
																	</table>
																	<table
																		class="paragraph_block block-2"
																		width="100%"
																		border="0"
																		cellpadding="0"
																		cellspacing="0"
																		role="presentation"
																		style="
																			mso-table-lspace: 0pt;
																			mso-table-rspace: 0pt;
																			word-break: break-word;
																		"
																	>
																		<tr>
																			<td
																				class="pad"
																				style="
																					padding-bottom: 20px;
																					padding-left: 15px;
																					padding-right: 15px;
																					padding-top: 20px;
																				"
																			>
																				<div
																					style="
																						color: #737487;
																						font-family: Arial, Helvetica Neue,
																							Helvetica, sans-serif;
																						font-size: 18px;
																						line-height: 180%;
																						text-align: center;
																						mso-line-height-alt: 32.4px;
																					"
																				>
																					<p
																						style="margin: 0; word-break: break-word"
																					>
																						Your cab has been successfully booked.
																					</p>
																				</div>
																				<div
																					style="
																						color: #737487;
																						font-family: Arial, Helvetica Neue,
																							Helvetica, sans-serif;
																						font-size: 12px;
																						line-height: 180%;
																						text-align: center;
																						mso-line-height-alt: 32.4px;
																					"
																				>
																					<p>
																						<strong>Total Kilometers:</strong>
																						${bookingDetails.totalKilometers}
																					</p>
																					<p>
																						<strong>Source:</strong>
																						${bookingDetails.source}
																					</p>
																					<p>
																						<strong>Destination:</strong>
																						${bookingDetails.destination}
																					</p>
																					<p>
																						<strong>Price:</strong>
																						Rs ${bookingDetails.price}
																					</p>
																				</div>
																			</td>
																		</tr>
																	</table>
																	<table
																		class="button_block block-3"
																		width="100%"
																		border="0"
																		cellpadding="0"
																		cellspacing="0"
																		role="presentation"
																		style="
																			mso-table-lspace: 0pt;
																			mso-table-rspace: 0pt;
																		"
																	>
																		<tr>
																			<td
																				class="pad"
																				style="
																					padding-bottom: 20px;
																					padding-left: 15px;
																					padding-right: 15px;
																					padding-top: 20px;
																					text-align: center;
																				"
																			>
																				<div class="alignment" align="center">
																					<div
																						style="
																							text-decoration: none;
																							display: inline-block;
																							color: #ffffff;
																							background-color: #ff7d14;
																							border-radius: 4px;
																							width: auto;
																							border-top: 0px solid transparent;
																							font-weight: undefined;
																							border-right: 0px solid transparent;
																							border-bottom: 0px solid transparent;
																							border-left: 0px solid transparent;
																							padding-top: 10px;
																							padding-bottom: 10px;
																							font-family: Arial, Helvetica Neue,
																								Helvetica, sans-serif;
																							font-size: 16px;
																							text-align: center;
																							mso-border-alt: none;
																							word-break: keep-all;
																						"
																					>
																						<span
																							style="
																								padding-left: 60px;
																								padding-right: 60px;
																								font-size: 16px;
																								display: inline-block;
																								letter-spacing: normal;
																							"
																							><span
																								style="
																									word-break: break-word;
																									line-height: 32px;
																								"
																								>Booking Confirmed</span
																							></span
																						>
																					</div>
																				</div>
																			</td>
																		</tr>
																	</table>
																</td>
															</tr>
														</tbody>
													</table>
												</td>
											</tr>
										</tbody>
									</table>
									<table
										class="row row-4"
										align="center"
										width="100%"
										border="0"
										cellpadding="0"
										cellspacing="0"
										role="presentation"
										style="
											mso-table-lspace: 0pt;
											mso-table-rspace: 0pt;
											background-color: #ff7d14;
										"
									>
										<tbody>
											<tr>
												<td>
													<table
														class="row-content stack"
														align="center"
														border="0"
														cellpadding="0"
														cellspacing="0"
														role="presentation"
														style="
															mso-table-lspace: 0pt;
															mso-table-rspace: 0pt;
															background-position: center top;
															color: #000000;
															width: 600px;
															margin: 0 auto;
														"
														width="600"
													>
														<tbody>
															<tr>
																<td
																	class="column column-1"
																	width="100%"
																	style="
																		mso-table-lspace: 0pt;
																		mso-table-rspace: 0pt;
																		font-weight: 400;
																		text-align: left;
																		vertical-align: top;
																		border-top: 0px;
																		border-right: 0px;
																		border-bottom: 0px;
																		border-left: 0px;
																	"
																>
																	<table
																		class="image_block block-1"
																		width="100%"
																		border="0"
																		cellpadding="0"
																		cellspacing="0"
																		role="presentation"
																		style="
																			mso-table-lspace: 0pt;
																			mso-table-rspace: 0pt;
																		"
																	>
																		<tr>
																			<td
																				class="pad"
																				style="
																					width: 100%;
																					padding-right: 0px;
																					padding-left: 0px;
																				"
																			>
																				<div
																					class="alignment"
																					align="center"
																					style="line-height: 10px"
																				>
																					<div
																						class="fullWidth"
																						style="max-width: 600px"
																					>
																						<img
																							src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/4011/bottom-rounded.png"
																							style="
																								display: block;
																								height: auto;
																								border: 0;
																								width: 100%;
																							"
																							width="600"
																							height="auto"
																						/>
																					</div>
																				</div>
																			</td>
																		</tr>
																	</table>
																	<table
																		class="text_block block-2"
																		width="100%"
																		border="0"
																		cellpadding="0"
																		cellspacing="0"
																		role="presentation"
																		style="
																			mso-table-lspace: 0pt;
																			mso-table-rspace: 0pt;
																			word-break: break-word;
																		"
																	>
																		<tr>
																			<td
																				class="pad"
																				style="
																					padding-bottom: 5px;
																					padding-left: 5px;
																					padding-right: 5px;
																					padding-top: 30px;
																				"
																			>
																				<div style="font-family: sans-serif">
																					<div
																						class
																						style="
																							font-size: 12px;
																							font-family: Arial, Helvetica Neue,
																								Helvetica, sans-serif;
																							mso-line-height-alt: 14.399999999999999px;
																							color: #262b30;
																							line-height: 1.2;
																						"
																					>
																						<p
																							style="
																								margin: 0;
																								font-size: 14px;
																								text-align: center;
																								mso-line-height-alt: 16.8px;
																							"
																						>
																							© 2024 Scalar Ride | 456 Cab Ave. Urban
																							City, India 67890
																						</p>
																					</div>
																				</div>
																			</td>
																		</tr>
																	</table>
																	<table
																		class="text_block block-3"
																		width="100%"
																		border="0"
																		cellpadding="0"
																		cellspacing="0"
																		role="presentation"
																		style="
																			mso-table-lspace: 0pt;
																			mso-table-rspace: 0pt;
																			word-break: break-word;
																		"
																	>
																		<tr>
																			<td
																				class="pad"
																				style="
																					padding-bottom: 35px;
																					padding-left: 10px;
																					padding-right: 10px;
																					padding-top: 5px;
																				"
																			>
																				<div style="font-family: sans-serif">
																					<div
																						class
																						style="
																							font-size: 12px;
																							font-family: Arial, Helvetica Neue,
																								Helvetica, sans-serif;
																							mso-line-height-alt: 14.399999999999999px;
																							color: #262b30;
																							line-height: 1.2;
																						"
																					>
																						<p
																							style="
																								margin: 0;
																								font-size: 14px;
																								text-align: center;
																								mso-line-height-alt: 16.8px;
																							"
																						>
																							<span style="font-size: 12px"
																								>If you prefer not to receive
																								marketing emails form this list,
																								<a
																									style="
																										text-decoration: underline;
																										color: #262b30;
																									"
																									href="http://www.example.com"
																									target="_blank"
																									rel="noopener"
																									>click here to unsubscribe</a
																								>.</span
																							>
																						</p>
																					</div>
																				</div>
																			</td>
																		</tr>
																	</table>
																</td>
															</tr>
														</tbody>
													</table>
												</td>
											</tr>
										</tbody>
									</table>
								</td>
							</tr>
						</tbody>
					</table>
				</body>
			</html>
		`,
	};

	try {
		const info = await transporter.sendMail(mailOptions);
		console.log('Message sent: %s', info.messageId);
	} catch (error) {
		console.error('Error sending email:', error);
		throw error;
	}
}
