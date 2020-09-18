import { RequestHandler, Request, Response } from "express";
import { User } from "../models/user";

export const addUser: RequestHandler = (req: Request, res: Response) => {
  const id = req.body.id;
  const email = req.body.email;
  const name = req.body.name;
  const imageUrl = req.body.imageUrl;

  const user = new User({
      id,
      email,
      name,
      imageUrl
  });

  user.save().then(response => {
      return res.status(201).json(response);
  });
};

export const getUser: RequestHandler = (req: Request, res: Response) => {
  const id = req.params.id;

  User.find({id}).then(user => {
    return res.status(200).json(user);
  })
  .then(error => {
    return res.status(400).json({error});
  });
}