require('dotenv').config();
const Express = require('express');
const app = Express();
const cors = require('cors');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

const cc = require('./Route/creditcard')
const emoney = require('./Route/emoney')
const port = 8080;

const { REACT_APP_MIDTRANS_SERVER_KEY, REACT_APP_MIDTRANS_CLIENT_KEY } = process.env
// Create Core API instance
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use('/cc', cc)
app.use('/emoney', emoney)

app.post('/charge_cc/:token_id', async (req, res) => {
    const { token_id } = req.params
    const data = {
        "payment_type": "credit_card",
        "transaction_details": {
            "gross_amount": 12145,
            "order_id": uuidv4(),
        },
        "credit_card": {
            "token_id": token_id, // change with your card token
            "authentication": true
        }
    }

    try {
        const x = await core.charge(data)
        console.log(x)
        res.send({
            data: x,
            token_id
        })
    } catch (error) {
        console.log(error)
        console.log(token_id)
        res.send('nay')
    }
})

app.listen(port, () => {
    console.log(`app listening on port ${port}`);
});