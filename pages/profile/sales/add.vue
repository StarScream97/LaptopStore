<template>
  <div class="w-full lg:w-11/12 mx-auto lg:mt-0 mt-4">
    <div class="lg:flex lg:flex-row flex-col">
      <div class="lg:mr-6 flex flex-col mb-2 lg:w-1/2">
        <label for="product-name">Product Name</label>
        <input
          v-model="product.name"
          type="text"
          id="product-name"
          placeholder="Name"
          class="px-2 py-1 rounded"
        />
      </div>
      <div class="flex flex-col lg:w-1/2">
        <label for="product-price">Product Price ($)</label>
        <input
          v-model="product.price"
          type="text"
          id="product-price"
          placeholder="Price"
          class="px-2 py-1 rounded"
        />
      </div>
    </div>

    <div class="flex flex-col mt-4">
      <label for="product-description">Product Description</label>
      <no-ssr>
        <!-- <div
          class="quill-editor px-2 py-1 rounded bg-white text-gray-600 text-xl"
          :content="product.description"
          @change="onEditorChange($event)"
          v-quill:myQuillEditor="editorOption"
        ></div>-->
        <vue-editor
          :editorOptions="editorOption"
          class="quill-editor px-2 py-1 rounded bg-white text-gray-600 text-xl"
          :content="product.description"
        ></vue-editor>
      </no-ssr>
    </div>

    <div class="lg:flex lg:flex-row flex-col mt-4">
      <div class="lg:mr-6 flex flex-col mb-2 lg:w-1/2">
        <label for="product-brand">Brand</label>
        <input
          v-model="product.brand"
          type="text"
          id="product-brand"
          placeholder="Brand"
          class="px-2 py-1 rounded"
        />
      </div>
      <div class="flex flex-col lg:w-1/2">
        <label for="product-color">Color</label>
        <select
          class="px-2 py-1 rounded bg-white"
          name="productColor"
          id="product-color"
          v-model="product.color"
        >
          <option value="Black">Black</option>
          <option value="Blue">Blue</option>
          <option value="White">White</option>
          <option value="Gray">Gray</option>
          <option value="Other">Other</option>
        </select>
      </div>
    </div>

    <div class="flex flex-col mt-6">
      <label for="product-image">Product Images URL</label>
      <div class="w-full">
        <input
          type="text"
          id="product-image"
          placeholder="Image URL"
          v-model="imageURL"
          class="px-2 py-1 rounded lg:w-10/12 w-full"
        />
        <button
          class="bg-blue-400 hover:bg-blue-500 px-4 py-1 rounded text-white lg:w-1/12 my-2 w-full"
          @click="addProductImage"
        >Add</button>
      </div>
    </div>

    <div class="flex mt-6">
      <div class="w-full flex justify-start">
        <div v-for="(image,index) in product.productImages" :key="index" class="w-16 h-12 mr-2">
          <img class="object-cover w-full h-full rounded-sm" :src="image" alt="Product Image" />
        </div>
      </div>
    </div>

    <div class="flex flex-col mt-2">
      <label for="product-title">Product Type</label>
      <select
        class="px-2 py-1 rounded bg-white"
        name="producttype"
        id="product-type"
        v-model="product.productType"
      >
        <option value="Laptop">Laptop</option>
        <option value="Desktop">Desktop</option>
      </select>
    </div>

    <div class="mt-8">
      <input
        class="cursor-pointer bg-blue-600 hover:bg-blue-700 px-4 py-1 rounded text-white mt-2"
        type="button"
        value="Sell"
        @click="sellProduct"
      />
    </div>
  </div>
</template>

<script>
const axios = require('axios')
const Toast = require('../../../helpers/sweetAlertToaster')
import { VueEditor } from 'vue2-editor'

export default {
  components: {
    VueEditor
  },
  data() {
    return {
      product: {
        user: '',
        productImages: [],
        name: '',
        description: '',
        price: '',
        productType: 'Laptop',
        color: 'Black',
        brand: ''
      },
      editorOption: {
        // some quill options
        // theme: 'snow',

        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            [{ size: ['small', false, 'large', 'huge'] }],
            ['blockquote', 'code-block'],
            [{ font: [] }],
            [{ align: [] }],
            ['clean']
          ]
        }
      },
      imageURL: ''
    }
  },
  methods: {
    onEditorChange({ editor, html, text }) {
      this.product.description = html
    },

    addProductImage() {
      this.product.productImages.push(this.imageURL)
      this.imageURL = ''
    },
    checkProductImage() {
      if (this.product.productImages.length == 0) {
        alert('Please add at least one product image')
        return false
      }
      return true
    },

    async sellProduct() {
      if (!this.product.productType) {
        // return alert('Please select the product Type')
        Toast.fire('Oops!', 'Please select the product type.', 'error')
      }
      if (!this.product.color || !this.product.brand) {
        // return alert('Please fill all fields')
        Toast.fire('Oops!', 'Please fill all fields.', 'error')
      }

      const result = await axios.post(
        `${process.env.baseUrl}/product`,
        this.product
      )
      if (!result.data.error) {
        this.$store.commit('newItemSold', result.data._id)
        Toast.fire({
          type: 'success',
          title: 'Product successfully added for sale'
        })

        this.product = {}
        setTimeout(() => {
          this.$router.push('/')
        }, 1000)
      }
    }
  },
  created() {
    this.product.user = this.$store.state.user.user._id
  }
}
</script>
