<template>
  <div class="home">
    <HelloWorld msg="This is the WebIOT demo created by Mastashake!"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
export default {
  name: 'home-view',
  components: {
    HelloWorld
  }
}
</script>
