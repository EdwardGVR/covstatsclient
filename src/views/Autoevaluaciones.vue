<template>
    <div>
        <Navbar />

        <div class="container">
            <div class="createBtn">
                <button type="button" class="btn btn-primary" @click="newAutoEval()">Nueva autoevaluaci&oacute;n</button>
            </div>

            <div class="row">

                <div class="card text-dark bg-light mb-3" style="max-width: 18rem;">
                    <div class="card-header">Titulo</div>
                    <div class="card-body">
                        <h5 class="card-title">Subtitulo</h5>
                        <p class="card-text">Descripcion</p>
                    </div>

                    <div class="buttons">
                        <button @click="editTest(p.id)" class="btn btn-secondary">Editar</button>
                    </div>
                </div>
                
            </div>
        </div>
    </div>    
</template>

<script>
import Navbar from '@/components/NavBar.vue'
// import axios from 'axios'

export default {
    name: 'Autoevaluaciones',
    components: {
        Navbar
    },
    data: function () {
        return {
            
        }
    },
    methods: {
        newAutoEval () {
            this.$router.push('/newAutoEval')
        }
    },
    mounted: function () {
        
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
</style>