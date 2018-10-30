import { Component, OnInit } from '@angular/core';
import { Users } from '../../_models/users';
import { User } from '../../_models';
import { AngularFireDatabase } from 'angularfire2/database';
import { Router, ActivatedRoute } from '@angular/router';
import { Common } from '../../_helpers/common';

@Component({
  selector: 'app-listuser',
  templateUrl: './listuser.component.html',
  styleUrls: ['./listuser.component.css']
})
export class ListuserComponent implements OnInit {
  newUser: Users = new Users();
  users: Users[] = [];
  constructor(public db: AngularFireDatabase, private router: Router, private route: ActivatedRoute) {
    let itemRef = db.object('user');
    itemRef.snapshotChanges().subscribe(action => {
      var quatationsList = action.payload.val();
      let obj = Common.snapshotToArray(action.payload);
      this.users = [];
      obj.forEach(element => {
        let obj: Users = JSON.parse(element);
        if (obj.uid != undefined) {
          obj.uid = obj.uid.replace("/", "");
          this.newUser = obj;
        }

        console.log("user added")
        this.users.push(obj as Users);

      });
    });
  }

  ngOnInit() {
  }

  delete(key, usr: Users) {
    this.db.database.ref(`user/${key}`).once("value", snapshot => {
      let sid = snapshot.key;
      if (snapshot.exists()) {
        if (confirm('Are you sure to delete ' + usr.username)) {

          var updates = {};
          updates['/user/' + sid] = JSON.stringify(usr);
          try {
            let up = this.db.database.ref().update(updates);
            this.router.navigate(['/listuser']);
          }
          catch (ex) {
            alert("Error in Deleting user");
          }
        }
      }
    })

  }
}
