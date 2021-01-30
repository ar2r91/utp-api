const db = require("../models/index");
const User = db.User;
const authService = require('../services/auth');
const bcryptService = require('../services/bcrypt');

const register = async (req, res) => {
    try {
        const {body} = req;

        const data = {
            name: body.name,
            password: body.password,
        };

        const user = await User.create(data);
        const token = authService.issue({id: user.id});
        return res.status(200).json({
            token,
            user
        });
    } catch (error) {
        return res.status(500).json({msg: error});
    }
};

const login = async (req, res) => {
    try {
        const {name, password} = req.body;

        if (!name || !password) {
            throw Error("Correo o contraseña inválida");
        }

        const query = {
            where: {
                name
            }
        };

        const user = await User.findOne(query);

        if (!user) {
            return res.status(400).json({msg: 'No se encontró el usuario'});
        }

        if (bcryptService.comparePasswords(password, user.password)) {

            const token = authService.issue({id: user.id});

            return res.status(200).json({
                token,
                user
            });
        }

        return res.status(401).json({msg: 'Unauthorized'});
    } catch (error) {
        return res.status(500).json({error: error});
    }
};

const validate = async (req, res) => {
    try {
        const {token} = req.body;

        // Compare token with local seed
        await authService.verify(token);

        // Everything's fine, send response
        return res.status(200).json({isValid: true, msg: "Valid Token"});
    } catch (error) {
        // In any error case, we send token not valid
        return res.status(401).json({isValid: false, err: 'Invalid Token!'});
    }
};

const getNotes = async (req, res) => {

    try {
        const userId = req.params.id;
        const users = await User.findByPk(userId, {include: ["Notes"]});
        return res.status(200).json({users});
    } catch (error) {
        return res.status(500).json({error: error});
    }
};

module.exports = {
    register,
    login,
    validate,
    getNotes
};
