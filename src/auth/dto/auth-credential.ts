import { IsString, Matches, MaxLength, MinLength } from "class-validator";

export class AuthCredential {
    @IsString()
    @MinLength(4)
    @MaxLength(16)
    username: string;

    @IsString()
    @MinLength(4)
    @MaxLength(16)
    @Matches(/^[a-zA-Z0-9]*$/,{
        message: 'password only accepts english and number'
    })
    password: string;
}