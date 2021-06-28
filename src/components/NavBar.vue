<template>
    <div>
    <Particlebg />

    <b-navbar class="wrapper" toggleable="lg" type="dark" variant="dark">
        <b-navbar-brand href="#" @click="home()">COVSTATS</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
                <b-nav-item href="#" @click="home()">Medidas e informaci&oacute;n</b-nav-item>
                <b-nav-item href="#" @click="tests()" v-if="isLoggedIn">Pruebas</b-nav-item>
                <b-nav-item href="#" @click="autoevaluaciones()" v-if="isLoggedIn">Autoevaluaciones</b-nav-item>
                <b-nav-item href="#" @click="datos()" v-if="isLoggedIn">Datos</b-nav-item>
            </b-navbar-nav>

            <b-navbar-nav class="ml-auto">

                <b-nav-item-dropdown v-if="isLoggedIn" right>
                    <template #button-content>
                        <em>{{nombres}} {{apellidos}}</em>
                    </template>
                    <b-dropdown-item class="ddi" @click="logout()" href="#">Cerrar Sesión</b-dropdown-item>
                </b-nav-item-dropdown>

                <b-navbar-nav v-else>
                    <button type="button" class="btn btn-info" @click="login()">Iniciar sesión</button>
                    <button type="button" class="btn btn-info" @click="register()">Registrarse</button>
                </b-navbar-nav>
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>
    </div>
</template>

<script>
import axios from 'axios'
import Particlebg from '@/components/ParticlesBackground.vue'

export default {
    name: 'NavbBar',
    components: {
        Particlebg
    },
    data: function () {
        return {
            isLoggedIn: false,
            nombres: null,
            apellidos: null
        }
    },
    methods: {
        logout () {
            let url = 'http://127.0.0.1:8000/api/logout'

            axios.post(url, {
                // body
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}` 
                }
            })
            
            localStorage.removeItem('token')
            localStorage.removeItem('idUser')
            localStorage.removeItem('rolUser')

            this.$router.push('/login')
        },
        login () {
            this.$router.push('/login')
        },
        register () {
            this.$router.push('/registerUser')
        },
        home () {
            this.$router.push('/')
        },
        tests () {
            this.$router.push('/pruebas')
        },
        autoevaluaciones () {
            this.$router.push('/autoEvaluaciones')
        },
        datos () {
            this.$router.push('/datos')
        },
        setLoggedIn () {
            if (localStorage.getItem('token') !== null) {
                this.isLoggedIn = true
            } else {
                this.isLoggedIn = false
            }
        }
    },
    mounted: function () {
        this.setLoggedIn()
        let idUser = localStorage.getItem('idUser')
        let url = 'http://127.0.0.1:8000/api/usuarios/' + idUser
        
        axios.get(url)
            .then(response => {
                // console.log(response);
                this.nombres = response.data[0].nombres
                this.apellidos = response.data[0].apellidos
            })
    }
}
</script>

<style scoped>
    .wrapper {
        background: #343a40;
        opacity: 0.9;
    }

    .btn {
        margin: 20px 0 20px 20px;
    }

    em {
        margin-right: 20px;
    }

    .ddi {
        background-color: #ffe0e0;
    }
</style>