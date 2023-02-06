//######################################################################################
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientProxyTiendaMotos } from 'src/common/proxy/client-proxy';
import { UserMSG } from 'src/constant';
import { UserCreateDTO } from 'src/user/dto/user-create.dto';
//######################################################################################

//######################################################################################
@Injectable()
//######################################################################################

//######################################################################################
export class AuthService {
  constructor(
    private readonly clientProxy: ClientProxyTiendaMotos,
    private readonly jwtService: JwtService,
  ) {}

  private _clientProxyUser = this.clientProxy.clientProxyUsers();

  async validate_user(username: string, password: string): Promise<any> {
    const user = await this._clientProxyUser
      .send(UserMSG.VALID_USER, { username, password })
      .toPromise();

    if (user) return user;

    return null;
  }

  async signIn(user: any) {
    const payload = {
      username: user.username,
      sub: user._id,
    };

    return { access_token: this.jwtService.sign(payload) };
  }

  async signUp(userDTO: UserCreateDTO) {
    return await this._clientProxyUser
      .send(UserMSG.CREATE_USER, userDTO)
      .toPromise();
  }
}
//######################################################################################
