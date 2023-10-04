import { IHandler, IRequest, mediatrJs } from 'building-blocks/mediatr-js/mediatr.js';
import { Body, Controller, Post, Route, SuccessResponse } from 'tsoa';
import Joi from 'joi';
import { GenerateToken } from '../generateToken/generateToken';
import { AuthDto } from '../../../dtos/authDto';
import { password } from 'building-blocks/utils/validation';
import { isPasswordMatch } from 'building-blocks/utils/encryption';
import UnauthorizedException from 'building-blocks/types/exception/unauthorizedException';
import { IUserRepository, UserRepository } from '../../../../data/repositories/userRepository';
import { inject, injectable } from 'tsyringe';
import ApplicationException from 'building-blocks/types/exception/applicationException';

export class Login implements IRequest<AuthDto> {
  email: string;
  password: string;

  constructor(request: Partial<Login> = {}) {
    Object.assign(this, request);
  }
}

export class LoginRequestDto {
  email: string;
  password: string;

  constructor(request: Partial<LoginRequestDto> = {}) {
    Object.assign(this, request);
  }
}

const loginValidations = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required().custom(password)
});

@Route('/identity')
export class LoginController extends Controller {
  @Post('v1/login')
  @SuccessResponse('200', 'OK')
  public async login(@Body() request: LoginRequestDto): Promise<AuthDto> {
    const result = await mediatrJs.send<AuthDto>(new Login(request));

    return result;
  }
}

@injectable()
export class LoginHandler implements IHandler<Login, AuthDto> {
  constructor(@inject('IUserRepository') private userRepository: IUserRepository) {}
  async handle(request: Login): Promise<AuthDto> {
    await loginValidations.validateAsync(request);

    const user = await this.userRepository.findUserByEmail(request.email);

    if (!user || !(await isPasswordMatch(request.password, user.password as string))) {
      throw new ApplicationException('Incorrect email or password');
    }

    const token = await mediatrJs.send<AuthDto>(new GenerateToken({ userId: user.id }));

    return token;
  }
}