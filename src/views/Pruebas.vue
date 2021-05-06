<template>
    <div>
        <Navbar />

        <div class="container">
            <div class="createBtn">
                <button type="button" class="btn btn-primary" @click="registerTest()">Registrar nueva prueba</button>
            </div>
            
            <div class="row">

                <div 
                    v-for="p in pruebas" 
                    :key="p.id" 
                    class="card text-dark bg-light mb-3" 
                    style="max-width: 18rem;"
                >
                    <div class="card-header">Resultado: {{p.resultado.resultado}}</div>
                    <div class="card-body">
                        <h5 class="card-title">Tipo: {{p.tipo.tipo}}</h5>
                        <p class="card-text">Departamento: {{p.municipio.departamento.departamento}}</p>
                        <p class="card-text">Municipio: {{p.municipio.municipio}}</p>
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
import axios from 'axios'

export default {
    name: 'Tests',
    components: {
        Navbar
    },
    data: function () {
        return {
            user_id:null,
            pruebas: null
        }
    }, 
    methods: {
        registerTest () {
            this.$router.push('/registerTest')
        },
        editTest (testId) {
            this.$router.push('/editTest/' + testId)
        }
    },
    mounted: function () {
        this.user_id = localStorage.getItem('idUser')

        let url = 'https://covstats.work/api/pruebas/byuser/' + this.user_id

        axios.get(url)
            .then(response => {
                this.pruebas = response.data
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
        opacity: 0.9;
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