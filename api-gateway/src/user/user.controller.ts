//#######################################################################################
import { ClientProxyTiendaMotos } from './../common/proxy/client-proxy';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { IUser } from 'src/common/interfaces/user.interface';
import { UserMSG } from 'src/constant';
import { UserCreateDTO } from './dto/user-create.dto';
import { UserUpdateDTO } from './dto/user-update.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
//#######################################################################################

//#######################################################################################
@ApiTags('Users')
@Controller('user')
//#######################################################################################

//#######################################################################################
export class UserController {
  constructor(private readonly clientProxy: ClientProxyTiendaMotos) {}
  private _clientProxyUser = this.clientProxy.clientProxyUsers();

  @Post()
  @ApiOperation({ summary: 'Create a User' })
  async create_user(
    @Body() userDTO: UserCreateDTO,
  ): Promise<Observable<IUser>> {
    return this._clientProxyUser.send(UserMSG.CREATE_USER, userDTO);
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'List all Users Actives' })
  async find_users(): Promise<Observable<IUser[]>> {
    return this._clientProxyUser.send(UserMSG.FIND_USERS, '');
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get information a User' })
  find_user(@Param('id') id: string): Observable<IUser> {
    return this._clientProxyUser.send(UserMSG.FIND_USER, id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a User' })
  update_user(
    @Param('id') id: string,
    @Body() userDTO: UserUpdateDTO,
  ): Observable<IUser> {
    return this._clientProxyUser.send(UserMSG.UPDATE_USER, { id, userDTO });
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Delete (inactive) a User' })
  delete_user(@Param('id') id: string): Observable<any> {
    return this._clientProxyUser.send(UserMSG.DELETE_USER, id);
  }
}
//#######################################################################################
