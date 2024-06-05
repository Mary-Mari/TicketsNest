import { Injectable, Param } from '@nestjs/common';
import { Model } from 'mongoose';
import { UserDocument } from 'src/shemas/user';
import { InjectModel } from '@nestjs/mongoose';
import { User } from'src/shemas/user';
import { UserDto } from 'src/dto/users-dto';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class UsersService {

    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private jwtService: JwtService
    ) {
        console.log('user service run');
    }

    async getAllUsers(): Promise<User[]> {
        return this.userModel.find();
      }
    
      async getUserById(id): Promise<User> {
        return this.userModel.findById(id);
      }
    
      async sendUser(data): Promise<User> {
        const userData = new this.userModel(data);
        return userData.save();
      }
    
      async updateUsers(id: string, body): Promise<User> {
        return this.userModel.findByIdAndUpdate(id, body);
      }
    
      async deleteUsers(): Promise<any> {
        return this.userModel.deleteMany()
      }
    
      async  deleteUserById(id: string): Promise<User> {
        return this.userModel.findByIdAndDelete(id);
      }
    
      async checkAuthUser(login: string, psw: string): Promise<User[]> {
        const usersArr = await this.userModel.find({login:login, psw:psw});
        return usersArr.length === 0 ? null : usersArr;
      }
    
      async checkRegUser(login: string): Promise<User[]> {
        return this.userModel.find({login: login});
      }
      
      async  login(user: UserDto) {
        const payload = {login: user.login, psw: user.psw};
        const userFromDb = await this.userModel.find({login:user.login});
        return {
          id: userFromDb[0]._id,
          access_token: this.jwtService.sign(payload),
        }
      }
}
