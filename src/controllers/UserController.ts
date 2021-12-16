module.exports = class UserController {
    static async register (req, res) {
        res.status(200).json({ message: 'Funcionou' })
    }
}