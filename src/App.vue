<template>
  <div>
    <nav class="navi">
      <router-link class="center" to="/">DATE's</router-link>
      <div id="wallet">
        <div id="walletAddress" v-show="isHidden">{{ publicAddress }}</div>
        <font-awesome-icon
          :style="hidden"
          class="hoveringPointer"
          @click="handleClick"
          icon="fa-solid fa-wallet"
        />
      </div>
    </nav>
    <router-view />
    <div>{{ signature }}</div>
  </div>
</template>
<script>
var Web3 = require('web3')

// "Web3.providers.givenProvider" will be set if in an Ethereum supported browser.
var web3 = new Web3(Web3.givenProvider || 'ws://some.local-or-remote.node:8546')

export default {
  components: {},
  data() {
    return {
      connected: false,
      tokenURIresult: '',
      publicAddress: '',
      isHidden: false,
      nonce: 0,
      signature: ''
    }
  },
  setup() {},
  created() {},
  mounted() {},
  methods: {
    async handleClick() {
      this.isHidden = !this.isHidden
      this.publicAddress = await window.ethereum.request({ method: 'eth_requestAccounts' })
      this.publicAddress = this.publicAddress[0]
      // Check if user with current publicAddress is already present on back end
      this.axios
        .get(`${process.env.VUE_APP_BACKEND_URL}/users/sign-in`, {
          params: { address: this.publicAddress }
        })
        .then((response) => {
          const res = response.data
          const resdata = res.data
          this.nonce = parseInt(resdata.nonce)
          this.handleSignMessage(this.publicAddress)
        })
    },
    async handleSignMessage(publicAddress) {
      this.signature = await web3.eth.personal.sign(
        web3.utils.fromUtf8(`I am signing my one-time nonce: ${this.nonce}`),
        publicAddress,
        // 일단 password는 test password! 로 저장
        'test password!'
      )
      this.axios
        .post(`${process.env.VUE_APP_BACKEND_URL}/users/sign-in`, {
          address: publicAddress,
          signature: this.signature
        })
        .then((response) => {
          const res = response.data
          const resdata = res.data
          console.log(resdata)
        })
        .catch((error) => console.log(error))
    }
  }
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
</style>
