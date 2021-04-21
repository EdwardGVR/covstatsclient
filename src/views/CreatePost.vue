<template>
    <div>
        <div class="card">
            <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">T&iacute;tulo</label>
                <input type="text" class="form-control" id="exampleFormControlInput1" required v-model="form.titulo">
            </div>
            
                <label for="exampleFormControlInput1" class="form-label">Categor&iacute;a</label>
                <select class="form-select" aria-label="Default select example" required v-model="form.categoria_id">
                    <option selected disabled>Seleccione una categor&iacute;a</option>
                    <option 
                        v-for="categoria in categorias" 
                        :key="categoria.id" 
                        :value="categoria.id">
                            {{categoria.categoria}}
                    </option>
                </select>
            
            <div class="mb-3">
                <label for="exampleFormControlTextarea1" class="form-label">Contenido</label>
                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" required v-model="form.contenido"></textarea>
            </div>


            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                <button type="button" class="btn btn-success" @click="guardar()">Guardar</button>
                <button type="button" class="btn btn-primary" @click="regresar()">Regresar</button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: "CreatePost",
    data: function () {
        return {
            categorias: null,
            form: {
                titulo: null,
                categoria_id: null,
                contenido: null
            },
            toastCount: 0
        }
    },
    methods:  {
        guardar () {
            let url = 'http://covstatsapi.test/api/posts'

            axios.post(url, this.form)
                .then(response => {
                    console.log(response);
                    this.makeToast('Guardado', 'Se ha guardado el post', 'success')
                    this.$router.push('/')
                })
                .catch(error => {
                    let errors = error.response.data.errors
                    console.log(errors);

                    for (const error in errors) {
                        this.makeToast('Error', `${errors[error]}`, 'danger')
                    }

                });
        },
        regresar () {
            this.$router.push('/')
        },
        makeToast(title, text, type) {
            this.toastCount++
            this.$root.$bvToast.toast(text, {
            title: title,
            variant: type,
            autoHideDelay: 5000,
            appendToast: true
            })
        }
    },
    mounted: function () {
        let url = 'http://covstatsapi.test/api/categorias'

        axios.get(url)
            .then(response => {
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