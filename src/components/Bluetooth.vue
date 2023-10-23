<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      Your are connected to {{ (typeof bt.device !== 'undefined' && typeof bt.device.name !== 'undefined') ? bt.device.name  : 'NOT CONNECTED'   }}
    </p>
    <p v-if="battery_level > 0">

      Your device battery level = {{battery_level}}%

    </p>
      <p>
        Distance: ~{{ this.dist.toFixed(0) }} meters away
      </p>
    <svg id="compass-svg" width="300" height="300" v-if="bt.device">
      <defs>
        <linearGradient id="cirlceGradient">
          <stop offset="10%" stop-color="red" />
          <stop offset="95%" stop-color="green" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
          </feMerge>
      </filter>
      <filter id="shadow" width="1.5" height="1.5" x="-.25" y="-.25">
    <feGaussianBlur in="SourceAlpha" stdDeviation="2.5" result="blur"/>
    <feColorMatrix result="bluralpha" type="matrix" values=
            "1 0 0 0   0
             0 1 0 0   0
             0 0 1 0   0
             0 0 0 0.4 0 "/>
    <feOffset in="bluralpha" dx="3" dy="3" result="offsetBlur"/>
    <feMerge>
        <feMergeNode in="offsetBlur"/>
        <feMergeNode in="SourceGraphic"/>
    </feMerge>
</filter>
      </defs>
      <path id="main-circle" stroke="gold" fill="transparent"  stroke-width="10px" style="filter:url(#shadow);" d="M100 150a50 50 0 1 0 100 0a50 50 0 1 0 -100 0" />
      <circle id="compass-circle" :cx="x" :cy="y" r="10"  style="fill: transparent; stroke-width: 4; stroke: url(#cirlceGradient);"  >
        <animateTransform
          attributeName="transform"
          attributeType="XML"
          type="rotate"
          :from="`0 ${x} ${y}`"
          :to="`360 ${x} ${y}`"
          dur="3s"
          repeatCount="indefinite" />

      </circle>     
    </svg>
    <button @click="getDevices">Choose BT Device</button>
    <button @click="startScan">Scan BT Devices</button>
    <p v-if="ad.length > 0">
      {{ ad }}
    </p>
  </div>
</template>

<script>
import { BluetoothManager } from 'web-iot'
export default {
  name: 'b-t',
  props: {
    msg: String
  },
  data () {
    return {
      bt: {},
      btDevice: null,
      battery_level: 0,
      ad: [],
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
        y: 100,
        dist: 0,
        options: {
          acceptAllDevices: true,
          acceptAllAdvertisements: true,
          keepRepeatedDevices: true
          //  filters: [{
          //    services: ["00002a00-0000-1000-8000-00805f9b34fb", "00002a19-0000-1000-8000-00805f9b34fb"],
          //    name: 'Services',
          //    namePrefix: 'WebIOT'
          //  }],
          // optionalServices: ["0000180f-0000-1000-8000-00805f9b34fb"]
        }

    }
  },
  mounted () {
    
    this.bt = new BluetoothManager()
  },
  methods: {
    startScan() {
      console.log(this.bt)
      this.bt.startLEScan(this.options, (event) => {
        const ad = {
          name: event.device.name,
          id: event.device.id,
          rssi: event.rssi,
          tx: event.txPower,
          uuids: event.uuids
        }
        this.ad.push(ad)
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
      })
    },
    async getDevices () {
      const options = this.options
      try {
        this.btDevice = await this.bt.getDevices(options)

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
      
        const radius = 50;
        const center_x = 150;
        const center_y = 150;
        const ad = {
          name: event.device.name,
          id: event.device.id,
          rssi: event.rssi,
          tx: event.txPower,
          uuids: event.uuids
        }
        this.ad.push(ad)
        console.log('Advertisement received.');
        console.log('  Device Name: ' + event.device.name);
        console.log('  Device ID: ' + event.device.id);
        console.log('  RSSI: ' + event.rssi);
        console.log('  TX Power: ' + event.txPower);
        console.log('  UUIDs: ' + event.uuids);
        
        this.deltas[0][0] = this.deltas[0][1]
        this.deltas[0][1] = this.deltas[1][0]
        this.deltas[1][0] = this.deltas[1][1]
        
        
        this.dist = 10**((event.txPower - event.rssi)/10**4)
        const packet = {
          distance: this.dist,
          timestamp: event.timeStamp
        }
        this.deltas[1][1] = packet
        console.log(this.deltas)
        const x1 = this.deltas[0][0].distance
        const x2 = this.deltas[0][1].distance
        const y1 = this.deltas[1][0].distance
        const y2 = this.deltas[1][1].distance
        const a0 = this.deltas[0][0].timestamp - this.deltas[0][1].timestamp
        const a1 = this.deltas[1][0].timestamp - this.deltas[1][1].timestamp
        const vX = (x2-x1)/(a0)
        const vY = (y2-y1)/(a1)
        const angle = Math.atan(vY/vX)
        if(!isNaN(angle)){
          this.x = center_x + radius * Math.cos(-angle);
        this.y = center_y + radius * Math.sin(-angle);
  
        console.log([angle,this.x,this.y])
        event.manufacturerData.forEach((valueDataView, key) => {
          console.log('Manufacturer', [key, valueDataView]);
        });
        event.serviceData.forEach((valueDataView, key) => {
          console.log('Service', [key, valueDataView]);
        });
        }
      };
      this.deltas = [[{
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
        }]]
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

svg {
  text-align: center;
  animation: glow-enter 3s ease-in-out 1;
}

@keyframes glow-animate {
  0% {
    opacity:.25;
  }
  20% {
    opacity: .75;
  }
  80% {
    opacity: 1;
  }
  100% {
    opacity: .25;
  }
}

@keyframes glow-enter {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
#compass-circle {
  animation: glow-animate 5s ease-out infinite;
}
</style>
