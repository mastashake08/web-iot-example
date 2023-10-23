<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      {{nfcData}}
    </p>
    <button @click="getPorts">Scan Serial Ports</button>
  </div>
</template>

<script>
import { SerialManager } from 'web-iot'
export default {
  name: 'serial-example',
  props: {
    msg: String
  },
  data () {
    return {
      serial: {}
    }
  },
  methods: {
    async getPorts () {
      this.serial = new SerialManager()
      console.log(await this.serial.requestPort())
      console.log(await this.serial.openPort({
        baudRate: 22000
      }))
    }
  },
  computed: {
   
}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
