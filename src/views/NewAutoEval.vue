<template>
    <div>
        <Navbar />

        <div class="card title">
            <div class="card-header">
                <span class="title">Realizar auto-evaluación</span>
            </div>
            <div class="card-body">
                <blockquote class="blockquote mb-0">
                <p>
                    La finalidad de esta auto-evaluación es ayudarlo a tomar decisiones sobre la obtención de atención 
                    médica adecuada. Esta herramienta NO se ha diseñado para fines de diagnóstico científico o tratamiento 
                    de COVID-19.
                </p>
                <p>
                    A continuación se le presentan una serie de síntomas reportados por la Organización Mundial de la Salud en casos de
                    COVID-19, seleccione cuáles de ellos ha experimentado usted, haciendo clic en el botón reportar que se encuentra 
                    dentro de la tarjeta de cada síntoma.

                    Cuando haya finalizado, haga click en el botón guardar auto evaluación.
                </p>
                <footer class="blockquote-footer">mantenga las medidas de prevención para evitar contagios</footer>
                </blockquote>
            </div>
        </div>

        <div class="container">
            <div class="row">

                <div 
                    v-for="s in sintomas" 
                    :key="s.id" 
                    class="card text-dark bg-light mb-3" 
                    style="max-width: 18rem;"
                >
                    <div class="card-header">{{s.sintoma}}</div>
                    <div class="card-body">
                        <h5 class="card-title">Gravedad: {{s.gravedad.gravedad}}</h5>
                        <p class="card-text">{{s.descripcion}}</p>
                    </div>

                    <div class="buttons">
                        <b-form-checkbox switch size="lg" 
                            class="switch"
                            @change="toggleInArray(s.id, s.gravedad_id)"
                            :value=s.id>Reportar</b-form-checkbox
                        >   
                    </div>
                </div>
                
            </div>

            <button 
                v-if="enableSend" 
                @click="saveEval()" 
                type="button" 
                class="btn btn-lg btn-primary"
            >
                Guardar autoevaluaci&oacute;n
            </button>
            <button v-else type="button" class="btn btn-lg btn-secondary" disabled>Seleccione s&iacute;ntomas para poder guardar la autoevaluaci&oacute;n</button>
        </div>
                    
    </div>    
</template>

<script>
import Navbar from '@/components/NavBar.vue'
import axios from 'axios'

export default {
    name: 'NewAutoEval',
    components: {
        Navbar
    },
    data: function () {
        return {
            sintomas: null,
            selected: [],
            enableSend: false,
            idEval: null,
            detalleJson: null,
            toastCount: 0,
            toastDelay: 3000
        }
    },
    methods: {
        toggleInArray (s_id, g_id) {
            
            // Store or delete sintoma_id from array selected -- working
            // if (this.selected.indexOf(s_id) === -1) {
            //     this.selected.push(s_id)
            // } else {
            //     this.selected = this.selected.filter((s) => {
            //         return s !== s_id
            //     })
            // }

            // Store or delete sintoma_id and gravedad_id from array selected -- working
            if (this.selected.findIndex(s => s.sintoma_id === s_id) === -1) {
                this.selected.push({
                    'sintoma_id':s_id,
                    'gravedad_id':g_id
                })
            } else {
                this.selected = this.selected.filter((s) => {
                    return s.sintoma_id !== s_id
                })
            }

            if (this.selected.length !== 0) {
                this.enableSend = true
            } else {
                this.enableSend = false
            }

            console.log(this.selected);
        },
        saveEval () {
            // @TODO            
            // Guardar un registro en la tabla autoevaluaciones
            let idUser = localStorage.getItem('idUser')

            let url = 'http://covstatsapi.test/api/autoevaluaciones'

            let body = {
                usuario_id: idUser
            }
            
            axios.post(url, body)
                .then(response => {
                    console.log(response);
                    
                    // Obtener el id generado del registro en autoevaluaciones

                    url = 'http://covstatsapi.test/api/autoevaluaciones/mostrecentbyuser/' + idUser

                    axios.get(url)
                        .then(response => {
                            console.log(response);
                            this.idEval = response.data[0].id
                            // console.log(this.idEval);

                            //Guardar cada sintoma_id del array selected en la tabla detalles_autoevaluacions
                            url = 'http://covstatsapi.test/api/detallesautoevaluaciones'

                            for (let s in this.selected) {
                                // console.log(this.selected[s].sintoma_id);
                                
                                this.detalleJson = {
                                    autoevaluacion_id: this.idEval,
                                    sintoma_id: this.selected[s].sintoma_id
                                }

                                // console.log(this.detalleJson);
                                
                                axios.post(url, this.detalleJson)
                                    .then(response => {
                                        console.log(response);

                                        this.$router.push('/autoEvaluaciones')
                                    })
                            }
                        })
                this.makeToast('Guardado', 'Se registró la autoevaluación', 'success')
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
        let url = 'http://covstatsapi.test/api/sintomas'

        axios.get(url)
            .then(response => {
                this.sintomas = response.data
            })
    }
}
</script>

<style scoped>
    .container .card {
        text-align: left;
        /* margin: 40px auto; */
        margin-top: 40px;;
        margin-left: 20px;
        width: 300px;
        padding: 20px;
    }

    .card.title {
        width: 90%;
        margin: 40px auto;
    }
    
    input, select {
        height: 40px;
        margin-bottom: 30px;
    }

    .buttons {
        display: flex;
        justify-content: space-between;
    }

    .btn {
        margin-top: 40px;
        margin-bottom: 100px;
    }

    .container {
        width: 90%;
    }

    .createBtn {
        display: flex;
        justify-content: flex-end;
        width: 100%;
        padding-top: 40px;
    }

    .row {
        justify-content: space-between;
        width: 100%;
        margin: 50px auto;
        padding: 0;
    }

    .switch {
        /* width: 100%; */
        background: #e9e9e9;
        border-radius: 5px;
        padding: 5px 10px;
    }

    .container .card-header {
        background-color: #e4e4e4;
    }

    .container .card-body {
        width: 100%;
        padding: 10px;
        margin: 20px auto;
        background-color: #e9e9e9;
        border-radius: 5px;
    }
</style>