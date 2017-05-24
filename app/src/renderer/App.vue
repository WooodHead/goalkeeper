<template>
  <div id="app">
    <settings></settings>
    <desk></desk>
  </div>
</template>

<script>
  import Settings from 'components/Settings'
  import Desk from 'components/Desk'
  import store from 'renderer/vuex/store'
  export default {
    components: {
      Settings,
      Desk
    },
    store
  }
</script>

<style>
  * {
    margin: 0;
    padding: 0;
  }

  html,
  body { height: 100%; }

  body {
    align-items: center;
    background:
      radial-gradient(
        ellipse at center,
        rgba(255, 255, 255, 1) 0%,
        rgba(229, 229, 229, .85) 100%
      );
    background-position: center;
    display: flex;
    font-family: Helvetica, sans-serif;
    justify-content: center;
    text-align: center;
  }
</style>
