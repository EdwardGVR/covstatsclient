<template>
  <div class="home">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
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
  }
}
</script>
