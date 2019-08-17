<template>
  <div class="lg:px-16 px-6 showcase">
    <no-ssr>
      <carousel :autoplay="true" :perPage="1">
        <slide class="slider-wrapper slide w-full rounded">
          <!-- <div class="slider-wrapper slide w-full rounded"> -->
          <div class="lg:h-64 h-56 lg:w-3/6">
            <img
              class="rounded-sm w-full"
              src="https://img-cdn.tnwcdn.com/image?fit=1280%2C720&url=https%3A%2F%2Fcdn0.tnwcdn.com%2Fwp-content%2Fblogs.dir%2F1%2Ffiles%2F2017%2F01%2FAcer-Predator-21-X.jpg&signature=68f39f8950dcb6ed06d347e6e0ff21af"
              alt
            />
          </div>
          <div class="lg:w-3/6 lg:h-64 h-72 lg:pl-8 flex flex-col">
            <div class="w-full">
              <h5 class="font-bold text-3xl text-gray-800">Acer Predator 21X</h5>
              <p
                class="text-xl font-semibold text-gray-700 mt-1"
              >The world’s most immersive, most powerful, and most luxurious gaming laptop</p>
              <p
                class="mt-2 text-gray-600"
              >Guide your legend beyond the horizon to discover the world of curve. A world that bends, pulls you in, and never lets go.</p>
              <p class="text-gray-600">NVIDIA® GeForce® GTX 1080 SLI 16GB1</p>
              <p class="text-gray-600">7th Gen Intel® Core™ i7-7820HK processor</p>
            </div>
            <div class="flex mt-12">
              <button
                class="bg-blue-300 lg:px-16 px-12 py-2 mr-3"
                @click="buyItem(9000,'5d551c8d89cd672502c274de','Acer Predator 21X','https://img-cdn.tnwcdn.com/image?fit=1280%2C720&url=https%3A%2F%2Fcdn0.tnwcdn.com%2Fwp-content%2Fblogs.dir%2F1%2Ffiles%2F2017%2F01%2FAcer-Predator-21-X.jpg&signature=68f39f8950dcb6ed06d347e6e0ff21af')"
              >Buy</button>
              <button
                class="bg-red-300 px-6 py-2"
                @click="addToCart('5d551c8d89cd672502c274de')"
              >Add to Cart</button>
            </div>
          </div>
          <!-- </div> -->
        </slide>
        <slide class="slider-wrapper slide w-full rounded">
          <!-- <div class="slider-wrapper flex slide w-full rounded"> -->
          <div class="lg:h-64 h-56 lg:w-3/6">
            <img
              class="rounded-sm w-full"
              src="https://www.slashgear.com/wp-content/uploads/2019/05/asus-zenbook-pro-duo-1-1280x720.jpg"
              alt
            />
          </div>
          <div class="lg:w-3/6 h-64 lg:pl-8 flex flex-col">
            <div class="w-full">
              <h5 class="font-bold text-3xl text-gray-800">Asus Zenbook Pro Duo</h5>
              <p class="text-xl font-semibold text-gray-700 mt-1">The laptop of tomorrow</p>
              <p
                class="mt-2 text-gray-600"
              >Take your creativity and productivity to the next level with the groundbreaking ASUS ZenBook Pro Duo! Designed to give you the ultimate edge in workflow efficiency, the unique design features a full-width 4K ASUS ScreenPad™.</p>
            </div>
            <div class="flex mt-12">
              <button
                class="bg-blue-300 lg:px-16 px-12 py-2 mr-3"
                @click="buyItem(9000,'5d551c8d89cd672502c274de','Acer Predator 21X','https://img-cdn.tnwcdn.com/image?fit=1280%2C720&url=https%3A%2F%2Fcdn0.tnwcdn.com%2Fwp-content%2Fblogs.dir%2F1%2Ffiles%2F2017%2F01%2FAcer-Predator-21-X.jpg&signature=68f39f8950dcb6ed06d347e6e0ff21af')"
              >Buy</button>
              <button
                class="bg-red-300 px-6 py-2"
                @click="addToCart('5d551c8d89cd672502c274de')"
              >Add to Cart</button>
            </div>
          </div>
          <!-- </div> -->
        </slide>
        <slide class="slider-wrapper slide w-full rounded">
          <!-- <div class="slider-wrapper flex slide w-full rounded"> -->
          <div class="lg:h-64 h-56 lg:w-3/6">
            <img
              class="rounded-sm w-full"
              src="https://cnet3.cbsistatic.com/img/n8p9PPjDKOQNW2-0hXK6qAGv8BU=/1600x900/2018/12/22/d4a8da2f-34e9-49ee-aeba-78fe418d7536/alienware-area-51m-09.jpg"
              alt
            />
          </div>
          <div class="lg:w-3/6 h-64 lg:pl-8 flex flex-col">
            <div class="w-full">
              <h5 class="font-bold text-3xl text-gray-800">ALIENWARE AREA-51M</h5>
              <p class="text-xl font-semibold text-gray-700 mt-1">WELCOME TO A NEW ERA.</p>
              <p
                class="mt-2 text-gray-600"
              >Revolutionary 17-inch gaming laptop with upgradeable, overclockable desktop 9th Gen Intel® Core™ processors and NVIDIA® GeForce RTX™ graphics, plus a magnesium alloy chassis.</p>
            </div>
            <div class="flex mt-12">
              <button
                class="bg-blue-300 lg:px-16 px-12 py-2 mr-3"
                @click="buyItem(9000,'5d551c8d89cd672502c274de','Acer Predator 21X','https://img-cdn.tnwcdn.com/image?fit=1280%2C720&url=https%3A%2F%2Fcdn0.tnwcdn.com%2Fwp-content%2Fblogs.dir%2F1%2Ffiles%2F2017%2F01%2FAcer-Predator-21-X.jpg&signature=68f39f8950dcb6ed06d347e6e0ff21af')"
              >Buy</button>
              <button
                class="bg-red-300 px-6 py-2"
                @click="addToCart('5d551c8d89cd672502c274de')"
              >Add to Cart</button>
            </div>
          </div>
          <!-- </div> -->
        </slide>
      </carousel>
    </no-ssr>
  </div>
</template>

<script>
const Toast = require('../helpers/sweetAlertToaster')

export default {
  name: 'Showcase',
  components: {},
  data() {
    return {
      // options: {
      //   // navButtons: true,
      //   autoplay: true,
      //   responsive: [
      //     {
      //       breakpoint: 600,
      //       settings: {
      //         dots: false,
      //         navButtons: true
      //       }
      //     },
      //     {
      //       breakpoint: 900,
      //       settings: {
      //         // navButtons: true,
      //         dots: true
      //       }
      //     }
      //   ]
      // }
    }
  },
  methods: {
    async addToCart(productId) {
      const result = await this.$store.dispatch('addToCart', productId)
      if (result.data.error) {
        Toast.fire({
          type: 'error',
          title: result.data.errorLog
        })
      } else {
        this.$store.commit('addToCart', productId)
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
  head() {
    return {
      title: 'Vue Minimal Laptop Store'
    }
  }
}
</script>





