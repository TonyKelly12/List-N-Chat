import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {DebugElement} from '@angular/core'
import {ChatComponent} from "./chatComponent";
import {} from 'jasmine';
describe('ChatComponent', () =>{
    let component: ChatComponent;
    let fixture: ComponentFixture<ChatComponent>;
    let debugElement: DebugElement;
    let htmlElement: HTMLElement;
    let chatID: string;
    beforeEach(async(() =>{
        TestBed.configureTestingModule({
            declarations: [ChatComponent]
        }).compileComponents();
    }));

    beforeEach(() =>{
       fixture = TestBed.createComponent(ChatComponent);
       component = fixture.componentInstance;
       debugElement = fixture.debugElement
       chatID = component.chatID;
    });

    // it('chatid should be populated', ()=>{
    //     fixture.detectChanges();
    //     expect(chatID).toBeNull();
    // })
})