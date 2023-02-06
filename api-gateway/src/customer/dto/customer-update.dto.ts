//########################################################################
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEmail } from 'class-validator';
//########################################################################

//########################################################################
export class CustomerUpdateDTO {
  @ApiProperty({
    description: 'Nombre del cliente',
    type: String,
    minLength: 8,
    maxLength: 50,
    example: 'Martha Gomez',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({
    description: 'Email del client',
    type: String,
    minLength: 6,
    maxLength: 255,
    example: 'marthagomez@correo.com',
    required: true,
  })
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;
}
//########################################################################
