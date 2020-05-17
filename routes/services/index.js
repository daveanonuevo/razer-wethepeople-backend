

const db = require("../../db");
const {v4: uuidv4} = require('uuid');

const express = require('express');
const router = express.Router();

// GET API
router.get('/', (req, res, next) => {
    db.query("SELECT * FROM public.services",[], (err, result) => {
        if (result === undefined) {
            res.set('Content-Type', 'application/json').status(404).send({
                success: false,
                error: `Service does not exist`
            });
        } else {
            console.log(result.rows)
            res.set('Content-Type', 'application/json').status(200).send(
                result.rows
        )
        }
    })
});

// res.set('Content-Type', 'application/json').status(404).send({
// });

module.exports = router;


