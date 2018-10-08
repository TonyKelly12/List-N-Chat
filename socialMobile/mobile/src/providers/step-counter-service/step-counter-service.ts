import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Health, HealthQueryOptionsAggregated, HealthData } from '@ionic-native/health';

/**
 * General observer that receives evenst from the health plugins.
 * @param error [description]
 */
export interface HealthObserver {
	onError(error: string): void;
	onSuccess(message: string): void;
	onData(data: HealthData[]): void;
}
/*
  This class is used to access the step counter.
*/
@Injectable()
export class StepCounterServiceProvider {

	constructor(
		private health: Health,
		public platform: Platform, ) {
	}

	/**
	 * Initialize Google Fit/HealthKit.  If Google Fit is not installed and this is an android phone, then force an install.
	 * @return [description]
	 */
	public init(observer: HealthObserver): Promise<boolean> {
		const promise = new Promise<boolean>((response, reject) => {
			this.platform.ready()
				.then((readyDevice: string) => {
					console.log('Platform Ready! (' + readyDevice + ')');

					let databaseName: string;
					if (this.platform.is('android')) {
						databaseName = 'Google Fit';
					} else if (this.platform.is('ios')) {
						databaseName = 'HealthKit';
					} else {
						databaseName = 'Health DB';
					}
					this.health.isAvailable()
						.then(available => {
							if (!available && this.platform.is('android')) {
								observer.onError('GoogleFit not installed. Please install.');
								return this.health.promptInstallFit()
									.then(() => {
										return this.health.requestAuthorization([{ read: ['steps'] }])
											.then((auth) => {
												console.log('Authorization Success: ' + auth);
												this.queryStepsInMonth().then((values) => {
													// Do a deep copy
													const stepData = JSON.parse(JSON.stringify(values));
													observer.onData(stepData);
													response(true);
												})
											})
											.catch((error) => {
												const str = 'Unable to get authorization: ' + error;
												reject(str);
											});
									})
									.catch((error) => {
										const str = 'Unable to install Fit: ' + error;
										reject(str);
									})
							} else {
								return this.health.requestAuthorization([{ read: ['steps'] }])
									.then((auth) => {
										console.log('Authorization Success: ' + auth);
										this.queryStepsInMonth().
											then((values) => {
												// Do a deep copy
												const stepData = JSON.parse(JSON.stringify(values));
												observer.onData(stepData);
												response(true);
											})
											.catch((error) => {
												const str = 'Unable to query steps: ' + error;
												reject(str);
											});
									})
									.catch((error) => {
										const str = 'Unable to get authorization to use ' + databaseName;
										reject(str);
									});
							}
						})
						.catch((error) => {
							const str = databaseName + " is not available: " + error;
							reject(str);
						});
				})
				.catch((error) => {
					const str = "Device not ready: " + error;
					reject(str);
				})
		});
		return promise;
	}

	/**
	 * Query Fit/HealthKit the accumulated steps over each individual day.
	 * @param  numDays Number of days, starting from midnight of the first day to now.
	 * @return         The HealthData collected over each day.
	 */
	private queryStepsInMonth(): Promise<HealthData[]> {
		const dateAtEnd: Date = new Date();
		const dateAtStart: Date = new Date(dateAtEnd.getFullYear(), dateAtEnd.getMonth(), 1);

		console.log(dateAtStart + " to " + dateAtEnd);

		const stepOptions: HealthQueryOptionsAggregated = {
			startDate: dateAtStart,
			endDate: dateAtEnd,
			dataType: 'steps',
			bucket: 'day'
		}

		return this.health.queryAggregated(stepOptions);
	}
}
