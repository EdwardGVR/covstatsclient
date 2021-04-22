<template>
    <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
        <b-navbar-brand href="#">Cliente</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
                <b-nav-item href="#">Posts</b-nav-item>
                <b-nav-item href="#">Tests</b-nav-item>
                <b-nav-item href="#">Form</b-nav-item>
            </b-navbar-nav>

            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">
                <!-- <b-nav-form>
                <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
                <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
                </b-nav-form> -->

                <!-- <b-nav-item-dropdown text="Lang" right>
                <b-dropdown-item href="#">EN</b-dropdown-item>
                <b-dropdown-item href="#">ES</b-dropdown-item>
                <b-dropdown-item href="#">RU</b-dropdown-item>
                <b-dropdown-item href="#">FA</b-dropdown-item>
                </b-nav-item-dropdown> -->

                <b-nav-item-dropdown v-if="isLoggedIn" right>
                <!-- Using 'button-content' slot -->
                    <template #button-content>
                        <em>{{nombres}} {{apellidos}}</em>
                    </template>
                    <!-- <b-dropdown-item href="#">Profile</b-dropdown-item> -->
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

export default {
    name: 'NavbBar',
    data: function () {
        return {
            isLoggedIn: false,
            nombres: null,
            apellidos: null
        }
    },
    methods: {
        logout () {
            let url = 'http://covstatsapi.test/api/logout'

            axios.post(url, {
                // body
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}` 
                }
            })
            
            localStorage.removeItem('token')
            localStorage.removeItem('idUser')

            this.$router.push('/login')
        },
        login () {
            this.$router.push('/login')
        },
        register () {
            this.$router.push('/registerUser')
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
        let url = 'http://covstatsapi.test/api/usuarios/' + idUser
        
        axios.get(url)
            .then(response => {
                console.log(response);
                this.nombres = response.data[0].nombres
                this.apellidos = response.data[0].apellidos
            })
    }
}
</script>

<style scoped>
    .btn {
        margin-left: 20px;
        margin-bottom: 20px;
    }

    em {
        margin-right: 20px;
    }

    .ddi {
        background-color: rgb(255, 224, 224);
    }
</style>