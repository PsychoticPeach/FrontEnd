<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <input type="text" @keyup="carregaInfo(pesquisa)" v-model="pesquisa">
    <button @click="carregaInfo(pesquisa)">Pesquisar</button>
    <div v-for="(resultado, index) in resultados" :key="index">
      <h3>{{resutlado}}</h3>
      <img :src="resultado" alt="">
    </div>
  </div>
</template>

<script>
import axios from "axios"
  export default {
    name: 'HelloWorld',
    props: {
      msg: String
    },
    data(){
      return {
        resultados:"",
        pesquisa:""
      }
    },
    methods:{
      carregaInfo(query){
        axios.get("https://dog.ceo/api/breed/"+query+"/images")
          .then(
            res => {
              this.resultados = res.data.message
              console.log(this.resultados)
            }
          )
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
