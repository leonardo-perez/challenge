import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserData } from '../../../../models/user.model';
import { AuthService } from '../../../../services/auth.service';
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit { 
  search : string = '';
  userData : UserData = {} as UserData;  

  constructor(private authService: AuthService) {}
  
  ngOnInit(): void {
    this.userData = this.authService.getUserData();
  }

  logout(){
    this.authService.logout();
  }
}
