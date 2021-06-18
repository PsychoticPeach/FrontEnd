<template>
    <div class="app-card" :style="{'background-color':cor,'width':largura}">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "appCard",
        props: {
            cor:String,
            largura: {
                default:"100%",
                type:String
            }
        }
    }
</script>

<style>
.app-card{
    box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.25);
    padding: 10px;
    margin: 10px;
}
</style>