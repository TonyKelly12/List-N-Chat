import {Injectable} from '@angular/core';
import * as ix from '../../interfaces';

@Injectable()
export class DataModelServiceService {

    constructor() {
    }

     newUser(): ix.IAccount {
        return {
            email: '',
            password: ''
        }
    }

     User(): ix.IUser {
        return {
            uid: '',
            username: '',
            email: '',
            first_name: '',
            last_name: '',
            phone: '',
            feedRef: '',
            photoURL: '',
            creationTime: '',
            lastSignInTime: '',
            roles: {
                user: true
            },
            status: 'offline'
        }
    }

    newArena(): ix.IArena {
        return {gymRef: '', name: '', arenaId: '',}

    }

    newChallenge(): ix.IChallenge {

        return {

            date_start: '',
            description: '',
            name: '',
            reward_points: 0,
            step_goal: 0,
            type: ''
        }
    }

     newGym(): ix.IGym {
        return {
            city: '',
            country_iso_code: '',
            description: '',
            gym_phone_number_00: '',
            gym_phone_number_01: '',
            long_name: '',
            short_name: '',
            state: '',
            street_address: '',
            zip_code: 0,
            gymID: '',
            arenaRefs: []
        }
    }

    newTeam(): ix.ITeam {

        return {

            date_start: '',
            description: '',
            name: '',
            feedRefs: '',
            gymRefs: '',
            gymID: '',
            type: ''
        }

    }

    newFeed(): ix.IFeed {


        return {
            date_start: '',
            description: '',
            name: '',
            type: '',
            teamRefs: '',
            gymRefs: '',
            userRef: ''
        }
    }

    //set a class for new chat data.
     newChat() {
        return {
            chatID: '',
            lastMessage: {},
            members: [],
            time: '',
            createdBy: '',
            photoURL: {}
        }
    }

}
