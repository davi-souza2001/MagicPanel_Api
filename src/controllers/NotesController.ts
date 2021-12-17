import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'

import User from '../models/User'
import Note from '../models/Note'
import getToken from '../helpers/getToken'

export default class NotesController {
    static async postNewNote(req: Request, res: Response){
        const note = req.body.note
        const title = req.body.title
        let email: String 

        if (req.headers.authorization){
            // ele pega o token do header (que vai ta la depois o usuário logar), executa o getToken para tirar
            // o bearer do começo. Logo depois ele pega o token jwt e verifica e devolve tudo que contem
            // no jwt (que é o nome e id). Por final ele acha o usuário tentando logar com o id,
            // que é o mesmo do mongo.
            const token = getToken(req)
            const decoded: any = jwt.verify(token, 'magicpanel')
            const userLogged = await User.findById(decoded.id)
            email = userLogged.email

            if(!note){
                res.status(422).json({ message: 'Digite uma nota !'})
                return
            }

            if(!title){
                res.status(422).json({ message: 'Digite uma título !'})
                return
            }

            const noteGeral = new Note({
                note,
                title,
                email
            })

            try {
                const newNote = await noteGeral.save()
                res.status(200).json({message: "Você escreveu uma nova nota !", newNote})
            } catch (error) {
                res.status(500).json({message: error})
            }
        } else {
            res.status(200).json({ message: 'Você precisa estar logado para fazer uma nota !'})
            return
        }

    }

    static async getAllNotes(req: Request, res: Response){
        const allNotes = await Note.find()
        return res.status(200).json(allNotes)
    }
}