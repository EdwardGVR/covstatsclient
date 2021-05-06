<template>
  <div class="home">
    <Navbar/>
    
    <div class="createBtn" v-if="isLoggedIn && isAdmin">
      <button type="button" class="btn btn-primary" @click="goCreatePost()">Crear nueva publicaci&oacute;n</button>
    </div>

    <div class="filters">
      <b-nav pills>
        <b-nav-item @click="loadAll()" class="pill" :active=navAll>Todo</b-nav-item>
        <b-nav-item @click="loadRS()" class="pill" :active=navRS>Recomendaciones sociales</b-nav-item>
        <b-nav-item @click="loadRP()" class="pill" :active=navRP>Recomendaciones personales</b-nav-item>
        <b-nav-item @click="loadNI()" class="pill" :active=navNI>Notas informativas</b-nav-item>
      </b-nav>
    </div>

    <PostCard v-for="post in loadedPosts" :key="post.id"
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
      loadedPosts: null,
      isLoggedIn: false,
      isAdmin: false,
      navAll: true,
      navRS: false,
      navRP: false,
      navNI: false
    }
  },
  mounted: function () {
    this.setLoggedIn ()

    // console.log(this.isLoggedIn);
    
    let url = "https://covstats.work/api/posts"

    axios.get(url)
      .then(response => {
        // console.log(response.data)
        this.posts = response.data

        this.loadedPosts = this.posts
      })
  },
  methods: {
    goCreatePost () {
      this.$router.push('/createPost')
    },
    // Load all of the posts
    loadAll () {
      this.navAll = true
      this.navRP = false
      this.navRS = false
      this.navNI = false

      this.loadedPosts = this.posts
    },
    // Load Recomendaciones personales
    loadRP () {
      this.navAll = false
      this.navRP = true
      this.navRS = false
      this.navNI = false

      this.loadedPosts = this.posts.filter((p) => {
        return p.categoria_id == 2
      })
    },
    // Load Recomendaciones sociales
    loadRS () {
      this.navAll = false
      this.navRP = false
      this.navRS = true
      this.navNI = false

      this.loadedPosts = this.posts.filter((p) => {
        return p.categoria_id == 1
      })
    },
    // Load Notas informativas
    loadNI () {
      this.navAll = false
      this.navRP = false
      this.navRS = false
      this.navNI = true

      this.loadedPosts = this.posts.filter((p) => {
        return p.categoria_id == 3
      })
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

  .filters {
    width: 80%;
    margin: 50px auto;
    border-radius: 5px;
    padding: 10px;
    background: #ccccccd7;
  }

  .pill {
    border-radius: 5px;
    background: #ffffffab;
    margin-right: 20px; 
    font-weight: bold;
    transition: all ease 0.3s;
  }

  .pill:hover {
    background: #fff;
  }

  .particles {
    width: 100%;
    height: 100vh;
    background: #000;
    /* z-index: -1; */
    position: fixed;
  }
</style>