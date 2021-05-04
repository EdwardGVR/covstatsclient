<template>
    <div>
        <Navbar />

        <div class="wrapper">
            <TotalPruebas />
        </div>

        <div class="wrapper">
            <ZonasPruebas />
        </div>
    </div>
</template>

<script>
import Navbar from '@/components/NavBar.vue'
import TotalPruebas from '@/components/TotalPruebas.vue'
import ZonasPruebas from '@/components/ZonasPruebas.vue'

export default {
    name: 'Datos',
    components: {
        Navbar,
        TotalPruebas,
        ZonasPruebas
    },
    data() {
        return {
            
        }
    },
    mounted: function () {
        
    }
}
</script>

<style scoped>
    .wrapper {
        height: auto;
        width: 100%;
    }
</style>