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
      battery_level: 0,
      ad: {}
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
          //  filters: [{
          //    services: ["00002a00-0000-1000-8000-00805f9b34fb", "00002a19-0000-1000-8000-00805f9b34fb"],
          //    name: 'Services',
          //    namePrefix: 'WebIOT'
          //  }],
          // optionalServices: ["0000180f-0000-1000-8000-00805f9b34fb"]
        })

      await this.bt.connectToServer()
      this.startNotifications()
      try {

      await this.getBatteryLevel()
      } catch {
        console.log('Error')
      }
      } catch(e) {
        console.log(e.message)
      }
    },
     startNotifications () {
      this.bt.device.onadvertisementreceived = (event) => {
        this.ad = event
        console.log(event)
        console.log('Advertisement received.');
        console.log('  Device Name: ' + event.device.name);
        console.log('  Device ID: ' + event.device.id);
        console.log('  RSSI: ' + event.rssi);
        console.log('  TX Power: ' + event.txPower);
        console.log('  UUIDs: ' + event.uuids);
        event.manufacturerData.forEach((valueDataView, key) => {
          console.log('Manufacturer', [key, valueDataView]);
        });
        event.serviceData.forEach((valueDataView, key) => {
          console.log('Service', [key, valueDataView]);
        });
      };
      this.bt.device.watchAdvertisements(); 
      console.log('Watching advertisements from "' + this.bt.device.name + '"...');
      
    },
    async getBatteryLevel() {
      
        const services = await this.bt.getServices()
        await this.bt.getService(services[0].uuid)
        const chars = await this.bt.getCharacteristics()
        console.log(chars)
        chars.forEach((char) => {
          char.oncharacteristicvaluechanged = (val) => {
            this.battery_level = val.target.value.getUint8(0)
            console.log(`Battery percentage is ${val.target.value.getUint8(0)}`)
          }
        })
        console.log('SERVICES::',await this.bt.getCharacteristic(chars[0].uuid))

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
