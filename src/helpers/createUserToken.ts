import jwt from 'jsonwebtoken'
import {Request, Response} from 'express'

const createUserToken = async (user: any, req: Request, res: Response) => {
    //create a token
    const token = jwt.sign({
        name: user.name,
        id: user._id
    }, 'magicpanel')

    //return token
    res.status(200).json({
        message: 'Você está autenticado !',
        token: token,
        user
    })
}

export default createUserToken
