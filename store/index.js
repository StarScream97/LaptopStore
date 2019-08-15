import Vue from "vue";
import Vuex from "vuex";
// import VuexPersist from 'vuex-persist';
const axios = require('axios')

const Toast = require('../helpers/sweetAlertToaster')


Vue.use(Vuex);





// const vuexLocalStorage = new VuexPersist({
//   // key: 'ecommerce',
//   reducer: state => ({
//     user: state.user,
//     cartItemCount: state.cartItemCount,
//     itemToBuy: state.itemToBuy,
//     isLoggedIn: state.isLoggedIn,
//     searchResults: state.searchResults
//   })
//   // storage: window.localStorage,
// })


export const state = () => ({
  cartItemCount: 0,
  user: {},
  itemToBuy: {
    productId: '',
    amount: '',
    type: '',
    name: '',
    productImage: ''
  },
  isLoggedIn: false,
  searchResults: []
})

export const getters = {
  isAuthenticated(state) {
    // console.log(context.store.getters['isLoggedIn'])
    return state.isLoggedIn
  }
}

export const mutations = {

  addToCart(state, payload) {
    // function alreadyInCart(item) {
    //   return state.user.user.cart.some(el => {
    //     return el._id === item._id
    //   })
    // }
    // const exists = alreadyInCart(payload)
    // if (!exists) {
    //   state.cartItemCount += 1;
    //   state.user.user.cart.push(payload)
    //   Toast.fire({
    //     type: 'success',
    //     title: 'Product added to the cart!'
    //   })
    //   state.canAddToCartServer = true;
    // } else {
    //   Toast.fire({
    //     type: 'error',
    //     title: 'Product already in cart!'
    //   })
    // }

    state.user.user.cart.push(payload)
    state.cartItemCount++;

  },
  removeProductIdFromCart(state, productId) {
    const productIndex = state.user.user.cart.indexOf(productId)
    state.user.user.cart.splice(productIndex, 1);
    state.cartItemCount--;
    Toast.fire({
      type: 'success',
      title: 'Successfully removed from the cart'
    })
  },
  setItemCount(state, itemcount) {
    state.cartItemCount = itemcount
  },
  resetCart() {
    state.cartItemCount = 0;
  },
  setSearchResults(state, payload) {
    state.searchResults = payload;
  },
  setUser(state, user) {
    state.user = user;
    state.isLoggedIn = true
  },
  addNewPurchase(state, payload) {
    state.user.user.purchases.push(payload);
  },
  newItemSold(state, payload) {
    state.user.user.products.push(payload);
  },
  buySingleItem(state, payload) {
    const {
      amount,
      productId,
      type,
      name,
      productImage
    } = payload
    state.itemToBuy.amount = amount
    state.itemToBuy.productId = productId
    state.itemToBuy.type = type
    state.itemToBuy.name = name
    state.itemToBuy.productImage = productImage
  }

}



export const actions = {
  login(state, payload) {
    return axios.post(`${process.env.baseUrl}/user/login`, payload);
  },
  buyItem(state, payload) {
    return axios.post(
      `${process.env.baseUrl}/user/checkout`,
      payload
    )
  },
  addToCart({
    commit,
    state
  }, payload) {
    return axios.post(`${process.env.baseUrl}/user/cart`, {
      userId: state.user.user._id,
      productId: payload
    });
  },


  fetchCartItems({
    commit,
    state
  }, payload) {
    return axios.get(`${process.env.baseUrl}/user/cart/${state.user.user._id}`)

  },
  removeFromCart({
    commit,
    state
  }, productId) {
    commit('removeProductIdFromCart', productId)
    return axios.delete(`${process.env.baseUrl}/user/cart/delete/${state.user.user._id}/${productId}`)
  }
}

// export const plugins = [vuexLocalStorage.plugin]
// plugins: [vuexLocalStorage.plugin]
