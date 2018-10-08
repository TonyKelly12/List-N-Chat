export interface IAccount {
    email: string,
    password: string
}

export interface IUser {
    uid: string,
    email: string,
    username?: string,
    first_name?: string,
    last_name?: string,
    phone?: string,
    feedRef?: string,
    photoURL?: string,
    creationTime?: string,
    lastSignInTime?: string,
    roles: IRole,
    status: string
};

export interface IRole {
    user?: boolean;
    pro?: boolean;
    staff?: boolean;
    admin?: boolean;

}

export interface IMessage {
    messageID: string;
    chatID: string;
    fromUID: string;
    message: string;
    photoURL: string;
    relTime: string;
    time: number;
    username: string;
}

export interface IGym {
    city: string;
    country_iso_code: string;
    description: string;
    gym_phone_number_00: string;
    gym_phone_number_01: string;
    long_name: string;
    short_name: string;
    state: string;
    street_address: string;
    zip_code: number;
    gymID: string;
    arenaRefs: IArena[];
};

export interface IArena {
    gymRef: string;
    name: string;
    arenaId: string;
};

export interface IChallenge {
    date_end?: string;
    date_start: string;
    description: string;
    name: string;
    reward_points: number;
    step_goal: number;
    type: string;

};

export interface IFeed {
    date_end?: string;
    date_start: string;
    description: string;
    name: string;
    type: string;
    userRef: string;
    teamRefs: string;
    gymRefs: string;

};

export interface ITeam {
    date_end?: string;
    date_start: string;
    description: string;
    name: string;
    feedRefs: string;
    gymRefs: string;
    type: string;
    gymID: string;

};

export interface IChat {
    chatID: string;
    lastMessage: object;
    time: string;
    createdBy: string;
    members: any[];
    photoURL?: object;

    ionViewDidEnter(): void

    showEditButton(): void;

    scrollToNewestPost(): void;

    resizeContent(): void;

    scrollToBottom(): void;
}

export interface chatSortArray {

}

export interface IChatInput {
    members: object;
    photoURL: object;

    switchFriendPicker(): void;

    addPost(): Promise<void>

    addToChat(friend): Promise<void>;

    saveChatUpdate(chatMembers: object, chatPhotos: object): Promise<void>;
}

export interface IPage {
    ionViewCanEnter(): boolean;
}
