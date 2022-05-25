import { api_url, account_url } from './../config'


async function send({ method, path, params, header, data }) {
    const fetch = process.browser ? window.fetch : require('node-fetch').default
    const opts = {
        method,
        headers: {
            'Accept': '*/*',
            'Content-Type': header ? header.ContentType ? header.ContentType : 'application/x-www-form-urlencoded' : 'application/x-www-form-urlencoded',
            
        },
        Cache: 'no-cache',
    }

    console.log("Send options")
    console.log(opts)

    if (data) {
        if (opts.headers['Content-Type'] == 'application/x-www-form-urlencoded' || method == "GET") {
            opts.body = new URLSearchParams(data);
        } else if (opts.headers['Content-Type'] == 'application/json') {
            opts.body = JSON.stringify(data)
        }
    }

    let url = new URL(`${account_url}/${path}`)
    if (params) {
        Object.keys(params).forEach((key) =>
            url.searchParams.append(key, params[key])
        )
    }
    try {
        let response = await fetch(url, opts)
           
        console.log({response})
        if (!response) {
            throw "response undefined"
        }

        
        let json = await response.text();

        console.log({json})

        try {
            return JSON.parse(json)
        } catch (e) {
            throw e
        }

    } catch (e) {
        throw e
    }
}

function get({ path, params, header }) {
    return send({ method: 'GET', path, params, header })
}

function del({ path, header }) {
    return send({ method: 'DELETE', path, header })
}

function post({ path, header, data }) {
    return send({ method: 'POST', path, header, data })
}

function put({ path, header, data }) {
    return send({ method: 'PUT', header, path, data })
}

export {get, del, post, put }