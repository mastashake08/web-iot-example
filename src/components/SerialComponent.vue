<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      {{serial.selectedPort}}
    </p>
    <button @click="getPorts">Scan Serial Ports</button>
  </div>
</template>

<script>
import { SerialManager } from '@mastashake08/web-iot'
export default {
  props: {
    msg: String
  },
  data () {
    return {
      serial: {},
      port: {}
    }
  },
  methods: {
    async writeData() {
      const encoder = new TextEncoder();
      await this.serial.writeData(encoder.encode("PING"))
    },
    async getPorts () {
      this.serial = new SerialManager()
      this.port = await this.serial.requestPort()
      await this.serial.openPort({
        baudRate: 9600
      })
      console.log(await this.port.getInfo())
      console.log(await   this.port.getSignals())
      console.log(await  this.port.setSignals({ dataTerminalReady: true }))
      console.log(await   this.port.getSignals())
      await this.writeData()
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
