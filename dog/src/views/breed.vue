<template>  
  <div style="display: flex">
    <div class="breed">
      <div v-for="(resultado, index) in resultados" :key="index">
        <app-card largura="520px">
          {{resultado}} &emsp;<button @click="marcaFavorito(resultado)">&#9829;</button>
          <br/><br/>
        <img :src="resultado" width="500" alt="" />
        </app-card>
      </div>
    </div>
    <app-card class="favoritos"  cor="grey">
      <p>FAVORITOS</p>
      <div v-for="(favorito, index) in $store.state.favoritos" :key="index">
        <app-card cor="white" >
          <img :src="favorito" width="90" alt="" @click="desmarcaFavorito(index)">
        </app-card>
      </div>
    </app-card>
  </div>
</template>

<script>
    import axios from "axios"
    import appCard from "@/components/app-card.vue"
    import {bus} from "../main"

    export default {
        components: {
            appCard
        },
        data() {
            return {
                resultados: "",
                pesquisa: "",
                favoritos: []
            }
        },
        methods: {
          desmarcaFavorito (index){
            this.$store.commit("desmarcaFavorito",index)
          },
            marcaFavorito(item) {
              this.$store.commit("marcaFavorito", item)
            },
            carregaInfo(query) {
                axios.get("https://dog.ceo/api/breed/" + query + "/images")
                    .then(
                        res => {
                            this.resultados = res.data.message
                                // console.log(this.resultados)
                        }
                    )
            },
        },
        created() {
            this.carregaInfo(this.$route.params.id)
            console.log(this.$route.params.id)
        }
    };
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
    
    .breed {
        display: flex;
        flex-flow: row wrap;
    }
    
    .favoritos {
        max-width: 130px;
        font-weight: 700;
        color: white;
    }
</style>