<script setup lang="ts">
import { reactive, onBeforeMount, onMounted } from 'vue';
import RequestItem from './components/RequestItem.vue';
import RequestFilter from './components/RequestFilter.vue';
import RuleItem from './components/RuleItem.vue';
import { rules, useFilterRequests, requests } from './composables/request'
import { RequestMeta } from './types'
// @ts-ignore
import { Splitpanes, Pane } from 'splitpanes'
import 'splitpanes/dist/splitpanes.css'
import { useLocalStorage } from '@vueuse/core'

const filteredRequests = useFilterRequests(requests)
const panelSize = useLocalStorage('@request/panel-size', 70)

onMounted(() => {
  const beforeRequestListerner = (request: RequestMeta)  => {
    if(request.tabId !== chrome.devtools.inspectedWindow.tabId || request.method === 'OPTIONS') {
      return
    }
    requests.push(request)
    // todo: replace with regex
    let shouldPending = rules.value.some(rule => rule.filter === request.url)
    // todo: this lock html
    const start = Date.now()
    const timeout = 1000
    while(shouldPending && Date.now() - start < timeout) {
      // shouldPending = rules.value.some(rule => rule.filter === request.url)
    }
  }
  const navigateListener = () => requests.length = 0
  chrome.webRequest.onBeforeRequest.addListener(
    beforeRequestListerner,
    {urls: ["<all_urls>"]},
    ["blocking"]
  )
  chrome.devtools.network.onNavigated.addListener(navigateListener)
  return () => {
    chrome.webRequest.onBeforeRequest.removeListener(beforeRequestListerner)
    chrome.devtools.network.onNavigated.removeListener(navigateListener)
  }
})
</script>

<template>
  <main class="h-full flex flex-col">
    <RequestFilter />
    <Splitpanes class="grow overflow-hidden" @resize="panelSize = $event[0].size">
      <Pane class="!overflow-auto" :size="panelSize">
        <RequestItem 
          v-for="(request, idx) in filteredRequests"
          :key="request.requestId" 
          :request="request"
          :class="[idx % 2 === 1 ? 'bg-[#232424]' : 'bg-[#292929]', 'hover:bg-[#182436]']" />
        <p v-if="!filteredRequests.length" class="flex items-center justify-center opacity-60">No requests found</p>
      </Pane>
      <Pane class="!overflow-auto p-2" :size="100 - panelSize">
        <RuleItem 
          v-for="(rule, idx) in rules" 
          :key="rule.id" 
          :rule="rule"
          :class="[idx % 2 === 1 ? 'bg-[#232424]' : 'bg-[#292929]', 'hover:bg-[#182436]']" />
      </Pane>
    </Splitpanes>
  </main>
</template>
