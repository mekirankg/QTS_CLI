import { Component, OnInit } from '@angular/core';
import { User } from '../../_models';
import { AngularFireDatabase } from 'angularfire2/database';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Common } from '../../_helpers/common';
import { Users } from '../../_models/users';

@Component({
  selector: 'app-createuser',
  templateUrl: './createuser.component.html',
  styleUrls: ['./createuser.component.css']
})
export class CreateuserComponent implements OnInit {
  newUser: Users = new Users();
  sIdEditMode: string = "";
  isEditMode: Boolean = false;
  constructor(public db: AngularFireDatabase, private router: Router, private route: ActivatedRoute, private fb: FormBuilder) {

    let id = this.route.snapshot.paramMap.get('userid');

    if (id != undefined) {
      this.sIdEditMode = id;
      this.isEditMode = true;
      let itemRef = db.object('user');
      itemRef.snapshotChanges().subscribe(action => {
        var quatationsList = action.payload.val();
        let obj = Common.snapshotToArray(action.payload);
        obj.forEach(element => {
          let obj: Users = JSON.parse(element);
          if (obj.uid != undefined && obj.uid.endsWith(id)) {
            obj.uid = obj.uid.replace("/", "");
            this.newUser = obj;
          }
        });
        if (this.newUser.uid == undefined) {
          alert("Invalid User selected for edit...");
          this.router.navigate(['/listuser']);
        }
      });
    }
  }

  ngOnInit() {
  }
  cancel() {
    this.router.navigate(['/listuser'])
  }
  register() {

    if (this.isEditMode) {
      var updates = {};
      updates['/user/' + this.newUser.uid] = JSON.stringify(this.newUser);
      try {
        let up = this.db.database.ref().update(updates);
        this.router.navigate(['/listuser']);
      }
      catch (ex) {
        alert("Error in Updating user details");
      }
    }
    else {
      let uniqueId = "/U" + Common.newGuid();
      this.newUser.uid = uniqueId;
      this.newUser.password="welcome";
      let newUserJson = JSON.stringify(this.newUser);
      console.log(newUserJson);
      try {
        this.db.database.ref('user').child(uniqueId).set(newUserJson);
        alert("User added successfully!!.");
        this.router.navigate(['/listuser']);
      }
      catch (ex) {

      }
    }
  }

}
