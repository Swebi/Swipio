<script setup>
import Navbar from "@/components/Navbar.vue";
import { Button } from "@/components/ui/button";
import SwipeCard from "@/components/SwipeCard.vue";
import Toaster from "@/components/ui/toast/Toaster.vue";
import { ref, onMounted } from "vue";

const project = ref({});
const loading = ref(true);

const fetchProject = async () => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_PUBLIC_SERVER_URL}/project`
    );
    const data = await response.json();

    project.value = data.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
  } finally {
    loading.value = false;
  }
};

onMounted(fetchProject);
</script>

<template>
  <Toaster :duration="2000" />
  <div
    class="flex flex-col justify-start items-center w-full md:h-screen p-4 bg-[#151515]"
  >
    <Navbar />

    <SwipeCard
      :loading="loading"
      :project="project"
      @fetch="() => fetchProject()"
    />
  </div>
</template>
