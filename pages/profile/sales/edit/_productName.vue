<template>
  <div>
    <div class="px-6 lg:px-8 pb-8 shadow bg-gray-200 min-h-screen">
      <div class="lg:flex pt-5">
        <div class="md:w-1/3 w-full mt-6">
          <no-ssr>
            <agile :options="options">
              <div
                v-for="(image,index) in laptop.productImages"
                :key="index"
                class="slide h-64 rounded overflow-hidden cursor-pointer"
              >
                <img class="h-full w-full" :src="image" alt="Laptop Image" />
              </div>
            </agile>
          </no-ssr>
        </div>

        <!-- Normal Product Description -->
        <!-- <div class="md:w-2/3 w-full py-6 lg:px-6 px-2 bg-white text-gray-600 relative">
          <h5 class="font-bold text-3xl">{{laptop.name}}</h5>
          <div
              class="quill-editor px-2 py-1 rounded bg-white text-gray-600 text-xl"
              :content="laptop.description"
              @change="onEditorChange($event)"
              v-quill:myQuillEditor="editorOption"
            ></div>
          <div class="mt-2 text-gray-700 flex flex-col">
            <h5 class="font-bold">
              Price:
              <span class="font-bold">${{laptop.price}}</span>
            </h5>
          </div>
        </div>-->
        <!-- End Normal Product Description -->

        <!-- Edit Mode Product Description -->
        <div class="md:w-2/3 w-full py-6 lg:px-6 px-2 bg-white text-gray-600">
          <div class="mt-2">
            <!-- <textarea
              class="w-full shadow rounded mt-4 px-2 py-2"
              name="product-description"
              id="product-description"
              cols="30"
              rows="8"
            ></textarea>-->
            <h5 class="font-bold text-3xl mb-3">{{laptop.name}}</h5>
            <div
              class="quill-editor px-2 py-1 rounded bg-white text-gray-600"
              :content="laptop.description"
              @change="onEditorChange($event)"
              v-quill:myQuillEditor="editorOption"
            ></div>
          </div>
          <div class="mt-2 text-gray-700 flex flex-col">
            <h5 class="font-bold inline-block">
              Price:$
              <!-- <span class="font-bold">$2800</span> -->
              <input type="text" class="px-2 py-1 rounded shadow" v-model="laptop.price" />
            </h5>
          </div>
          <div class="flex-col mt-4">
            <div class="lg:mr-6 flex mb-2 items-center">
              <label for="product-brand">Brand</label>
              <input
                type="text"
                id="product-brand"
                :placeholder="laptop.brand"
                class="ml-4 px-2 py-1 rounded shadow"
              />
            </div>
            <div class="flex items-center mt-4">
              <label for="product-color">Color</label>
              <select
                class="px-2 py-1 rounded bg-white"
                name="productColor"
                id="product-color"
                v-model="laptop.color"
              >
                <option value="Black">Black</option>
                <option value="Blue">Blue</option>
                <option value="White">White</option>
                <option value="Gray">Gray</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
          <div class="mt-12">
            <button class="bg-blue-300 px-16 py-2 mr-3" @click="updateProduct">Save</button>
          </div>
        </div>
        <!-- End Edit Mode Product Description -->
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
const axios = require('axios')
import https from 'https'

const Toast = require('../../../../helpers/sweetAlertToaster')

export default {
  components: {},
  async asyncData(params) {
    const agent = new https.Agent({
      rejectUnauthorized: false
    })
    const laptop = await axios.get(
      `https://localhost:3000/product/single/${params.query.id}`,
      {
        httpsAgent: agent
      }
    )
    return { laptop: laptop.data }
  },
  data() {
    return {
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
      },
      editorOption: {
        // some quill options
        theme: 'snow',

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
      this.laptop.description = html
    },
    addToCart() {
      this.$store.commit('incrementCartItem', 1)
    },
    async updateProduct() {
      const result = await axios.put(
        `https://localhost:3000/product/update`,
        this.laptop
      )
      if (result.data.error) {
        return Toast.fire({
          type: 'error',
          title: result.data.error.errorLog
        })
      }
      Toast.fire({
        type: 'success',
        title: 'Product successfully updated'
      })
      setTimeout(() => {
        this.$router.push('/profile/sales')
      }, 1000)
    }
  }
}
</script>

<style scoped>
</style>


