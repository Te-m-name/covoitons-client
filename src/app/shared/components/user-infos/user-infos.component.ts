import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RidesService } from 'src/app/shared/services/rides.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-user-infos',
  templateUrl: './user-infos.component.html',
  styleUrls: ['./user-infos.component.scss']
})
export class UserInfosComponent implements OnInit {
  message!: string;
  selectedFile!: File;
  imageName: any;
  retrievedImage: any;
  base64Data: any;
  retrieveResponse: any;

  @Input()
  public user: any;

  public ride: any;

  constructor(private service: RidesService, private fb: FormBuilder, private authService: AuthService) { }

  ngOnInit(): void {
    this.getRide();
    this.getImage();
  }

  public getRide() {
    this.service.getNextRide(this.user.id).subscribe(data => {
      this.ride = data;
      console.log(this.ride);
    })
  }

  public openForm() {
    const modal = document.getElementById("myModal")
    if (modal) {
      modal.style.display = "block";
    }
  }

  public closeForm() {
    const modal = document.getElementById("myModal")
    if (modal) {
      modal.style.display = "none";
    }
  }

  public onFileChanged(event: any) {
    this.selectedFile = event.target.files[0];
  }

  public submit() {

    const uploadImageData = new FormData();
    uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);
  
    this.authService.uploadImage(uploadImageData)
      .subscribe((response) => {
        if (response.status === 200) {
          this.message = 'Image uploaded successfully';
          this.getImage()
        } else {
          this.message = 'Image not uploaded successfully';
        }
      }
      );
  }

  public getImage() {
    this.authService.getImage()
      .subscribe(
        res => {
          this.retrieveResponse = res;
          this.base64Data = this.retrieveResponse.picByte;
          this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
        }
      );
  }

}
