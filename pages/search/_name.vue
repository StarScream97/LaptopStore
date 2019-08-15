<template>
  <div>
    <Navbar />
    <div v-if="!isLoaded" class="flex justify-center">
      <img class="w-12 h-12 mt-12" src="../../assets/Images/Spinner-1s-200px.svg" alt="loading bar" />
    </div>
    <div v-if="isLoaded" class="lg:px-16 px-6 py-4 min-h-screen text-gray-600">
      <div v-if="laptops && laptops.length==0" class="text-center mt-4 text-xl">
        <h6>No laptop with the name {{this.$route.params.name}}</h6>
      </div>
      <div class="products">
        <Laptop
          :laptop="laptop"
          class="product bg-white rounded-lg"
          v-for="laptop in laptops.slice(0,8)"
          :key="laptop._id"
        ></Laptop>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '~/components/Navbar'
import Laptop from '~/components/Laptops/Laptop'

const axios = require('axios')
import https from 'https'

export default {
  components: {
    Navbar,
    Laptop
  },
  data() {
    return {
      laptops: [],
      isLoaded: false
    }
  },
  methods: {
    async searchItem(search) {
      const agent = new https.Agent({
        rejectUnauthorized: false
      })
      const laptops = await axios.get(
        `${process.env.baseUrl}/product/search/${search}`,
        {
          httpsAgent: agent
        }
      )
      this.laptops = laptops.data
      this.isLoaded = true
    }
  },
  created() {
    this.laptops = this.$store.state.searchResults
    this.isLoaded = true
  },
  watch: {
    $route: function(newRoute, oldRoute) {
      this.isLoaded = false
      this.searchItem(newRoute.query.name)
      //   console.log(newRoute.query.name, oldRoute.query.name)
    }
  }
}
</script>