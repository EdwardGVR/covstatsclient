<template>
    <div>
        <Navbar />

        <div
            v-for="s in sintomas"
            :key="s.id" 
            class="card">
            <div class="card-header">
                {{s.sintoma.gravedad.gravedad}}
            </div>
            <div class="card-body">
                <h5 class="card-title">{{s.sintoma.sintoma}}</h5>
                <p class="card-text">{{s.sintoma.descripcion}}</p>
            </div>
        </div>
    </div>    
</template>

<script>
import Navbar from '@/components/NavBar.vue'
import axios from 'axios'

export default {
    name: 'DetallesAutoEval',
    components: {
        Navbar
    },
    data: function () {
        return {
            id: null,
            sintomas: null
        }
    },
    mounted: function () {
        this.id = this.$route.params.id

        let url = 'http://covstatsapi.test/api/detallesautoevaluaciones/sintomas/' + this.id

        axios.get(url)
            .then(response => {
                this.sintomas = response.data

                // console.log(this.sintomas)
            })
    }
}
</script>

<style scoped>
    .card {
        margin: 50px auto;
        width: 80%;
        text-align: left;
    }
</style>