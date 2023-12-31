<script setup lang="ts">
import { ref } from 'vue';
import { PendingType, Rule } from '../types'
import { onClickOutside } from '@vueuse/core'

const props = withDefaults(defineProps<{
  rule?: Rule
}>(), {
  rule: () => ({
    id: Date.now(),
    filter: '',
    pendingType: 'none',
    timeout: 0
  })
})
const emits = defineEmits<{
  (e: 'update:rule', v: Rule): void
}>()

const opened = ref(false)
const domRef = ref<HTMLDivElement>()

const colorMap: Record<PendingType, string> = {
  'none': 'bg-green-400',
  'forever': 'bg-blue-400',
  'resolve': 'bg-organge-400',
  'reject': 'bg-rose-400',
}

onClickOutside(domRef, () => opened.value = false)

function handlePendingType(type: PendingType) {
  // if(type !== props.type) {
  //   emits('update:type', 'none')
  // }
}
function handleTimeout(type: PendingType, e: Event) {
  // if(type === props.type) {
  //   emits('update:timeout', Number((e.target as HTMLInputElement).value) || 0)
  // }
}
</script>

<template>
  <div ref="domRef" class="inline-block relative">
    <button 
      :class="['flex items-center gap-1 p-2 rounded-full hover:bg-gray-700', {'bg-gray-600': opened}]"
      @click="opened = !opened">
      <span :class="['inline-block rounded-full w-2 h-2', colorMap[rule.pendingType]]" />
    </button>
    <div v-show="opened" class="absolute top-[100%] left-0 translate-y-1 z-10 whitespace-nowrap bg-black p-1 rounded-sm">
      <div 
        class="hover:bg-gray-900 rounded-sm flex items-center px-1 cursor-default gap-1"
        @click.stop="handlePendingType('none')">
        <span :class="['icon-[carbon--checkmark]', { 'opacity-0': rule.pendingType !== 'none'}]" />
        <div>No Pending</div>
      </div>
      <div 
        class="hover:bg-gray-900 rounded-sm flex items-center px-1 cursor-default gap-1"
        @click="handlePendingType('forever')">
        <span :class="['icon-[carbon--checkmark]', { 'opacity-0': rule.pendingType !== 'forever'}]" />
        <div>Pending Forever</div>
      </div>
      <div 
        class="hover:bg-gray-900 rounded-sm flex items-center px-1 cursor-default gap-1"
        @click="handlePendingType('resolve')">
        <span :class="['icon-[carbon--checkmark]', { 'opacity-0': rule.pendingType !== 'resolve'}]" />
        <div>
          Pending for 
          <input 
            class="border-b border-gray-600 w-[5ch] text-center" 
            type="number"
            @input="handleTimeout('resolve', $event)" /> 
          ms then resolve
        </div>
      </div>
      <div 
        class="hover:bg-gray-900 rounded-sm flex items-center px-1 cursor-default gap-1"
        @click="handlePendingType('reject')">
        <span :class="['icon-[carbon--checkmark]', { 'opacity-0': rule.pendingType !== 'reject'}]" />
        <div>Pending for <input class="border-b border-gray-600 w-[5ch] text-center" /> ms then reject</div>
      </div>
    </div>
  </div>
</template>