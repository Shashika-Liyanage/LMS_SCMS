import Dotenv from 'dotenv-webpack';
import path from 'path';

export const plugins = [
    new Dotenv({
        path: path.resolve(__dirname, './.env'),
        systemvars: true, 
        safe: true 
    })
];
