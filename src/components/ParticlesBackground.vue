<template>
    <vue-particles
        class="particles"
        color="#dedede"
        :particleOpacity="0.7"
        :particlesNumber="100"
        shapeType="circle"
        :particleSize="4"
        linesColor="#dedede"
        :linesWidth="1"
        :lineLinked="true"
        :lineOpacity="0.4"
        :linesDistance="150"
        :moveSpeed="3"
        :hoverEffect="true"
        hoverMode="grab"
        :clickEffect="true"
        clickMode="push"
      >
      </vue-particles>
</template>

<script>
export default {
    name: 'Particlebg'
}
</script>

<style scoped>
 .particles {
    width: 100%;
    height: 100vh;
    background: #000;
    z-index: -1;
    position: fixed;
  }
</style>