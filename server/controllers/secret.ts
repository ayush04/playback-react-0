import { RequestHandler, Request, Response } from 'express';
import SECRET from '../secret/secret';

export const getAPIKey: RequestHandler = (req: Request, res: Response) => {
    return res.status(200).json({
        'API_KEY': SECRET.API_KEY
    });
};

export const getClientId: RequestHandler = (req: Request, res: Response) => {
    return res.status(200).json({
        'CLIENT_ID': SECRET.CLIENT_ID
    });
}