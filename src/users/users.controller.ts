import { Controller, Get, Post, Delete, Put, Param, Body } from '@nestjs/common';
import { UsersService } from '../services/users/users.service';
import { User } from 'src/shemas/user';

@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) {}

    @Get()
    getAllUsers(): Promise<User[]> {
        return this.usersService.getAllUsers()
    }

    @Get(":id")
    getUserById(@Param('id')id): Promise<User> {
        return this.usersService.getUserById(id);
    }

    @Post()
    sendUser(@Body()data): Promise<User> {
        return this.usersService.sendUser(data);
    }

    @Put(":id")
    updateUsers(@Param('id') id: string, @Body() updatedUserData: any): Promise<User>{
    return this.usersService.updateUsers(id, updatedUserData);
}

    @Delete(":id")
    deleteUserById(@Param('id')id): Promise<User>{
        return this.usersService.deleteUserById(id);
    }

}
