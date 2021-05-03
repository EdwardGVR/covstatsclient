<template>
    <div>
        <Navbar />

        <TotalPruebas />
    </div>
</template>

<script>
import Navbar from '@/components/NavBar.vue'
import TotalPruebas from '@/components/TotalPruebas.vue'

export default {
    name: 'Datos',
    components: {
        Navbar,
        TotalPruebas
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

</style>