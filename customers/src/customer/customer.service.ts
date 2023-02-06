//#################################################################################################
import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ICustomer } from '../common/interfaces/customer.interface';
import { CUSTOMER } from '../common/models/models';
import { CustomerCreateDTO } from './dto/customer-create.dto';
import { CustomerUpdateDTO } from './dto/customer-update.dto';
//#################################################################################################

//#################################################################################################
@Injectable()
//#################################################################################################

//#################################################################################################
export class CustomerService {
  constructor(
    @InjectModel(CUSTOMER.name) private readonly model: Model<ICustomer>,
  ) {}

  async validate_length(min, max, valor, name) {
    if (valor.length < min || valor.length > max) {
      return {
        status: HttpStatus.BAD_REQUEST,
        msg: `${name} length invalidate`,
      };
    }
    return false;
  }

  async validate_emailformat(email: string) {
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return { status: HttpStatus.BAD_REQUEST, msg: `Email format invalidate` };
    }
    return false;
  }

  async findByDni(dni: string) {
    return await this.model.findOne({ dni });
  }

  async findByEmail(email: string) {
    return await this.model.findOne({ email, state: 'ACTIVO' });
  }

  async create_customer(customerDTO: CustomerCreateDTO) {
    let foundCustomer = await this.findByDni(customerDTO.dni);
    if (foundCustomer) {
      return { status: HttpStatus.BAD_REQUEST, msg: 'DNI Registred' };
    }

    let foundEmail = await this.findByEmail(customerDTO.email);
    if (foundEmail) {
      return { status: HttpStatus.BAD_REQUEST, msg: 'Email Registred' };
    }

    let validaciones = await this.validate_length(
      8,
      50,
      customerDTO.name,
      'name',
    );
    if (validaciones) return validaciones;

    validaciones = await this.validate_length(8, 25, customerDTO.dni, 'dni');
    if (validaciones) return validaciones;

    validaciones = await this.validate_length(
      6,
      255,
      customerDTO.email,
      'email',
    );
    if (validaciones) return validaciones;

    validaciones = await this.validate_emailformat(customerDTO.email);
    if (validaciones) return validaciones;

    const newCustomer = new this.model({ ...customerDTO, credit: 0 });

    await newCustomer.save();

    return {
      status: HttpStatus.CREATED,
      msg: `Customer Registred ${newCustomer._id}`,
    };
  }

  async find_customers(): Promise<ICustomer[]> {
    return await this.model.find({ state: 'ACTIVO' });
  }

  async find_customer(id: string) {
    let resultado = await this.model.findOne({ _id: id, state: 'ACTIVO' });

    if (!resultado) {
      return { status: HttpStatus.NOT_FOUND, msg: 'User NOT Found' };
    }

    return resultado;
  }

  async update_customer(id: string, customerDTO: CustomerUpdateDTO) {
    let foundCustomer = await this.model.findOne({ _id: id, state: 'ACTIVO' });
    if (!foundCustomer) {
      return { status: HttpStatus.NOT_FOUND, msg: 'Customer NOT Found' };
    }

    let foundEmail = await this.findByEmail(customerDTO.email);
    if (foundEmail) {
      if (foundEmail['_doc']._id != id) {
        return { status: HttpStatus.BAD_REQUEST, msg: 'Email Registred' };
      }
    }

    let validaciones = await this.validate_length(
      8,
      50,
      customerDTO.name,
      'name',
    );
    if (validaciones) return validaciones;

    validaciones = await this.validate_length(
      6,
      255,
      customerDTO.email,
      'email',
    );
    if (validaciones) return validaciones;

    validaciones = await this.validate_emailformat(customerDTO.email);
    if (validaciones) return validaciones;

    await this.model.findByIdAndUpdate(id, customerDTO);

    return { status: HttpStatus.OK, msg: `Customer Updated ${id}` };
  }

  async update_credit(customer: any, resultado: any) {

    return await this.model
      .findByIdAndUpdate(
        customer['_id'],
        { credit: resultado['credit'] },
        { $addToSet: { payments: resultado.id } },
      )
      .populate('payments');
  }

  async delete_customer(id: string) {
    let foundCustomer = await this.model.findOne({ _id: id, state: 'ACTIVO' });
    if (!foundCustomer) {
      return { status: HttpStatus.NOT_FOUND, msg: 'Customer NOT Found' };
    }

    if (foundCustomer['_doc'].credit != 0) {
      return {
        status: HttpStatus.BAD_REQUEST,
        msg: 'Customer with non-zero credit',
      };
    }

    let del_customer = {
      dni: `${foundCustomer['_doc'].dni}_${new Date().toISOString()}`,
      email: `${foundCustomer['_doc'].email}_${new Date().toISOString()}`,
      state: 'INACTIVO',
    };

    await this.model.findByIdAndUpdate(id, del_customer);
    return {
      status: HttpStatus.OK,
      msg: 'Customer Deleted',
    };
  }
}
//#################################################################################################
