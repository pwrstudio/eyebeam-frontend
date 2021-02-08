import { writable, derived } from "svelte/store"
import get from "lodash/get"

  // *** GLOBAL
  import {
    COLORMAP,
    HEX_MAP,
  } from "./global.js"

// WRITABLE
export const localUserUUID = writable("")
export const localUserSessionID = writable("")
// export const localUserAuthenticated = writable(false)
export const localUserName = writable(false)
// export const authenticatedUserInformation = writable({})
export const globalUserList = writable([])
export const globalSettings = writable({})
export const areaList = writable({})
export const currentArea = writable(4)

export const currentAreaObject = derived(
    [currentArea, areaList ],
    ([$currentArea, $areaList]) => {
        let obj = {}
        if($areaList && Array.isArray($areaList)) {
            obj = $areaList.find(a => a.color.value === HEX_MAP[COLORMAP[$currentArea]]) 
        }
        return obj
    }
  )

  export const currentAudioRoom = derived(
    [currentAreaObject],
    ([$currentAreaObject]) => {
        if($currentAreaObject) {
            return parseInt(get($currentAreaObject, 'audioRoom', "1"))
        } else {
            return 0
        }
    }
  )

  export const currentTextRoom = derived(
    [currentAreaObject],
    ([$currentAreaObject]) => {
        if($currentAreaObject) {
            return parseInt(get($currentAreaObject, 'textRoom', "2"))
        } else {
            return 0
        }
    }
  )

  export const currentVideoRoom = derived(
    [currentAreaObject],
    ([$currentAreaObject]) => {
        if($currentAreaObject) {
            return get($currentAreaObject, 'videoRoom', "none")
        } else {
            return 0
        }
    }
  )


