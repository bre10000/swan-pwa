import { get, writable } from 'svelte/store'
import { get as getIDB, set as setIDB } from 'idb-keyval'

function getSession() {
  const { subscribe, set } = writable(null)
  return {
    subscribe,
    fetch: async () => {
      try {
        if (!process.browser) {
          return
        }
        getIDB('session').then(
          session => {
            if(session) {
                set(session)
                return session
            } else {
              set(null)
              console.log("No session found on cookies set to EN")
              return 'en'
            }
          }
        )
        
      } catch (e) {
        console.log("Error getting session from local storage", e)
        set(null)
        setIDB('session', null)
        return 'en'
      }
    },
    setSession: async (session) => {
      try {
        setIDB('session', session)
        set(session)
      } catch (e) {
          console.log("Error setting session", e)
      }
    },
    logout: async () => {
      set(null);
      await setIDB('session', null)
    }

  }
}
export const sessionStore = getSession()
