import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credential';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService){}

    @Post('/signUp')
    signUp(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<User> {
        return this.authService.createUser(authCredentialsDto);
    }

    @Post('/signIn')
    signIn(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<string> {
        return this.authService.signIn(authCredentialsDto);
    }
}
