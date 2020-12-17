import { Component } from '@angular/core';
import { IonicPage, MenuController, NavController } from 'ionic-angular';
import { connectableObservableDescriptor } from 'rxjs/observable/ConnectableObservable';
import { CredenciasDTO } from '../../models/credencias.dto';
import { AuthService } from '../../services/auth.service';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  creds : CredenciasDTO = {
    email: "",
    senha: ""
  }


  constructor(public navCtrl: NavController, 
    public menu: MenuController,
    public auth: AuthService) {

  }

  ionViewWillEnter() {
    this.menu.swipeEnable(false);
  }
  
  ionViewDidLeave() {
    this.menu.swipeEnable(true);
  }


  public login(){
    this.auth.authenticate(this.creds)
    .subscribe(response => {
      this.auth.sucessfullLogin(response.headers.get('Authorization'))
      this.navCtrl.setRoot('CategoriasPage');
    },
    error => {});

  }
}
