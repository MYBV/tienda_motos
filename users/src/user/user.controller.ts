//#######################################################################################
import { UserService } from './user.service';
import { Controller } from '@nestjs/common';
import { UserCreateDTO } from './dto/user-create.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserMSG } from '../constant';
//#######################################################################################

//#######################################################################################
@Controller()
//#######################################################################################

//#######################################################################################
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern(UserMSG.CREATE_USER)
  async create_user(@Payload() userDTO: UserCreateDTO) {
    return this.userService.create_user(userDTO);
  }

  @MessagePattern(UserMSG.FIND_USERS)
  find_users() {
    return this.userService.find_users();
  }

  @MessagePattern(UserMSG.FIND_USER)
  find_user(@Payload() id: string) {
    return this.userService.find_user(id);
  }

  @MessagePattern(UserMSG.UPDATE_USER)
  update_user(@Payload() payLoad: any) {
    return this.userService.update_user(payLoad.id, payLoad.userDTO);
  }

  @MessagePattern(UserMSG.DELETE_USER)
  delete_user(@Payload() id: string) {
    return this.userService.delete_user(id);
  }

  @MessagePattern(UserMSG.VALID_USER)
  async validate_user(@Payload() payLoad) {
    const user = await this.userService.findByUsername(payLoad.username);

    if (!user) return null

    const isValidPassword = await this.userService.checkPassword(
      payLoad.password,
      user.password,
    );

    if (isValidPassword) return user;

    return null;
  }
}
//#######################################################################################
