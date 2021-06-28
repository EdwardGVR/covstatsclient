<template>
    <div>
        <div data-aos="fade-up" class="wrapper">
            <div class="title">
                <hr>
                Pruebas por departamento
            </div>

            <div data-aos="fade-right" class="zona-wrapper">
                <span>Viendo pruebas del departamento de:</span>

                <div @change="getDptoTest()" class="col-md-12">
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

                <Chart 
                    v-if="loadedDpto"
                    :title=title 
                    :labels=labels
                    :data=dptoData
                />
            </div>

             <div data-aos="fade-left" class="zona-wrapper">
                <span>Viendo pruebas del municipio de:</span>

                <div @change="getMnpoTest()" class="col-md-12">
                    <select id="inputMunicipio" class="form-select col-md-12" required v-model="mnpoId">
                        <option selected disabled>Seleccionar un municipio...</option>
                        <option
                            v-for="m in municipios"
                            :key="m.id"
                            :value="m.id"
                        >
                            {{m.municipio}}
                        </option>
                    </select>
                </div>

                <Chart 
                    v-if="loadedMnpo"
                    :title=title 
                    :labels=labels
                    :data=mnpoData
                />
            </div>
        </div>
    </div>    
</template>

<script>
import Chart from '@/components/charts/Chart.vue'
import axios from 'axios'

export default {
    name: 'DepartamentosPruebas',
    components: {
        Chart
    },
    data() {
        return {
            loadedDpto: false,
            loadedMnpo: false,
            title: "",
            labels: [
                "Positivas",
                "Negativas"
            ],
            dptoData: [

            ],
            mnpoData: [

            ],
            departamentos: null,
            municipios: null,
            dptoId: 7,  // San Salvador
            mnpoId: 126 // San Salvador
        }
    },
    methods: {
        getDptoTest () {
            this.loadedDpto = false
            this.dptoData = []

            this.getMunicipios()
            this.mnpoData = []

            let url = "http://127.0.0.1:8000/api/pruebas/bydepartamento/" + this.dptoId

            axios.get(url)
                .then(response => {

                    let r = response.data

                    if (r.length == 0) {
                        this.dptoData.push({value: 0, name: "Positivas"})
                        this.dptoData.push({value: 0, name: "Negativas"})
                    } else if (r.length == 1) {
                        if (r[0].resultado == "Positivo") {
                            this.dptoData.push({value: r[0].cantidad, name: "Positivas"})
                            this.dptoData.push({value: 0, name: "Negativas"})
                        } else if (r[0].resultado == "Negativo") {
                            this.dptoData.push({value: 0, name: "Positivas"})
                            this.dptoData.push({value: r[0].cantidad, name: "Negativas"})
                        }
                    } else {
                        this.dptoData.push({value: r[0].cantidad, name: "Positivas"})
                        this.dptoData.push({value: r[1].cantidad, name: "Negativas"})
                    }
                this.loadedDpto = true
            })
        },

        getMnpoTest () {
            this.loadedMnpo = false
            this.mnpoData = []

            let url = "http://127.0.0.1:8000/api/pruebas/bymunicipio/" + this.mnpoId

            axios.get(url)
                .then(response => {

                    let r = response.data

                    if (r.length == 0) {
                        this.mnpoData.push({value: 0, name: "Positivas"})
                        this.mnpoData.push({value: 0, name: "Negativas"})
                    } else if (r.length == 1) {
                        if (r[0].resultado == "Positivo") {
                            this.mnpoData.push({value: r[0].cantidad, name: "Positivas"})
                            this.mnpoData.push({value: 0, name: "Negativas"})
                        } else if (r[0].resultado == "Negativo") {
                            this.mnpoData.push({value: 0, name: "Positivas"})
                            this.mnpoData.push({value: r[0].cantidad, name: "Negativas"})
                        }
                    } else {
                        this.mnpoData.push({value: r[0].cantidad, name: "Positivas"})
                        this.mnpoData.push({value: r[1].cantidad, name: "Negativas"})
                    }
                this.loadedMnpo = true
            })
        },

        getMunicipios () {
            let url = "http://127.0.0.1:8000/api/municipios/bydpto/" + this.dptoId
            
            axios.get(url)
                .then(response => {
                    this.municipios = response.data
                })
        }
    },
    mounted: function () {
        // Get departamentos
        let url = "http://127.0.0.1:8000/api/departamentos"

        axios.get(url)
            .then(response => {
                this.departamentos = response.data
                
            })

        this.getDptoTest()
        this.getMunicipios()
        this.getMnpoTest()
    }
}
</script>

<style scoped>
    body {
        background-color: #100c2a;
    }

    .wrapper {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        /* height: 200px; */
        width: 100%;
        background-color: #100c2a;
        padding: 50px 10px;
    }

    .zona-wrapper {
        min-height: 300px;
        height: 300px;
        width: 50%;
        margin-bottom: 50px;
        /* border: 2px solid #fff; */
        background-color: #100c2a;
    }

    hr {
        border: none;
        background: #fff;
        height: 5px;
        border-radius: 5px;
        width: 90%;
        margin-bottom: 100px;
    }

    .title {
        display: block;
        width: 100%;
        color: #fff;
        font-size: 18px;
        /* margin-bottom: 100px; */
    }

    select {
        height: 40px;
        border-radius: 5px;
        margin-bottom: 50px;
    }

    span {
        display: inline-block;
        color: #fff;
        font-size: 18px;
        padding: 50px;
    }
</style>