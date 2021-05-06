<template>
    <div>
        <Navbar />
        
        <div class="card">
            <form @submit.prevent="guardar()" class="row g-3">
                <div class="col-md-12">
                    <label for="inputTipo" class="form-label">Tipo de prueba</label>
                    <select id="inputTipo" class="form-select col-md-12" required v-model="form.tipo_id">
                        <option selected disabled>Seleccionar un tipo de prueba...</option>
                        <option
                            v-for="t in tipos"
                            :key="t.id"
                            :value="t.id"
                        >
                            {{t.tipo}}
                        </option>
                    </select>
                </div>
                <div class="col-md-12">
                    <label for="inputResultado" class="form-label">Resultado de la prueba</label>
                    <select id="inputResultado" class="form-select col-md-12" required v-model="form.resultado_id">
                        <option selected disabled>Seleccionar una zona...</option>
                        <option
                            v-for="r in resultados"
                            :key="r.id"
                            :value="r.id"
                        >
                            {{r.resultado}}
                        </option>
                    </select>
                </div>
                <div @change="activateDpto()" class="col-md-12">
                    <label class="form-label">Lugar donde se realiz&oacute; la prueba</label>
                    <label for="inputZona" class="form-label">Seleccione una zona</label>
                    <select id="inputZona" class="form-select col-md-12" required v-model="zonaId">
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
                    <label for="inputDepartamento" class="form-label">Seleccione un departamento</label>
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
                    <label for="inputMunicipio" class="form-label">Seleccione un municipio</label>
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
                    <button type="submit" class="btn btn-primary">Guardar</button>
                    <button @click="pruebas()" class="btn btn-light">Cancelar</button>
                </div>
            </form>
        </div>
    </div>    
</template>

<script>
import Navbar from '@/components/NavBar.vue'
import axios from 'axios'

export default {
    name: 'RegisterTest',
    components: {
        Navbar
    },
    data: function () {
        return {
            form: {
                usuario_id: null,
                municipio_id: null,
                tipo_id: null,
                resultado_id:null
            },
            tipos: null,
            resultados: null,
            zonas: null,
            isZoneSelected: false,
            isDptoSelected: false,
            departamentos: null,
            municipios: null,
            zonaId: null,
            dptoId: null,
            toastCount: 0,
            toastDelay: 3000
        }
    }, 
    methods: {
        guardar () {
            // console.log(this.form);

            let url = 'https://covstats.work/api/pruebas'

            axios.post(url, this.form)
                .then(response => {
                    // console.log(response);
                    this.makeToast('Hecho', response.data.msg, 'success')
                })
            
            this.$router.push('/pruebas')
        },
        pruebas () {
            this.$router.push('/pruebas')
        },
        activateDpto () {
            this.isZoneSelected = true

            this.departamentos = null
            this.municipios = null
            this.isDptoSelected = false

            let url = 'https://covstats.work/api/departamentos/byzona/' + this.zonaId

            axios.get(url)
                .then(response => {
                    this.departamentos = response.data
                })
        },
        activateMncp () {
            this.isDptoSelected = true

            let url = 'https://covstats.work/api/municipios/bydpto/' + this.dptoId

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
        // console.log(localStorage.getItem('idUser'));
        this.form.usuario_id = localStorage.getItem('idUser')

        let url = 'https://covstats.work/api/zonas'

        axios.get(url)
            .then(response => {
                this.zonas = response.data
            })

        url = 'https://covstats.work/api/tipospruebas'

        axios.get(url)
            .then(response => {
                this.tipos = response.data
            })

        url = 'https://covstats.work/api/resultadospruebas'

        axios.get(url)
            .then(response => {
                this.resultados = response.data
            })
    }
}
</script>

<style scoped>
    .card {
        text-align: left;
        margin: 80px auto;
        width: 50%;
        padding: 20px;
        background: #ffffffcd;
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
        width: 100%;
    }
</style>