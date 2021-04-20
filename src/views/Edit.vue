<template>
    <div>
        <div class="card">
            <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">T&iacute;tulo</label>
                <input type="text" class="form-control" id="exampleFormControlInput1" v-model="form.titulo">
            </div>
            
                <label for="exampleFormControlInput1" class="form-label">Categor&iacute;a</label>
                <select class="form-select" aria-label="Default select example" v-model="form.categoria_id">
                    <option selected disabled>Seleccione una categor&iacute;a</option>
                    <option 
                        v-for="categoria in categorias" 
                        :key="categoria.id" 
                        :value="categoria.id"
                        :selected="selectedCat === categoria.id">
                            {{categoria.categoria}}
                    </option>
                </select>
            
            <div class="mb-3">
                <label for="exampleFormControlTextarea1" class="form-label">Contenido</label>
                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" v-model="form.contenido"></textarea>
            </div>


            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                <button type="button" class="btn btn-success" @click=guardar()>Guardar</button>
                <button type="button" class="btn btn-danger" @click=eliminar()>Eliminar</button>
                <button type="button" class="btn btn-primary" @click="home()">Regresar</button>
            </div>
        </div>
    </div>
</template>

<script>

import axios from 'axios'

export default {
    name: 'Edit',
    components: {
        
    },
    data: function () {
        return {
            postId: null,
            categorias: null,
            selectedCat: null,
            form: {
                titulo: "",
                contenido: "",
                categoria_id: null
            }
        }
    },
    methods: {
        guardar () {
            console.log("Guardando cambios");

            let url = 'http://covstatsapi.test/api/posts/' + this.postId

            axios.put(url, this.form)
                .then(response => {
                    console.log(response)
                })
        },
        eliminar () {
            console.log("Eliminando registro");
        },
        home () {
            console.log("Going back");
            this.$router.push('/')
        }
    },
    mounted: function () {
        this.postId = this.$route.params.idPost
        // console.log(this.postId)

        let url = 'http://covstatsapi.test/api/posts/' + this.postId

        axios.get(url)
            .then(response => {
                let postData = response.data[0]

                this.form.categoria_id = postData.categoria_id
                this.form.titulo = postData.titulo
                this.form.contenido = postData.contenido
                this.selectedCat = postData.categoria_id
                // console.log(this.form)
            })
        
        url = 'http://covstatsapi.test/api/categorias'

        axios.get(url)
            .then(response => {
                console.log(response.data)

                this.categorias = response.data
            })
    }
}
</script>

<style scoped>
 .card {
        text-align: left;
        margin: 40px auto;
        width: 80%;
        padding: 20px;
    }

    button {
        margin-left: 20px;
    }

    .mb-3 {
        padding-bottom: 40px;
    }

    .form-select {
        height: 40px;
        margin-bottom: 40px;
    }
</style>