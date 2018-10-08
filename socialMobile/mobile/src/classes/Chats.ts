import {IChat} from '../interfaces';

   declare class  Chats implements IChat{
    chatID: string;
    lastMessage: object;
    members: any[];
    time: string;
    createdBy: string;
    photoURL:object;
    constructor()
    ionViewCanEnter() : boolean;
    ionViewDidLoad(): void;
    ionViewDidEnter():void
    showEditButton():void;
    addPost():Promise<void>
    scrollToNewestPost():void;
    resizeContent():void;
    onFocus():void;
    switchFriendPicker():void;
    scrollToBottom():void;
    addToChat(friend):Promise<void>;
    saveChatUpdate(chatUpdate: IChat):Promise<void>;
    private focus():void;
    private setTextareaScroll():void;
}