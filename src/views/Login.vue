<template>
    <div>
        <Navbar/>

        <div class="card glass">
            <form @submit.prevent="login()" class="row g-3">
                <div class="col-md-12">
                    <label for="inputEmail" class="form-label">E-mail</label>
                    <input type="email" class="form-control" id="inputEmail" required v-model="form.email">
                </div>
                <div class="col-md-12">
                    <label for="inputPassword" class="form-label">Password</label>
                    <input type="password" class="form-control" id="inputPassword" required v-model="form.password">
                </div>
                <div class="col-12 buttons">
                    <button type="submit" class="btn btn-primary">Entrar</button>
                    <button @click="register()" class="btn btn-light">Registrarse</button>
                </div>
            </form>
        </div>    
    </div>
</template>

<script>
import axios from 'axios'
import Navbar from '@/components/NavBar.vue'

export default {
    name: 'Login',
    components: {
        Navbar
    },
    data: function () {
        return {
            form: {
                email: null,
                password: null
            },
            toastCount: 0,
            toastDelay: 3000
        }
    }, methods: {
        login () {
            let url = 'http://127.0.0.1:8000/api/login'

            axios.post(url, this.form)
                .then(response => {
                    localStorage.setItem('token', response.data.token)
                    localStorage.setItem('idUser', response.data.id_user)
                    localStorage.setItem('rolUser', response.data.id_rol)

                    this.makeToast('Bienvenido', 'Acceso correcto', 'success')
                    
                    this.$router.push('/')
                })
                .catch(errors => {   
                    console.log(errors);
                    
                    this.makeToast('Error', 'Datos incorrectos', 'danger')
                })
            
        },
        register() {
            this.$router.push('/registerUser')
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
    }
}
</script>

<style scoped>
    .card {
        text-align: left;
        margin: 100px auto;
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

    label {
        color: #000;
        font-weight: bold;
        text-shadow: 0 0 10px #fff;
    }

    .glass {
        width: 30rem;
        height: 20rem;
        box-shadow: 1px 1px 10px 0 #000000e0;	
        border-radius: 5px;
        position: relative;
        z-index: 1;
        background: inherit;
        overflow: hidden;
    }

    .glass:before {
        content: "";
        position: absolute;
        /* background: inherit; */
        background: #ffffffaa;
        z-index: -1;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        box-shadow: inset 0 0 10000px #ffffff;
        filter: blur(1px);
        margin: -20px;
    }
</style>