import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ServiceDocument = Service & Document;

@Schema({ timestamps: true })
export class Service {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  tagline: string;

  @Prop({ required: true })
  icon: string;

  @Prop({ required: true })
  iconColor: string;

  @Prop({ required: true })
  startingPrice: number;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ default: 0 })
  order: number;
}

export const ServiceSchema = SchemaFactory.createForClass(Service);