import { Body, Controller, Post } from "@nestjs/common";
import { SignUpDto } from "./dto/signup.dto";
import { AuthService } from "./auth.service";
import { SignInDto } from "./dto/signin.dto";

@Controller('/auth')
export class AuthController {
    constructor(private authService: AuthService) {}
    

    // Gerekli Endpointlerin Kurulumu

    @Post('/signup')
    async signUp(@Body() signUpDto: SignUpDto) {
        return await this.authService.signUp(signUpDto);
    }
    
    @Post('/signin')
    async signIn(@Body() signInDto: SignInDto) {
        return await this.authService.signIn(signInDto);
    }

    @Post('/logout')
    async logout() {
        return await this.authService.logout();
    }

    @Post('/forgot-password')
    async forgotPassword(@Body() forgotPasswordDto: SignUpDto) {
        return await this.authService.forgotPassword(forgotPasswordDto);
    }
}
