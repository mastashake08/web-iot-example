<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <button @click="getUSBDevices">Scan USB Devices</button>
  </div>
</template>

<script>
import { USBManager } from 'web-iot'
export default {
  name: 'USB',
  props: {
    msg: String
  },
  data () {
    return {
      usb: {}
    }
  },
  mounted () {
  },
  methods: {
    async getUSBDevices () {
      const filters = {
        }
      this.usb = new USBManager()
      console.log("Devices::",await this.usb.requestDevice(filters))
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
