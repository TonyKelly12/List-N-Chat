import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Observable} from 'rxjs/Observable';
import { PersonDataComponent } from '../app/Components/person-data/person-data.component';
import { AngularFirestore } from 'angularfire2/firestore';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Jimbot Managers Portal';
  currentEnv: Observable<string>
  constructor(private activatedRoute: ActivatedRoute, private afs: AngularFirestore){}

ngOnInit(){
  this.activatedRoute.url.subscribe((url) =>{
    console.log(url);
  })
  
}
}
  