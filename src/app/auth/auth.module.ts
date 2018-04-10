import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SigninComponent } from "./signin/signin.component";
import { SignupComponent } from "./signup/signup.component";
import { FormsModule } from "@angular/forms";
import { AuthRouting } from "./auth-routing.module";

@NgModule({
    declarations: [
        SigninComponent,
        SignupComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        AuthRouting
    ]
})
export class AuthModule {}