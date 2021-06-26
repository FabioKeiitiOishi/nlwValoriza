import { getCustomRepository } from "typeorm"
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import { UserRepository } from "../repositories/UserRepository"

interface IAuthenticateRequest {
  email: string;
  password: string;
}

class AuthenticateUserService {
  async execute({email, password}: IAuthenticateRequest) {
    const userRepository = getCustomRepository(UserRepository);

    const user = await userRepository.findOne({ email });
    // Verificar se email existe
    if (!user) {
      throw new Error('Email/password incorrect');
    }
    // Verificar se a senha está correta
    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new Error('Email/password incorrect');
    }
    // Gerar o token
    const token = sign({ 
      email: user.email 
    }, '8ed0610ef11d435787b8cfdf43a4d1d0', {
      subject: user.id,
      expiresIn: '1h'
    });

    return token;
  }
}

export { AuthenticateUserService }