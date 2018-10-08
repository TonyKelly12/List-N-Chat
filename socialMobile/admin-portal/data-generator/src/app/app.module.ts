// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {CoreModule} from './module/core/core.module';

// Components
import { AppComponent } from './app.component';
import { PersonDataComponent } from './Components/person-data/person-data.component';
import { GymDataComponent } from './Components/gym-data/gym-data.component';
import { TeamsDataComponent } from './Components/teams-data/teams-data.component';
import { FeedDataComponent } from './Components/feed-data/feed-data.component';
import { PersonEditComponent } from './Components/person-edit/person-edit.component';
import { NewPersonComponent } from './Components/new-person/new-person.component';
import { NewPersonPropertyComponent } from './Components/new-person-property/new-person-property.component';
import { HomeComponent } from './Components/home/home.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { NewGymComponent } from './Components/new-gym/new-gym.component';
import { EditTeamComponent } from './Components/edit-team/edit-team.component';
import { NewTeamComponent } from './Components/new-team/new-team.component';
import { EditGymComponent } from './Components/edit-gym/edit-gym.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { EmailLoginComponent } from './Components/email-login/email-login.component';
import { MembersComponent } from './Components/members/members.component';
import {UserResolver} from './Components/members/user.resolver';
// Material UI
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule, MatFormFieldModule} from '@angular/material';

// Services
import { GymService } from './Services/gym.service';
import {UserService} from './Services/user.service';
import {AuthService} from './Services/auth.service';
import { TeamsService } from './Services/teams.service';
import { SetError } from './SetError';
import {PersonService} from './Services/person-service.service';
import {PropertiesService} from './Services/properties.service';
import {ErrorMessages} from './ErrorMessages';
import {DataObjects} from './DataObjects';
import {DataModelServiceService} from './data-model-service.service';

// Firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { environment } from '../environments/environment';
import * as firebase from 'firebase';
firebase.initializeApp(environment.firebase);
// Guards
import { AuthGuard } from './RouterGuards/auth.guard';


@NgModule({
  declarations: [
    AppComponent,
    PersonDataComponent,
    GymDataComponent,
    TeamsDataComponent,
    FeedDataComponent,
    PersonEditComponent,
    NewPersonComponent,
    NewPersonPropertyComponent,
    HomeComponent,
    NavbarComponent,
    NewGymComponent,
    EditGymComponent,
    EditTeamComponent,
    NewTeamComponent,
    LoginComponent,
    RegisterComponent,
    EmailLoginComponent,
    MembersComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CoreModule,
    BrowserAnimationsModule,
    MatButtonModule, MatCheckboxModule, MatFormFieldModule,
    AngularFireModule.initializeApp(environment.firebase), // imports firebase/app needed for everything
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule, // imports firebase/storage only needed for storage features
    RouterModule.forRoot([
      {path: '', redirectTo: 'login', pathMatch: 'full'},
      {path: 'home', component: HomeComponent},
      {path: 'person', component: PersonDataComponent},
      {path: 'gym', component: GymDataComponent},
      {path: 'teams', component: TeamsDataComponent},
      {path: 'feed', component: FeedDataComponent},
      {path: 'personEdit/:userID', component: PersonEditComponent},
      {path: 'newPerson', component: NewPersonComponent},
      {path: 'newPersonProperty', component: NewPersonPropertyComponent},
      {path: 'newGym', component: NewGymComponent},
      {path: 'gymEdit/:gymID', component: EditGymComponent},
      {path: 'teamEdit/:teamID', component: EditTeamComponent},
      {path: 'newTeam', component: NewTeamComponent},
      {path: 'login', component: LoginComponent  },
      {path: 'register', component: RegisterComponent },
      {path: 'emailLogin', component: EmailLoginComponent},
      {path: 'members', component: MembersComponent, resolve: { data: UserResolver}},
    ]),
    NgbModule.forRoot()
  ],
  providers: [
    PersonService,
    ErrorMessages,
    SetError,
    DataObjects,
    DataModelServiceService,
    PropertiesService,
    GymService,
    TeamsService,
    UserService,
    AuthService,
    AuthGuard,
    UserResolver
    ],
  bootstrap: [AppComponent]

})
export class AppModule { }
