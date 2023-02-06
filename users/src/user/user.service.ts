//#############################################################################################
import { HttpStatus, Injectable } from '@nestjs/common';
import { IUser } from '../common/interfaces/user.interface';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { USER } from '../common/models/models';
import { Model } from 'mongoose';
import { UserCreateDTO } from './dto/user-create.dto';
import { UserUpdateDTO } from './dto/user-update.dto';
//#############################################################################################

//#############################################################################################
@Injectable()
//#############################################################################################

//#############################################################################################
export class UserService {
  constructor(@InjectModel(USER.name) private readonly model: Model<IUser>) {}

  async validate_length(min, max, valor, name) {

    if(valor.length <min || valor.length >max)
    {
      return { status: HttpStatus.BAD_REQUEST, msg: `${name} length invalidate` };
    }
    return false
  }

  async validate_emailformat(email: string) {

    if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
    {
      return { status: HttpStatus.BAD_REQUEST, msg: `Email format invalidate` };
    }
    return false
  }

  async checkPassword(password: string, passwordDB: string): Promise<boolean> {
    return await bcrypt.compare(password, passwordDB);
  }

  async findByUsername(username: string) {
    return await this.model.findOne({ username, state: 'ACTIVO' });
  }

  async findByEmail(email: string) {
    return await this.model.findOne({ email, state: 'ACTIVO' });
  }

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  async create_user(userDTO: UserCreateDTO) {
    let foundUser = await this.findByUsername(userDTO.username);
    if (foundUser) {
      return { status: HttpStatus.BAD_REQUEST, msg: 'Username Registred' };
    }

    let foundEmail = await this.findByEmail(userDTO.email);
    if (foundEmail) {
      return { status: HttpStatus.BAD_REQUEST, msg: 'Email Registred' };
    }

    let validaciones = await this.validate_length(8, 50, userDTO.name, 'name')
    if(validaciones) return validaciones

    validaciones = await this.validate_length(8, 50, userDTO.username, 'username')
    if(validaciones) return validaciones

    validaciones = await this.validate_length(6, 255, userDTO.email, 'email')
    if(validaciones) return validaciones

    validaciones = await this.validate_length(6, 15, userDTO.password, 'password')
    if(validaciones) return validaciones

    validaciones = await this.validate_emailformat(userDTO.email)
    if(validaciones) return validaciones

    const hash = await this.hashPassword(userDTO.password);
    const newUser = new this.model({ ...userDTO, password: hash });
    await newUser.save();

    return { status: HttpStatus.CREATED, msg: `User Registred ${newUser._id}` };
  }

  async find_users(): Promise<IUser[]> {
    return await this.model.find({ state: 'ACTIVO' }, { password: 0 });
  }

  async find_user(id: string) {
    let resultado = await this.model.findOne(
      {_id: id, state: 'ACTIVO' },
      { password: 0 },
    );

    if (!resultado) {
      return { status: HttpStatus.NOT_FOUND, msg: 'User NOT Found' };
    }

    return resultado;
  }

  async update_user(id: string, userDTO: UserUpdateDTO) {
    let foundUser = await this.model.findOne({_id: id, state: 'ACTIVO' });
    if (!foundUser) {
      return { status: HttpStatus.NOT_FOUND, msg: 'User NOT Found' };
    }

    let foundEmail = await this.findByEmail(userDTO.email);
    if (foundEmail) {
      if (foundEmail['_doc']._id != id) {
        return { status: HttpStatus.BAD_REQUEST, msg: 'Email Registred' };
      }
    }

    let validaciones = await this.validate_length(8, 50, userDTO.name, 'name')
    if(validaciones) return validaciones

    validaciones = await this.validate_length(6, 255, userDTO.email, 'email')
    if(validaciones) return validaciones

    validaciones = await this.validate_length(6, 15, userDTO.password, 'password')
    if(validaciones) return validaciones

    validaciones = await this.validate_emailformat(userDTO.email)
    if(validaciones) return validaciones

    const hash = await this.hashPassword(userDTO.password);
    const user = { ...userDTO, password: hash };
    await this.model.findByIdAndUpdate(id, user);

    return { status: HttpStatus.OK, msg: `User Updated ${id}` };
  }

  async delete_user(id: string) {
    let foundUser = await this.model.findOne({_id: id, state: 'ACTIVO' });;
    if (!foundUser) {
      return { status: HttpStatus.NOT_FOUND, msg: 'User NOT Found' };
    }

    let del_user = {
      username: `${foundUser['_doc'].username}_${new Date().toISOString()}`,
      email: `${foundUser['_doc'].email}_${new Date().toISOString()}`,
      state: 'INACTIVO',
    };

    await this.model.findByIdAndUpdate(id, del_user);
    return {
      status: HttpStatus.OK,
      msg: 'User Deleted',
    };
  }
}
//#############################################################################################
