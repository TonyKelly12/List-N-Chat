var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { AngularFittextModule } from 'angular-fittext';
import { DirectivesModule } from '../directives/directives.module';
import { Feed } from './feed/feed';
import { Post } from './post/post';
import { Comment } from './comment/comment';
import { PostInput } from './post-input/post-input';
import { NavBarComponent } from './nav-bar/nav-bar';
import { PointsRankingsCardComponent } from './points-rankings-card/points-rankings-card';
import { ChartsModule } from 'ng2-charts';
import { DatePipe } from '@angular/common';
import { EmojiPickerComponent } from './emoji-picker/emoji-picker';
import { FriendPickerComponent } from './friend-picker/friend-picker';
import { ProfileEditorComponent } from './profile-editor/profile-editor';
import { ChatComponent } from './chat/chatComponent';
import { ChatInputComponent } from './chat-input/chat-input';
import { InviteListComponent } from './invite-list/invite-list';
import { FriendsNavComponent } from './friends-nav/friends-nav';
var ComponentsModule = /** @class */ (function () {
    function ComponentsModule() {
    }
    ComponentsModule = __decorate([
        NgModule({
            declarations: [Feed, Post, Comment, PostInput,
                NavBarComponent,
                PointsRankingsCardComponent,
                EmojiPickerComponent,
                FriendPickerComponent,
                ProfileEditorComponent,
                ChatComponent,
                ChatInputComponent,
                InviteListComponent,
                FriendsNavComponent
            ],
            imports: [IonicModule, AngularFittextModule, DirectivesModule, ChartsModule],
            exports: [Feed, Post, Comment, PostInput,
                NavBarComponent,
                PointsRankingsCardComponent,
                FriendPickerComponent,
                EmojiPickerComponent,
                ProfileEditorComponent,
                ChatComponent,
                ChatInputComponent,
                InviteListComponent,
                FriendsNavComponent
            ],
            providers: [DatePipe]
        })
    ], ComponentsModule);
    return ComponentsModule;
}());
export { ComponentsModule };
//# sourceMappingURL=components.module.js.map