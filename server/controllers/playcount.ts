import { RequestHandler, Request, Response } from 'express';
import { Playcount } from '../models/playcount';

export const updatePlayCount: RequestHandler = (req: Request, res: Response) => {
    const songId = req.params.id;

    Playcount.findOneAndUpdate({ songId: songId }, { "$inc": { "count": 1 } }, { upsert: true }).then(response => {
        return res.status(201).json(response);
    })
    .catch(err => {
        return res.status(400).json(err);    
    });
}

export const getTopNPlays: RequestHandler = (req: Request, res: Response) => {
    const n = Number(req.params.n);
    Playcount.find().sort({ count: -1 }).limit(n).then(response => {
        return res.status(200).json(response);
    })
    .catch(err => {
        return res.status(400).json(err); 
    });
}