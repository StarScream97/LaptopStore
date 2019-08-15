<template>
  <div>
    <Navbar />
    <div class="h-72 lg:px-16 px-4 py-8 w-full">
      <div class="w-full max-w-3xl mx-auto mt-12">
        <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="name">Name</label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Name"
              v-model="user.name"
            />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="email">Email</label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Email"
              v-model="user.email"
            />
          </div>
          <div class="flex">
            <div class="mb-6 md:w-5/12 md:mr-6 w-full">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="password">Password</label>
              <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="******************"
                v-model="user.password"
              />
            </div>
            <div class="mb-6 md:w-5/12 w-full">
              <label
                class="block text-gray-700 text-sm font-bold mb-2"
                for="repeatpassword"
              >Repeat Password</label>
              <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight outline-none focus:shadow-outline"
                id="repeatpassword"
                type="password"
                placeholder="******************"
                v-model="repeatPassword"
              />
            </div>
          </div>

          <div class="mb-6">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="profileImage"
            >Profile Picture</label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight outline-none focus:shadow-outline"
              id="profileImage"
              type="text"
              placeholder="Profile Image"
              v-model="user.profileImage"
            />
          </div>
          <div class="flex items-center justify-between">
            <button
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded outline-none focus:shadow-outline"
              type="button"
              @click="signup"
            >Sign Up</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '~/components/Navbar'
const Toast = require('../helpers/sweetAlertToaster')
const axios = require('axios')

export default {
  components: {
    Navbar
  },
  data() {
    return {
      repeatPassword: '',
      user: {
        password: '',
        email: '',
        profileImage: '',
        name: ''
      }
    }
  },
  methods: {
    async signup() {
      if (this.user.password !== this.repeatPassword) {
        return Toast.fire({
          type: 'error',
          title: 'Passwords do not match'
        })
      }
      const user = await axios.post(`${process.env.baseUrl}/user/`, this.user)
      if (user.data.error) {
        return Toast.fire({
          type: 'error',
          title: user.data.errorLog
        })
      }

      Toast.fire({
        type: 'success',
        title: 'Signed Up Successfully'
      })

      const newUser = {
        user: user.data.data,
        token: user.data.token
      }
      if (newUser.user.cart.length == 0) {
        this.$store.commit('resetCart')
      }
      this.$store.commit('setUser', newUser)

      setTimeout(() => {
        this.$router.push('/')
      }, 1500)
    }
  }
}
</script>

