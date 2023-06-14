<script setup lang="ts">
import { reactive } from 'vue';
import RequestItem from './components/RequestItem.vue';
import RequestFilter from './components/RequestFilter.vue';
import RuleItem from './components/RuleItem.vue';
import { rules, useFilterRequests } from './composables/request'
import { RequestMeta } from './types'
// @ts-ignore
import { Splitpanes, Pane } from 'splitpanes'
import 'splitpanes/dist/splitpanes.css'

const requests = reactive<RequestMeta[]>([
  {
    "documentId": "A52AAA6E61357B20444859F354B2718E",
    "documentLifecycle": "active",
    "frameId": 0,
    "frameType": "outermost_frame",
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
    "documentId": "A52AAA6E61357B20444859F354B2718E",
    "documentLifecycle": "active",
    "frameId": 0,
    "frameType": "outermost_frame",
    "initiator": "https://photos.kric.cc",
    "method": "GET",
    "parentFrameId": -1,
    "requestId": "11155",
    "tabId": 364878968,
    "timeStamp": 1686641527265.7822,
    "type": "image",
    "url": "https://images.unsplash.com/photo-1686495728202-d80f2a4f1496?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MDM2MTl8MHwxfGFsbHwyOXx8fHx8fDJ8fDE2ODY2NDE1Mjd8&ixlib=rb-4.0.3&q=80&w=1080"
  },
  {
    "documentId": "CDE12EA0B1EF605AFE153BFB07341EFC",
    "documentLifecycle": "active",
    "frameId": 0,
    "frameType": "outermost_frame",
    "initiator": "http://localhost:3333",
    "method": "GET",
    "parentFrameId": -1,
    "requestId": "11330",
    "tabId": 364878956,
    "timeStamp": 1686641621469.001,
    "type": "xmlhttprequest",
    "url": "http://localhost:3333/"
  },
  {
    "documentId": "CDE12EA0B1EF605AFE153BFB07341EFC",
    "documentLifecycle": "active",
    "frameId": 0,
    "frameType": "outermost_frame",
    "initiator": "http://localhost:3333",
    "method": "GET",
    "parentFrameId": -1,
    "requestId": "11330",
    "tabId": 364878956,
    "timeStamp": 1686641621469.001,
    "type": "xmlhttprequest",
    "url": "http://localhost:3333/"
  },
  {
    "documentId": "CDE12EA0B1EF605AFE153BFB07341EFC",
    "documentLifecycle": "active",
    "frameId": 0,
    "frameType": "outermost_frame",
    "initiator": "http://localhost:3333",
    "method": "GET",
    "parentFrameId": -1,
    "requestId": "11330",
    "tabId": 364878956,
    "timeStamp": 1686641621469.001,
    "type": "xmlhttprequest",
    "url": "http://localhost:3333/"
  },
  {
    "documentId": "CDE12EA0B1EF605AFE153BFB07341EFC",
    "documentLifecycle": "active",
    "frameId": 0,
    "frameType": "outermost_frame",
    "initiator": "http://localhost:3333",
    "method": "GET",
    "parentFrameId": -1,
    "requestId": "11330",
    "tabId": 364878956,
    "timeStamp": 1686641621469.001,
    "type": "xmlhttprequest",
    "url": "http://localhost:3333/"
  }
])
const filteredRequests = useFilterRequests(requests)
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
        <RuleItem v-for="rule in rules" :key="rule.id" :rule="rule" />
      </Pane>
    </Splitpanes>
  </main>
</template>
