<template>
  <div>
    <nav class="navi">
      <router-link class="center" to="/">DATE's</router-link>
      <a id="whitepaper" :href="'https://dates-whitepaper.netlify.app/index.html'">백서</a>
    </nav>
    <router-view />
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {}
  },
  setup() {},
  created() {},
  mounted() {},
  methods: {}
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  color: #f2bc07;
  font-weight: bold;
  font-weight: bold;
  font-size: x-large;
}

a:link {
  text-decoration: none;
}

.navi {
  display: flex;
  justify-content: space-between;
}

.hoveringPointer {
  cursor: pointer;
}

#footer {
  color: gray;
  background-color: #f2bc07;
}

#wallet {
  display: flex;
}

#walletAddress {
  margin-right: 10px;
}
#whitepaper {
  font-size: medium;
}
</style>
