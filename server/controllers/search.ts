import { RequestHandler, Request, Response } from 'express';
import fetch from 'node-fetch';

const ITUNES_URL = 'https://itunes.apple.com/search';
export const alive: RequestHandler = (req: Request, res: Response) => { 
    return res.status(200).json({
        'alive': true
    });
};

export const getSuggestions: RequestHandler = (req: Request, res: Response) => {
    const query = req.params.query;
    return fetch(`${ITUNES_URL}?term=${encodeURIComponent(query)}&limit=20`)
        .then(response => {
            return response.json()
                .then(responseJson => res.status(200).json(responseJson));
        })
        .catch(err => console.log(err));
};