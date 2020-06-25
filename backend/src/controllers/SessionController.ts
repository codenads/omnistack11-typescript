import { Request, Response } from 'express'
import knex from '../database/connection';

export default class SessionController {
    async create(request: Request, response: Response) {
        const { id } = request.body;

        const ong = await knex('ongs').where('id', id).select('name').first()

        if(!ong) return response.status(400).json({ error: 'ONG não existente'})

        return response.json(ong);

    }
}