<template>
  <div>
    <b-aside :is-show="showSetting" :on-ok="confirmSetting" :on-cancel="cancelSetting" placement="right">
      <input class="input key-input" type="text" placeholder="Access Key" :value="accessKey" @input="changeAccessKey" />
      <input class="input key-input" type="text" placeholder="Secret Key" :value="secretKey" @input="changeSecretKey" />
    </b-aside>
    <span class="icon is-large settings" @click="openSetting">
      <i class="fa fa-gear"></i>
    </span>
    <button @click="test">测试ajax</button>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  import Qiniu from '../../qiniu/index'
  export default {
    name: 'setting',
    computed: mapState({
      accessKey: state => state.cdnConfigs.accessKey,
      secretKey: state => state.cdnConfigs.secretKey,
      showSetting: state => state.cdnConfigs.showSetting
    }),
    methods: {
      ...mapActions(['changeAccessKey', 'changeSecretKey', 'openSetting', 'confirmSetting', 'cancelSetting']),
      test() {
        new Qiniu({
          accessKey: this.$store.state.cdnConfigs.accessKey,
          secretKey: this.$store.state.cdnConfigs.secretKey
        }).getBucketList().then(res => console.log(res)).catch(err => console.error(err))
      }
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
