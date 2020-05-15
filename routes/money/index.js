const db = require("../../../db");
const {v4: uuidv4} = require('uuid');

const express = require('express');
const router = express.Router();

// GET API
router.get('/:number', (req, res, next) => {
    /**
     * Gets balance of their account
     * API will get the ID from the URL query string
     */
    db.query("SELECT * FROM public.money WHERE number=$1", [req.params.number], (err, result) => {
        if (result === undefined) {
            res.set('Content-Type', 'application/json').status(404).send({
                success: false,
                error: `Number does not exist`
            });
        } else {
            let total = 0;
            for (let x = 0; x < result.rows.length; x++) {
                if (result.rows.category === 'DEPOSIT')
                    total = total + parseFloat(result.rows[x].amount);
                if (result.rows.category === 'WITHDRAW')
                    total = total - parseFloat(result.rows[x].amount);
                if (result.rows.category === 'SPEND')
                    total = total - parseFloat(result.rows[x].amount);
            }
            res.set('Content-Type', 'application/json').status(200).send({
                number: req.params.number,
                total
            });
        }
    })
});

// res.set('Content-Type', 'application/json').status(404).send({
// });
// POST API
router.post('/', (req, res, next) => {
    /**
     * All data received by this API will be in JSON
     */
    /** Received API structure
     * @param req.body.number
     * @param req.body.category
     * @param req.body.amount
     * @param req.body.title
     * @param req.body.description
     */
    if (!req.body.number || !req.body.category || !req.body.amount || !req.body.title || !req.body.description)
        res.set('Content-Type', 'application/json')
            .status(400)
            .send({
                success: false,
                error: "Not all data is given"
            });
    const uuid = uuidv4();
    db.query("INSERT INTO public.money(uuid, number, category, amount, title, description) VALUES ($1, $2, $3, $4, $5, %6)", [
        uuid,
        req.body.number,
        req.body.category,
        req.body.amount,
        req.body.title,
        req.body.description
    ], (err, result) => {
        if (err){
            console.error(err);
            res.set('Content-Type', 'application/json')
                .status(500)
                .send(err.detail);
        }
        else{
            res.set('Content-Type', 'application/json').status(200).send({
                success: true
            });
        }
    })
});

module.exports = router;
