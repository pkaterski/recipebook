import { Component, Output, EventEmitter } from "@angular/core";
import { ConfigService } from "../../shared/config.service";
import { AuthService } from "../../auth/auth.service";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})

export class HeaderComponent {
    constructor(private configService: ConfigService, private authService: AuthService) {}

    isAuth() {
        return this.authService.isAuthenticated();
    }
    
    onSaveData() {
        if (confirm('Save Current Data?')) {
            this.configService.saveData();
        }
    }

    onFetchData() {
        this.configService.fetchData();
    }

    onLogout() {
        this.authService.logout();
    }
}