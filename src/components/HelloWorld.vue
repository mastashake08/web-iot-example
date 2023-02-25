<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      {{nfcData}}
    </p>
    <p>
      {{btDevices}}
    </p>
    <button :click="readNFC">Read NFC Data</button>
    <button :click="getDevices">Scan BT Devices</button>
  </div>
</template>

<script>
import { NFCManager, BluetoothManager } from '@mastashake08/web-iot'
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data () {
    return {
      nfc: null,
      nfcData: null,
      bt: null,
      btDevices: null
    }
  },
  mounted () {

  },
  methods: {
    readNFC() {
      this.nfc = new NFCManager()
      this.nfc.readNFCData(this.onnfcdataread)
    },
    onnfcdataread (event) {
      this.nfcData = event
    },
    getDevices () {
      this.bt = new BluetoothManager()
      this.btDevices = this.bt.getDevices()
    }
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
