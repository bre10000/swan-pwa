import { writable } from 'svelte/store'
import { get } from '../lib/api'
import { get as getIDB, set as setIDB } from 'idb-keyval'

function getLocale() {
  const { subscribe, set } = writable('en')
  return {
    subscribe,
    fetch: async () => {
      try {
        if (!process.browser) {
          return
        }
        getIDB('locale').then(
          locale => {
            if(locale) {
                set(locale)
                return locale
            } else {
              set('en')
              console.log("No locale found on cookies set to EN")
              return 'en'
            }
          }
        )
        
      } catch (e) {
        console.log("Error getting user from local storage", e)
        set('en')
        setIDB('locale', 'en')
        return 'en'
      }
    },
    setLocale: async (language) => {
      try {
        setIDB('locale', language)
        set(language)
      } catch (e) {
          console.log("Error setting locale", e)
      }
    },

  }
}
export const localeS = getLocale()
