<script setup>
import { cn } from "@/lib/utils";
import { ToastViewport } from "radix-vue";
import { computed } from "vue";

const props = defineProps({
  hotkey: { type: Array, required: false },
  label: { type: [String, Function], required: false },
  asChild: { type: Boolean, required: false },
  as: { type: null, required: false },
  class: { type: null, required: false },
});

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});
</script>

<template>
  <ToastViewport
    v-bind="delegatedProps"
    :class="
      cn(
        'fixed top-0 z-[100] flex max-h-screen items-end justify-end w-full flex-col-reverse p-4 md:bottom-0 md:right-0 md:top-auto md:flex-col md:max-w-[420px]',
        props.class
      )
    "
  />
</template>
