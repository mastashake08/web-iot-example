<template>
  <div class="bluetooth">
    <img alt="Vue logo" src="../assets/logo.png">
    <Bluetooth msg="Web Bluetooth Example"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Bluetooth from '@/components/Bluetooth.vue'

export default {
  components: {
    Bluetooth
  }
}
</script>
