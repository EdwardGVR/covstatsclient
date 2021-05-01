<template>
    <div>
        <Navbar />

        <div class="row container">
            <div class="section recomendaciones">
                <h2>Recomendaciones</h2>

                <span>
                    Basado en los s&iacute;ntomas reportados en esta autoevaluación, le presentamos las siguientes recomendaciones.
                </span>

                <div class="grave" v-if="graves > 0">
                    <div class="card text-white bg-danger">
                        <div class="card-header">
                            Recomendaci&oacute;n caso grave
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">Obtenga asistencia m&eacute;dica inmediata</h5>
                            <p class="card-text">Debe obtener asistencia m&eacute;dica profesiona lo antes posible</p>
                        </div>
                    </div>

                    <div class="card text-white bg-danger">
                        <div class="card-header">
                            Recomendaci&oacute;n caso grave
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">Comunicarse al tel&eacute;fono 132</h5>
                            <p class="card-text">
                                De preferencia, para evitar aumento del cansancio, algui&eacute;n m&aacute;s debe llamar 
                                y reportar la urgencia del caso, seguir las indicaciones que se le brindar&aacute;n.
                            </p>
                        </div>
                    </div>

                    <div class="card text-white bg-danger">
                        <div class="card-header">
                            Recomendaci&oacute;n caso grave
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">No realizar  esfuerzo f&iacute;sico</h5>
                            <p class="card-text">
                                En esta etapa cualquier esfuerzo por m&iacute;nimo que parezca, puede agravar la fatiga
                                y dificultad para respirar, por lo que debe permanecer en reposo y en un ambiente bien ventilado.
                            </p>
                        </div>
                    </div>
                </div>

                <div class="moderada" v-if="moderadas > 0">
                    <div class="card text-dark bg-warning">
                        <div class="card-header">
                            Recomendaci&oacute;n caso moderado
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">Obtenga orientación médica por vía telefónica</h5>
                            <p class="card-text">
                                Puede llamar al tel&eacute;fono 132 del Ministerio de Salud para
                                reportar sus s&iacute;ntomas y obtener orientaciones de personal m&eacute;dico
                            </p>
                        </div>
                    </div>

                    <div class="card text-dark bg-warning">
                        <div class="card-header">
                            Recomendaci&oacute;n caso moderado
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">Vigile niveles de oxigenaci&oacute;n</h5>
                            <p class="card-text">
                                Se recomienda tener un ox&iacute;metro en casa para estar pendiente de la oxigenaci&oacute;n
                                en sangre, se consideran niveles normales valores mayores a 95
                            </p>
                        </div>
                    </div>

                    <div class="card text-dark bg-warning">
                        <div class="card-header">
                            Recomendaci&oacute;n caso moderado
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">Realizarse una prueba</h5>
                            <p class="card-text">
                                Ante la persistencia de los s&iacute;ntomas presentados, se recomienda realizarse una prueba
                                de COVID-19, puede optar por la alternativa gratuita del Ministerio de Salud, quienes a trav&eacute;s
                                de sus redes sociales informan las localidades donde se estar&aacute;n realizando los tamizajes.
                            </p>
                        </div>
                    </div>

                    <div class="card text-dark bg-warning">
                        <div class="card-header">
                            Recomendaci&oacute;n caso moderado
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">Aislamiento</h5>
                            <p class="card-text">
                                Como medida de prevenci&oacute;n para evitar la posible propagaci&oacute;n dentro del hogar, se
                                recomienda tomar medidas como el uso de una habitaci&oacute;n separada, uso de cubiertos y art&iacute;culos
                                desechables, uso de mascarilla dentro de la casa y mantener bien ventilada la casa.
                            </p>
                        </div>
                    </div>

                    <div class="card text-dark bg-warning">
                        <div class="card-header">
                            Recomendaci&oacute;n caso moderado
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">Estar atento a complicaciones</h5>
                            <p class="card-text">
                                Mantenerse vigilante ante cualquier complicaci&oacute;n de los s&iacute;ntomas presentados.
                            </p>
                        </div>
                    </div>
                </div>

                <div class="leve" v-if="leves > 0">
                    <div class="card text-white bg-success">
                        <div class="card-header">
                            Recomendaci&oacute;n caso leve
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">Mant&eacute;ngase hidratado</h5>
                            <p class="card-text">Se recomienda ingerir líquidos en abundancia</p>
                        </div>
                    </div>

                    <div class="card text-white bg-success">
                        <div class="card-header">
                            Recomendaci&oacute;n caso leve
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">Vigile sus s&iacute;ntomas</h5>
                            <p class="card-text">Mantengase alerta ante posibles complicaciones</p>
                        </div>
                    </div>

                    <div class="card text-white bg-success">
                        <div class="card-header">
                            Recomendaci&oacute;n caso leve
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">Siga aplicando las medidas de higiene y distanciamiento</h5>
                            <p class="card-text">Uso correcto de mascarilla, alcohol gel, distanciamiento social, etc.</p>
                        </div>    
                    </div>
                </div>
            </div>

            <div class="section sintomas">
                <h2>Síntomas reportados</h2>

                <span>
                    A continuaci&oacute;n se le presentan los s&iacute;ntomas reportados en esta autoevaluaci&oacute;n
                </span>

                <div
                    v-for="s in sintomas"
                    :key="s.id" 
                    class="card">
                    <div class="card-header">
                        {{s.sintoma.gravedad.gravedad}}
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">{{s.sintoma.sintoma}}</h5>
                        <p class="card-text">{{s.sintoma.descripcion}}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>    
</template>

<script>
import Navbar from '@/components/NavBar.vue'
import axios from 'axios'

export default {
    name: 'DetallesAutoEval',
    components: {
        Navbar
    },
    data: function () {
        return {
            id: null,
            sintomas: null,
            leves: 0,
            moderadas: 0,
            graves: 0
        }
    },
    mounted: function () {
        this.id = this.$route.params.id

        let url = 'https://covstats.work/api/detallesautoevaluaciones/sintomas/' + this.id

        axios.get(url)
            .then(response => {
                this.sintomas = response.data

                // console.log(this.sintomas)

                let gravedad;

                for (let i = 0; i < this.sintomas.length; i++) {
                    // console.log(sintomas[i].sintoma.gravedad_id)
                    gravedad = this.sintomas[i].sintoma.gravedad_id

                    if (gravedad === 1) {
                        this.leves++
                    } else if (gravedad === 2) {
                        this.moderadas++
                    } else {
                        this.graves++
                    }
                }
            })
    }
}
</script>

<style scoped>
    .card {
        margin: 50px auto;
        width: 100%;
        text-align: left;
    }

    .row {
        width: 90%;
        margin: 50px auto;
        justify-content: space-between;
    }

    .section {
        background: #ededed;
        border-radius: 5px;
        padding: 10px;
        width: 45%;
    }

    /* .grave .card {
        background: #ffdcdc;
    } */
</style>