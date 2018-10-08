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
import { IonicPage, NavController, NavParams, ActionSheetController, PopoverController } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { DataModelServiceService } from '../../providers/data-objects/data-objects';
import { AngularFireAuth } from '../../../node_modules/angularfire2/auth';
var FriendsListPage = /** @class */ (function () {
    function FriendsListPage(navCtrl, navParams, afStore, auth, ds, actionSheetCtrl, popoverCtrl, afAuth) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.afStore = afStore;
        this.auth = auth;
        this.ds = ds;
        this.actionSheetCtrl = actionSheetCtrl;
        this.popoverCtrl = popoverCtrl;
        this.afAuth = afAuth;
        this.userKey = 'ZaqYVsWT2sVAc70XJmhX';
        this.chatMatchArray = [];
        var uid = this.afAuth.authState.subscribe(function (user) {
            if (user) {
                _this.currentUserID = user.uid;
            }
        });
    }
    FriendsListPage.prototype.ionViewCanEnter = function () {
        var authStatus = this
            .auth
            .getAuthStatus();
        if (authStatus === true) {
            return this
                .auth
                .getAuthStatus();
        }
        else {
            this
                .navCtrl
                .setRoot('LoginPage');
        }
    };
    FriendsListPage.prototype.ngOnInit = function () {
        var _this = this;
        var userRef = this.afStore.collection('people').doc(this.currentUserID).ref;
        userRef.get().then(function (user) {
            _this.currentUser = user.data();
            console.log('init', _this.currentUser);
        });
    };
    FriendsListPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad FriendsListPage');
        this.friendsArray = this
            .afStore
            .collection('people')
            .doc(this.currentUserID)
            .collection('friendsList');
        this.friends = this
            .friendsArray
            .valueChanges();
    };
    FriendsListPage.prototype.invitePage = function () {
        this
            .navCtrl
            .setRoot("FriendInvitePage");
    };
    FriendsListPage.prototype.pendingRequestPage = function () {
        this
            .navCtrl
            .setRoot("FriendPendingPage");
    };
    ;
    FriendsListPage.prototype.openMessage = function (friend) {
        var _this = this;
        //GO through the users chats and get all that have the friend in it
        var userMessages = this
            .afStore
            .collection('people')
            .doc(this.currentUserID)
            .collection('chats', function (ref) { return ref.where('members.' + friend.uid, '==', true); }).ref;
        userMessages.get().then(function (chatArrRef$) {
            if (!chatArrRef$ || chatArrRef$ == undefined || chatArrRef$ == null || chatArrRef$.empty) {
                //if chatlist is empty create a new chat
                console.log('chat snapp is null');
                _this.createChat(friend);
            }
            else {
                //go through each chat that the selected friend is aprat of
                chatArrRef$.forEach(function (chatRef) {
                    var chat = chatRef.data();
                    var membersArray = Object.keys(chat.members);
                    //loop through each memeber involved in the chat
                    membersArray.forEach(function (member) {
                        if (member === friend.uid && member != 'theBot') {
                            _this.chatMatchArray.push(chat);
                        }
                        if (member === 'theBot' && friend.uid === 'theBot')
                            //TODO: don push to chat once bot can no longer be added to other chats
                            //instead call bot chat here
                            _this.chatMatchArray.push(chat);
                    });
                });
                console.log('chatMatch array', _this.chatMatchArray);
            }
            _this.callChat(_this.chatMatchArray, friend);
        });
    };
    //FIXME: Messes up during group chat and creats infinite loop of new chats 
    FriendsListPage.prototype.callChat = function (chatMatchArray, friend) {
        var _this = this;
        console.log('isEvery', chatMatchArray.every(this.onlyGroupChats));
        //if there are no chats in chatlist start new chat with friend
        if (chatMatchArray.length === 0 || chatMatchArray.length === undefined || chatMatchArray.length === null) {
            return this.createChat(friend);
        }
        else 
        //if there are only groupchats start new single chat with friend
        if (chatMatchArray.every(this.onlyGroupChats)) {
            return this.createChat(friend);
        }
        else if (chatMatchArray.length === 1) {
            chatMatchArray.forEach(function (chatRef) {
                var chat = chatRef;
                var userIDS = Object.keys(chat.members);
                if (userIDS.length === 2) {
                    return _this.navCtrl.setRoot('ChatsPage', chat);
                }
            });
        }
        else if (chatMatchArray.length >= 2) {
            //loop through each chat in array with the selected friend in it
            var singleChat = chatMatchArray.find(function (chat) { return _this.hasSingleChat(chat, friend); });
            console.log('single', singleChat);
            if (singleChat === undefined || !singleChat || singleChat === null) {
                return this.createChat(friend);
            }
            else {
                this.navCtrl.setRoot('ChatsPage', singleChat);
            }
        }
        this.chatMatchArray = [];
    };
    FriendsListPage.prototype.hasSingleChat = function (chatRef, friend) {
        console.log('call chat', chatRef);
        var chat = chatRef;
        //keys is an array of userIDs
        var userIDS = Object.keys(chat.members);
        if (userIDS.length === 2 && userIDS.includes(this.currentUserID) && userIDS.includes(friend.uid)) {
            console.log('chatMembers', chat);
            return chat;
        }
    };
    FriendsListPage.prototype.onlyGroupChats = function (chat) {
        var userKeys = Object.keys(chat.members);
        if (userKeys.length > 2)
            return chat;
    };
    FriendsListPage.prototype.createChat = function (friend) {
        var _this = this;
        var _a, _b;
        var newChat = this.ds.newChat();
        newChat.members = (_a = {},
            _a[this.currentUserID] = true,
            _a[friend.uid] = true,
            _a);
        newChat.photoURL = (_b = {},
            _b[this.currentUserID] = this.currentUser.photoURL,
            _b[friend.uid] = friend.photoURL,
            _b);
        newChat.createdBy = this.currentUserID;
        this.afStore.collection('chats').add(newChat)
            .then(function (res) {
            console.log('function response', res.id);
            newChat.chatID = res.id;
            _this.navCtrl.push('ChatsPage', newChat);
        })
            .catch(function (err) { return console.log(err); });
    };
    FriendsListPage.prototype.presentPopover = function (ev, friend) {
        var _this = this;
        var popover = this.popoverCtrl.create('DeletePopoverPage', {});
        popover.present({
            ev: ev
        });
        popover.onDidDismiss(function (res) { return _this.deleteFriend(res, friend); });
    };
    FriendsListPage.prototype.presentBlockedPopover = function (ev, friend) {
        var _this = this;
        var popover = this.popoverCtrl.create('DeletePopoverPage', {});
        popover.present({
            ev: ev
        });
        popover.onDidDismiss(function (res) { return _this.blockUser(res, friend); });
    };
    FriendsListPage.prototype.deleteFriend = function (res, friend) {
        if (res === true) {
            this.afStore.collection('people').doc(this.currentUserID).collection('friendsList').doc(friend.uid).delete();
            this.afStore.collection('people').doc(friend.uid).collection('friendsList').doc(this.currentUserID).delete();
        }
        else {
            return;
        }
    };
    FriendsListPage.prototype.blockUser = function (res, friend) {
        if (res === true) {
            console.log('Working on blocking method');
        }
        else {
            return;
        }
    };
    FriendsListPage.prototype.presentActionSheet = function (friend) {
        var _this = this;
        console.log('action friend', friend);
        var actionSheet = this.actionSheetCtrl.create({
            title: friend.username,
            buttons: [
                {
                    text: 'View Profile',
                    handler: function () {
                        console.log('Destructive clicked');
                    }
                },
                {
                    text: 'Delete Friend',
                    role: 'destructive',
                    handler: function () {
                        console.log('Delete clicked');
                        _this.presentPopover(event, friend);
                    }
                },
                {
                    text: 'Block User',
                    role: 'destructive',
                    handler: function () {
                        console.log('Block clicked');
                        _this.presentBlockedPopover(event, friend);
                    }
                },
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });
        actionSheet.present();
    };
    FriendsListPage = __decorate([
        IonicPage(),
        Component({ selector: 'page-friends-list', templateUrl: 'friends-list.html', providers: [AuthServiceProvider, DataModelServiceService] }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            AngularFirestore,
            AuthServiceProvider,
            DataModelServiceService,
            ActionSheetController,
            PopoverController,
            AngularFireAuth])
    ], FriendsListPage);
    return FriendsListPage;
}());
export { FriendsListPage };
//# sourceMappingURL=friends-list.js.map