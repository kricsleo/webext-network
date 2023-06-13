<script setup lang="ts">
import { onBeforeMount, reactive } from 'vue'
import RequestItem from './RequestItem.vue';

const requests = reactive<chrome.webRequest.WebRequestBodyDetails[]>([])

onBeforeMount(() => {
  const listerner = (detail)  => {
    requests.push(detail)
    const cancel = detail.url.indexOf("nabc") != -1
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
  <section>
    <p>total: {{ requests.length }}</p>
    <RequestItem v-for="request in requests" :key="request.requestId" :request="request" />
  </section>
</template>
