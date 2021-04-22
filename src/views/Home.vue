<template>
  <div class="home">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <Navbar/>
    
    <div class="createBtn" v-if="isLoggedIn">
      <button type="button" class="btn btn-primary" @click="goCreatePost()">Crear nuevo</button>
    </div>

    <PostCard v-for="post in posts" :key="post.id"
      :title=post.titulo
      :content=post.contenido
      :publishedDate=post.created_at
      :postId=post.id
      :isLoggedIn=isLoggedIn
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
      isLoggedIn: false
    }
  },
  mounted: function () {
    this.setLoggedIn ()

    console.log(this.isLoggedIn);
    
    let url = "http://covstatsapi.test/api/posts"

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
        } else {
            this.isLoggedIn = false
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