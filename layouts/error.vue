<template>
  <div
    class="min-h-screen min-w-full bg-blue-800 text-white flex flex-col justify-center items-center"
  >
    <h5 class="text-2xl">Nothing to see here</h5>
    <nuxt-link
      to="/"
      class="mt-2 text-xl bg-green-400 px-2 py-1 rounded text-black font-light"
    >Go Home</nuxt-link>
  </div>
</template>

<script>
export default {
  props: ['error'],
  layout: 'error' // you can set a custom layout for the error page
}
</script>