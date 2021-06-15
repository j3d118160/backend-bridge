require('dotenv').config();
const midtransClient = require('midtrans-client');
const Express = require('express');
const app = Express();
const cors = require('cors');
const bodyParser = require('body-parser');
const port = 8080;

const { REACT_APP_MIDTRANS_SERVER_KEY, REACT_APP_MIDTRANS_CLIENT_KEY } = process.env
// Create Core API instance
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let core = new midtransClient.CoreApi({
    isProduction: false,
    serverKey: REACT_APP_MIDTRANS_SERVER_KEY,
    clientKey: REACT_APP_MIDTRANS_CLIENT_KEY
});

app.get('/get_token', async (req, res) => {

    var cardData = {
        "card_number": '4811111111111114',
        "card_exp_month": '02',
        "card_exp_year": '2025',
        "card_cvv": '123',
        "client_key": REACT_APP_MIDTRANS_CLIENT_KEY,
    };

    try {
        const x = await core.cardToken(cardData)
        console.log(x)
        res.send({
            data: x
        })
    } catch (error) {
        console.log(error)
        res.send('nay')
    }
})

app.post('/charge_cc/:token_id', async (req, res) => {
    const { token_id } = req.params
    const data = {
        "payment_type": "credit_card",
        "transaction_details": {
            "gross_amount": 12145,
            "order_id": "test-transaction-54321",
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