<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/bluetooth">Bluetooth</router-link> |
      <router-link to="/serial">Serial</router-link> |
      <router-link to="/nfc">NFC</router-link> |
      <router-link to="/usb">USB</router-link>
    </div>
    <logo-svg/>
    <router-view/>
    <footer>
    Powered by <a href="https://github.com/mastashake08/web-iot" target="_blank">WebIOT</a>
    </footer>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

footer {
  margin-top: 10px;
}
</style>
