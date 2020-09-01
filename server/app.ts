import express, { Request, Response, NextFunction } from 'express';
import { json } from 'body-parser';
import cors from 'cors';
//import passport from 'passport';

import { connect } from 'mongoose';
import searchRoutes from './routes/search';
import secretRoutes from './routes/secret';
import playlistRoutes from './routes/playlist';
import playCountRoutes from './routes/playcount';
//import authRoutes from './routes/google-oauth';

//import oauth from './controllers/google-oauth';
import SECRET from './secret/secret';
    
const app = express();

app.use(cors());
app.use(json());

app.use('/', searchRoutes);
app.use('/secret', secretRoutes);
app.use('/', playlistRoutes);
app.use('/', playCountRoutes);
/*app.use('/', authRoutes);

oauth(); */
//app.use(passport.initialize());

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({
        message: err.message
    });
});

connect(SECRET.MONGODB_CONNECTION_STRING)
    .then(() => {
        app.listen(3000); 
    })
    .catch(err => console.log('Cannot connect to DB', err));

//app.listen(3000);