<template>
  <div class="px-6 lg:px-16 py-6">
    <!-- <div class="flex justify-between items-center">
      <div class="flex">
        <p>${{priceRange}}</p>
        <input
          v-model="priceRange"
          type="range"
          min="200"
          max="6000"
          value="6000"
          class="ml-2 priceSlider"
          id="priceRange"
        />
      </div>
    </div>-->

    <div class="products text-gray-600">
      <Laptop
        :laptop="laptop"
        class="product bg-white rounded-lg"
        v-for="laptop in laptops.slice(0,12)"
        :key="laptop._id"
      ></Laptop>
    </div>
  </div>
</template>

<script>
import Laptop from '~/components/Laptops/Laptop'
const Toast = require('../helpers/sweetAlertToaster')
const axios = require('axios')
import https from 'https'

export default {
  components: {
    Laptop
  },
  transition: {
    name: 'test',
    mode: 'out-in'
  },
  props: ['laptops'],
  // async asyncData({error}) {
  //   const agent = new https.Agent({
  //     rejectUnauthorized: false
  //   })
  // },
  data() {
    return {
      priceRange: '6000'
    }
  },
  methods: {
    async addItemToCart() {
      const result = await this.$store.dispatch('addToCart', this.laptop._id)
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
    }
  }
}
</script>


<style>
.priceSlider {
  -webkit-appearance: none;
  width: 100%;
  height: 15px;
  margin-top: 4px;
  border-radius: 5px;
  background: #d3d3d3;
  outline: none;
  opacity: 0.7;
  -webkit-transition: 0.2s;
  transition: opacity 0.2s;
}

.priceSlider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: #4caf50;
  cursor: pointer;
}

.priceSlider::-moz-range-thumb {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: #4caf50;
  cursor: pointer;
}
.products {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-gap: 1rem;
}
.product {
  grid-column: span 3;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.7s cubic-bezier(0.25, 0.8, 0.25, 1);
  overflow: hidden;
}

.product:hover img {
  transform: scale(1.05);
  transition: all 0.4s;
}

.product-action {
  margin-right: -6rem;
  transition: all 0.4s;
}
.product:hover .product-action {
  margin-right: 0;
  transition: all 0.4s;
}
.product img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all 0.4s;
  cursor: pointer;
}

@media only screen and (max-width: 900px) {
  .product {
    grid-column: span 6;
  }
}

@media only screen and (max-width: 500px) {
  .product {
    grid-column: span 12;
  }
}

@media only screen and (max-width: 768px) {
  .product-action {
    margin-right: 4px;
    margin-top: -18px;
  }
}
</style>



