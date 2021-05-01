<template>
  <div class="home">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <Navbar/>
    
    <div class="createBtn" v-if="isLoggedIn && isAdmin">
      <button type="button" class="btn btn-primary" @click="goCreatePost()">Crear nuevo</button>
    </div>

    <PostCard v-for="post in posts" :key="post.id"
      :title=post.titulo
      :categoria=post.categoria.categoria
      :content=post.contenido
      :publishedDate=post.created_at
      :postId=post.id
      :isLoggedIn=isLoggedIn
      :isAdmin=isAdmin
    />
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import PostCard from '@/components/PostCard.vue'
import Navbar from '@/components/NavBar.vue'

import axios from 'axios'

export default {
  name: 'Home',
  components: {
    // HelloWorld
    PostCard,
    Navbar
  },
  data: function () {
    return {
      posts: null,
      isLoggedIn: false,
      isAdmin: false
    }
  },
  mounted: function () {
    this.setLoggedIn ()

    // console.log(this.isLoggedIn);
    
    let url = "https://covstats.work/api/posts"

    axios.get(url)
      .then(response => {
        console.log(response.data)
        this.posts = response.data
      })
  },
  methods: {
    goCreatePost () {
      this.$router.push('/createPost')
    },
    setLoggedIn () {
      if (localStorage.getItem('token') !== null) {
          this.isLoggedIn = true

          if (localStorage.getItem('rolUser') == 2) {
            this.isAdmin = true
          }
      } else {
        this.isLoggedIn = false
      }
      
      // this.checkAdmin()
    },
    checkAdmin () {
      if (localStorage.getItem('rolUser') === 2) {
          this.isAdmin = true
      }
    }
  }
}
</script>

<style scoped>
  .createBtn {
    display: flex;
    justify-content: flex-end;
    width: 90%;
    padding-top: 40px;
  }
</style>