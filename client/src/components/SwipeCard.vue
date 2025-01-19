<script setup>
import { useMotionValue, useTransform } from "motion-v";
import { Motion } from "motion-v";
import { defineProps } from "vue";
import SpotlightCard from "@/components/SpotlightCard.vue";

const x = useMotionValue(0);
const xInput = [-100, 0, 100];

const background = useTransform(x, xInput, [
  "linear-gradient(180deg, #ff008c 0%, rgb(211, 9, 225) 100%)",
  "linear-gradient(180deg, #7700ff 0%, rgb(68, 0, 255) 100%)",
  "linear-gradient(180deg, rgb(230, 255, 0) 0%, rgb(3, 209, 0) 100%)",
]);

const color = useTransform(x, xInput, [
  "rgb(252, 3, 3)",
  "rgb(240, 240, 240)",
  "rgb(3, 209, 0)",
]);

const tickPath = useTransform(x, [10, 100], [0, 1]);
const crossPathA = useTransform(x, [-10, -55], [0, 1]);
const crossPathB = useTransform(x, [-50, -100], [0, 1]);
</script>

<template>
  <Motion
    class="w-full h-full lg:w-[700px] lg:h-[700px] rounded-lg flex items-start justify-center relative overflow-hidden lg:overflow-visible"
  >
    <Motion
      :style="{ x }"
      drag="x"
      :drag-constraints="{ left: 0, right: 0 }"
      class="w-[75%] h-[80%] lg:w-[400px] rounded-lg border-white/10"
    >
      <SpotlightCard>
        <div class="w-full h-[65vh]  lg:h-[500px]">
          <h1 class="text-white">Hello</h1>
        </div>
      </SpotlightCard>
    </Motion>

    <svg
      class="progress-icon absolute w-10 h-10 z-20 bottom-16"
      viewBox="0 0 50 50"
    >
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
  </Motion>
</template>
