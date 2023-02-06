import { ApiOperation } from '@nestjs/swagger';
//############################################################################
import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserCreateDTO } from 'src/user/dto/user-create.dto';
import { AuthService } from './auth.service';
import { SignInDTO } from './dto/singnin.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
//########################################################################

//########################################################################
@ApiTags('Authentication')
@Controller('auth')
//########################################################################

//########################################################################
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @ApiOperation({ summary: 'Login' })
  @Post('signin')
  async signIn(@Body() signinDTO:SignInDTO) {
    return await this.authService.signIn(signinDTO);
  }

  @Post('signup')
  @ApiOperation({ summary: 'Darse de alta' })
  async signUp(@Body() userDTO: UserCreateDTO) {
    return await this.authService.signUp(userDTO);
  }
}
//########################################################################
