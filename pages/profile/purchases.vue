<template>
  <div class="lg:pt-0 pt-8">
    <h5 class="font-bold text-2xl text-gray-600 mb-3">My Purchases</h5>
    <div v-if="purchases && purchases.length>0" class="flex flex-col text-gray-600">
      <div
        class="flex items-center lg:px-6 py-2 px-4 bg-white shadow-md rounded mb-4"
        v-for="purchase in purchases"
        :key="purchase._id"
      >
        <div class="h-24 w-24 pt-3">
          <img :src="purchase.productImage" :alt="purchase.name" />
        </div>
        <div class="px-2 flex flex-col items-start">
          <h5 class="mr-4">{{purchase.productName}}</h5>
          <p class="mr-4">${{purchase.price}}</p>
          <p>{{purchase.date | getProperDate}}</p>
        </div>
      </div>
    </div>
    <div v-else>
      <p>No purchases made yet.</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      purchases: []
    }
  },
  created() {
    this.purchases = this.$store.state.user.user.purchases
  },
  filters: {
    getProperDate: function(value) {
      if (!value) return ''

      const newDate = new Date(value)
      return (
        newDate.getFullYear() +
        '/' +
        newDate.getMonth() +
        '/' +
        newDate.getDate()
      )
    }
  }
}
</script>