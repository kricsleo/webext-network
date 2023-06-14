export type RequestMeta = chrome.webRequest.WebRequestBodyDetails

export type PendingType = 'none' | 'forever' | 'resolve' | 'reject'

export interface Rule {
  id: number
  filter: string
  pendingType: PendingType
  timeout: number
}