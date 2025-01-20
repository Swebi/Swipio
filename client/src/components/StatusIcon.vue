<script setup>
import { Motion } from "motion-v";

const props = defineProps({
  tickPath: {
    type: Object,
    required: true,
  },
  crossPathA: {
    type: Object,
    required: true,
  },
  crossPathB: {
    type: Object,
    required: true,
  },
  color: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <svg class="progress-icon w-10 h-10 z-20" viewBox="0 0 50 50">
    <Motion
      as="path"
      fill="none"
      stroke-width="2"
      :stroke="color"
      d="M 0, 20 a 20, 20 0 1,0 40,0 a 20, 20 0 1,0 -40,0"
      :style="{ transform: 'translate(5px, 5px)' }"
    />
    <Motion
      as="path"
      fill="none"
      stroke-width="2"
      :stroke="color"
      d="M14,26 L 22,33 L 35,16"
      stroke-dasharray="0 1"
      :style="{ pathLength: tickPath }"
    />
    <Motion
      as="path"
      fill="none"
      stroke-width="2"
      :stroke="color"
      d="M17,17 L33,33"
      stroke-dasharray="0 1"
      :style="{ pathLength: crossPathA }"
    />
    <Motion
      as="path"
      fill="none"
      stroke-width="2"
      :stroke="color"
      d="M33,17 L17,33"
      stroke-dasharray="0 1"
      :style="{ pathLength: crossPathB }"
    />
  </svg>
</template>
