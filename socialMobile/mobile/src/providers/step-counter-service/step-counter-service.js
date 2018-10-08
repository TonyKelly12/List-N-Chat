var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Health } from '@ionic-native/health';
/*
  This class is used to access the step counter.
*/
var StepCounterServiceProvider = /** @class */ (function () {
    function StepCounterServiceProvider(health, platform) {
        this.health = health;
        this.platform = platform;
    }
    /**
     * Initialize Google Fit/HealthKit.  If Google Fit is not installed and this is an android phone, then force an install.
     * @return [description]
     */
    StepCounterServiceProvider.prototype.init = function (observer) {
        var _this = this;
        var promise = new Promise(function (response, reject) {
            _this.platform.ready()
                .then(function (readyDevice) {
                console.log('Platform Ready! (' + readyDevice + ')');
                var databaseName;
                if (_this.platform.is('android')) {
                    databaseName = 'Google Fit';
                }
                else if (_this.platform.is('ios')) {
                    databaseName = 'HealthKit';
                }
                else {
                    databaseName = 'Health DB';
                }
                _this.health.isAvailable()
                    .then(function (available) {
                    if (!available && _this.platform.is('android')) {
                        observer.onError('GoogleFit not installed. Please install.');
                        return _this.health.promptInstallFit()
                            .then(function () {
                            return _this.health.requestAuthorization([{ read: ['steps'] }])
                                .then(function (auth) {
                                console.log('Authorization Success: ' + auth);
                                _this.queryStepsInMonth().then(function (values) {
                                    // Do a deep copy
                                    var stepData = JSON.parse(JSON.stringify(values));
                                    observer.onData(stepData);
                                    response(true);
                                });
                            })
                                .catch(function (error) {
                                var str = 'Unable to get authorization: ' + error;
                                reject(str);
                            });
                        })
                            .catch(function (error) {
                            var str = 'Unable to install Fit: ' + error;
                            reject(str);
                        });
                    }
                    else {
                        return _this.health.requestAuthorization([{ read: ['steps'] }])
                            .then(function (auth) {
                            console.log('Authorization Success: ' + auth);
                            _this.queryStepsInMonth().
                                then(function (values) {
                                // Do a deep copy
                                var stepData = JSON.parse(JSON.stringify(values));
                                observer.onData(stepData);
                                response(true);
                            })
                                .catch(function (error) {
                                var str = 'Unable to query steps: ' + error;
                                reject(str);
                            });
                        })
                            .catch(function (error) {
                            var str = 'Unable to get authorization to use ' + databaseName;
                            reject(str);
                        });
                    }
                })
                    .catch(function (error) {
                    var str = databaseName + " is not available: " + error;
                    reject(str);
                });
            })
                .catch(function (error) {
                var str = "Device not ready: " + error;
                reject(str);
            });
        });
        return promise;
    };
    /**
     * Query Fit/HealthKit the accumulated steps over each individual day.
     * @param  numDays Number of days, starting from midnight of the first day to now.
     * @return         The HealthData collected over each day.
     */
    StepCounterServiceProvider.prototype.queryStepsInMonth = function () {
        var dateAtEnd = new Date();
        var dateAtStart = new Date(dateAtEnd.getFullYear(), dateAtEnd.getMonth(), 1);
        console.log(dateAtStart + " to " + dateAtEnd);
        var stepOptions = {
            startDate: dateAtStart,
            endDate: dateAtEnd,
            dataType: 'steps',
            bucket: 'day'
        };
        return this.health.queryAggregated(stepOptions);
    };
    StepCounterServiceProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Health,
            Platform])
    ], StepCounterServiceProvider);
    return StepCounterServiceProvider;
}());
export { StepCounterServiceProvider };
//# sourceMappingURL=step-counter-service.js.map