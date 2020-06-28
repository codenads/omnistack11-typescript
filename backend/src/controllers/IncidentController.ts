import { Request, Response } from 'express'
import knex from '../database/connection'

interface IIncident {
    title: string;
    description: string;
    value: number;
    ong_id?: string;
}

export default class IncidentController {

    async index(request: Request, response: Response) {
        const { page = 1 } = request.query;

        const [count] = await knex('incidents').count();
        const incidents = await knex('incidents')
                .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
                .limit(5)
                .offset((Number(page) - 1) * 5)
                .select([
                    'incidents.*',
                    'ongs.name',
                    'ongs.email',
                    'ongs.city',
                    'ongs.uf']);
        response.header('count', count['count(*)']); 
        if(!incidents) return response.status(204).json({ error: 'Não há incidentes cadastrados' })
        else return response.json(incidents);
    }

    async create(request: Request, response: Response) {
        const { title, description, value } = request.body;
        const ong_id = request.headers.authorization;
        const incident: IIncident = {
            title,
            description,
            value,
            ong_id,
        }

        const [id] = await knex('incidents').insert(incident);

        if(!id) return response.status(400).json({ error: 'Não foi possível criar o incidente'});
        else return response.json({ id });
    }

    async delete(request: Request, response: Response) {
        const { id } = request.params;
        const ong_id = request.headers.authorization;

        const incident = await knex('incidents')
                            .where('id', id)
                            .select('ong_id')
                            .first();

        if(incident.ong_id === ong_id) {
            await knex('incidents').where('id', id).delete();
            return response.status(204).send();
        } 
        else return response.status(401).json({ error: 'Não autorizado.'})

    }
}