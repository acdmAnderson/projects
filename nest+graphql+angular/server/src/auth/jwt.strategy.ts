import { Injectable, UnauthorizedException } from "@nestjs/common";
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
        if (this.sessionExpired(exp)) {
            throw new UnauthorizedException(`Session Expired`);
        }
        return { email, fistName, lastName, id, iat, exp };
    }

    private sessionExpired(expireAt: number): boolean {
        return Date.now() <= expireAt;
    }

}
