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
var LocationTracker = /** @class */ (function () {
    function LocationTracker() {
        // To be defined elsewhere
        this.gymLocations = [{
                identifier: 'JimBot Home',
                radius: 200,
                latitude: 38.00285200,
                longitude: -87.52081800,
                notifyOnEntry: true,
                notifyOnExit: true
            }, {
                identifier: 'JimBot Work',
                radius: 200,
                latitude: 37.983197,
                longitude: -87.460946,
                notifyOnEntry: true,
                notifyOnExit: true
            }];
    }
    LocationTracker.prototype.initialize = function () {
        var _this = this;
        this.bgGeo = window.BackgroundGeolocation;
        if (!this.bgGeo)
            return;
        // Watch for geofence events
        this.bgGeo.on('geofence', (function (geofence) {
            console.log("LocationTracker: Geofence Triggered - " + geofence.identifier + " " + geofence.action);
        }));
        // Background geolocation configuration
        this.bgGeo.configure({
            // Application config
            geofenceInitialTriggerEntry: true,
            stopOnTerminate: false,
            startOnBoot: true,
            locationAuthorizationAlert: {
                titleWhenNotEnabled: 'Location Services are not Enabled',
                titleWhenOff: 'Location Services Are Off',
                instructions: 'Please enable "Always" in Location Services',
                cancelButton: 'Cancel',
                settingsButton: 'Settings'
            },
            debug: true // <-- Debug sounds & notifications.
        }, (function (state) {
            console.log("LocationTracker Enabled");
            if (!state.enabled) { // Not already running in background
                _this.bgGeo.startGeofences(function () {
                    console.log("LocationTracker: Geofence Monitoring Started...");
                    // Add coordinates for gym(s)
                    console.log("LocationTracker: Adding Geofence(s)...");
                    _this.bgGeo.addGeofences(_this.gymLocations);
                });
            }
            else { // Already running in background
                console.log("LocationTracker: Geofence Monitoring Ongoing...");
                // Check that defined geofences are already added and, if not, add them
                _this.bgGeo.getGeofences(function (geofences) {
                    console.log("LocationTracker: Checking Geofence(s)...");
                    _this.gymLocations.forEach(function (gymLocation) {
                        if (!geofences.includes(gymLocation)) {
                            _this.bgGeo.addGeofence(gymLocation);
                        }
                    });
                }); // Geofences check
            } // bgGeo state enabled
        })); // bgGeo state
    };
    LocationTracker.prototype.dumpLog = function () {
        this.bgGeo.getLog(function (log) {
            console.log(log);
        });
    };
    LocationTracker = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [])
    ], LocationTracker);
    return LocationTracker;
}());
export { LocationTracker };
//# sourceMappingURL=location-tracker.js.map