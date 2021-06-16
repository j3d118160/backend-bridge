const midtransClient = require('midtrans-client');
const { REACT_APP_MIDTRANS_SERVER_KEY, REACT_APP_MIDTRANS_CLIENT_KEY } = process.env

const core = new midtransClient.CoreApi({
    isProduction: false,
    serverKey: REACT_APP_MIDTRANS_SERVER_KEY,
    clientKey: REACT_APP_MIDTRANS_CLIENT_KEY
});

module.exports = core