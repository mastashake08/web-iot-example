<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      {{nfcData}}
    </p>
    <button @click="readNFC">Read NFC Data</button>
  </div>
</template>

<script>
import { NFCManager } from 'web-iot'
export default {
  name: 'NFC',
  props: {
    msg: String
  },
  data () {
    return {
      nfc: null,
      nfcData: null
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
