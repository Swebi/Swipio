<script setup>
import { useMotionValue, useTransform, useMotionValueEvent } from "motion-v";
import { Motion } from "motion-v";
import { defineProps } from "vue";
import SpotlightCard from "@/components/SpotlightCard.vue";
import { useToast } from "@/components/ui/toast/use-toast";

const { toast } = useToast();

const x = useMotionValue(0);
const xInput = [-100, 0, 100];

const color = useTransform(x, xInput, [
  "rgb(252, 3, 3)",
  "rgb(240, 240, 240)",
  "rgb(3, 209, 0)",
]);

const tickPath = useTransform(x, [10, 100], [0, 1]);
const crossPathA = useTransform(x, [-10, -55], [0, 1]);
const crossPathB = useTransform(x, [-50, -100], [0, 1]);

const handleDragEnd = () => {
  if (x.get() >= 70) {
    toast({
      title: "Project Saved!",
    });
  }
  if (x.get() <= -70) {
    toast({
      title: "Project Skipped!",
    });
  }
};
</script>

<template>
  <Motion
    class="w-full h-full md:w-[700px] md:h-[700px] rounded-lg flex items-start justify-center relative overflow-hidden md:overflow-visible"
  >
    <Motion
      :style="{ x }"
      drag="x"
      :drag-constraints="{ left: 0, right: 0 }"
      class="w-[75%] h-[80%] md:w-[400px] rounded-lg border-white/10"
      @drag-end="handleDragEnd"
    >
      <SpotlightCard color="rgba(255, 255, 255, 0.05)">
        <div class="w-full h-[65vh] md:h-[500px]">
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
