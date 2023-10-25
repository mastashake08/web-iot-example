<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      {{serial.selectedPort}}
    </p>
    <button @click="getPorts">Scan Serial Ports</button>
    <button @click="writeData">Write Data</button>
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
      const encoder = new TextEncoder('utf-16');
      const data = prompt('Enter data.')
      await this.port.setSignals({ dataTerminalReady: true, requestToSend: true })
      await this.serial.writeData(encoder.encode(data))
      console.log(await this.serial.readData())
    },
    async getPorts () {
      this.serial = new SerialManager()
      this.port = await this.serial.requestPort({
        allowedBluetoothServiceClassIds: ['0000110f-0000-1000-8000-00805f9b34fb'],
      })    
     
      await this.serial.openPort({
        baudRate: prompt('Enter Baud rate.')
      })
      await  this.port.setSignals({ dataTerminalReady: true, requestToSend: true })
    },
  
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
