import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Contact, ContactDocument } from './schemas/contact.schema';

@Injectable()
export class ContactService {
  constructor(
    @InjectModel(Contact.name) private contactModel: Model<ContactDocument>,
  ) {}

  async create(contactData: any): Promise<Contact> {
    const contact = new this.contactModel(contactData);
    return contact.save();
  }

  async findAll(): Promise<Contact[]> {
    return this.contactModel.find().sort({ createdAt: -1 }).exec();
  }

  async findOne(id: string): Promise<Contact> {
    return this.contactModel.findById(id).exec();
  }

  async update(id: string, contactData: any): Promise<Contact> {
    return this.contactModel.findByIdAndUpdate(id, contactData, { new: true }).exec();
  }

  async remove(id: string): Promise<Contact> {
    return this.contactModel.findByIdAndDelete(id).exec();
  }
}