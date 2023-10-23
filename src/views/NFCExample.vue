<template>
  <div class="serial">
    <img alt="Vue logo" src="../assets/logo.png">
    <NFC msg="Web NFC Example"/>
  </div>
</template>

<script>
// @ is an alias to /src
import NFC from '@/components/NFC'

export default {
  components: {
    NFC
  }
}
</script>
