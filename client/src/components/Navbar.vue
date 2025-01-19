<script setup>
import { Github } from "lucide-vue-next";
import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo.vue";
</script>
<template>
  <div class="flex justify-between items-center w-full h-20 p-4">
    <div class="flex justify-center items-center gap-2">
      <Logo :size="30" />
      <h1 class="text-xl text-white">Swipio</h1>
    </div>

    <div class="flex justify-center items-center gap-3">
      <Github color="white" :size="32" /> <Button>Saved</Button>
    </div>
  </div>
</template>
