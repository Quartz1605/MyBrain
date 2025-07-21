import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';


interface CustomRequest extends Request {
  email?: string;
}


interface MyJwtPayload extends JwtPayload {
  email: string;
}

const UserMiddleware = (req: CustomRequest, res: Response, next: NextFunction) => {
  const token: string = req.cookies.jwt;

  if (!token) {
    return res.status(401).send('You are not authenticated.');
  }

  try {
    const isVerified = jwt.verify(token, process.env.JWT_SECRET as string) as MyJwtPayload;

    req.email = isVerified.email;
    next();
  } catch (err) {
    return res.status(403).send('Token is invalid or expired');
  }
};

export { UserMiddleware ,CustomRequest};