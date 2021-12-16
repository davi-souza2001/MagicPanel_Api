import { Request, Response } from 'express'

import Notes from '../models/Notes'

export default class NotesController {
    static async postNewNote(req: Request, res: Response){
        const note = req.body.note
        const email = req.body.email

        //check if note and email
        if(!note){
            res.status(422).json({message: 'Escreva sua nota !'})
            return
        }
        if(!email){
            res.status(422).json({message: 'Ter um email é obrigatório para anotar algo !'})
            return
        }
    }
}