import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from '../database/entities/user.entity'
import { UserDTO } from '../users/models/user.dto'
import { BaseService } from '../services/base.service'
import { DeleteResult, Repository } from 'typeorm'

@Injectable()
export class UserService implements BaseService<UserDTO> {
  constructor (@InjectRepository(User) private readonly userRepository: Repository<User>) { }

  public async save (entity: UserDTO): Promise<User> {
    return await this.userRepository.save(entity)
  }

  public async findAll (): Promise<UserDTO[]> {
    return await this.userRepository.find()
  }

  public async findOne (email: string): Promise<UserDTO> {
    return await this.userRepository.findOne({ where: { email } })
  }

  public async remove (id: number): Promise<boolean> {
    const result: DeleteResult = await this.userRepository.delete(id)
    return result.affected > 0
  }
}
