<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      {{nfcData}}
    </p>
    <p>
      Your are connected to {{ (typeof bt.device !== 'undefined' && typeof bt.device.name !== 'undefined') ? bt.device.name  : 'NOT CONNECTED'   }}
    </p>
    <p>

      Your device battery level = {{battery_level}}%

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
      bt: {},
      btDevice: null,
      serial: {},
      usb: {},
      battery_level: 0
    }
  },
  mounted () {

  },
  methods: {
    async getUSBDevices () {
      const filters = {
        filters: [
        { services: ["heart_rate", "battery_level"] }
      ]}
      this.usb = new USBManager()
      console.log("Devices::",await this.usb.requestDevice(filters))
    },
    async getPorts () {
      this.serial = new SerialManager()
      console.log(await this.serial.requestPort())
      console.log(await this.serial.openPort({
        baudRate: 22000
      }))
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
       await this.getBatteryLevel()
      } catch(e) {
        console.log(e.message)
      }
    },
    async getBatteryLevel() {
        console.log(this.bt)
        console.log('SERVICES', await this.bt.getServices())
        await this.bt.getService('0000180f-0000-1000-8000-00805f9b34fb')

        console.log('SERVICES::',await this.bt.getCharacteristic('00002a19-0000-1000-8000-00805f9b34fb'))

        const val = await this.bt.getValue()

        console.log(`Battery percentage is ${val.getUint8(0)}`);
        this.battery_level = val.getUint8(0)
    }
  },
  computed: {
    getDeviceName () {
      console.log('device' in this.bt)
      if(this.bt.device) {
        return this.bt.device.name
      } else {
        return 'DEVICE NOT CONNECTED'
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
