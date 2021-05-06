<template>
    <div>
        <div data-aos="fade-up" class="card">
            <div class="card-header">
                <span class="title">{{title}}</span>
                <span class="categoria">{{categoria}}</span>
            </div>
            <div class="card-body">
                <blockquote class="blockquote mb-0">
                <p>{{content}}</p>
                <footer class="blockquote-footer">Publicado el: {{publishedDate}}</footer>
                </blockquote>
                <a href="" class="btn btn-info" 
                    v-on:click="editar(postId)" 
                    v-if="isLoggedIn && isAdmin"
                >
                    Editar
                </a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'PostCard',
  methods: {
      editar(postId) {
          console.log(postId)
          this.$router.push('/editar/' + postId)
      }
  },
  props: {
    title: String,
    categoria: String,
    content: String,
    publishedDate: String,
    postId: Number,
    isLoggedIn: Boolean,
    isAdmin: Boolean
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .card {
        margin: 100px auto;
        width: 80%;
        text-align: left;
        /* opacity: 0.9; */
        background: #ffffffe2;
        box-shadow: inset 0px 0px 10px 5px #000;
        border: none;
        padding: 5px;
        border-radius: 5px;
    }

    .btn {
        margin-top: 40px;
    }

    footer {
        font-size: 12px ;
    }

    span {
        display: block;
        width: 100%;
    }

    .title {
        font-weight: bold;
        font-size: 24px;
    }

    .categoria {
        font-size: 14px;
    }
</style>