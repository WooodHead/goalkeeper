<template>
  <div>
    <b-aside :is-show="showSetting" :on-ok="confirmSetting" :on-cancel="cancelSetting" placement="right">
      <input class="input key-input" type="text" placeholder="Access Key" :value="accessKey" @input="changeAccessKey" />
      <input class="input key-input" type="text" placeholder="Secret Key" :value="secretKey" @input="changeSecretKey" />
    </b-aside>
    <span class="icon is-large settings" @click="openSetting">
      <i class="fa fa-gear"></i>
    </span>
    <button @click="getBuckets">aaa</button>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  export default {
    name: 'setting',
    computed: mapState({
      accessKey: state => state.cdnConfigs.accessKey,
      secretKey: state => state.cdnConfigs.secretKey,
      showSetting: state => state.cdnConfigs.showSetting
    }),
    methods: {
      ...mapActions(['changeAccessKey', 'changeSecretKey', 'openSetting', 'confirmSetting', 'cancelSetting', 'getBuckets'])
    }
  }
</script>

<style scoped>
  .settings {
    position: fixed;
    bottom: 20px;
    right: 20px;
    cursor: pointer;
    transition: opacity 0.5s;
  }
  .settings:hover {
    opacity: 0.7
  }
  .key-input {
    margin-top: 16px;
  }
</style>
