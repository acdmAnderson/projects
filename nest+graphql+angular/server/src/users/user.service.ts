import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/database/entities/user.entity';
import { UserDTO } from 'src/users/models/user.dto';
import { BaseService } from 'src/services/base.service';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class UserService implements BaseService<UserDTO> {
    
    constructor(@InjectRepository(User) private userRepository: Repository<User>) { }

    public save(entity: UserDTO): Promise<User> {
        return this.userRepository.save(entity);
    }

    public findAll(): Promise<UserDTO[]> {
        return this.userRepository.find();
    }

    public findOne(email: string): Promise<UserDTO> {      
        return this.userRepository.findOne({where: {email}});
    }
    public async remove(id: number): Promise<boolean> {
        const result: DeleteResult = await this.userRepository.delete(id);
        return result.affected > 0;
    }
}
