<script setup>
import { Github } from "lucide-vue-next";
import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo.vue";
import SavedProjects from "./SavedProjects.vue";
</script>
<template>
  <div class="flex justify-between items-center w-full h-20 p-4 select-none">
    <div class="flex justify-center items-center gap-2">
      <Logo :size="30" />
      <h1 class="text-xl text-white">Swipio</h1>
    </div>

    <div class="flex justify-center items-center gap-3">
      <a href="https://github.com/Swebi/Swipio">
        <Github color="white" :size="32" />
      </a>
      <SavedProjects />
    </div>
  </div>
</template>
