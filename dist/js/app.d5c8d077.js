(function(){"use strict";var t={510:function(t,e,s){var a=s(7195),i=function(){var t=this,e=t._self._c;return e("div",{attrs:{id:"app"}},[e("div",{attrs:{id:"nav"}},[e("router-link",{attrs:{to:"/"}},[t._v("Home")]),t._v(" | "),e("router-link",{attrs:{to:"/bluetooth"}},[t._v("Bluetooth")]),t._v(" | "),e("router-link",{attrs:{to:"/serial"}},[t._v("Serial")]),t._v(" | "),e("router-link",{attrs:{to:"/nfc"}},[t._v("NFC")]),t._v(" | "),e("router-link",{attrs:{to:"/usb"}},[t._v("USB")])],1),e("logo-svg"),e("router-view"),t._m(0)],1)},n=[function(){var t=this,e=t._self._c;return e("footer",[t._v(" Powered by "),e("a",{attrs:{href:"https://github.com/mastashake08/web-iot",target:"_blank"}},[t._v("WebIOT")])])}],r=s(1001),o={},l=(0,r.Z)(o,i,n,!1,null,null,null),c=l.exports,d=s(2241),u=function(){var t=this,e=t._self._c;return e("div",{staticClass:"home"},[e("HelloWorld",{attrs:{msg:t.msg}})],1)},h=[],v=function(){var t=this,e=t._self._c;return e("div",{staticClass:"hello"},[e("p",[t._v(" "+t._s(t.msg)+" ")])])},p=[],f={name:"WebIOT",props:{msg:String}},m=f,g=(0,r.Z)(m,v,p,!1,null,"4cdd98c0",null),_=g.exports,b={name:"home-view",components:{HelloWorld:_},data(){return{msg:"This is the WebIOT demo created by Mastashake!\n      This web application is currently only available on Desktop Chrome and Android Mobile!\n      "}}},w=b,y=(0,r.Z)(w,u,h,!1,null,null,null),S=y.exports,D=function(){var t=this,e=t._self._c;return e("div",{staticClass:"bluetooth"},[e("Bluetooth",{attrs:{msg:"Web Bluetooth Example"}})],1)},x=[],C=function(){var t=this,e=t._self._c;return e("div",{staticClass:"hello"},[e("h1",[t._v(t._s(t.msg))]),e("p",[t._v(" Your are connected to "+t._s("undefined"!==typeof t.bt.device&&"undefined"!==typeof t.bt.device.name?t.bt.device.name:"NOT CONNECTED")+" ")]),t.battery_level>0?e("p",[t._v(" Your device battery level = "+t._s(t.battery_level)+"% ")]):t._e(),e("p",[t._v(" Distance: ~"+t._s(this.dist.toFixed(0))+" meters away ")]),t.bt.device?e("svg",{attrs:{id:"compass-svg",width:"300",height:"300"}},[e("defs",[e("linearGradient",{attrs:{id:"cirlceGradient"}},[e("stop",{attrs:{offset:"10%","stop-color":"red"}}),e("stop",{attrs:{offset:"95%","stop-color":"green"}})],1),e("filter",{attrs:{id:"glow"}},[e("feGaussianBlur",{attrs:{stdDeviation:"2",result:"coloredBlur"}}),e("feMerge",[e("feMergeNode",{attrs:{in:"coloredBlur"}}),e("feMergeNode",{attrs:{in:"SourceGraphic"}})],1)],1),e("filter",{attrs:{id:"shadow",width:"1.5",height:"1.5",x:"-.25",y:"-.25"}},[e("feGaussianBlur",{attrs:{in:"SourceAlpha",stdDeviation:"2.5",result:"blur"}}),e("feColorMatrix",{attrs:{result:"bluralpha",type:"matrix",values:"1 0 0 0   0\n             0 1 0 0   0\n             0 0 1 0   0\n             0 0 0 0.4 0 "}}),e("feOffset",{attrs:{in:"bluralpha",dx:"3",dy:"3",result:"offsetBlur"}}),e("feMerge",[e("feMergeNode",{attrs:{in:"offsetBlur"}}),e("feMergeNode",{attrs:{in:"SourceGraphic"}})],1)],1)],1),e("path",{staticStyle:{filter:"url(#shadow)"},attrs:{id:"main-circle",stroke:"gold",fill:"transparent","stroke-width":"10px",d:"M100 150a50 50 0 1 0 100 0a50 50 0 1 0 -100 0"}}),e("circle",{staticStyle:{fill:"transparent","stroke-width":"4",stroke:"url(#cirlceGradient)"},attrs:{id:"compass-circle",cx:t.x,cy:t.y,r:"10"}},[e("animateTransform",{attrs:{attributeName:"transform",attributeType:"XML",type:"rotate",from:`0 ${t.x} ${t.y}`,to:`360 ${t.x} ${t.y}`,dur:"3s",repeatCount:"indefinite"}})],1)]):t._e(),t.scanning?e("button",{on:{click:t.stopScan}},[t._v("Stop Scan")]):e("div",[e("button",{on:{click:t.getDevices}},[t._v("Choose BT Device")]),e("button",{on:{click:t.startScan}},[t._v("Scan BT Devices")])]),e("button",{on:{click:t.toggleAds}},[t._v(t._s(t.showAds?"Hide Ads":"Show Ads"))]),t.showAds?e("div",t._l(t.devices,(function(s,a){return e("li",{key:a},[t._v(" "+t._s(s)+" "+t._s(a)+" ")])})),0):t._e()])},k=[],O=(s(560),s(3337)),B={name:"b-t",props:{msg:String},data(){return{bt:{},showAds:!1,btDevice:null,battery_level:0,scanning:!1,known_devices:[],devices:new Map,deltas:[[{distance:0,timestamp:Date.now()},{distance:0,timestamp:Date.now()}],[{distance:0,timestamp:Date.now()},{distance:0,timestamp:Date.now()}]],point:{},pointSize:4,x:150,y:100,dist:0,options:{name:"bluetooth-le-scan",acceptAllDevices:!0,acceptAllAdvertisements:!0,keepRepeatedDevices:!0}}},mounted(){this.bt=new O.Xs(this.allAdsEvent.bind(this))},methods:{toggleAds(){this.showAds=!this.showAds},allAdsEvent(t){const e={name:t.device.name,id:t.device.id,rssi:t.rssi,tx:t.txPower,uuids:t.uuids,value:t.target.value,device:t.device,serviceData:t.serviceData,manufacturerData:t.manufacturerData};let s=this.devices.get(e.id);const a=this.devices.has(e.id),i=[];i.push(e),a?(s.push(e),this.devices.set(e.id,s)):this.devices.set(e.id,i),t.manufacturerData.forEach(((t,e)=>{console.log("Manufacturer",[e,t])})),t.serviceData.forEach(((t,e)=>{console.log("Service",[e,t])}))},async startScan(){this.devices.length>0&&this.devices.forEach((t=>{try{console.log(t[0].device),t[0].device.watchingAdvertisements=!0}catch{console.error("UH-OH LET US LOOOOOK::::",t)}})),this.known_devices=await this.bt.getDevices(this.options),await this.bt.startLEScan(this.options),this.scanning=!0},stopScan(){this.devices.forEach((t=>{try{t[0].watchingAdvertisements=!1}catch{console.error("UH-OH LET US LOOOOOK::::",t)}})),this.scanning=!1},async getDevices(){const t=this.options;try{this.device=await this.bt.requestDevice(t),await this.bt.connectToServer(),this.startNotifications();try{await this.getBatteryLevel()}catch{console.log("Error")}}catch(e){console.log(e.message)}},startNotifications(){this.bt.device.onadvertisementreceived=t=>{const e=50,s=150,a=150,i={name:t.device.name,id:t.device.id,rssi:t.rssi,tx:t.txPower,uuids:t.uuids,value:t.target.value,device:t.device,serviceData:t.serviceData,manufacturerData:t.manufacturerData};let n=this.devices.get(i.id);const r=this.devices.has(i.id),o=[];o.push(i),r?(n.push(i),this.devices.set(i.id,n)):this.devices.set(i.id,o),this.deltas[0][0]=this.deltas[0][1],this.deltas[0][1]=this.deltas[1][0],this.deltas[1][0]=this.deltas[1][1],this.dist=10**((t.txPower-t.rssi)/1e4);const l={distance:this.dist,timestamp:t.timeStamp};this.deltas[1][1]=l,console.log(this.deltas);const c=this.deltas[0][0].distance,d=this.deltas[0][1].distance,u=this.deltas[1][0].distance,h=this.deltas[1][1].distance,v=this.deltas[0][0].timestamp-this.deltas[0][1].timestamp,p=this.deltas[1][0].timestamp-this.deltas[1][1].timestamp,f=(d-c)/v,m=(h-u)/p,g=Math.atan(m/f);isNaN(g)||(this.x=s+e*Math.cos(-g),this.y=a+e*Math.sin(-g),console.log([g,this.x,this.y]),t.manufacturerData.forEach(((t,e)=>{console.log("Manufacturer",[e,t])})),t.serviceData.forEach(((t,e)=>{console.log("Service",[e,t])})))},this.deltas=[[{distance:0,timestamp:Date.now()},{distance:0,timestamp:Date.now()}],[{distance:0,timestamp:Date.now()},{distance:0,timestamp:Date.now()}]],this.bt.device.watchAdvertisements(),console.log('Watching advertisements from "'+this.bt.device.name+'"...')},async getBatteryLevel(){const t=await this.bt.getServices();await this.bt.getService(t[0].uuid);const e=await this.bt.getCharacteristics();console.log(e),e.forEach((t=>{t.oncharacteristicvaluechanged=t=>{this.battery_level=t.target.value.getUint8(0),console.log(`Battery percentage is ${t.target.value.getUint8(0)}`)}})),console.log("SERVICES::",await this.bt.getCharacteristic(e[0].uuid));const s=await this.bt.getValue();console.log(`Battery percentage is ${s.getUint8(0)}`),this.battery_level=s.getUint8(0)}},computed:{getDeviceName(){return console.log("device"in this.bt),this.bt.device?this.bt.device.name:"DEVICE NOT CONNECTED"},ads(){return this.devices.forEach(((t,e)=>{console.log(`m[${e}] = ${t}`)}))}}},E=B,A=(0,r.Z)(E,C,k,!1,null,"559af16c",null),N=A.exports,H={components:{Bluetooth:N}},T=H,M=(0,r.Z)(T,D,x,!1,null,null,null),Z=M.exports,P=function(){var t=this,e=t._self._c;return e("div",{staticClass:"serial"},[e("serial-component",{attrs:{msg:"Web Serial Example"}})],1)},V=[],U=function(){var t=this,e=t._self._c;return e("div",{staticClass:"hello"},[e("h1",[t._v(t._s(t.msg))]),e("p",[t._v(" "+t._s(t.serial.selectedPort)+" ")]),e("button",{on:{click:t.getPorts}},[t._v("Scan Serial Ports")])])},F=[],G={props:{msg:String},data(){return{serial:{},port:{}}},methods:{async writeData(){const t=new TextEncoder;await this.serial.writeData(t.encode("AT*AGAD=020a04110701d7e9014ff344e7838fe226b9e15624,1")),console.log(await this.serial.readData())},async getPorts(){this.serial=new O.CW,this.port=await this.serial.requestPort({allowedBluetoothServiceClassIds:["0000110f-0000-1000-8000-00805f9b34fb"]}),await this.serial.openPort({baudRate:9600}),console.log(await this.port.getInfo()),console.log(await this.port.getSignals()),console.log(await this.port.setSignals({dataTerminalReady:!0})),console.log(await this.port.getSignals()),await this.writeData()}},computed:{}},W=G,R=(0,r.Z)(W,U,F,!1,null,"4f15bd9d",null),$=R.exports,L={components:{SerialComponent:$}},j=L,I=(0,r.Z)(j,P,V,!1,null,null,null),q=I.exports,K=function(){var t=this,e=t._self._c;return e("div",{staticClass:"serial"},[e("NFC",{attrs:{msg:"Web NFC Example"}})],1)},X=[],Y=function(){var t=this,e=t._self._c;return e("div",{staticClass:"hello"},[e("h1",[t._v(t._s(t.msg))]),e("p",[t._v(" "+t._s(t.nfcData)+" ")]),e("button",{on:{click:t.readNFC}},[t._v("Read NFC Data")])])},z=[],J={name:"NFC",props:{msg:String},data(){return{nfc:null,nfcData:null}},mounted(){},methods:{readNFC(){this.nfc=new O.Mh,this.nfc.readNFCData(this.onnfcdataread)},onnfcdataread(t){this.nfcData=t}},computed:{}},Q=J,tt=(0,r.Z)(Q,Y,z,!1,null,"28d5f0cf",null),et=tt.exports,st={components:{NFC:et}},at=st,it=(0,r.Z)(at,K,X,!1,null,null,null),nt=it.exports,rt=function(){var t=this,e=t._self._c;return e("div",{staticClass:"usb"},[e("USB",{attrs:{msg:"Web USB Example"}})],1)},ot=[],lt=function(){var t=this,e=t._self._c;return e("div",{staticClass:"hello"},[e("h1",[t._v(t._s(t.msg))]),e("button",{on:{click:t.getUSBDevices}},[t._v("Scan USB Devices")])])},ct=[],dt={name:"USB",props:{msg:String},data(){return{usb:{}}},mounted(){},methods:{async getUSBDevices(){const t={filters:[]};this.usb=new O.$e,console.log("Devices::",await this.usb.requestDevice(t))}},computed:{}},ut=dt,ht=(0,r.Z)(ut,lt,ct,!1,null,"3ffd29a9",null),vt=ht.exports,pt={components:{USB:vt}},ft=pt,mt=(0,r.Z)(ft,rt,ot,!1,null,null,null),gt=mt.exports;a.ZP.use(d.ZP);const _t=[{path:"/",name:"Home",component:S},{path:"/bluetooth",name:"Bluetooth",component:Z},{path:"/serial",name:"Serial",component:q},{path:"/nfc",name:"NFC",component:nt},{path:"/usb",name:"USB",component:gt}],bt=new d.ZP({mode:"history",base:"/web-iot-example/",routes:_t});var wt=bt,yt=function(){var t=this,e=t._self._c;return e("svg",{attrs:{fill:"#00cc63",width:"150px",height:"150px",viewBox:"-3.2 -3.2 38.40 38.40",id:"icon",xmlns:"http://www.w3.org/2000/svg",stroke:"#00cc63","stroke-width":"0.00032",transform:"matrix(1, 0, 0, 1, 0, 0)rotate(0)"}},[e("g",{attrs:{id:"SVGRepo_bgCarrier","stroke-width":"0",transform:"translate(0,0), scale(1)"}},[e("rect",{attrs:{x:"-3.2",y:"-3.2",width:"38.40",height:"38.40",rx:"19.2",fill:"#000000",strokewidth:"0"}})]),e("g",{attrs:{id:"SVGRepo_tracerCarrier","stroke-linecap":"round","stroke-linejoin":"round",stroke:"#CCCCCC","stroke-width":"0.256"}}),e("g",{attrs:{id:"SVGRepo_iconCarrier"}},[e("defs"),e("title",[t._v("iot--platform")]),e("path",{attrs:{d:"M30,19H26V15H24v9H8V8l9-.0009V6H13V2H11V6H8A2.002,2.002,0,0,0,6,8v3H2v2H6v6H2v2H6v3a2.0023,2.0023,0,0,0,2,2h3v4h2V26h6v4h2V26h3a2.0027,2.0027,0,0,0,2-2V21h4Z"}}),e("path",{attrs:{d:"M21,21H11V11H21Zm-8-2h6V13H13Z"}}),e("path",{attrs:{d:"M31,13H29A10.0117,10.0117,0,0,0,19,3V1A12.0131,12.0131,0,0,1,31,13Z"}}),e("path",{attrs:{d:"M26,13H24a5.0059,5.0059,0,0,0-5-5V6A7.0085,7.0085,0,0,1,26,13Z"}}),e("rect",{staticClass:"cls-1",attrs:{id:"_Transparent_Rectangle_","data-name":"<Transparent Rectangle>",width:"32",height:"32"}})])])},St=[],Dt={},xt=Dt,Ct=(0,r.Z)(xt,yt,St,!1,null,null,null),kt=Ct.exports;a.ZP.config.productionTip=!1,a.ZP.component("logo-svg",kt),new a.ZP({router:wt,render:t=>t(c)}).$mount("#app")}},e={};function s(a){var i=e[a];if(void 0!==i)return i.exports;var n=e[a]={exports:{}};return t[a].call(n.exports,n,n.exports,s),n.exports}s.m=t,function(){var t=[];s.O=function(e,a,i,n){if(!a){var r=1/0;for(d=0;d<t.length;d++){a=t[d][0],i=t[d][1],n=t[d][2];for(var o=!0,l=0;l<a.length;l++)(!1&n||r>=n)&&Object.keys(s.O).every((function(t){return s.O[t](a[l])}))?a.splice(l--,1):(o=!1,n<r&&(r=n));if(o){t.splice(d--,1);var c=i();void 0!==c&&(e=c)}}return e}n=n||0;for(var d=t.length;d>0&&t[d-1][2]>n;d--)t[d]=t[d-1];t[d]=[a,i,n]}}(),function(){s.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return s.d(e,{a:e}),e}}(),function(){s.d=function(t,e){for(var a in e)s.o(e,a)&&!s.o(t,a)&&Object.defineProperty(t,a,{enumerable:!0,get:e[a]})}}(),function(){s.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)}}(),function(){var t={143:0};s.O.j=function(e){return 0===t[e]};var e=function(e,a){var i,n,r=a[0],o=a[1],l=a[2],c=0;if(r.some((function(e){return 0!==t[e]}))){for(i in o)s.o(o,i)&&(s.m[i]=o[i]);if(l)var d=l(s)}for(e&&e(a);c<r.length;c++)n=r[c],s.o(t,n)&&t[n]&&t[n][0](),t[n]=0;return s.O(d)},a=self["webpackChunkweb_iot_example"]=self["webpackChunkweb_iot_example"]||[];a.forEach(e.bind(null,0)),a.push=e.bind(null,a.push.bind(a))}();var a=s.O(void 0,[998],(function(){return s(510)}));a=s.O(a)})();
//# sourceMappingURL=app.d5c8d077.js.map