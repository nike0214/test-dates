<template>
  <div id="daycont">
    <img id="OwnerImage" :src="imagePath" />
    <div>{{ date }}'s Owner : {{ ownerBeforeMint }}</div>
    <div id="buttonsComp">
      {{ text }}
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
  </div>
</template>
<script>
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
      text: '',
      date: '',
      message: '댓글이 없습니다'
    }
  },
  setup() {},
  async created() {
    await this.axios
      .get('https://clesson-dev.duckdns.org:8888/dates')
      .then((response) => {
        const res = response.data
        this.pageDates = res.data[this.pageDay - 1]
        this.imagePath = this.pageDates.imgUrl
        this.date = this.pageDates.date
      })
      .catch((error) => console.log(error))

    await this.axios
      .get('https://clesson-dev.duckdns.org:8888/message/' + this.date)
      .then((response) => {
        const resm = response.data
        console.log(resm)
        this.message = resm.data.dateMessages[0]
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
        console.log(formData)
        // await this.axios('https://clesson-dev.duckdns.org:8888/dates/image', formData)
      }
    },
    async uploadMessage() {
      await this.axios
        .post('https://clesson-dev.duckdns.org:8888/message', {
          message: this.text,
          date: this.date
        })
        .then((response) => {
          console.log(response)
        })
        .catch((error) => console.log(error))
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
