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
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'PostCard',
  props: {
    title: String,
    content: String,
    publishedDate: String
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
</style>