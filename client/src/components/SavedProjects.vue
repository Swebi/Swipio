<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ref, onMounted } from "vue";
import SwipeCard from "@/components/SwipeCard.vue";
import Input from "./ui/input/Input.vue";

const projects = ref([]);
const search = ref("");

const fetchProject = async () => {
  let savedProjects = JSON.parse(localStorage.getItem("swipio"));
  if (savedProjects == null) savedProjects = [];

  projects.value = savedProjects;
};

onMounted(fetchProject);
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button variant=""> Saved </Button>
    </DialogTrigger>
    <DialogContent
      class="grid-rows-[auto_minmax(0,1fr)_auto] p-0 max-h-[95dvh]"
    >
      <DialogHeader class="p-6 pb-0">
        <DialogTitle class="text-white text-2xl">Saved Projects</DialogTitle>
        <DialogDescription class="text-gray-300 text-lg">
          Projects you've swiped right on
        </DialogDescription>
        <Input
          class="bg-primary border-white/10 text-gray-300 mt-2"
          v-model="search"
          placeholder="Search"
        />
      </DialogHeader>
      <div class="flex flex-col w-full h-full overflow-y-auto">
        <div v-for="project in projects">
          <SwipeCard
            v-if="
              project !== null &&
              (project.problem.includes(search) ||
                project.name.includes(search) ||
                project.tagline.includes(search))
            "
            :project="project"
            :saved="true"
            @fetch="() => fetchProject()"
          />
        </div>
      </div>
    </DialogContent>
  </Dialog>
</template>
