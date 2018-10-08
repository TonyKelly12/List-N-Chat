import { Injectable } from '@angular/core';
import {PersonPropData} from './Interfaces/person-prop-data';
import {InitPerson} from './Interfaces/init-person-data';
import {InitProperty} from './Interfaces/new-property-data';
import {NewGym} from './Interfaces/new-gym';
import {NewTeam} from './Interfaces/new-team';
import {TeamProperty} from './Interfaces/team-property'
//TODO: Note to self craeate a data interface first then 
//create a funtion to return init object

@Injectable()
export class DataObjects{

    intitPerson():InitPerson{
        return{
            email:'',
            password:'',
            phone:''
        }
    }
    
    initalizePersonProperties():PersonPropData{
        return{
            userID:["txt",0,'','' ],
            firstname:["txt",0,'','' ],
            lastname:["txt",0,'','' ],
            favoritequote:["txt",0,'','' ],
            username:["txt",0,'',''],
            profilevisibility:["txt",0,'','' ],
            weight_in_kg:["double",0,'',''],
            height_in_cm:["double",0,'',''],
            avatar:["png",0,{},'']
        }
        
    }

    newProperty():InitProperty{
        return{
            propName: '',
            realm:'',
            type:'',
            description:'' 
        }
    }

    newGym():NewGym{
        return{
            longName: "",
            shortName: "",
            phoneNumber: "",
            streetAddress: "",
            city: "",
            state: "",
            zipCode: "",
            country: ""
        }
    }
    //TODO: Prob not needed
    newTeam():NewTeam{ 
        return{
            teamName: "",
            teamPurpose: "",
            feedName: "",
            feedPurpose: "",
            contextID: 0
        }

        
    }

    //TODO: May not be needed
    newTeamProperty():TeamProperty{
        return{
            propertyName:'',
            propertyURL:'',
            propertyType:'',
            propertyValue:'',
            isBase64Encoded: false
        }
    }

    // initalizeGymProperties():PersonPropData{
    //     return{
    //         userID:["txt",0,'','' ],
    //         firstname:["txt",0,'','' ],
    //         lastname:["txt",0,'','' ],
    //         favoritequote:["txt",0,'','' ],
    //         username:["txt",0,'',''],
    //         profilevisibility:["txt",0,'','' ],
    //         weight_in_kg:["double",0,'',''],
    //         height_in_cm:["double",0,'','']
    //     }
    // }


}