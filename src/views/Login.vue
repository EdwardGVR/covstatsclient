<template>
    <div>
        <Navbar/>

        <div class="card">
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
            let url = 'https://covstats.work/api/login'

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
</style>