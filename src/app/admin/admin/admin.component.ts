import { animate, group, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  animations:[
    trigger('flyInOut', [
      state('in', style ({
        width: 120,
        transform: 'translateX(0)', opacity: 1
      })),
      transition('void => *', [
        style({ width: 10, transform: 'translateX(50px)', opacity: 0}),
        group([
          animate('0.3s 0.1s ease', style({
            transform: 'translateX(0)',
            width: 120
          })),
          animate('0.3s ease', style({
            opacity: 1
          }))
        ])
      ]),
      transition('* => void', [
        group([
          animate('0.3s ease', style ({
            transform: 'translateX(50px)',
            width: 10 
          })),
          animate('0.3s 0.2s ease', style ({
            opacity: 0
          }))
        ])
      ])
    ])
  ]
})
export class AdminComponent implements OnInit {

  constructor(
    public api: ApiService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.checkLogin();
  }
    mode:string='side';

  checkLogin()
  {
    this.api.get('bookswithauth/status').subscribe(res=>{
      //is logged in
      return;
    },err=>{
      //not logged in
      this.router.navigate(['/login']);
    })
  }

  logout()
  {
    let conf=confirm('Keluar aplikasi?');
    if(conf)
    {
      localStorage.removeItem('appToken');
      window.location.reload();
    }
  }
}