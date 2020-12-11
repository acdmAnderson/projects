import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { jwtSecret } from "./jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtSecret.secret,
            usernameField: 'email'
        });
    }

    public async validate({ email, fistName, lastName, id, iat, exp }): Promise<any> {
        return { email, fistName, lastName, id, iat, exp };
    }
}
