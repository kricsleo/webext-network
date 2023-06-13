import { computed, ref } from 'vue'

export interface RequestTypeConfig {
  icon: string
  label: string
  type: chrome.webRequest.ResourceType[]
}
const fallbackRequestTypeConfig: RequestTypeConfig = { icon: 'icon-[carbon--search]', type: ['other', 'object', 'ping', 'csp_report'], label: 'Other' }
export const requestTypeConfigs: RequestTypeConfig[] = [
  { icon: '', type: [], label: 'All' },
  { icon: 'icon-[carbon--send]', type: ['xmlhttprequest'], label: 'Fetch/XHR' },
  { icon: 'icon-[carbon--code]', type: ['script'], label: 'JS' },
  { icon: 'icon-[carbon--color-palette]', type: ['stylesheet'], label: 'CSS' },
  { icon: 'icon-[carbon--image]', type: ['image'], label: 'IMG' },
  { icon: 'icon-[carbon--video]', type: ['media'], label: 'Media' },
  { icon: 'icon-[carbon--document]', type: ['main_frame', 'sub_frame'], label: 'DOC' },
  { icon: 'icon-[carbon--text-font]', type: ['font'], label: 'Font'},
  { icon: 'icon-[carbon--arrows-horizontal]', type: ['websocket'], label: 'WS' },
  fallbackRequestTypeConfig,
]

export function useRequestTypeConfig(request: chrome.webRequest.WebRequestDetails) {
  return computed(() => {
    const typeConfig = requestTypeConfigs.find(t => t.type.includes(request.type))
    return typeConfig || fallbackRequestTypeConfig
  })
}

export const activeRequestType = ref<RequestTypeConfig['type']>([])
export const requestFilter = ref('')
export function toggleActiveRequestType(type: RequestTypeConfig['type']) {
  activeRequestType.value = type
}
export function setRequestFilter(filter: string) {
  requestFilter.value = filter
}
export function useFilterRequests(requests: chrome.webRequest.WebRequestDetails[]) {
  const filterReg = computed(() => createReg(requestFilter.value))
  return computed(() => requests.filter(
    request => (!activeRequestType.value.length || activeRequestType.value.includes(request.type))
      && (!requestFilter.value || filterReg.value.test(request.url))
  ))
}

export function createReg(regRaw: string) {
  const [_raw, _prefix, reg, flags] = String(regRaw).match(/(\/?)(.+)\1([a-z]*)/i)!
  return new RegExp(reg, flags)
}