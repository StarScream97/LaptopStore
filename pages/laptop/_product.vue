<template>
  <div>
    <Navbar />
    <div class="px-6 lg:px-16 pb-8 shadow bg-gray-200 min-h-screen">
      <div class="lg:flex pt-5">
        <div class="lg:w-1/3 mt-6 mr-4 overflow-hidden">
          <no-ssr>
            <carousel :autoplay="true" :perPage="1" :navigationEnabled="true">
              <slide
                v-for="image in product.productImages"
                :key="image._id"
                class="slide h-72 w-full rounded overflow-hidden cursor-pointer"
              >
                <img class="h-64" :src="image" :alt="product.name" />
              </slide>
            </carousel>
          </no-ssr>
        </div>
        <div class="lg:w-2/3 w-full py-6 lg:px-6 px-2 bg-white text-gray-600">
          <h5 class="font-bold text-3xl">{{product.name}}</h5>
          <div class="mt-2">
            <p v-html="product.description"></p>
          </div>
          <hr class="w-11/12 bg-gray-200 block" />

          <div class="mt-4 text-xl">
            <p>
              <span class="font-semibold">Brand</span>
              :
              <span class="font-medium">{{product.brand}}</span>
            </p>
          </div>
          <div class="mt-4 text-xl">
            <p>
              <span class="font-semibold">Color</span>:
              <span class="font-medium">{{product.color}}</span>
            </p>
          </div>
          <div class="mt-4 text-gray-700 flex flex-col text-2xl">
            <h5 class="font-bold">
              Price:
              <span class="font-bold">${{product.price}}</span>
            </h5>
          </div>
          <div class="flex mt-12">
            <button
              class="bg-blue-300 px-16 py-2 mr-3"
              @click="buyItem(product.price,product._id,product.name,product.productImages[0])"
            >Buy</button>
            <button class="bg-red-300 px-8 py-2" @click="addToCart">Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Navbar from '~/components/Navbar'
import Footer from '~/components/Footer'
import Buy from '~/components/Buy'
const Toast = require('../../helpers/sweetAlertToaster')

const axios = require('axios')
import https from 'https'

export default {
  components: {
    Navbar,
    Footer,
    Buy
  },
  async asyncData(params) {
    const agent = new https.Agent({
      rejectUnauthorized: false
    })
    const product = await axios.get(
      `${process.env.baseUrl}/product/single/${params.query.id}`,
      {
        httpsAgent: agent
      }
    )
    return { product: product.data }
  },
  data() {
    return {
      title: '',
      details: {
        amount: '',
        productId: ''
      },
      buyItemShow: false,
      productId: '',
      productName: '',
      options: {
        navButtons: false,

        responsive: [
          {
            breakpoint: 600,
            settings: {
              dots: false,
              navButtons: true
            }
          },

          {
            breakpoint: 900,
            settings: {
              navButtons: true,
              dots: true
            }
          }
        ]
      }
    }
  },
  methods: {
    async addToCart() {
      const result = await this.$store.dispatch('addToCart', this.product._id)
      if (result.data.error) {
        Toast.fire({
          type: 'error',
          title: result.data.errorLog
        })
      } else {
        this.$store.commit('addToCart', this.laptop._id)
        Toast.fire({
          type: 'success',
          title: result.data.message
        })
      }
    },
    buyItem(amount, productId, name, productImage) {
      this.$store.commit('buySingleItem', {
        amount,
        productId,
        name,
        productImage,
        type: 'Single'
      })
      this.$router.push('/buy')
    }
  },
  created() {
    this.title = this.$route.query.name
  },
  head() {
    return {
      title: this.title
    }
  }
}
</script>

<style>
hr {
  height: 2px;
}
</style>


