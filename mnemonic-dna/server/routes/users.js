const dotenv = require("dotenv");
const express = require('express');
const router = express.Router();

dotenv.config()
const TypingDnaClient = require('typingdnaclient');
const typingDnaClient = new TypingDnaClient(process.env.TYPING_DNA_API_KEY, process.env.TYPING_DNA_API_SECRET);

// https://www.typingdna.com/clients/logs
router.post('/:id', function (req, res, next) {
    const {tp} = req.body;
    const {id} = req.params;

    typingDnaClient.save(id, tp, (err, result) => {
        if (err || (result && result.success === 0)) {
            res.status(400).send(err);
            throw new Error('Couldnt save user', {err, result});
        }
        res.send(result);
    })
});

router.post('/verify/:id', function (req, res, next) {
    const {tp} = req.body;
    const {id} = req.params;
    console.log("verifying..");
    typingDnaClient.verify(id, tp, 2, (err, result) => {
        console.log("api result", result);
        if (err || (result && result.success === 0)) {
            res.status(400).send(err);
            throw new Error('Couldnt verify user', {err, result});
        }
        res.send(result);
    })
});

module.exports = router;
