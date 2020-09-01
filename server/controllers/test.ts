import { RequestHandler, Request, Response } from 'express';
import { randomNumber } from '../utils/utils';
import { Test } from '../models/test';

export const createTest: RequestHandler = (req: Request, res: Response) => {
    const val = req.params.value
    const test = new Test({
        id: randomNumber(),
        value: val
    });

    test.save().then(response => {
        return res.status(201).json(response);
    })
        .catch(err => {
            return res.status(400).json(err);
        });
}