<template>
  <div>
    <Navbar />
    <div class="h-72 lg:px-16 px-6 py-8">
      <div class="w-full max-w-xs mx-auto mt-12">
        <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="email">Email</label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Email"
              v-model="email"
            />
          </div>
          <div class="mb-6">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="password">Password</label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="******************"
              v-model="password"
            />
          </div>
          <div class="flex items-center justify-between">
            <button
              @click.prevent="login"
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >Log In</button>
          </div>
        </form>
      </div>
    </div>
    <!-- <Footer class="absolute bottom-0 left-0" /> -->
  </div>
</template>

<script>
import Navbar from '~/components/Navbar'
import Footer from '~/components/Footer'
const axios = require('axios')

const Toast = require('../helpers/sweetAlertToaster')
// const Toast = require('../helpers/sweetAlertToaster')

export default {
  components: {
    Footer,
    Navbar
  },
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    async login() {
      const user = await this.$store.dispatch('login', {
        email: this.email,
        password: this.password
      })

      if (user.data.error) {
        return Toast.fire({
          type: 'error',
          title: user.data.errorLog
        })

        // return Swal.fire('Ahem!', user.data.errorLog, 'error')
      }
      const newUser = {
        user: user.data.data,
        token: user.data.token
      }

      Toast.fire({
        type: 'success',
        title: 'Signed in successfully'
      })
      this.$store.commit('setUser', newUser)
      this.$store.commit('setItemCount', newUser.user.cart.length)
      setTimeout(() => {
        this.$router.push('/')
      }, 1700)
    }
  },
  head() {
    return {
      title: 'Login'
    }
  }
}
</script>
