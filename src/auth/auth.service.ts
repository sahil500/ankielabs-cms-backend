import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    console.log(username, password);
    
    const user = await this.userModel.findOne({ username });
    console.log( "user check" ,user, await bcrypt.compare(password, user.password));
    
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user.toObject();
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user._id, role: user.role };
    
    // Update last activity
    await this.userModel.findByIdAndUpdate(user._id, { lastActivity: new Date() });
    
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    };
  }

  async refreshToken(userId: string) {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new UnauthorizedException();
    }

    // Check if user has been inactive for more than 30 minutes
    const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000);
    if (user.lastActivity < thirtyMinutesAgo) {
      throw new UnauthorizedException('Session expired due to inactivity');
    }

    // Update last activity
    await this.userModel.findByIdAndUpdate(userId, { lastActivity: new Date() });

    const payload = { username: user.username, sub: user._id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async updateActivity(userId: string) {
    await this.userModel.findByIdAndUpdate(userId, { lastActivity: new Date() });
  }
}