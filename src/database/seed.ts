import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { getModelToken } from '@nestjs/mongoose';
import { User } from '../auth/schemas/user.schema';
import { Service } from '../services/schemas/service.schema';
import { Portfolio } from '../portfolio/schemas/portfolio.schema';
import * as bcrypt from 'bcryptjs';

async function seed() {
  const app = await NestFactory.createApplicationContext(AppModule);
  
  const userModel = app.get(getModelToken(User.name));
  const serviceModel = app.get(getModelToken(Service.name));
  const portfolioModel = app.get(getModelToken(Portfolio.name));

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10);
  await userModel.create({
    username: 'admin',
    email: 'admin@3dstudio.com',
    password: hashedPassword,
    role: 'admin'
  });

  // Create sample services
  const services = [
    {
      title: 'Modeling',
      description: 'Create detailed 3D models from concept to completion with precision and creativity.',
      tagline: 'Sculpt ideas with skilled structures',
      icon: 'box',
      iconColor: '#06b6d4',
      startingPrice: 500,
      order: 1
    },
    {
      title: 'Texturing',
      description: 'Apply realistic materials and textures that make your 3D models come alive.',
      tagline: 'Bring surfaces to life with realism',
      icon: 'palette',
      iconColor: '#8b5cf6',
      startingPrice: 300,
      order: 2
    },
    {
      title: 'Lighting',
      description: 'Professional lighting setups that enhance the mood and atmosphere of your scenes.',
      tagline: 'Craft cinematic mood & depth',
      icon: 'lightbulb',
      iconColor: '#eab308',
      startingPrice: 400,
      order: 3
    },
    {
      title: 'Animation',
      description: 'Bring your 3D creations to life with smooth, engaging animations and storytelling.',
      tagline: 'Infuse motion, tell your story',
      icon: 'play',
      iconColor: '#ec4899',
      startingPrice: 800,
      order: 4
    },
    {
      title: 'Rendering',
      description: 'High-quality final renders that showcase your project in the best possible light.',
      tagline: 'Deliver polished product',
      icon: 'camera',
      iconColor: '#10b981',
      startingPrice: 600,
      order: 5
    }
  ];

  await serviceModel.insertMany(services);

  // Create sample portfolio items
  const portfolioItems = [
    {
      title: 'Futuristic City Model',
      description: 'Complete 3D city environment with advanced lighting and texturing',
      imageUrl: 'https://images.pexels.com/photos/3862132/pexels-photo-3862132.jpeg',
      tags: ['Architecture', 'Environment', 'Lighting'],
      category: 'modeling',
      clientName: 'Future Corp',
      order: 1
    },
    {
      title: 'Character Animation Reel',
      description: 'Dynamic character animations with realistic motion capture',
      imageUrl: 'https://images.pexels.com/photos/7135057/pexels-photo-7135057.jpeg',
      tags: ['Character', 'Motion', 'Rigging'],
      category: 'animation',
      clientName: 'Animation Studio',
      order: 2
    },
    {
      title: 'Product Visualization',
      description: 'High-quality product renders with photorealistic materials',
      imageUrl: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg',
      tags: ['Product', 'Materials', 'Lighting'],
      category: 'rendering',
      clientName: 'Product Co',
      order: 3
    }
  ];

  await portfolioModel.insertMany(portfolioItems);

  console.log('Database seeded successfully!');
  await app.close();
}

export default seed;