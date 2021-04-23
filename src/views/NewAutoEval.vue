<template>
    <div>
        <Navbar />

        <div class="card title">
            <div class="card-header">
                <span class="title">Realizar auto-evaluación</span>
            </div>
            <div class="card-body">
                <blockquote class="blockquote mb-0">
                <p>
                    La finalidad de auto evaluación es ayudarlo a tomar decisiones sobre la obtención de atención 
                    médica adecuada. Este sistema NO se ha diseñado para fines de diagnóstico científico o tratamiento de COVID-19.
                </p>
                <p>
                    A continuación se le presentan una serie de síntomas reportados por la Organización Mundial de la Salud en casos de
                    COVID-19, seleccione cuáles de ellos usted ha experimentado, haciendo clic en el botón reportar que se encuentra 
                    dentro de la tarjeta de cada síntoma.

                    Cuando haya finalizado, haga click en el botón guardar auto evaluación.
                </p>
                <footer class="blockquote-footer">mantenga las medidas de prevención para evitar contagios</footer>
                </blockquote>
                <a href="" class="btn btn-info" v-on:click="editar(postId)" v-if="isLoggedIn">Editar</a>
            </div>
        </div>

        <div class="container">
            <div class="row">

                <div 
                    v-for="s in sintomas" 
                    :key="s.id" 
                    class="card text-dark bg-light mb-3" 
                    style="max-width: 18rem;"
                >
                    <div class="card-header">{{s.sintoma}}</div>
                    <div class="card-body">
                        <h5 class="card-title">Gravedad: {{s.gravedad.gravedad}}</h5>
                        <p class="card-text">{{s.descripcion}}</p>
                    </div>

                    <div class="buttons">
                        <button @click="reportarSintoma()" class="btn btn-secondary">Reportar</button>
                    </div>
                </div>
                
            </div>
        </div>
    </div>    
</template>

<script>
import Navbar from '@/components/NavBar.vue'
import axios from 'axios'

export default {
    name: 'NewAutoEval',
    components: {
        Navbar
    },
    data: function () {
        return {
            sintomas: null
        }
    },
    methods: {

    },
    mounted: function () {
        let url = 'http://covstatsapi.test/api/sintomas'

        axios.get(url)
            .then(response => {
                this.sintomas = response.data
            })
    }
}
</script>

<style scoped>
    .container .card {
        text-align: left;
        /* margin: 40px auto; */
        margin-top: 40px;;
        margin-left: 20px;
        width: 300px;
        padding: 20px;
    }

    .card.title {
        width: 90%;
        margin: 40px auto;
    }
    
    input, select {
        height: 40px;
        margin-bottom: 30px;
    }

    .buttons {
        display: flex;
        justify-content: space-between;
    }

    .container {
        width: 90%;
    }

    .createBtn {
        display: flex;
        justify-content: flex-end;
        width: 100%;
        padding-top: 40px;
    }

    .row {
        justify-content: space-between;
        width: 100%;
        margin: 50px auto;
        padding: 0;
    }
</style>