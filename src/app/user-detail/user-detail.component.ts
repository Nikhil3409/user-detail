import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import { UserModel } from './user-detail.model';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  formValue !: FormGroup;
  userModelObj : UserModel = new UserModel();
  userData !: any;
  showAdd! : boolean;
  showUpdate !: boolean;

  constructor(private formbuilder : FormBuilder, private api : ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      fname : [''],
      lname : [''],
      email : [''],
      contact_number : [''],
      address : ['']
    })
    this.getAllUser();
  }

  clickAddUser(){
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  postUserdetails(){
    this.userModelObj.fname = this.formValue.value.fname;
    this.userModelObj.lname = this.formValue.value.lname;
    this.userModelObj.email = this.formValue.value.email;
    this.userModelObj.contact_number = this.formValue.value.contact_number;
    this.userModelObj.address = this.formValue.value.address;
    
    this.api.postUser(this.userModelObj).subscribe((res : any)=>{
      console.log(res);
      alert("User Details add Successfully");
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllUser();
    },
    ()=>{
      alert("something wrong");
    })
  }

  getAllUser(){
    this.api.getUser().subscribe(res=>{
      this.userData = res;
    })
  }

  deleteUser(row : any){
    this.api.deleteUser(row.id).subscribe(res=>{
      alert("User Details Deleted");
      this.getAllUser();
    })
  }

  onEdit(row :any){
    this.showAdd = false;
    this.showUpdate = true;
    this.userModelObj.id = row.id;
    this.formValue.controls['fname'].setValue(row.fname);
    this.formValue.controls['lname'].setValue(row.lname);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['contact_number'].setValue(row.contact_number);
    this.formValue.controls['address'].setValue(row.address);
  }

  updateUserDetails(){
    this.userModelObj.fname = this.formValue.value.fname;
    this.userModelObj.lname = this.formValue.value.lname;
    this.userModelObj.email = this.formValue.value.email;
    this.userModelObj.contact_number = this.formValue.value.contact_number;
    this.userModelObj.address = this.formValue.value.address;
    this.api.updateUser(this.userModelObj,this.userModelObj.id).subscribe(res=>{
      alert("User Details Update Successfully");
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllUser();
    })
  }
}
