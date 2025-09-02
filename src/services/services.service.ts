import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Service, ServiceDocument } from './schemas/service.schema';

@Injectable()
export class ServicesService {
  constructor(
    @InjectModel(Service.name) private serviceModel: Model<ServiceDocument>,
  ) {}

  async create(serviceData: any): Promise<Service> {
    const service = new this.serviceModel(serviceData);
    return service.save();
  }

  async findAll(): Promise<Service[]> {
    return this.serviceModel.find().sort({ order: 1 }).exec();
  }

  async findOne(id: string): Promise<Service> {
    return this.serviceModel.findById(id).exec();
  }

  async update(id: string, serviceData: any): Promise<Service> {
    return this.serviceModel.findByIdAndUpdate(id, serviceData, { new: true }).exec();
  }

  async remove(id: string): Promise<Service> {
    return this.serviceModel.findByIdAndDelete(id).exec();
  }
}