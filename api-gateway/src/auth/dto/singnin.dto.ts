//########################################################################
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
//########################################################################

//########################################################################
export class SignInDTO {
  @ApiProperty({
    description: 'Login usuario',
    type: String,
    example: 'usuprieto',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  readonly username: string;

  @ApiProperty({
    description: 'Password usuario',
    type: String,
    example: 'passprieto',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  readonly password: string;
}
//########################################################################
