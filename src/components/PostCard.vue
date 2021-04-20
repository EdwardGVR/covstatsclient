<template>
    <div>
        <div class="card">
            <div class="card-header">
                {{title}}
            </div>
            <div class="card-body">
                <blockquote class="blockquote mb-0">
                <p>{{content}}</p>
                <footer class="blockquote-footer">Publicado el: {{publishedDate}}</footer>
                </blockquote>
                <a href="#" class="btn btn-primary" v-on:click="editar(postId)">Editar</a>
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
      }
  },
  props: {
    title: String,
    content: String,
    publishedDate: String,
    postId: Number
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .card {
        margin: 50px auto;
        width: 80%;
        text-align: left;
    }

    .btn {
        margin-top: 40px;
    }
</style>