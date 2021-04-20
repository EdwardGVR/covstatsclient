<template>
    <div>
        <div class="card">
            <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">T&iacute;tulo</label>
                <input type="text" class="form-control" id="exampleFormControlInput1" :v-model=form.titulo>
            </div>
            <div class="mb-3">
                <label for="exampleFormControlTextarea1" class="form-label">Contenido</label>
                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" :v-model="form.contenido"></textarea>
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
export default {
    name: 'EditPostForm',
    props: {
        postId: Number,
        titulo: String,
        contenido: String
    },
    data: function () {
        return  {
            form: {
                titulo: "",
                contenido: "",
                categoria_id: 1
            }
        }
    },
    methods: {
        guardar () {
            console.log("Guardando cambios");
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
        this.form.titulo = this.titulo
        this.form.contenido = this.contenido

        console.log(this.form);
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
</style>