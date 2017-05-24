<template>
  <div>
    <dropdown trigger="hover">
      <a class="button">
        <span>{{ bucket ? bucket : '选择bucket' }}</span>
          <span class="icon is-small">
          <i class="fa fa-angle-down"></i>
        </span>
      </a>
      <div slot="content">
        <menus v-for="bucket in buckets">
          <menu-item :click="() => changeBucket(bucket)">{{ bucket }}</menu-item>
        </menus>
      </div>
    </dropdown>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  export default {
    name: 'desk',
    computed: mapState({
      buckets: state => state.cdnConfigs.buckets,
      bucket: state => state.cdnConfigs.bucket
    }),
    methods: {
      ...mapActions(['changeBucket'])
    }
  }
</script>