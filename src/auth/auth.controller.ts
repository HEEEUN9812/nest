import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredential } from './dto/auth-credential';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService){}

    @Post('/signUp')
    signUp(@Body(ValidationPipe) authCredential: AuthCredential): Promise<User> {
        return this.authService.createUser(authCredential);
    }
}
