import { writable } from 'svelte/store'
import { get } from '../lib/api'
import { get as getIDB, set as setIDB } from 'idb-keyval'

function getUser() {
  const { subscribe, set } = writable({loggedIn: false, data: null, fetched: false, account_type: null})
  return {
    subscribe,
    fetch: async () => {
      try {
        if (!process.browser) {
          return
        }
        getIDB('user').then(
          userCookie => {
            if(userCookie) {
                set({loggedIn: true, data: userCookie, fetched: false})
                return userCookie
            } else {
              set({loggedIn: false, data: null, fetched: false})
              console.log("No user found on cookies - NO USER FOUND")
              user.createUser()
            }
          }
        )
        
      } catch (e) {
        console.log("Error getting user from local storage", e)
        user.createUser()
      }
    },
    createUser: async () => {
      try {
          await get('users/me?populate=%2A', null).then(
            data => {
              console.log("User Info Request- ", data)
              if(data.data){
                setIDB('user', data.data)
                set({loggedIn: true, data: data.data, fetched: true})
              } else {
                throw("User isn't logged in")
              }
            }
          ).catch(
            e => {
              console.log("Error fetching current user 1 ", e)
              set({loggedIn: false, data: null, fetched: true})
              setIDB('user', null)
            }
          );
      } catch (e) {
          console.log("Error fetching current user", e)
      }
    },
   
    logout: async () => {
      try {
        setIDB('user', null)
        set({loggedIn: false, data: null, fetched: false, account_type: null})
      } catch (e) {
          console.log("Error logging out current user from store", e)
      }
    },
  }
}
export const user = getUser()
