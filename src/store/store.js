import { derived, writable } from "svelte/store";

export const Files = writable()

export const Activities = derived(
  Files,
  async (files, set) => {
    if (files && files[0]) {
      const file = files[0]
      const text = await file.text()
      const chunks = text.split("\n")
      const parsed = chunks.filter(v => !!v).map(chunk => JSON.parse(chunk))
      set(parsed)
    }
  }
)

export const PermissionAccessFilter = writable({

})

export const PermissionAccess = derived(
  Activities,
  activities => activities?.filter(activity => activity.type === "access").reduce((known, current) => {
    if (known.some(access => access.identifier === current.identifier)) {
      return known.map(access => access.identifier === current.identifier
        ? ({
          ...access,
          start: access.start ?? current.timeStamp,
          end: access.end ?? current.timeStamp
        })
        : access)
    } else {
      return [...known, {
        identifier: current.identifier,
        bundleID: current.accessor.identifier,
        category: current.category,
        start: current.kind === "intervalStart" ? current.timeStamp : undefined,
        end: current.kind === "intervalEnd" ? current.timeStamp : undefined,
      }]
    }
  }, [])
)

export const FilteredPermissionAccess = derived(
  PermissionAccess,
  access => access?.filter(access => {
    return true
  })
)

export const NetworkActivityFilter = writable({
  hideIcloudPrivateRelay: false,
})

export const NetworkActivities = derived(
  Activities,
  activities => activities?.filter(activity => activity.type === "networkActivity")
)

export const FilteredNetworkActivities = derived(
  [NetworkActivities, NetworkActivityFilter],
  ([activities, filter]) => activities?.filter(activity => {
    if (filter.hideIcloudPrivateRelay && activity.bundleID === "com.apple.mobilesafari" && activity.domain.startsWith("mask")) { return false }
    return true
  })
)