import { api_url } from './../config'
import { get as getIDB } from 'idb-keyval'

async function send({ method, path, params, data, mode }) {
    const fetch = process.browser ? window.fetch : require('node-fetch').default
    let jwt = process.browser ? await getIDB('session') : null


    const opts = {
        method,
        headers: {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + jwt,
        },
        Cache: 'no-cache',
    }

    if (data) {
        opts.body = JSON.stringify(data)
    }

    if (mode) {
        opts.mode = mode
    }

    
    let url = new URL(`${api_url}/${path}`)
    if (params) {
        url = url + "?" + params;
        // Object.keys(params).forEach((key) =>
        //     url.searchParams.append(key, params[key])
        // )
    }
    try {
        console.log("REQUEST - ", url, opts)
        let response = await fetch(url, opts)
        let json = await response.text()
        if (!response.ok) {
            console.error("response", JSON.parse(json))
            throw JSON.parse(json)
        }
        try {
            return JSON.parse(json)
        } catch (e) {
            return json
        }
    } catch (e) {
        console.error("Network Error", e)
        throw e
    }
}

function get(path, params) {
    // let token = tkn || auth.token
    return send({ method: 'GET', path, params })
}

function del(path, data) {
    return send({ method: 'DELETE', path, data })
}

function post({path, data, mode}) {
    return send({ method: 'POST', path, data, mode })
}

function put({path, data}) {
    return send({ method: 'PUT', path, data })
}

export {get, del, post, put}