import { IsBoolean, IsEmail, IsOptional, IsString } from 'class-validator'

export class UserDTO {
  @IsOptional()
  public readonly id?: number

  @IsString()
  public readonly firstName!: string

  @IsString()
  public readonly lastName!: string

  @IsString()
  @IsEmail()
  public readonly email!: string

  @IsString()
  public readonly password!: string

  @IsBoolean()
  @IsOptional()
  public readonly isActive?: boolean
}
