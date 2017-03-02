<template>
<div class="main-page">
  <button type="button" name="button" v-on:click="getTotalNum()">获取总数</button>
  <button type="button" name="button" v-on:click="getJoke()">获取具体的</button>
  <input type="text" v-model="page">
  <h1>笑话</h1>
  <ul>
      <li v-for="item in jockList">{{item.jock}}</li>
  </ul>
</div>
</template>

<script>
export default {
  name: 'hello',
  data() {
    return {
      jockList: [],
      totalNumber : 0,
      page:1
    }
  },
  methods: {
    getTotalNum() {
      this.$http.get('http://100.66.162.167:10222/number').then(function(res) {
          this.totalNumber = res.totalNumber;
      }, function(res) {
        // 请求失败处理
        alert(1)
      });
  },
    getJoke() {
      this.$http.get(`http://100.66.162.167:10222/joke?page=${this.page}`).then(function(res) {
          this.jockList = res.body.jockList;
      }, function(res) {
        // 请求失败处理
        alert(1)
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
  width:80%;
  border-radius: 10px;
  margin:0px auto;
  text-align: left;
}

li {
  display: inline-block;
  padding:10px 10px;
  text-align: left;
  box-shadow: 1px 1px 1px 1px #ddd;
  border-radius: 10px;
  margin:10px 0px;

}

a {
  color: #42b983;
}
</style>
