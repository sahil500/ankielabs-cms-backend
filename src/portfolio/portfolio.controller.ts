import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('portfolio')
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}

  @Get()
  async findAll(@Query('category') category: string) {
    return this.portfolioService.findAll(category);
  }

  @UseGuards(JwtAuthGuard)
  @Get('admin')
  async findAllAdmin() {
    return this.portfolioService.findAllAdmin();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.portfolioService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() portfolioData: any) {
    return this.portfolioService.create(portfolioData);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() portfolioData: any) {
    return this.portfolioService.update(id, portfolioData);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.portfolioService.remove(id);
  }
}