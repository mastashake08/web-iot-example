<template>
  <div class="serial">
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
