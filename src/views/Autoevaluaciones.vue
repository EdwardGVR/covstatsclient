<template>
    <div>
        <Navbar />

        <div class="container">
            <div class="createBtn">
                <button type="button" class="btn btn-primary" @click="newAutoEval()">Nueva autoevaluaci&oacute;n</button>
            </div>

            <div class="row">

                <div 
                    v-for="a in autoevaluaciones"
                    :key="a.id"
                    class="card text-dark bg-light mb-3" 
                    style="max-width: 18rem;"
                >
                    
                    <div class="card-header">ID Autoevaluaci&oacute;n: {{a.id}}</div>
                    <div class="card-body">
                        <GravedadesCount 
                            :idEval=a.id
                        />
                        
                        <div class="fecha">
                            <h5 class="card-title">Fecha de autoevaluaci&oacute;n</h5>
                            <p class="card-text">{{a.created_at}}</p>
                        </div>

                    </div>

                    <div class="buttons">
                        <button class="btn btn-info" @click="detalles(a.id)">Detalles</button>
                    </div>
                </div>
                
            </div>
        </div>
    </div>    
</template>

<script>
import Navbar from '@/components/NavBar.vue'
import GravedadesCount from '@/components/GravedadesCount.vue'
import axios from 'axios'

export default {
    name: 'Autoevaluaciones',
    components: {
        Navbar,
        GravedadesCount
    },
    data: function () {
        return {
            autoevaluaciones: null,
            gravedades: null
        }
    },
    methods: {
        newAutoEval () {
            this.$router.push('/newAutoEval')
        },
        detalles (id) {
            this.$router.push('/detalleAutoEval/' + id)
        }
    },
    mounted: function () {
        let idUser = localStorage.getItem('idUser')

        let url = 'http://covstatsapi.test/api/autoevaluaciones/byuser/' + idUser

        axios.get(url)
            .then(response => {
                this.autoevaluaciones = response.data                
            })
    }
}
</script>

<style scoped>
    .card {
        text-align: left;
        /* margin: 40px auto; */
        margin-top: 40px;
        margin-left: 20px;
        width: 300px;
        padding: 20px;
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
        margin: auto;
        padding: 0;
    }

    .card-header {
        background-color: #e9e9e9;
        font-weight: bold;
        font-size: 18px;
        text-align: center;
    }

    .card-body {
        padding: 0;
        margin-top: 20px;
    }

    .card-body .card-title {
        font-size: 17px;
    }

    .gravedades, .fecha {
        padding: 5px;
        border-radius: 5px;
        margin-bottom: 10px;
        background-color: #f0f0f0;
    }

    .fecha {
        margin-bottom: 20px;
    }

    .gravedades .card-text {
        margin: 0;
        border-bottom: 2px solid #ccc;
    }

    .gravedades p {
        display: flex;
        justify-content: space-between;
        width: 100%;
    }

    .fecha p {
        font-size: 13px;
        font-style: italic;
    }
</style>