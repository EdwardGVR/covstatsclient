<template>
    <div>
        <div data-aos="fade-up" class="chart-wrapper">
            <Chart 
                v-if="loaded"
                :title=title 
                :labels=labels
                :data=chartData
            />
        </div>
    </div>    
</template>

<script>
import Chart from '@/components/charts/Chart.vue'
import axios from 'axios'

export default {
    name: 'TotalPruebas',
    components: {
        Chart
    },
    data() {
        return {
            loaded: false,
            title: "Total de pruebas",
            labels: [
                "Positivas",
                "Negativas"
            ],
            chartData: [
            //   { value: 2000, name: "Direct" },
            ]
        }
    },
    mounted: function () {
        let url = "https://covstats.work/api/pruebas/byresultado/1"

        axios.get(url)
            .then(response => {
                this.chartData.push({value: response.data, name: "Positivas"})
        
                url = "https://covstats.work/api/pruebas/byresultado/2"

                axios.get(url)
                    .then(response => {
                        this.chartData.push({value: response.data, name: "Negativas"})
                        
                        this.loaded = true
                })
        })
        
    }
}
</script>

<style scoped>
    .chart-wrapper {
        height: 100vh;
        width: 100%;
        background: #100c2a;
        padding-top: 50px;
    }
</style>