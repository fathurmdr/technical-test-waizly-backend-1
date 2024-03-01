declare type RequestUser = {
  userId: number;
  username: string;
};

declare namespace Express {
  export interface Request {
    user?: RequestUser;
  }
}
