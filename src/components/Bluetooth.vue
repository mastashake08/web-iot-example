<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      Your are connected to {{ (typeof bt.device !== 'undefined' && typeof bt.device.name !== 'undefined') ? bt.device.name  : 'NOT CONNECTED'   }}
    </p>
    <p>

      Your device battery level = {{battery_level}}%

    </p>
    <svg id="compass-svg" width="300" height="300">
      <defs>
        <filter id="f2" x="0" y="0" width="200%" height="200%">
          <feOffset result="offOut" in="SourceGraphic" dx="20" dy="20" />
          <feGaussianBlur result="blurOut" in="offOut" stdDeviation="10" />
          <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
        </filter>
      </defs>
      <circle id="main-circle" cx="150" cy="75" r="50" stroke="red" fill="transparent"/>
      <circle id="compass-circle" :cx="x" :cy="y" r="4" fill="yellow" stroke="blue" filter="url(#f2)" v-if="x" > 
        <animateTransform
          attributeName="transform"
          attributeType="XML"
          type="scale"
          values="1; 2; 1; 0; 1" 
          repeatCount="indefinite"
          additive="sum" />
      </circle>
    
    </svg>
    <button @click="getDevices">Scan BT Devices</button>
  </div>
</template>

<script>
import { BluetoothManager } from '@mastashake08/web-iot'
export default {
  name: 'Bluetooth',
  props: {
    msg: String
  },
  data () {
    return {
      bt: {},
      btDevice: null,
      battery_level: 0,
      ad: {},
      deltas : [[{
          distance: 0,
          timestamp: Date.now()
        },{
          distance: 0,
          timestamp: Date.now()
        }],[{
          distance: 0,
          timestamp: Date.now()
        },{
          distance: 0,
          timestamp: Date.now()
        }]],
        point: {},
        pointSize: 4,
        x: 150,
        y: 25

    }
  },
  mounted () {
 
  },
  methods: {
    async getDevices () {
      try {
        this.bt = new BluetoothManager()
        this.btDevice = await this.bt.getDevices({
          acceptAllDevices: true,
          acceptAllAdvertisements: true
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
      
        //this.ctx.restore()
        //this.ctx.clearRect(0,0,300,300)
        //const font_size = "20px";
        const radius = 50;
        const center_x = 150;
        const center_y = 150;
        this.ad = event
        console.log(event)
        console.log('Advertisement received.');
        console.log('  Device Name: ' + event.device.name);
        console.log('  Device ID: ' + event.device.id);
        console.log('  RSSI: ' + event.rssi);
        console.log('  TX Power: ' + event.txPower);
        console.log('  UUIDs: ' + event.uuids);
        
        this.deltas[0][0] = this.deltas[0][1]
        this.deltas[0][1] = this.deltas[1][0]
        this.deltas[1][0] = this.deltas[1][1]
        
        
        const dist = 10**((event.txPower - event.rssi)/10**4)
        console.log(dist)
        const packet = {
          distance: dist,
          timestamp: event.timeStamp
        }
        this.deltas[1][1] = packet
        console.log(this.deltas[1][1])
        const x1 = this.deltas[0][0].distance
        const x2 = this.deltas[0][1].distance
        const y1 = this.deltas[1][0].distance
        const y2 = this.deltas[1][1].distance
        const a0 = this.deltas[0][0].timestamp - this.deltas[0][1].timestamp
        const a1 = this.deltas[1][0].timestamp - this.deltas[1][1].timestamp
        const vX = (x2-x1)/(a0)
        const vY = (y2-y1)/(a1)
        const angle = Math.atan(vY/vX)
        
        this.x = center_x + radius * Math.cos(-angle);
        this.y = center_y + radius * Math.sin(-angle);
  
        
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
