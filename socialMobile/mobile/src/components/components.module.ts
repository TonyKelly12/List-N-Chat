import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular'
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
import { FriendListComponent } from './friend-list/friend-list';
import { FriendRequestComponent } from './friend-request/friend-request';
import { ChatListComponent } from './chat-list/chat-list';
import {ChatMembersComponent} from './chat-members/chat-members';
import {LoginFormComponent} from './login-form/login-form';
import {GoogleLoginComponent} from './google-login/google-login';
import {FacebookLoginComponent} from './facebook-login/facebook-login';
import {TwitterLoginComponent} from './twitter-login/twitter-login';
import {RegisterFormComponent} from './register-form/register-form';

@NgModule({
	declarations: [Feed, Post, Comment, PostInput,
		NavBarComponent,
		
		PointsRankingsCardComponent,
   
	EmojiPickerComponent,
	FriendPickerComponent,
    
    ProfileEditorComponent,
    ChatComponent,
    ChatInputComponent,
    InviteListComponent,
    FriendsNavComponent,
    FriendListComponent,
    FriendRequestComponent,
        ChatListComponent,
        ChatMembersComponent,
        LoginFormComponent,
        GoogleLoginComponent,
        FacebookLoginComponent,
        TwitterLoginComponent,
        RegisterFormComponent
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
    FriendsNavComponent,
    FriendListComponent,
    FriendRequestComponent,
        ChatListComponent,
        ChatMembersComponent,
        LoginFormComponent,
        GoogleLoginComponent,
        FacebookLoginComponent,
        TwitterLoginComponent,
        RegisterFormComponent
	],
	providers: [DatePipe]
})
export class ComponentsModule { }
