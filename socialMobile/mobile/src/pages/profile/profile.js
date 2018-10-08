var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { NavController, ActionSheetController, AlertController, NavParams, IonicPage, Platform } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireStorage } from 'angularfire2/storage';
import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { ImageCapture } from '../../classes/image-capture/image-capture';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { ProfileVisibility } from '../../providers/profile-data/profile-data';
import { finalize } from 'rxjs/operators';
import { AngularFireAuth } from '../../../node_modules/angularfire2/auth';
var IN_TO_FT = 12;
var IN_TO_CM = 2.54;
var LB_TO_KG = 0.45359237;
//let JIMBOT_AUTH;
var Profile = /** @class */ (function () {
    function Profile(navCtrl, navParams, formBuilder, actionSheetCtrl, alertCtrl, platform, camera, file, sanitizer, afs, afStorage, auth, afAuth) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.formBuilder = formBuilder;
        this.actionSheetCtrl = actionSheetCtrl;
        this.alertCtrl = alertCtrl;
        this.platform = platform;
        this.camera = camera;
        this.file = file;
        this.sanitizer = sanitizer;
        this.afs = afs;
        this.afStorage = afStorage;
        this.auth = auth;
        this.afAuth = afAuth;
        this.isMyProfile = false;
        this.editMode = false;
        this.submitAttempt = false;
        this.ProfileVisibility = ProfileVisibility;
        this.profileForm = {
            username: '',
            userPhoto: '',
            shortBio: '',
            firstName: '',
            lastName: '',
            birthDate: '',
            height: '',
            weight: '',
            profileVisibility: ProfileVisibility.friends
        };
        this.heightFt = '';
        this.heightIn = '';
        this.weightLbs = '';
        var testRef = this.afAuth.authState.subscribe(function (user) {
            _this.currentUserID = user.uid;
            _this.currentUser = _this.afs.collection('people').doc(_this.currentUserID).valueChanges();
        });
        //if (!JIMBOT_AUTH) JIMBOT_AUTH = this.auth.getJimbotUser();
        // Get passed-in properties
        var profileID = (navParams.get('profileID')) ? navParams.get('profileID') : '';
        if (profileID) {
            // Is this my profile or someone else's?
            if (profileID == this.currentUserID) {
                this.isMyProfile = true;
                this.subscription = this.currentUser.subscribe(function (profileData) {
                    _this.loadProfileForm(profileData);
                });
            }
        }
        // Build the profile form
        this.profilePage = this.formBuilder.group({
            username: ['', Validators.compose([Validators.required])],
            shortBio: ['', Validators.compose([Validators.required])],
            firstName: ['', Validators.compose([Validators.required])],
            lastName: ['', Validators.compose([Validators.required])],
            birthDate: ['', Validators.compose([Validators.required])],
            heightFt: ['', Validators.compose([Validators.required, Validators.pattern('^[2-9]')])],
            heightIn: ['', Validators.compose([Validators.required, Validators.pattern('^[2-9]|1[0-2]?')])],
            weightLbs: ['', Validators.compose([Validators.required, Validators.pattern('^[1-9][0-9][0-9]?')])],
            profileVisibility: ['', Validators.compose([Validators.required])]
        });
    }
    Profile.prototype.ionViewCanEnter = function () {
        //console.log(this.auth.getAuthStatus())
        var authStatus = this.auth.getAuthStatus();
        if (authStatus === true) {
            return this.auth.getAuthStatus();
        }
        else {
            this.navCtrl.setRoot('LoginPage');
        }
    };
    Profile.prototype.ionViewDidLoad = function () {
        //**Gets logged in user creds */
        //console.log(JIMBOT_AUTH);
    };
    Profile.prototype.ionViewCanLeave = function () {
        // No need to save data if viewing another's profile
        if (!this.isMyProfile)
            return true;
        if (this.editMode) {
            this.saveProfile();
            return true;
        }
    };
    // Load profile form
    Profile.prototype.loadProfileForm = function (profileData) {
        this.profileForm.username = profileData.username;
        this.profileForm.userPhoto = profileData.photoURL;
        this.profileForm.shortBio = profileData.short_bio;
        this.profileForm.firstName = profileData.first_name;
        this.profileForm.lastName = profileData.last_name;
        this.profileForm.birthDate = profileData.birth_date;
        this.profileForm.height = Number(profileData.height).toString();
        this.heightFt = (this.profileForm.height != '0') ?
            Math.trunc(Number(this.profileForm.height) / IN_TO_CM / IN_TO_FT).toString() :
            this.profileForm.height;
        this.heightIn = (this.profileForm.height != '0') ?
            Math.trunc(Number(this.profileForm.height) / IN_TO_CM % IN_TO_FT).toString() :
            this.profileForm.height;
        this.profileForm.weight = Number(profileData.weight).toString();
        this.weightLbs = (this.profileForm.weight != '0') ? (Number(this.profileForm.weight) / LB_TO_KG).toString() :
            this.profileForm.weight;
        this.profileForm.profileVisibility = (profileData.profileVisibility) ? profileData.profileVisibility :
            ProfileVisibility.friends;
    };
    // Set 'Edit' mode from Edit button
    Profile.prototype.editProfile = function () {
        console.log("Editing Profile Data.");
        this.editMode = true;
    };
    Profile.prototype.setProfilePic = function () {
        var _this = this;
        if (!(this.editMode) || !(this.platform.is('cordova')))
            return;
        // Build actionsheet for user to choose to take a picture or select one from their photo library
        var actionSheet = this.actionSheetCtrl.create({
            buttons: [{
                    text: "Load from photo library",
                    handler: function () { _this.getProfilePicture(_this.camera.PictureSourceType.PHOTOLIBRARY); }
                }, {
                    text: "Take a photo",
                    handler: function () { _this.getProfilePicture(_this.camera.PictureSourceType.CAMERA); }
                }, {
                    text: "Cancel",
                    role: "cancel"
                }]
        });
        actionSheet.present();
    };
    Profile.prototype.getProfilePicture = function (cameraSourceType) {
        var _this = this;
        var imageCapture = new ImageCapture(this.camera, this.file);
        imageCapture.loadImage(cameraSourceType).then(function (image) {
            _this.newImage = image;
        });
    };
    Profile.prototype.saveProfile = function () {
        var _this = this;
        this.submitAttempt = true;
        if (this.profilePage.valid) { // Input fields validate
            console.log("Saving Profile Data.");
            // Save profile data
            var personUpdate_1 = {};
            Object.keys(this.profilePage.controls).forEach(function (key) {
                var value = _this.profilePage.get(key).value;
                switch (key) {
                    case 'username':
                        personUpdate_1['username'] = value;
                        break;
                    case 'shortBio':
                        personUpdate_1['short_bio'] = value;
                        break;
                    case 'firstName':
                        personUpdate_1['first_name'] = value;
                        break;
                    case 'lastName':
                        personUpdate_1['last_name'] = value;
                        break;
                    case 'birthDate':
                        personUpdate_1['birth_date'] = value;
                        break;
                    case 'heightFt':
                        var heightFt = Number(value) * IN_TO_FT * IN_TO_CM;
                        personUpdate_1['height'] = (personUpdate_1['height']) ? personUpdate_1['height'] + heightFt : heightFt;
                        break;
                    case 'heightIn':
                        var heightIn = Number(value) * IN_TO_CM;
                        personUpdate_1['height'] = (personUpdate_1['height']) ? personUpdate_1['height'] + heightIn : heightIn;
                        break;
                    case 'weightLbs':
                        personUpdate_1['weight'] = Number(value) * LB_TO_KG;
                        break;
                    case 'profileVisibility':
                        personUpdate_1['profile_visibility'] = value;
                        break;
                }
            });
            this.updatePerson(personUpdate_1);
            this.editMode = false;
            this.resetSubmitAttempt();
        }
        else { // Input fields do not validate
            console.log("Not Saving Profile Data.");
        }
    };
    Profile.prototype.updatePerson = function (personData) {
        var peopleCollectionRef = this.afs.collection('people');
        var myPersonRef = peopleCollectionRef.doc(this.currentUserID);
        Object.keys(personData).forEach(function (key) {
            var _a;
            var fieldUpdate = (_a = {}, _a[key] = personData[key], _a);
            myPersonRef.update(fieldUpdate);
        });
        if (this.newImage) {
            var filePath = ("avatars/" + this.currentUserID + ".jpg");
            var imageRef_1 = this.afStorage.ref(filePath);
            var upload = imageRef_1.putString(this.newImage, 'data_url');
            upload.snapshotChanges().pipe(finalize(function () {
                imageRef_1.getDownloadURL().subscribe(function (downloadURL) {
                    myPersonRef.update({ photoURL: downloadURL });
                });
            }))
                .subscribe();
        }
    };
    // Reset submitAttempt boolean
    Profile.prototype.resetSubmitAttempt = function () {
        this.submitAttempt = false;
    };
    Profile.prototype.showGymsPage = function () {
        this.navCtrl.push('GymsPage');
    };
    Profile.prototype.ngOnDestroy = function () {
        if (this.subscription)
            this.subscription.unsubscribe();
    };
    Profile = __decorate([
        IonicPage(),
        Component({
            templateUrl: 'profile.html',
            providers: [AuthServiceProvider]
        }),
        __metadata("design:paramtypes", [NavController, NavParams, FormBuilder,
            ActionSheetController, AlertController,
            Platform, Camera, File, DomSanitizer,
            AngularFirestore, AngularFireStorage, AuthServiceProvider, AngularFireAuth])
    ], Profile);
    return Profile;
}());
export { Profile };
//# sourceMappingURL=profile.js.map