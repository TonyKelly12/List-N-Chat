import {Injectable} from '@angular/core';
import * as int from './Interfaces/data-interfaces';

@Injectable()
export class DataModelServiceService {

  constructor() {}
  newPerson(): int.NewUser {
    return {
      uid: '',
      username: '',
      email: '',
      first_name: '',
      last_name: '',
      phone: '',
      height: '',
      weight: '',
      isMemberOf: false,
      isStaffOf: false,
      gymID: '',
      feedRef: '',
      photoURL: '',
      creationTime: '',
      lastSignInTime: ''
    };
  }

  newArena(): int.NewArena {
    return {gymRef: '', name: '', gymID: '', };

  }

  newChallenge(): int.NewChallenge {
    const endDate = new Date('August 19, 3190 23:15:30');
    const startDate = new Date(Date.now());
    return {
      date_end: endDate,
      date_start: startDate,
      description: '',
      name: '',
      reward_points: 0,
      step_goal: 0,
      type: ''
    };
  }

  newGym(): int.NewGym {
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
      gymID: ''
    };
  }

  newTeam(): int.NewTeam {
    const endDate = new Date('August 19, 3190 23:15:30');
    const startDate = new Date(Date.now());
    return {
      date_end: endDate,
      date_start: startDate,
      description: '',
      name: '',
      feedRefs: '',
      gymRefs: '',
      gymID: '',
      type: ''
    };

  }

  newFeed(): int.NewFeed {
    const endDate = new Date('August 19, 3190 23:15:30');
    const startDate = new Date(Date.now());
    return {
      date_end: endDate,
      date_start: startDate,
      description: '',
      name: '',
      type: '',
      userRef: '',
      gymRef: '',
      teamRef: '',
    };
  }

}
