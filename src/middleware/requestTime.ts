import express, { Request, Response, NextFunction } from "express";

// Global middleware function to log time for each request
// you can change time by search gpt
export const time = (req: Request, res: Response, next: NextFunction) => {
  const requestTime = new Date();
  console.log(`Request : ${requestTime.toLocaleString()}`);
  next();
};
