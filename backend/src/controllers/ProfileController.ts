import { Request, Response} from 'express';
import knex from '../database/connection';


export default class ProfileController {
    async index(request: Request, response: Response) {
        const ong_id = request.headers.authorization;
        if(ong_id !== undefined) {
            const incidents = await knex('incidents').where('ong_id', ong_id).select('*')
            return response.json(incidents)
        }
        return response.status(400).json({ error: 'Não foi fornecida uma ong'})
    }
}