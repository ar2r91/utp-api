const db = require("../models/index");
const moment = require('moment');
const Note = db.Note;
const authService = require('../services/auth');

const register = async (req, res) => {
    try {
        const {body} = req;
        const data = {
            title: body.title,
            description: body.description,
            userId: body.userId,
            createdAt: moment.now(),
            updatedAt: moment.now()
        };
        const note = await Note.create(data);
        const token = authService.issue({id: data.id});
        return res.status(200).json({
            token,
            note
        });
    } catch (error) {
        return res.status(500).json({msg: error});
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

module.exports = {
    register,
    validate,
};
