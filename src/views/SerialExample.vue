<template>
  <div class="serial">
    <img alt="Vue logo" src="../assets/logo.png">
    <serial-component msg="Web Serial Example"/>
  </div>
</template>

<script>
// @ is an alias to /src
import SerialComponent from '@/components/SerialComponent'

export default {
  components: {
    SerialComponent
  }
}
</script>
