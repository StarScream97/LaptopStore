<template>
  <div>
    <Navbar />
    <div class="px-6 lg:px-16 py-4 bg-gray-300 min-h-screen lg:flex lg:flex-row flex-col">
      <div class="h-64 bg-white lg:w-1/5 w-full py-2 shadow rounded flex flex-col items-center">
        <div class="w-32 h-32">
          <img
            class="object-cover rounded-full w-full h-full"
            :src="this.$store.state.user.user.profileImage"
            alt="Profile Image"
          />
        </div>
        <div class="text-center mt-2">
          <h5 class="text-2xl text-gray-700">{{this.$store.state.user.user.name}}</h5>
          <p class="text-sm text-gray-600">{{this.$store.state.user.user.email}}</p>
        </div>
        <div class="text-center mt-4 text-gray-600">
          <nuxt-link to="/profile/purchases" class="mr-2">Purchases</nuxt-link>
          <nuxt-link to="/profile/cart" class="mr-2">Cart</nuxt-link>
          <nuxt-link to="/profile/sales">Sales</nuxt-link>
        </div>
      </div>
      <div class="lg:w-4/5 w-full px-4">
        <NuxtChild name="detailed" />
        <!-- <nuxt-child name="detailed" /> -->
        <nuxt-child />
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '~/components/Navbar'
export default {
  components: {
    Navbar
  },
  middleware: 'auth'
}
</script>


<style scoped>
</style>
