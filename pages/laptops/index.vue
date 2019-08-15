<template>
  <div>
    <Navbar />
    <div class="lg:px-16 px-6 py-4 min-h-screen bg-gray-200">
      <div class="lg:flex mb-5 justify-start">
        <div class="flex lg:mb-0 mb-3">
          <div class="flex mr-4 items-center">
            <label for="product-brand">Brand</label>
            <select
              class="px-2 py-1 ml-2 rounded bg-white"
              name="productBrand"
              id="product-brand"
              v-model="brand"
            >
              <option value="All">All</option>
              <option value="Acer">Acer</option>
              <option value="Dell">Dell</option>
              <option value="Razer">Razer</option>
              <option value="Xiaomi">Xiaomi</option>
              <option value="HP">HP</option>
              <option value="Asus">Asus</option>
              <option value="Sony">Sony</option>
            </select>
          </div>
          <div class="flex mr-4 items-center">
            <label for="product-color">Color</label>
            <select
              class="px-2 py-1 ml-2 rounded bg-white"
              name="productColor"
              id="product-color"
              v-model="color"
            >
              <option value="All">All</option>
              <option value="Black">Black</option>
              <option value="Blue">Blue</option>
              <option value="White">White</option>
              <option value="Gray">Gray</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>
        <div class="flex">
          <p>${{priceRange}}</p>
          <input
            v-model="priceRange"
            type="range"
            min="400"
            max="6000"
            value="400"
            class="ml-2 priceSlider"
            id="priceRange"
          />
        </div>
      </div>
      <div class="products text-gray-600">
        <Laptop
          class="product bg-white rounded-lg"
          v-for="laptop in filteredLaptops"
          :key="laptop._id"
          :laptop="laptop"
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
  async asyncData() {
    const agent = new https.Agent({
      rejectUnauthorized: false
    })
    const laptops = await axios.get(`${process.env.baseUrl}/product/`, {
      httpsAgent: agent
    })
    return { laptops: laptops.data }
  },
  data() {
    return {
      priceRange: 4000,
      color: 'All',
      brand: 'All'
    }
  },
  methods: {},
  computed: {
    filteredLaptops() {
      if (this.color === 'All' && this.brand === 'All')
        return this.laptops.filter(laptop => {
          return laptop.price <= this.priceRange
        })

      return this.laptops.filter(laptop => {
        return (
          laptop.price <= this.priceRange &&
          laptop.brand === this.brand &&
          laptop.color === this.color
        )
      })
    }
  },
  created() {}
}
</script>


<style scoped>
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
</style>

