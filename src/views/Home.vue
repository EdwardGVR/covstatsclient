<template>
  <div class="home">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <PostCard 
      title="Titulo de la nota" 
      content="Contenido de la nota" 
      publishedDate="23-423-4-234-324"
    />
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import PostCard from '@/components/PostCard.vue'

export default {
  name: 'Home',
  components: {
    // HelloWorld
    PostCard
  }
}
</script>
