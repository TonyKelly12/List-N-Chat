export interface NewPerson {
    uid: string;
    email: string;
    username?: string;
    first_name?: string;
    last_name?: string;
    phone?: string;
    height?: string;
    weight?: string;
    isMemberOf?: boolean;
    isStaffOf?: boolean;
    gymID?: string;
    feedRef: string;
}
