<template>
  <div class="sticky w-100 top-0 bg-gray-700 text-white z-20 text-gray-200">
    <div class="lg:flex flex-wrap items-center py-1 lg:px-16 px-6">
      <div class="lg:w-3/12">
        <nuxt-link to="/">
          <h4 class="tracking-widest font-bold text-3xl">Albedo</h4>
        </nuxt-link>
      </div>
      <div class="flex-1 lg:w-6/12">
        <form action="#" @submit.prevent="searchProduct">
          <input
            v-model="searchTerm"
            type="text"
            placeholder="Search"
            class="text-black px-2 w-full py-1 shadow rounded"
          />
        </form>
      </div>
      <div class="flex-1 flex lg:w-3/12 mt-3 lg:justify-end items-center">
        <div class="relative">
          <nuxt-link to="/profile/cart">
            <!-- <i class="fas fa-shopping-cart"></!-->
            <img src="../assets/Images/shopping-cart.svg" class="h-4 w-4" alt />
          </nuxt-link>
          <div>
            <p
              v-if="cartItemCount<=9"
              class="bg-red-400 rounded-full text-sm w-4 h-4 flex justify-center items-center text-center text-white absolute cart-item-count"
            >{{cartItemCount}}</p>
            <p
              v-else
              class="bg-red-400 rounded-full text-sm w-4 h-4 flex justify-center items-center text-center text-white absolute cart-item-count"
            >9+</p>
          </div>
        </div>
        <div class="ml-4">
          <nuxt-link to="/login">Login</nuxt-link>
        </div>
        <div class="ml-4">
          <nuxt-link to="/signup">Signup</nuxt-link>
        </div>
        <div class="ml-4 text-2xl w-8 h-8">
          <nuxt-link to="/profile">
            <img
              v-if="user.user"
              class="object-cover rounded-full w-full h-full"
              :src="user.user.profileImage"
              alt="Profile Image"
            />
            <img
              v-else
              class="object-cover rounded-full w-full h-full"
              src="../assets/Images/chun-lo-demon-patreon.jpg"
              alt="Profile Image"
            />
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

const axios = require('axios')
import https from 'https'

export default {
  computed: {
    cartItemCount() {
      return this.$store.state.cartItemCount
    },
    user: {
      get: function() {
        return this.$store.state.user
      },
      set loggedInUser(newValue) {
        this.user = newValue
      }
    }
  },

  data() {
    return {
      searchTerm: ''
    }
  },
  methods: {
    async searchProduct() {
      const agent = new https.Agent({
        rejectUnauthorized: false
      })
      const laptops = await axios.get(
        `https://localhost:3000/product/search/${this.searchTerm}`,
        {
          httpsAgent: agent
        }
      )
      this.$store.commit('setSearchResults', laptops.data)
      this.$router.push({ path: '/search', query: { name: this.searchTerm } })
      // this.$router.push(`/search/${this.searchTerm}`)
      this.searchTerm = ''
    }
  },
  mounted() {
    this.$store.subscribe((mutation, state) => {
      switch (mutation.type) {
        case 'setUser':
          this.loggedInUser = state.user
      }
    })
  },

  created() {
    this.$store.commit('resetCart')
  },
  watch: {
    cartItemCount(newValue, oldValue) {}
  }
}
</script>


<style scoped>
.cart-item-count {
  /* top: -1rem; */
  /* right: -2px; */
  top: -6px;
  right: -8px;
}
</style>


