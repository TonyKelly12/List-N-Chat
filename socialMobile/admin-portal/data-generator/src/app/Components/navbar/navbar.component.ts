import { Component, OnInit, ViewEncapsulation, Injector } from '@angular/core';




let navbarState ;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})


export class NavbarComponent implements OnInit {
    
  constructor() {
    

   }

  ngOnInit() {
    
  }

  setNavFlag(navFlag){
   
    navbarState = navFlag.toString()
    //console.log(navbarState)
  }

  getNavState(){
    //console.log(navbarState);
    return navbarState;
  }
}
