<template>
    <div>
        <Navbar />

        <div class="row container">
            <div class="section recomendaciones">
                <h2>Recomendaciones</h2>

                <span>
                    Basado en los s&iacute;ntomas reportados en esta autoevaluación, le presentamos las siguientes recomendaciones.
                </span>

                <div class="grave" v-if="graves > 0">
                    <div class="card text-white bg-danger">
                        <div class="card-header">
                            Recomendaci&oacute;n caso grave
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">Recomendaci&oacute;n caso grave</h5>
                            <p class="card-text">Recomendaci&oacute;n caso grave</p>
                        </div>
                    </div>
                </div>

                <div class="moderada" v-if="moderadas > 0">
                    <div class="card text-dark bg-warning">
                        <div class="card-header">
                            Recomendaci&oacute;n caso moderado
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">Recomendaci&oacute;n caso moderado</h5>
                            <p class="card-text">Recomendaci&oacute;n caso moderado</p>
                        </div>
                    </div>
                </div>

                <div class="leve" v-if="leves > 0">
                    <div class="card text-white bg-success">
                        <div class="card-header">
                            Recomendaci&oacute;n caso leve
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">Recomendaci&oacute;n caso leve</h5>
                            <p class="card-text">Recomendaci&oacute;n caso leve</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="section sintomas">
                <h2>Síntomas reportados</h2>

                <span>
                    A continuaci&oacute;n se le presentan los s&iacute;ntomas reportados en esta autoevaluaci&oacute;n
                </span>

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
            sintomas: null,
            leves: 0,
            moderadas: 0,
            graves: 0
        }
    },
    mounted: function () {
        this.id = this.$route.params.id

        let url = 'http://covstatsapi.test/api/detallesautoevaluaciones/sintomas/' + this.id

        axios.get(url)
            .then(response => {
                this.sintomas = response.data

                // console.log(this.sintomas)

                let gravedad;

                for (let i = 0; i < this.sintomas.length; i++) {
                    // console.log(sintomas[i].sintoma.gravedad_id)
                    gravedad = this.sintomas[i].sintoma.gravedad_id

                    if (gravedad === 1) {
                        this.leves++
                    } else if (gravedad === 2) {
                        this.moderadas++
                    } else {
                        this.graves++
                    }
                }
            })
    }
}
</script>

<style scoped>
    .card {
        margin: 50px auto;
        width: 100%;
        text-align: left;
    }

    .row {
        width: 90%;
        margin: 50px auto;
        justify-content: space-between;
    }

    .section {
        background: #ededed;
        border-radius: 5px;
        padding: 10px;
        width: 45%;
    }

    /* .grave .card {
        background: #ffdcdc;
    } */
</style>