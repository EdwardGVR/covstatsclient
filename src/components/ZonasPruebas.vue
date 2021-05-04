<template>
    <div>
        <div class="wrapper">
            <div class="zona-wrapper">
                <span>Zona Occidental</span>
                <Chart 
                    v-if="loaded"
                    :title=title 
                    :labels=labels
                    :data=occData
                />
            </div>

             <div class="zona-wrapper">
                <span>Zona Central</span>
                <Chart 
                    v-if="loaded"
                    :title=title 
                    :labels=labels
                    :data=cenData
                />
            </div>

            <div class="zona-wrapper">
                <span>Zona Paracentral</span>
                <Chart 
                    v-if="loaded"
                    :title=title 
                    :labels=labels
                    :data=parData
                />
            </div>

            <div class="zona-wrapper">
                <span>Zona Oriental</span>
                <Chart 
                    v-if="loaded"
                    :title=title 
                    :labels=labels
                    :data=oriData
                />
            </div>
        </div>
    </div>    
</template>

<script>
import Chart from '@/components/charts/Chart.vue'
import axios from 'axios'

export default {
    name: 'ZonasPruebas',
    components: {
        Chart
    },
    data() {
        return {
            loaded: false,
            title: "",
            labels: [
                "Positivas",
                "Negativas"
            ],
            occData: [

            ],
            cenData: [

            ],
            parData: [

            ],
            oriData: [

            ]
        }
    },
    mounted: function () {
        let url = "https://covstats.work/api/pruebas/byzona/1"

        axios.get(url)
            .then(response => {

                let r = response.data

                if (r.length == 0) {
                    this.occData.push({value: 0, name: "Positivas"})
                    this.occData.push({value: 0, name: "Negativas"})
                } else if (r.length == 1) {
                    if (r.resultado == "Positivo") {
                        this.occData.push({value: r[0].cantidad, name: "Positivas"})
                        this.occData.push({value: 0, name: "Negativas"})
                    } else {
                        this.occData.push({value: 0, name: "Positivas"})
                        this.occData.push({value: r[0].cantidad, name: "Negativas"})
                    }
                } else {
                    this.occData.push({value: r[0].cantidad, name: "Positivas"})
                    this.occData.push({value: r[1].cantidad, name: "Negativas"})
                }
            
            url = "https://covstats.work/api/pruebas/byzona/2"

            axios.get(url)
                .then(response => {

                    let r = response.data

                    if (r.length == 0) {
                        this.cenData.push({value: 0, name: "Positivas"})
                        this.cenData.push({value: 0, name: "Negativas"})
                    } else if (r.length == 1) {
                        if (r.resultado == "Positivo") {
                            this.cenData.push({value: r[0].cantidad, name: "Positivas"})
                            this.cenData.push({value: 0, name: "Negativas"})
                        } else {
                            this.cenData.push({value: 0, name: "Positivas"})
                            this.cenData.push({value: r[0].cantidad, name: "Negativas"})
                        }
                    } else {
                        this.cenData.push({value: r[0].cantidad, name: "Positivas"})
                        this.cenData.push({value: r[1].cantidad, name: "Negativas"})
                    }

                url = "https://covstats.work/api/pruebas/byzona/3"

                axios.get(url)
                    .then(response => {

                        let r = response.data

                        if (r.length == 0) {
                            this.parData.push({value: 0, name: "Positivas"})
                            this.parData.push({value: 0, name: "Negativas"})
                        } else if (r.length == 1) {
                            if (r.resultado == "Positivo") {
                                this.parData.push({value: r[0].cantidad, name: "Positivas"})
                                this.parData.push({value: 0, name: "Negativas"})
                            } else {
                                this.parData.push({value: 0, name: "Positivas"})
                                this.parData.push({value: r[0].cantidad, name: "Negativas"})
                            }
                        } else {
                            this.parData.push({value: r[0].cantidad, name: "Positivas"})
                            this.parData.push({value: r[1].cantidad, name: "Negativas"})
                        }

                    url = "https://covstats.work/api/pruebas/byzona/4"

                    axios.get(url)
                        .then(response => {

                            let r = response.data

                            if (r.length == 0) {
                                this.oriData.push({value: 0, name: "Positivas"})
                                this.oriData.push({value: 0, name: "Negativas"})
                            } else if (r.length == 1) {
                                if (r.resultado == "Positivo") {
                                    this.oriData.push({value: r[0].cantidad, name: "Positivas"})
                                    this.oriData.push({value: 0, name: "Negativas"})
                                } else {
                                    this.oriData.push({value: 0, name: "Positivas"})
                                    this.oriData.push({value: r[0].cantidad, name: "Negativas"})
                                }
                            } else {
                                this.oriData.push({value: r[0].cantidad, name: "Positivas"})
                                this.oriData.push({value: r[1].cantidad, name: "Negativas"})
                            }
                        this.loaded = true
                    })
                })
            })
        })
    }
}
</script>

<style scoped>
    .wrapper {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        /* height: 350px; */
        width: 100%;
        background: #100c2a;
        padding-top: 50px;
    }

    .zona-wrapper {
        /* height: auto; */
        width: 50%;
        margin-bottom: 50px;
        /* border: 2px solid #fff; */
    }

    .chart div canvas {
        height: 160px;
    }

    span {
        display: inline-block;
        color: #fff;
        font-size: 18px;
        padding-bottom: 50px;
    }
</style>