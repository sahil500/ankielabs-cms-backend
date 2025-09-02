import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Portfolio, PortfolioDocument } from './schemas/portfolio.schema';

@Injectable()
export class PortfolioService {
  constructor(
    @InjectModel(Portfolio.name) private portfolioModel: Model<PortfolioDocument>,
  ) {}

  async create(portfolioData: any): Promise<Portfolio> {
    const portfolio = new this.portfolioModel(portfolioData);
    return portfolio.save();
  }

  async findAll(category?: string): Promise<Portfolio[]> {
    const filter = category ? { category, isActive: true } : { isActive: true };
    return this.portfolioModel.find(filter).sort({ order: 1 }).exec();
  }

  async findAllAdmin(): Promise<Portfolio[]> {
    return this.portfolioModel.find().sort({ createdAt: -1 }).exec();
  }

  async findOne(id: string): Promise<Portfolio> {
    return this.portfolioModel.findById(id).exec();
  }

  async update(id: string, portfolioData: any): Promise<Portfolio> {
    return this.portfolioModel.findByIdAndUpdate(id, portfolioData, { new: true }).exec();
  }

  async remove(id: string): Promise<Portfolio> {
    return this.portfolioModel.findByIdAndDelete(id).exec();
  }
}