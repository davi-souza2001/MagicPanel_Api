import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'

import User from '../models/User'
import Note from '../models/Note'
import getToken from '../helpers/getToken'

export default class NotesController {
    static async postNewNote(req: Request, res: Response) {
        const note = req.body.note
        const title = req.body.title
        let favorite = req.body.favorite

        let email: String

        if (req.headers.authorization) {
            // ele pega o token do header (que vai ta la depois o usuário logar), executa o getToken para tirar
            // o bearer do começo. Logo depois ele pega o token jwt e verifica e devolve tudo que contem
            // no jwt (que é o nome e id). Por final ele acha o usuário tentando logar com o id,
            // que é o mesmo do mongo.
            const token = getToken(req)
            const decoded: any = jwt.verify(token, 'magicpanel')
            const userLogged = await User.findById(decoded.id)
            email = userLogged.email

            if (!note) {
                res.status(422).json({ message: 'Digite uma nota !' })
                return
            }

            if (!title) {
                res.status(422).json({ message: 'Digite uma título !' })
                return
            }
            if (!favorite) {
                favorite = false
            }

            const noteGeral = new Note({
                note,
                title,
                favorite,
                email
            })

            try {
                const newNote = await noteGeral.save()
                res.status(200).json({ message: "Você escreveu uma nova nota !", newNote })
            } catch (error) {
                res.status(500).json({ message: error })
            }
        } else {
            res.status(200).json({ message: 'Você precisa estar logado para fazer uma nota !' })
            return
        }

    }

    static async editNote(req: Request, res: Response) {
        const id = req.params.id

        const note = req.body.note
        const title = req.body.title
        let favorite = req.body.favorite

        //check if user exists

        if (!req.headers.authorization) {
            res.status(422).json({ message: 'Você não está logado !' })
            return
        }

        const token = getToken(req)
        const decoded: any = jwt.verify(token, 'magicpanel')
        const userLogged = await User.findById(decoded.id)
        const noteSearched = await Note.findOne({ _id: id })

        // valiations

        if (!userLogged) {
            res.status(422).json({ message: 'Conta não encontrada !' })
        }

        if (!note) {
            res.status(422).json({ message: 'Digite uma nota !' })
            return
        }

        noteSearched.note = note

        if (!title) {
            res.status(422).json({ message: 'Digite uma título !' })
            return
        }

        noteSearched.title = title

        if (!favorite) {
            favorite = false
        }

        noteSearched.favorite = favorite

        try {
            await Note.findOneAndUpdate(
                { _id: noteSearched._id },
                { $set: noteSearched },
                { new: true }
            )
            res.status(200).json({message: 'Nota atualizada com sucesso !', noteSearched} )
        } catch (err) {
            res.status(500).json({ message: 'Houve um erro !', err })
            return
        }
    }

    static async deleteNote(req: Request, res: Response) {
        const id = req.params.id

        // //check if user exists

        // if (!req.headers.authorization) {
        //     res.status(422).json({ message: 'Você não está logado !' })
        //     return
        // }
        //check if note exists

        const note = await Note.findOne({_id: id})

        if(!note){
            res.status(404).json({ message: 'Nota não encontrada !'})
        }

        try {
            await Note.findByIdAndDelete(id)
            res.status(200).json({ message: 'Nota apagada !'})
        } catch (err) {
            res.status(400).json({ message: 'Algo deu errado !', err})
            return
        }
    }

    static async getAllNotes(req: Request, res: Response) {
        const allNotes = await Note.find()
        return res.status(200).json(allNotes)
    }
}