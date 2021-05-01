<template>
    <div class="gravedades">
        <h5 class="card-title">Gravedades reportadas</h5>
        <p class="card-text">Leves: <span>{{leves}}</span></p>
        <p class="card-text">Moderadas: <span>{{moderadas}}</span></p>
        <p class="card-text">Graves: <span>{{graves}}</span></p>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'gravedades-count',
    props: {
        idEval: Number
    },
    data: function () {
        return {
            leves: 0,
            moderadas: 0,
            graves: 0
        }
    },
    mounted: function () {
        let url = 'https://covstats.work/api/detallesautoevaluaciones/sintomas/' + this.idEval

        axios.get(url)
            .then(response => {
                let sintomas = response.data

                let gravedad;

                for (let i = 0; i < sintomas.length; i++) {
                    // console.log(sintomas[i].sintoma.gravedad_id)
                    gravedad = sintomas[i].sintoma.gravedad_id

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
    .gravedades .card-text {
        display: flex;
        justify-content: space-between;
        border-bottom: 2px solid #ccc;
    }
</style>