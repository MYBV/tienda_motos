//########################################################################
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
//########################################################################

//########################################################################
export class UserCreateDTO {
  @ApiProperty({
    description: 'Nombre del usuario',
    type: String,
    minLength: 8,
    maxLength: 50,
    example: 'Paulo Prieto',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({
    description: 'Login usuario',
    type: String,
    minLength: 8,
    maxLength: 50,
    example: 'usuprieto',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  readonly username: string;

  @ApiProperty({
    description: 'Email del usuario',
    type: String,
    minLength: 6,
    maxLength: 255,
    example: 'pauloprieto@correo.com',
    required: true,
  })
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @ApiProperty({
    description: 'Password usuario',
    type: String,
    minLength: 6,
    maxLength: 15,
    example: 'passprieto',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  readonly password: string;
}
//########################################################################
