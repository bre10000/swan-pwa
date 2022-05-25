import {  post } from "../../lib/api";
import { get as getIDB } from 'idb-keyval'

export async function createActivityLog(type, data, action, id) {
    let dataUser = process.browser ? await getIDB('user') : null
    try {
        let response = await post({
            path: "activity-logs",
            data: {
                data: {
                    date: new Date(),
                    type: type,
                    data: data,
                    action: action,
                    entityID: id,

                    users_permissions_user: dataUser?.id
                }
            }
        });
        console.log("Create Activity Log ", response)
    } catch (e) {
        console.log("Error Create Activity Log ", e)
    }
}