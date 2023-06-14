<script setup lang="ts">
import fontPickerHTML from "url:./panels/network/index.html"

chrome.devtools.panels.create(
  "Request",
  null,
  // See: https://github.com/PlasmoHQ/plasmo/issues/106#issuecomment-1188539625
  fontPickerHTML.split("/").pop(),
)
</script>

<template>
</template>