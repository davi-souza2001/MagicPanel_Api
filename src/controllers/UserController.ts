import { Request, Response } from 'express'
import User from '../models/User'

export default class UserController {
    static async register (req: Request, res: Response) {
        const name = req.body.name
        const email = req.body.email
        const password = req.body.password
        const confirmpassword = req.body.confirmpassword

        //validations
        if (!name) {
            res.status(422).json({ message: 'O nome é obrigatório' })
            return
        }
        if (!email) {
            res.status(422).json({ message: 'O email é obrigatório' })
            return
        }
        if (!password) {
            res.status(422).json({ message: 'A senha é obrigatória' })
            return
        }
        if (!confirmpassword) {
            res.status(422).json({ message: 'A confirmação de senha é obrigatória' })
            return
        }

        if (password !== confirmpassword) {
            res.status(422).json({ message: "A confirmação de senha precisa ser igual à senha !" })
            return
        }

        //check if user exists
        const userExists = await User.findOne({ email: email })

        if (userExists) {
            res.status(422).json({ message: "Email já cadastrado !" })
            return
        }

        // create password

        //create user
        const user = new User({
            name,
            email,
            password
        })

        try {
            const newUser = await user.save()
            res.status(200).json({message: "Tudo certo !", newUser})
        } catch (error) {
            res.status(500).json({message: error})
        }
    }
}