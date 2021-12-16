import { Request, Response } from 'express'

export default class NotesController {
    static async getAll(req: Request, res: Response){
        res.status(200).json({message: 'Olá'})
    }
}