const router = require('express').Router();
const { core } = require('../Config/config')

router.get('/step1', async (req, res) => {
    try {
        const parameter = {
            "payment_type": "gopay",
            "transaction_details": {
                "gross_amount": 12145,
                "order_id": "",
            },
            // "gopay": {
            //     "enable_callback": true,                // optional
            //     "callback_url": "someapps://callback"   // optional
            // }
        };
        const x = await core.charge(parameter)
        res.send({
            data: x
        })
    } catch (error) {
        console.log(error)
        res.send({
            code: 400,
            msg: 'Something Is Wrong!'
        })
    }
})

module.exports = router