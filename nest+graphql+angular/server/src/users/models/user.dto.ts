import { IsBoolean, IsOptional, IsString } from "class-validator";

export class UserDTO{
    @IsOptional()    
    public readonly id?: number;

    @IsString()
    public readonly firstName!: string;

    @IsString()
    public readonly lastName!: string;

    @IsBoolean()
    @IsOptional()
    public readonly isActive?: boolean;
    
}