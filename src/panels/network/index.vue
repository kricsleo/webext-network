<script setup lang="ts">
import { reactive, onBeforeMount } from 'vue';
import RequestItem from './components/RequestItem.vue';
import RequestFilter from './components/RequestFilter.vue';
import { useFilterRequests } from './composables/request'
import type { RequestMeta } from './types'

const requests = reactive<RequestMeta[]>([])
const filteredRequests = useFilterRequests(requests)

onBeforeMount(() => {
  const listerner = (request: RequestMeta)  => {
    requests.push(request)
    const cancel = request.url.indexOf("nabc") != -1
    if(cancel) {
      const start = Date.now()
      while (Date.now() - start < 5000) {
      }
    }
    return { cancel };
  }
  chrome.webRequest.onBeforeRequest.addListener(
    listerner,
    {urls: ["<all_urls>"]},
    ["blocking"]
  )
  return () => chrome.webRequest.onBeforeRequest.removeListener(listerner)
})
</script>

<template>
  <main class="h-full flex flex-col">
    <RequestFilter />
    <div class="grow overflow-auto p-2">
      <RequestItem 
        v-for="(request, idx) in filteredRequests"
        :key="request.requestId" 
        :request="request"
        :class="[idx % 2 === 1 ? 'bg-[#232424]' : 'bg-[#292929]', 'hover:bg-[#182436]']" />
      <p v-if="!filteredRequests.length" class="text-center opacity-60">No requests found</p>
    </div>
  </main>
</template>

