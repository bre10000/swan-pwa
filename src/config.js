// const server_ip = 'https://account.simuni.ml'
const server_ip = 'http://localhost:1337'
// const www_ip = 'https://swan-stock-portal.herokuapp.com'
const www_ip = 'http://swan.swanstockportal.com'

const api_url = (process.env.NODE_ENV === 'production'
? www_ip 
: server_ip) + '/api';

const account_url = (process.env.NODE_ENV === 'production'
? www_ip 
: server_ip) + '/api';

const image_url = process.env.NODE_ENV === 'production'
? www_ip 
: server_ip;


const host = www_ip
const currency = { symbol: '$', code: 'USD' }

export {
    api_url,
    image_url,
    account_url,
    host,
    www_ip,
    currency
}