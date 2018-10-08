import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { IonicModule, Platform } from 'ionic-angular';
import {DebugElement} from '@angular/core'
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
//import { AngularFirestore} from 'angularfire2/firestore';
//import  {FirebaseMock} from '../../test-config/mocks-firebase';
import { MyApp } from './app.component';
import {
  PlatformMock,
  StatusBarMock,
  SplashScreenMock
} from '../../test-config/mocks-ionic';

describe('MyApp Component', () => {
  let component: MyApp;
  let fixture: ComponentFixture<MyApp>;
  let debugElement: DebugElement;
  let htmlElement: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MyApp],
      imports: [
        IonicModule.forRoot(MyApp)
      ],
      providers: [
        { provide: StatusBar, useClass: StatusBarMock },
        { provide: SplashScreen, useClass: SplashScreenMock },
        { provide: Platform, useClass: PlatformMock },
        {provide:AuthServiceProvider},
       
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyApp);
    component = fixture.componentInstance;
    
    debugElement = fixture.debugElement
  });

  it('should be created', () => {
    expect(component instanceof MyApp).toBe(true);
  });

//   it('should have two pages', () => {
//     expect(component.pages.length).toBe(2);
//   });

});
