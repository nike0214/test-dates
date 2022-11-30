<template>
  <div>
    <nav class="navi">
      <router-link class="center" to="/">DATE's</router-link>
      <div id="wallet">
        <div id="walletAddress" v-show="isHidden">{{ account }}</div>
        <font-awesome-icon
          :style="hidden"
          class="hoveringPointer"
          @click="connect"
          icon="fa-solid fa-wallet"
        />
      </div>
    </nav>
    <router-view />
  </div>
</template>
<script>
// import { MINT_NFT_CONTRACT, MINT_NFT_ABI } from '../web3.config.js'
export default {
  components: {},
  data() {
    return {
      REACT_APP_BACKEND_URL: 'https://clesson-dev.duckdns.org:8888/api',
      connected: false,
      tokenURIresult: '',
      account: '',
      isHidden: false,
      nonce: 0
    }
  },
  setup() {},
  created() {},
  mounted() {},
  methods: {
    async connect() {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
      this.account = accounts[0]
      this.isHidden = !this.isHidden
      await this.axios
        .get('https://clesson-dev.duckdns.org:8888/users/sign-in', {
          params: { address: this.account }
        })
        .then((response) => {
          const res = response.data
          console.log(res)
          const resdata = res.data
          console.log(resdata)
          this.nonce = parseInt(resdata.nonce)
        })
        .catch((error) => console.log(error))
    }

    // callContract() {
    //   // method for calling the contract method
    //   let web3 = new Web3(window.ethereum)
    //   let contractAddress = MINT_NFT_CONTRACT

    //   let abi = JSON.parse(JSON.stringify(MINT_NFT_ABI))

    //   let contract = new web3.eth.Contract(abi, contractAddress)

    //   contract.methods
    //     .tokenURI(1)
    //     .call()
    //     .then((result) => (this.tokenURIresult = result))
    // }
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
