<template>
  <div>
    <Navbar />
    <Showcase class="mt-8 pt-4 bg-gray-200 mb-16" />
    <HomeLaptops :laptops="laptops" class="bg-gray-200" />
    <Footer />
  </div>
</template>

<script>
import Navbar from '~/components/Navbar'
import Showcase from '~/components/Showcase'
import HomeLaptops from '~/components/HomeLaptops'
import Footer from '~/components/Footer'

import https from 'https'
const axios = require('axios')

export default {
  components: {
    Navbar,
    Showcase,
    HomeLaptops,
    Footer
  },
  async asyncData() {
    const agent = new https.Agent({
      rejectUnauthorized: false
    })

    const laptops = await axios.get(`${process.env.baseUrl}/product`, {
      httpsAgent: agent
    })
    return {
      laptops: laptops.data
    }
  },
  data() {
    return {}
  }
}
</script>

