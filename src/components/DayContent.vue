<template>
  <div id="daycont">
    <img id="OwnerImage" :src="imagePath" />
    <div>{{ date }}'s Owner : {{ ownerBeforeMint }}</div>
    <div id="buttonsComp">
      <input id="input" v-model="text" />
      <button id="button" @click="uploadMessage">방명록 남기기</button>
      <button id="button" @click="handleButtonClick">이미지 바꾸기</button>
      <input
        id="button"
        type="file"
        ref="file"
        accept="image/jpeg"
        v-on:change="handleFileUpload"
        hidden
      />
    </div>
    <div>{{ message }}</div>
    <div>{{ JWT.accessToken }}</div>
  </div>
</template>
<script>
var Web3 = require('web3')
// "Web3.providers.givenProvider" will be set if in an Ethereum supported browser.
var web3 = new Web3(Web3.givenProvider || 'ws://some.local-or-remote.node:8546')
// Load the SDK for JavaScript
var AWS = require('aws-sdk')
export default {
  name: 'DayContent',
  components: {},
  data() {
    return {
      account: '',
      ownerBeforeMint: '0xabb0792a9db8718d8c3ddc043a3abbdfd0e542e7',
      pageDates: '',
      pageDay: parseInt(this.$route.params.id),
      imagePath: '',
      nonce: 0,
      text: '',
      date: '',
      message: '댓글이 없습니다',
      publicAddress: '',
      JWT: '',
      signature: ''
    }
  },
  setup() {},
  async created() {
    await this.axios
      .get(`${process.env.VUE_APP_BACKEND_URL}/dates`)
      .then((response) => {
        const res = response.data
        this.pageDates = res.data[this.pageDay - 1]
        this.imagePath = this.pageDates.imgUrl
        this.date = this.pageDates.date
      })
      .catch((error) => console.log(error))

    await this.axios
      .get(`${process.env.VUE_APP_BACKEND_URL}/message/` + this.date)
      .then((response) => {
        const resm = response.data
        // 1번째로 남긴 댓글
        this.message = resm.data.dateMessages[0].message.message
      })
      .catch((error) => console.log(error))
  },
  mounted() {},
  methods: {
    handleButtonClick(events) {
      this.$refs.file.click()
    },
    async handleFileUpload(e) {
      e.preventDefault()
      if (e.target.files) {
        const uploadFile = e.target.files[0]
        const formData = new FormData()
        formData.append('date', this.date)
        formData.append('imgUrl', this.imagePath)
        formData.append('files', uploadFile)
      }
    },
    async getPreSignedUrl(fileName) {
      const s3 = new AWS.S3({
        accessKeyId: process.env.VUE_APP_AWSAccessKeyId,
        secretAccessKey: process.env.VUE_APP_AWSSecretKey,
        region: process.env.VUE_APP_S3BucketRegion
      })

      const params = {
        Bucket: process.env.VUE_APP_AWSBucketName,
        Key: fileName,
        Expires: 60 * 60 * 3
      }

      const signedUrlPut = await s3.getSignedUrlPromise('putObject', params)
      return signedUrlPut
    },
    async uploadImageToS3(presignedUrl, file) {
      // const response = await this.axios.put(presignedUrl)
    },

    // 여기만 신경쓰자
    async uploadMessage() {
      // JWT 받기
      this.publicAddress = await window.ethereum.request({ method: 'eth_requestAccounts' })
      this.publicAddress = this.publicAddress[0]

      this.signature = await web3.eth.personal.sign(
        web3.utils.fromUtf8(`남길 방명록 : ${this.text}`),
        this.publicAddress,
        // 일단 password는 test password! 로 저장
        'test password!'
      )

      await this.axios
        .post(`${process.env.VUE_APP_BACKEND_URL}/users/sign-in`, {
          address: this.publicAddress,
          signature: this.signature
        })
        .then((response) => {
          const res = response.data
          this.JWT = res.data
        })
        .catch((error) => {
          console.log(error)
        })

      // 메세지 보내기
      await this.axios
        .post(
          `${process.env.VUE_APP_BACKEND_URL}/message`,
          {
            message: this.text,
            date: this.date
          },
          {
            headers: {
              Authorization: `Bearer ${this.JWT.accessToken}`
            }
          }
        )
        .then((response) => {
          console.log(response)
        })
        .catch((error) => {
          console.log(error)
          alert('더 이상 방명록을 작성할 수 없습니다.')
        })
    },
    async login() {
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
          this.axios.post(`${process.env.VUE_APP_BACKEND_URL}/users/sign-in`, {
            address: this.publicAddress,
            signature: this.signature
          })
          this.handleSignMessage(this.publicAddress)
        })
    },
    async handleSignMessage(publicAddress) {
      this.signature = await web3.eth.personal.sign(
        web3.utils.fromUtf8(`남길 방명록 : ${this.text}`),
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
          this.JWT = response
        })
        .catch((error) => {
          alert('더 이상 방명록을 작성할 수 없습니다.')
          console.log(error)
        })
    }
  }
}
</script>
<style scoped>
#OwnerImage {
  border: solid;
  height: 60vh;
  margin: 10px;
  padding: 5px;
}
#buttonsComp {
  display: flex;
  justify-content: right;
  padding: 10px;
}
#button {
  cursor: pointer;
  height: 30px;
  margin: 5px;
  border: none;
  border-radius: 5px;
  background-color: #f0b90b;
  font-weight: bold;
  color: #1e2329;
}
#input {
  height: 20px;
  align-self: center;
}
</style>
