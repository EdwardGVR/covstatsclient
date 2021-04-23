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
                        <option selected disabled>Seleccionar el resultado de la prueba...</option>
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
                    <label for="inputZona" class="form-label">Zona</label>
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
                    <label for="inputDepartamento" class="form-label">Departamento</label>
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
                    <label for="inputMunicipio" class="form-label">Municipio</label>
                    <select id="inputMunicipio" class="form-select col-md-12" required v-model="form.municipio_id">
                        <option selected disabled>Seleccionar el municipio...</option>
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
                    <div>
                        <button @click="eliminar()" class="btn btn-danger">Eliminar</button>
                        <button @click="pruebas()" class="btn btn-light back">Regresar</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import Navbar from '@/components/NavBar.vue'
import axios from 'axios'

export default {
    name: 'EditTest',
    components: {
        Navbar
    },
    data: function () {
        return {
            testId: null,
            form: {
                municipio_id: null,
                resultado_id: null,
                tipo_id: null
            },
            selectedTipo: null,
            selectedResultado: null,
            selectedZone: null,
            selectedDpto: null,
            selectedMncp: null,
            tipos: null,
            resultados: null,
            zonas: null,
            isZoneSelected: true,
            isDptoSelected: true,
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

            let url = 'http://covstatsapi.test/api/pruebas/' + this.testId

            axios.put(url, this.form)
                .then(response => {
                    this.makeToast('Hecho', response.data.msg, 'success')
                })
        },
        eliminar () {
            let url = 'http://covstatsapi.test/api/pruebas/' + this.testId

            axios.delete(url, this.form)
                .then(response => {
                    this.makeToast('Hecho', response.data.msg, 'danger')
                })
        },
        pruebas () {
            this.$router.push('/pruebas')
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
        this.testId = this.$route.params.testId

        let url = 'http://covstatsapi.test/api/pruebas/' + this.testId

        axios.get(url)
            .then(response => {
                let t = response.data[0]

                this.form.municipio_id = t.municipio_id
                this.form.resultado_id = t.resultado_id
                this.form.tipo_id = t.tipo_id

                // this.selectedTipo = t.tipo_id
                // this.selectedResultado = t.resultado_id
                this.selectedZone = t.zona_id
                this.selectedDpto = t.departamento_id
                // this.selectedMncp = t.municipio_id
        
                url = 'http://covstatsapi.test/api/municipios/' + this.form.municipio_id

                axios.get(url)
                    .then(response => {
                        this.zonaId = response.data[0].departamento.zona_id
                        this.dptoId = response.data[0].departamento.id

                        this.activateDpto()
                        this.activateMncp()
                    })
            })
        

        url = 'http://covstatsapi.test/api/zonas'

        axios.get(url)
            .then(response => {
                this.zonas = response.data
            })

        url = 'http://covstatsapi.test/api/tipospruebas'

        axios.get(url)
            .then(response => {
                this.tipos = response.data
            })

        url = 'http://covstatsapi.test/api/resultadospruebas'

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
    }
    
    input, select {
        height: 40px;
        margin-bottom: 30px;
    }

    .buttons {
        display: flex;
        justify-content: space-between;
    }

    .btn.back {
        margin-left: 10px;
    }

    label {
        width: 100%;
    }
</style>