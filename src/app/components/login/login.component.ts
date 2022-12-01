import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import{AngularFireAuth}from '@angular/fire/compat/auth';
import { addDoc, collection,DocumentData, getFirestore } from '@angular/fire/firestore';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
loginU:FormGroup;
  constructor(private fb:FormBuilder,
    private afAuth: AngularFireAuth,
    private router: Router ) { 
      this.loginU=this.fb.group({
        email:['',Validators.required],
        password:['',Validators.required],

      })
    }

  ngOnInit(): void {
  }
login(){
  const email=this.loginU.value.email;
  const password=this.loginU.value.password;

  this.afAuth.signInWithEmailAndPassword(email,password).then((user)=>{
   
    if(email=='cafeteria1@itsch.edu.mx'){
      this.router.navigate(['/admin-caf1'])
    }else if(email=='cafeteria2@itsch.edu.mx'){
      this.router.navigate(['/admin-caf2'])
    }

  }).catch((error)=>{
    console.log(error);
  })
}
}
