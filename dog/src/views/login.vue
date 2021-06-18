<template>
    <div class="formulario">
        <h3>:: Log in ::</h3>
        <form @submit.prevent="submit">
            <span>Email:</span>
            <input type="email" v-model="email">
            <br>
            <span>Senha:</span>
            <input type="password" v-model="password">
            <br>
            <button>Registar</button>
        </form>
    </div>
</template>

<script>
import axios from "axios"
export default {
    data(){
        return {
            email: "",
            password: ""
        }
    },
    methods:{
        submit(){
            axios.post("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyArkJ5vtihQ4QALldr1UycPmr8oAi7P_d4",{
                email: this.email,
                password: this.password,
                returnSecureToken: true
            })
                .then(
                    res => this.$store.commit("setUser" , res.data)
                )
                .catch(
                    res => console.log(res)
                )
        }
    }
}
</script>

<style>
.form{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
</style>
