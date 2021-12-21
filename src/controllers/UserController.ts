import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import User from '../models/User'
import createUserToken from '../helpers/createUserToken'
import getToken from '../helpers/getToken'

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
        const salt = await bcrypt.genSalt(10)
        const passwordHash = await bcrypt.hash(password, salt)

        //create user
        const user = new User({
            name,
            email,
            password: passwordHash
        })

        try {
            const newUser = await user.save()
            res.status(200).json({message: "Tudo certo !", newUser})
        } catch (error) {
            res.status(500).json({message: error})
        }
    }

    static async login(req: Request, res:Response) {
        const { email, password } = req.body
        
        if (!email){
            res.status(422).json({ message: 'O email é obrigatório !' })
            return
        }
        if (!password){
            res.status(422).json({ message: 'A senha é obrigatória !' })
            return
        }

        //check if user exists in database
        const user = await User.findOne({ email })
        if(!user){
            res.status(422).json({ messsage: 'Não há cadastro nesse email !'})
            return
        }

        //check if password match with db password
        const checkPassword = await bcrypt.compare(password, user.password)

        if(!checkPassword) {
            res.status(422).json({ message: 'Senha inválida !' })
            return
        }

        await createUserToken(user, req, res)
    }

    static async checkUser(req: Request, res: Response){

        let currentUser: any

        if (req.headers.authorization) {
            const token = getToken(req)
            const decoded: any = jwt.verify(token, 'magicpanel')

            currentUser = await User.findById(decoded.id)

            currentUser.password = undefined
        } else {
            currentUser = null
        }

        res.status(200).json(currentUser)
    }
}