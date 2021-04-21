<template>
  <div class="home">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    
    <div class="createBtn">
      <button type="button" class="btn btn-primary" @click="goCreatePost()">Crear nuevo</button>
    </div>

    <PostCard v-for="post in posts" :key="post.id"
      :title=post.titulo
      :content=post.contenido
      :publishedDate=post.created_at
      :postId=post.id
    />
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import PostCard from '@/components/PostCard.vue'

import axios from 'axios'

export default {
  name: 'Home',
  components: {
    // HelloWorld
    PostCard
  },
  data: function () {
    return {
      posts: null
    }
  },
  mounted: function () {
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