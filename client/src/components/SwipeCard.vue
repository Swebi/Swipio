<script setup>
import { useMotionValue, useTransform, useMotionValueEvent } from "motion-v";
import { Motion } from "motion-v";
import { defineProps } from "vue";
import SpotlightCard from "@/components/SpotlightCard.vue";
import { useToast } from "@/components/ui/toast/use-toast";
import StatusIcon from "./StatusIcon.vue";

const props = defineProps({
  project: {
    type: Object,
    required: true,
  },
});

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
  if (x.get() >= 50) {
    toast({
      title: "Project Saved!",
    });
  }
  if (x.get() <= -50) {
    toast({
      title: "Project Skipped!",
    });
  }
};
</script>

<template>
  <Motion
    class="w-full h-full md:h-[700px] rounded-lg flex items-start justify-center relative overflow-x-hidden no-scrollbar"
  >
    <Motion
      :style="{ x }"
      drag="x"
      :drag-constraints="{ left: 0, right: 0 }"
      class="w-[90%] max-h-fit md:w-[400px] max-w-[400px] rounded-lg"
      @drag-end="handleDragEnd"
    >
      <SpotlightCard color="rgba(255, 255, 255, 0.05)">
        <div class="w-full h-fit p-6 pb-10 flex flex-col gap-4 no-scrollbar">
          <!-- Header -->
          <div class="space-y-2">
            <h2 class="text-2xl font-bold text-white">{{ project.name }}</h2>
            <p class="text-sm text-gray-300">{{ project.tagline }}</p>
          </div>

          <!-- Technologies -->
          <div class="space-y-2">
            <h3 class="font-semibold text-white">Technologies Used:</h3>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="(tech, index) in project.tags"
                :key="index"
                class="px-2 py-1 text-xs rounded-full bg-white/10 text-white"
              >
                {{ tech }}
              </span>
            </div>
          </div>

          <!-- Problem -->
          <div class="space-y-2">
            <h3 class="font-semibold text-white">Problem Solved:</h3>
            <p class="text-sm text-gray-300">{{ project.problem }}</p>
          </div>

          <!-- Challenges -->
          <div class="space-y-2">
            <h3 class="font-semibold text-white">Challenges Faced:</h3>
            <p class="text-sm text-gray-300">{{ project.challenges }}</p>
          </div>

          <!-- Footer -->
          <div class="flex justify-between pt-4">
            <a
              :href="project.github"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center px-3 py-1.5 text-sm rounded-md bg-white/10 hover:bg-white/20 transition-colors text-white"
            >
              <Github class="w-4 h-4 mr-2" />
              GitHub
            </a>
            <a
              :href="project.devfolio"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center px-3 py-1.5 text-sm rounded-md bg-white/10 hover:bg-white/20 transition-colors text-white"
            >
              <ExternalLink class="w-4 h-4 mr-2" />
              Devfolio
            </a>
          </div>
        </div>
      </SpotlightCard>
    </Motion>

    <StatusIcon
      :tickPath="tickPath"
      :crossPathA="crossPathA"
      :crossPathB="crossPathB"
      :color="color"
    />
  </Motion>
</template>
