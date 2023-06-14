import { computed, reactive } from 'vue'
import { Rule, RequestMeta } from '../../../src/panels/network/types'
import { useStorageAsync } from '@vueuse/core'

export interface RequestTypeConfig {
  icon: string
  label: string
  types: chrome.webRequest.ResourceType[]
}
const fallbackRequestTypeConfig: RequestTypeConfig = { icon: 'icon-[carbon--search]', types: ['other', 'object', 'ping', 'csp_report'], label: 'Other' }
export const requestTypeConfigs: RequestTypeConfig[] = [
  { icon: '', types: [], label: 'All' },
  { icon: 'icon-[carbon--send]', types: ['xmlhttprequest'], label: 'Fetch/XHR' },
  { icon: 'icon-[carbon--code]', types: ['script'], label: 'JS' },
  { icon: 'icon-[carbon--color-palette]', types: ['stylesheet'], label: 'CSS' },
  { icon: 'icon-[carbon--image]', types: ['image'], label: 'IMG' },
  { icon: 'icon-[carbon--video]', types: ['media'], label: 'Media' },
  { icon: 'icon-[carbon--document]', types: ['main_frame', 'sub_frame'], label: 'DOC' },
  { icon: 'icon-[carbon--text-font]', types: ['font'], label: 'Font'},
  { icon: 'icon-[carbon--arrows-horizontal]', types: ['websocket'], label: 'WS' },
  fallbackRequestTypeConfig,
]

export function useRequestTypeConfig(request: RequestMeta) {
  return computed(() => {
    const typeConfig = requestTypeConfigs.find(t => t.types.includes(request.type))
    return typeConfig || fallbackRequestTypeConfig
  })
}

export const activeRequestTypes = useStorageAsync('@request/active-request-types', [] as RequestTypeConfig['types'])
export const requestFilter = useStorageAsync('@request/filter', '')
export const rules = useStorageAsync('@request/rules', [] as Rule[])
export const requests = reactive<RequestMeta[]>([
  {
    "frameId": 0,
    "initiator": "https://photos.kric.cc",
    "method": "GET",
    "parentFrameId": -1,
    "requestId": "11105",
    "tabId": 364878968,
    "timeStamp": 1686641527261.345,
    "type": "image",
    "url": "https://images.unsplash.com/photo-1662010021854-e67c538ea7a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MDM2MTl8MXwxfGFsbHwxfHx8fHx8Mnx8MTY4NjY0MTUyN3w&ixlib=rb-4.0.3&q=80&w=1080"
  },
  {
    "frameId": 0,
    "initiator": "https://photos.kric.cc",
    "method": "GET",
    "parentFrameId": -1,
    "requestId": "11155",
    "tabId": 364878968,
    "timeStamp": 1686641527265.7822,
    "type": "image",
    "url": "https://images.unsplash.com/photo-1686495728202-d80f2a4f1496?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MDM2MTl8MHwxfGFsbHwyOXx8fHx8fDJ8fDE2ODY2NDE1Mjd8&ixlib=rb-4.0.3&q=80&w=1080"
  },
])

export function toggleActiveRequestTypes(types: RequestTypeConfig['types'], event: MouseEvent) {
  if (event.metaKey && types.length && activeRequestTypes.value.length) {
    const isAlreadyActive = types.every(t => activeRequestTypes.value.includes(t))
    if(isAlreadyActive) {
      activeRequestTypes.value = activeRequestTypes.value.filter(t => !types.includes(t))
    } else {
      activeRequestTypes.value.push(...types)
    } 
  } else {
    activeRequestTypes.value = types.slice()
  }
}
export function setRequestFilter(filter: string) {
  requestFilter.value = filter
}
export function useFilterRequests(requests: RequestMeta[]) {
  const filterReg = computed(() => createReg(requestFilter.value))
  return computed(() => requests.filter(
    request => (!activeRequestTypes.value.length || activeRequestTypes.value.includes(request.type))
      && (!requestFilter.value || filterReg.value.test(request.url))
  ))
}

export function createReg(regRaw: string) {
  const [_raw, _prefix, reg, flags] = String(regRaw).match(/(\/?)(.+)\1([a-z]*)/i)!
  return new RegExp(reg, flags)
}