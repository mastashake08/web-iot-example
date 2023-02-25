<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      {{nfcData}}
    </p>
    <p>
      Your device battery level = {{btDevice}}
    </p>
    <button @click="readNFC">Read NFC Data</button>
    <button @click="getDevices">Scan BT Devices</button>
    <button @click="getPorts">Scan Serial Ports</button>
    <button @click="getUSBDevices">Scan USB Devices</button>
  </div>
</template>

<script>
import { NFCManager, BluetoothManager, SerialManager, USBManager } from '@mastashake08/web-iot'
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
      btDevice: null,
      serial: {},
      usb: {}
    }
  },
  mounted () {

  },
  methods: {
    async getUSBDevices () {
      const filters = {
        filters: [
        { vendorId: '0x0781', productId: '0x5575' },
        { vendorId: '0x2109'}
      ]}
      this.usb = new USBManager()
      //console.log("Devices::",await this.usb.getDevices())
      console.log("Devices::",await this.usb.requestDevice(filters))
    },
    async getPorts () {
      this.serial = new SerialManager()
      console.log(await this.serial.getPorts())
    },
    readNFC() {
      this.nfc = new NFCManager()
      this.nfc.readNFCData(this.onnfcdataread)
    },
    onnfcdataread (event) {
      this.nfcData = event
    },
    async getDevices () {
      try {
        this.bt = new BluetoothManager()
        this.btDevice = await this.bt.getDevices({
          acceptAllDevices: true,
          // filters: [{
          //   services: ['0000180f-0000-1000-8000-00805f9b34fb'],
          // }],
          optionalServices: ["0000180f-0000-1000-8000-00805f9b34fb"]
        })
        await this.bt.connectToServer()
        console.log(this.bt)
        console.log('SERVICES', await this.bt.getServices())
        await this.bt.getService('0000180f-0000-1000-8000-00805f9b34fb')

        console.log('SERVICES::',await this.bt.getCharacteristic('00002a19-0000-1000-8000-00805f9b34fb'))

        const val = await this.bt.getValue()

        console.log(`Battery percentage is ${val.getUint8(0)}`);
      } catch(e) {
        console.log(e.message)
      }
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
