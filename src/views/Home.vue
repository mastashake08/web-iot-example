<template>
  <div class="home">
    <HelloWorld :msg="msg"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
export default {
  name: 'home-view',
  components: {
    HelloWorld
  },
  data() {
    return {
      msg: `This is the WebIOT demo created by Mastashake!
      This web application is currently only available on Desktop Chrome and Android Mobile!
      `
    }
  }
}
</script>
