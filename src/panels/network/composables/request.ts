import { computed, reactive, watch } from 'vue'
import { Rule, RequestMeta } from '../../../src/panels/network/types'
import { useLocalStorage } from '@vueuse/core'

export interface RequestTypeConfig {
  icon: string
  label: string
  types: chrome.webRequest.ResourceType[]
}
const fallbackRequestTypeConfig: RequestTypeConfig = { icon: 'icon-[carbon--search] text-blue-400', types: ['other', 'object', 'ping', 'csp_report'], label: 'Other' }
export const requestTypeConfigs: RequestTypeConfig[] = [
  { icon: '', types: [], label: 'All' },
  { icon: 'icon-[carbon--send] text-blue-400', types: ['xmlhttprequest'], label: 'Fetch/XHR' },
  { icon: 'icon-[carbon--code] text-blue-400', types: ['script'], label: 'JS' },
  { icon: 'icon-[carbon--color-palette] text-blue-400', types: ['stylesheet'], label: 'CSS' },
  { icon: 'icon-[carbon--image] text-blue-400', types: ['image'], label: 'IMG' },
  { icon: 'icon-[carbon--video] text-blue-400', types: ['media'], label: 'Media' },
  { icon: 'icon-[carbon--document] text-blue-400', types: ['main_frame', 'sub_frame'], label: 'DOC' },
  { icon: 'icon-[carbon--text-font] text-blue-400', types: ['font'], label: 'Font'},
  { icon: 'icon-[carbon--arrows-horizontal] text-blue-400', types: ['websocket'], label: 'WS' },
  fallbackRequestTypeConfig,
]

export function useRequestTypeConfig(request: RequestMeta) {
  return computed(() => {
    const typeConfig = requestTypeConfigs.find(t => t.types.includes(request.type))
    return typeConfig || fallbackRequestTypeConfig
  })
}

export const activeRequestTypes = useLocalStorage('@request/active-request-types', [] as RequestTypeConfig['types'])
export const requestFilter = useLocalStorage('@request/filter', '')
export const rules = useLocalStorage('@request/rules', [] as Rule[])
export const requests = reactive<RequestMeta[]>([])

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