<script setup>
import { useMotionValue, useTransform, useMotionValueEvent } from "motion-v";
import { Motion } from "motion-v";
import { animate } from "motion-v";
import { defineProps } from "vue";
import SpotlightCard from "@/components/SpotlightCard.vue";
import { useToast } from "@/components/ui/toast/use-toast";
import StatusIcon from "./StatusIcon.vue";
import Button from "./ui/button/Button.vue";
import { Github } from "lucide-vue-next";

const props = defineProps({
  loading: Boolean,
  project: {
    type: Object,
    required: true,
  },
  saved: Boolean,
});

const emit = defineEmits(["fetch"]);

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

const handleSave = (project) => {
  animate(x, 100, { duration: 0.4 }).then(() => {
    let existingProjects = JSON.parse(localStorage.getItem("swipio"));
    if (existingProjects == null) existingProjects = [];

    existingProjects.push(project);

    localStorage.setItem("swipio", JSON.stringify(existingProjects));
    toast({
      title: "Project Saved!",
    });
    emit("fetch");
    animate(x, 0, { duration: 0.2 });
  });
};

const handleSkip = () => {
  animate(x, -100, { duration: 0.4 }).then(() => {
    toast({
      title: "Project Skipped!",
    });
    emit("fetch");
    animate(x, 0, { duration: 0.2 });
  });
};

const handleDragEnd = () => {
  if (x.get() >= 50) {
    handleSave();
  }
  if (x.get() <= -50) {
    handleSkip();
  }
};
</script>

<template>
  <Motion
    class="w-full rounded-lg flex flex-col gap-4 overflow-x-hidden md:overflow-x-visible items-center justify-center no-scrollbar py-4 md:py-8"
  >
    <div
      class="w-[90%] sm:w-[500px] h-fit flex justify-between px-3"
      v-if="!saved"
    >
      <Button @click="handleSkip" :disabled="loading">Skip</Button>
      <StatusIcon
        :tickPath="tickPath"
        :crossPathA="crossPathA"
        :crossPathB="crossPathB"
        :color="color"
      />
      <Button
        class="px-5 select-none"
        :disabled="loading"
        @click="handleSave(project)"
        >Save</Button
      >
    </div>
    <Motion
      :style="{ x }"
      :drag="saved ? false : 'x'"
      :drag-constraints="{ left: 0, right: 0 }"
      class="w-[90%] h-fit md:w-[500px] max-w-[500px] rounded-lg"
      @drag-end="handleDragEnd"
    >
      <SpotlightCard color="rgba(255, 255, 255, 0.05)">
        <div class="w-full h-fit p-6 pb-10 flex flex-col gap-7 no-scrollbar">
          <div class="flex flex-col gap-2">
            <h2 v-if="!loading" class="text-2xl font-bold text-white">
              {{ project.name }}
            </h2>
            <div
              v-else
              class="h-8 w-[40%] bg-white/10 rounded animate-pulse"
            ></div>
            <p v-if="!loading" class="text-sm text-gray-300">
              {{ project.tagline }}
            </p>
            <div
              v-else
              class="h-8 w-[75%] bg-white/10 rounded animate-pulse"
            ></div>
          </div>

          <div class="flex flex-col gap-2">
            <h3 class="font-semibold text-white">Technologies Used:</h3>
            <div v-if="!loading" class="flex flex-wrap gap-2">
              <span
                v-for="(tech, index) in project.tags"
                :key="index"
                class="px-2 py-1 text-xs rounded-full bg-white/10 text-white"
              >
                {{ tech }}
              </span>
            </div>
            <div v-else class="flex flex-wrap gap-2">
              <div
                v-for="i in 4"
                :key="i"
                class="w-16 h-6 bg-white/10 rounded-full animate-pulse"
              ></div>
            </div>
          </div>

          <div class="space-y-2">
            <h3 class="font-semibold text-white">Problem Solved:</h3>
            <p v-if="!loading" class="text-sm text-gray-300">
              {{ project.problem }}
            </p>
            <div v-else class="space-y-2">
              <div
                v-for="i in 3"
                :key="i"
                class="h-4 bg-white/10 rounded animate-pulse"
              ></div>
            </div>
          </div>

          <div class="space-y-2">
            <h3 class="font-semibold text-white">Challenges Faced:</h3>
            <p v-if="!loading" class="text-sm text-gray-300">
              {{ project.challenges }}
            </p>
            <div v-else class="space-y-2">
              <div
                v-for="i in 3"
                :key="i"
                class="h-4 bg-white/10 rounded animate-pulse"
              ></div>
            </div>
          </div>

          <div class="flex justify-between pt-4">
            <a
              v-if="!loading"
              :href="project.github"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center px-3 py-1.5 text-sm rounded-md bg-white/10 hover:bg-white/20 transition-colors text-white z-50"
            >
              <Github class="w-4 h-4 mr-2" />
              GitHub
            </a>
            <div
              v-else
              class="w-24 h-8 bg-white/10 rounded animate-pulse"
            ></div>
            <a
              v-if="!loading"
              :href="project.devfolio"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center gap-2 px-3 py-1.5 text-sm rounded-md bg-white/10 hover:bg-white/20 transition-colors text-white z-50"
            >
              <img src="../assets/devfolio.svg" class="w-4 h-4" />
              Devfolio
            </a>
            <div
              v-else
              class="w-24 h-8 bg-white/10 rounded animate-pulse"
            ></div>
          </div>
        </div>
      </SpotlightCard>
    </Motion>
  </Motion>
</template>
