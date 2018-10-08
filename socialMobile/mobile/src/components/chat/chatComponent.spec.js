import { async, TestBed } from '@angular/core/testing';
import { ChatComponent } from "./chatComponent";
describe('ChatComponent', function () {
    var component;
    var fixture;
    var debugElement;
    var htmlElement;
    var chatID;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [ChatComponent]
        }).compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(ChatComponent);
        component = fixture.componentInstance;
        debugElement = fixture.debugElement;
        chatID = component.chatID;
    });
    // it('chatid should be populated', ()=>{
    //     fixture.detectChanges();
    //     expect(chatID).toBeNull();
    // })
});
//# sourceMappingURL=chatComponent.spec.js.map