<script setup lang="ts">
import { reactive, onBeforeMount } from 'vue';
import RequestItem from './components/RequestItem.vue';
import RequestFilter from './components/RequestFilter.vue';
import RuleItem from './components/RuleItem.vue';
import { rules, useFilterRequests } from './composables/request'
import { RequestMeta } from './types'
// @ts-ignore
import { Splitpanes, Pane } from 'splitpanes'
import 'splitpanes/dist/splitpanes.css'

const requests = reactive<RequestMeta[]>([])
const filteredRequests = useFilterRequests(requests)

onBeforeMount(() => {
  const listerner = (request: RequestMeta)  => {
    requests.push(request)
    // todo: replace with regex
    let shouldPending = rules.value.some(rule => rule.filter === request.url)
    // todo: this lock html
    while(shouldPending) {
      shouldPending = rules.value.some(rule => rule.filter === request.url)
    }
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
    <Splitpanes class="grow overflow-hidden">
      <Pane class="!overflow-auto p-2">
        <RequestItem 
          v-for="(request, idx) in filteredRequests"
          :key="request.requestId" 
          :request="request"
          :class="[idx % 2 === 1 ? 'bg-[#232424]' : 'bg-[#292929]', 'hover:bg-[#182436]']" />
        <p v-if="!filteredRequests.length" class="text-center opacity-60">No requests found</p>
      </Pane>
      <Pane class="!overflow-auto p-2">
        <div class="py-1">
          <button 
            v-if="rules.length" 
            class="icon-[carbon--clean]" 
            @click="rules = []" title="clean rules" />
        </div>
        <RuleItem v-for="rule in rules" :key="rule.id" :rule="rule" />
      </Pane>
    </Splitpanes>
  </main>
</template>
