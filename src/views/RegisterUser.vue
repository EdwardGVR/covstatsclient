<template>
    <div class="card">
        <form @submit.prevent="guardar()" class="row g-3">
            <div class="col-md-6">
                <label for="inputNombres" class="form-label">Nombres</label>
                <input type="text" class="form-control" id="inputNombres" placeholder="Apellidos" required v-model="form.nombres">
            </div>
            <div class="col-md-6">
                <label for="inputApellidos" class="form-label">Apellidos</label>
                <input type="text" class="form-control" id="inputApellidos" placeholder="Apellidos" required v-model="form.apellidos">
            </div>
            <div class="col-md-12">
                <label for="inputEmail" class="form-label">Email</label>
                <input type="email" class="form-control" id="inputEmail" required v-model="form.email">
            </div>
            <div class="col-6">
                <label for="inputPassword" class="form-label">Password</label>
                <input type="password" class="form-control" id="inputPassword" required v-model="form.password">
            </div>
            <div class="col-6">
                <label for="inputConfPassword" class="form-label">Confirmar password</label>
                <input type="password" class="form-control" id="inputConfPassword" required v-model="confirmPassword">
            </div>
            <div @change="activateDpto()" class="col-md-12">
                <label for="inputZona" class="form-label">Zonas</label>
                <select id="inputState" class="form-select col-md-12" required v-model="zonaId">
                    <option selected disabled>Seleccionar una zona...</option>
                    <option
                        v-for="z in zonas"
                        :key="z.id"
                        :value="z.id"
                    >
                        {{z.zona}}
                    </option>
                </select>
            </div>
            <div @change="activateMncp()" v-if="isZoneSelected" class="col-md-12">
                <label for="inputDepartamento" class="form-label">Departamentos</label>
                <select id="inputDepartamento" class="form-select col-md-12" required v-model="dptoId">
                    <option selected disabled>Seleccionar un departamento...</option>
                    <option
                        v-for="d in departamentos"
                        :key="d.id"
                        :value="d.id"
                    >
                        {{d.departamento}}
                    </option>
                </select>
            </div>
            <div v-if="isDptoSelected" class="col-md-12">
                <label for="inputMunicipio" class="form-label">Municipios</label>
                <select id="inputMunicipio" class="form-select col-md-12" required v-model="form.municipio_id">
                    <option selected disabled>Choose...</option>
                    <option
                        v-for="m in municipios"
                        :key="m.id"
                        :value="m.id"
                    >
                        {{m.municipio}}
                    </option>
                </select>
            </div>
            <div class="col-12 buttons">
                <button type="submit" class="btn btn-primary">Registrarse</button>
                <button @click="login()" class="btn btn-light">Iniciar sesión</button>
            </div>
        </form>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'RegisterUser',
    data: function () {
        return {
            form: {
                nombres: null,
                apellidos: null,
                email: null,
                municipio_id: null,
                password: null
            },
            confirmPassword: null,
            passwordsMatch: false,
            isZoneSelected: false,
            isDptoSelected: false,
            zonas: null,
            departamentos: null,
            municipios: null,
            zonaId: null,
            dptoId: null,
            toastCount: 0,
            toastDelay: 3000
        }
    }, 
    methods: {
        regresar () {
            this.$router.push('/')
        },
        login () {
            this.$router.push('/login')
        },
        guardar () {
            this.comparePasswords()

            if (this.passwordsMatch) {
                let url = 'http://covstatsapi.test/api/usuarios'

                axios.post(url, this.form)
                    .then(response => {
                        console.log(response);
                        this.makeToast('Hecho', 'Usuario registrado con éxito', 'success')
                        // this.$router.push('/')
                    })
                    .catch(error => {
                        let errors = error.response.data.errors
                        // console.log(errors);

                        for (const error in errors) {
                            this.makeToast('Error', `${errors[error]}`, 'danger')
                        }
                    })
                
            } else {
                this.makeToast('Error', 'Las contraseñas no coinciden', 'danger')
            }
        },
        comparePasswords () {
            if (this.form.password == this.confirmPassword) {
                this.passwordsMatch = true
            } else {
                this.passwordsMatch = false
            }
        },
        activateDpto () {
            this.isZoneSelected = true

            this.departamentos = null
            this.municipios = null
            this.isDptoSelected = false

            let url = 'http://covstatsapi.test/api/departamentos/byzona/' + this.zonaId

            axios.get(url)
                .then(response => {
                    this.departamentos = response.data
                })
        },
        activateMncp () {
            this.isDptoSelected = true

            let url = 'http://covstatsapi.test/api/municipios/bydpto/' + this.dptoId

            axios.get(url)
                .then(response => {
                    this.municipios = response.data
                })
        },
        makeToast(title, text, type) {
            this.toastCount++
            this.$root.$bvToast.toast(text, {
            title: title,
            variant: type,
            autoHideDelay: this.toastDelay += 2000,
            appendToast: true
            })
        }
    },
    mounted: function () {
        let url = 'http://covstatsapi.test/api/zonas'

        axios.get(url)
            .then(response => {
                this.zonas = response.data
            })
    }
}
</script>

<style scoped>
    .card {
        text-align: left;
        margin: 40px auto;
        width: 50%;
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
</style>