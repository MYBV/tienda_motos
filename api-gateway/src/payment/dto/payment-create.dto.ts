//###########################################################################
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';
//###########################################################################

//###########################################################################
export class PaymentCreateDTO {
  @ApiProperty({
    description: 'Descripción del pago',
    type: String,
    minLength: 10,
    maxLength: 255,
    example: 'Pago mes enero',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @ApiProperty({
    description: 'Tipo de operacion',
    type: String,
    minLength: 6,
    maxLength: 10,
    example: 'PRESTAMO',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  readonly operationType: string;

  @ApiProperty({
    description: 'Monto del pago',
    type: Number,
    example: 35.87,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  readonly mount: number;

  @ApiProperty({
    description: 'ID del Customer',
    type: Number,
    example: "63e03af837b8cdacce0ef72d",
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  readonly customerId: number;

  @ApiProperty({
    description: 'Fecha del Pago',
    type: String,
    maxLength: 10,
    example: '2023-01-31',
    required: true,
  })
  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  readonly paymentDate: Date;
}
//###########################################################################
