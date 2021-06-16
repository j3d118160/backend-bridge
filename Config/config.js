const midtransClient = require('midtrans-client');

export const core = new midtransClient.CoreApi({
    isProduction: false,
    serverKey: REACT_APP_MIDTRANS_SERVER_KEY,
    clientKey: REACT_APP_MIDTRANS_CLIENT_KEY
});