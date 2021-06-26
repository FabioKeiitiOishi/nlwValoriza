import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

interface IPayload {
  sub: string;
}
export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
  // Receber o token
  const authToken = request.headers.authorization;
  
  if (!authToken) {
    return response.status(401).end();
  }
  // Validar se o token está preenchido
  const [, token] = authToken.split(' ');
  try {
    //Validar o token
    const { sub } = verify(token, '8ed0610ef11d435787b8cfdf43a4d1d0') as IPayload;

    // Recuperar informações do usuário
    request.user_id = sub;
    return next();
  } catch (error) {
    return response.status(401).end();
  }
  
}