<script setup>
import Navbar from "@/components/Navbar.vue";
import { Button } from "@/components/ui/button";
import SwipeCard from "@/components/SwipeCard.vue";
</script>

<template>
  <div
    class="flex flex-col justify-start items-center w-full h-screen p-4 bg-[#151515] no-scrollbar"
  >
    <Navbar class="mb-10" />
    <SwipeCard></SwipeCard>
  </div>
</template>
