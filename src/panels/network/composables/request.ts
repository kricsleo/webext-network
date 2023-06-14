import { computed } from 'vue'
import { Rule, RequestMeta } from '../types'
import { useAsyncStorage } from './storage'

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

export const activeRequestTypes = useAsyncStorage('@request/active-request-types', [] as RequestTypeConfig['types'])
export const requestFilter = useAsyncStorage('@request/filter', '')
export const rules = useAsyncStorage('@request/rules', [] as Rule[])

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