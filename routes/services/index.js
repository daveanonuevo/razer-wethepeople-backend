const db = require("../../db");
const {v4: uuidv4} = require('uuid');

const express = require('express');
const router = express.Router();

// GET API
router.get('/:number', (req, res, next) => {
    /**
     * Gets balance of their account
     * API will get the ID from the URL query string
     */
    db.query("SELECT * FROM public.services", [req.params.number], (err, result) => {
        if (result === undefined) {
            res.set('Content-Type', 'application/json').status(404).send({
                success: false,
                error: `Number does not exist`
            });
        } else {
             res.set('Content-Type', 'application/json').status(404).send({
                success: true,
                error: `Number does not exist`
            });   
        }
    })
});

// res.set('Content-Type', 'application/json').status(404).send({
// });

module.exports = router;

