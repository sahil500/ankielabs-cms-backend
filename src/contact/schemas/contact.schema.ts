import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ContactDocument = Contact & Document;

@Schema({ timestamps: true })
export class Contact {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop()
  phone?: string;

  @Prop()
  subject?: string;

  @Prop({ required: true })
  message: string;

  @Prop({ default: 'new' })
  status: string;

  @Prop()
  budget?: string;

  @Prop()
  timeline?: string;

  @Prop()
  projectDescription?: string;

  @Prop({ type: [String] })
  selectedServices?: string[];
}

export const ContactSchema = SchemaFactory.createForClass(Contact);