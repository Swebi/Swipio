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
    const response = await fetch("http://localhost:3000/api/project");
    const data = await response.json();

    project.value = data.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
  } finally {
    loading.value = false;
  }
};

const test = {
  devfolio: "https://devfolio.co/projects/ikshana-99cf",
  name: "Ikshana",
  tagline: "put 'me-first' and live healthier",
  tags: [
    "Firebase",
    "Firestore",
    "Spotify API",
    "Alan API",
    "Google Translate API",
    "JavaScript",
    "HTML/CSS",
  ],
  problem:
    "Our project Ikshana is a small step towards creating an environment where gender diversity is not only about tokenism of some kind but in its true sense uplifting to the concerned. Spreading awareness about the diverse gender spectrum is a challenge for a developing country like India trying to break-free of its norms. It is important to support women and the non-binary community through their journey in overcoming the obstacles put forward by the society. There is a need to support them with reskilling, upskilling and counselling to help them stay on track of their life goals.\nWe have tried to provide a one-stop platform for the non-male population around us who are continuously under the pressure of living upto certain standards to be respected in the society, they often forget to look after their own well being.\nOur vision is to make a safe, and cosy place to learn, explore and heal themselves.\nFeatures of Our Website:\n1. Gender spectrum awareness - We have added a feature where the anyone who is still exploring their sexuality can take a quiz to know on which spectrum they incline more towards.\n2. Meditation Platform -  Our meditation platform helps users relax.\n3. Moode Based Spotify Playlist - Our mood base player plays music based on your mood\n4. Period Tracker- Our period trackers gives you an estimated date of your next cycle. It also comes in with a all you need to know to keep yourself healthy during periods guide.\n5. Pregnancy Tracker- Track your pregnancy alongside us and keep yourself updated.\n6. Medication Reminder- We added a feature where the user is reminded of the medications they have to take.\n7. GoogleTranslate API- A feature that helps women to communicate and interact in any language of their choice.\n8. AlanAPI- Your friendly voice assistant that can open any webpages according to your voice commands.\n",
  challenges:
    "Challenges we ran into: \n- Both of us teammates being new to coding, and this being our very first hackathon, we were skeptical about how this is going to go about, hence time management, keeping up with deadlines etc was the biggest challenge from our perspective.\n- this was our first time working with firebase, and watching so many tutorials in such a short span of time to get our authentication and other features up and running was a challenging task for us\n- understanding pregnancy and menstrual cycles, integrating the spotify API for mood-based playlists was a first for us",
  github: "https://github.com/OindrilaDas27/Ikshana",
  prizes: [
    {
      name: "Best Freshers Team",
      desc: "INR 10,000 to the team with all members currently in 1st year.",
    },
    {
      name: "Rank 4-8",
      desc: "Bluetooth Speakers for teams with ranks 4-8.",
    },
  ],
};

onMounted(fetchProject);
</script>

<template>
  <Toaster :duration="2000" />
  <div
    class="flex flex-col justify-start items-center w-full md:h-screen p-4 bg-[#151515]"
  >
    <Navbar />
    <SwipeCard :project="test"></SwipeCard>
  </div>
</template>
