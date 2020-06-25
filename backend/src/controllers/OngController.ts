import { Request, Response } from 'express'
import knex from '../database/connection'
import crypto from 'crypto';

interface IOng {
    id: string;
    name: string;
    email: string;
    whatsapp: string;
    city: string;
    uf: string;
}

export default class OngController {
    
    async create(request: Request, response: Response) {
        const { name, email, whatsapp, city, uf } = request.body;
        const id = crypto.randomBytes(4).toString('hex');
        const ong: IOng = {
            id,
            name,
            email,
            whatsapp,
            city,
            uf
        };

        await knex('ongs').insert(ong);   
        
        return response.json({id})
    }

    async index(request: Request, response: Response) {
        const ongs = await knex('ongs').select('*');
        return response.json(ongs)
    }
}