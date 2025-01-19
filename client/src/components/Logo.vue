<script>
export default {
  name: "Logo",
  props: {
    size: {
      type: Number,
      required: true,
    },
  },
};
</script>
<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="size"
    :height="size"
    viewBox="0 0 14 14"
    :style="{
      width: `${size}px`,
      height: `${size}px`,
    }"
  >
    <g
      fill="none"
      stroke="#fff"
      stroke-linecap="round"
      stroke-linejoin="round"
      :stroke-width="0.5"
    >
      <path
        d="M6.546.857a.475.475 0 0 1 .581-.335l6.02 1.612a.475.475 0 0 1 .337.581l-2.31 8.618a.475.475 0 0 1-.582.335l-6.02-1.612a.475.475 0 0 1-.336-.581z"
      />
      <path
        d="M6.108 2.535L.852 3.944a.475.475 0 0 0-.336.581l2.308 8.618a.475.475 0 0 0 .582.335l3.01-.806"
      />
    </g>
  </svg>
</template>
