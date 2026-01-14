<script setup>
    import Menubar from './Menubar.vue';
    import Sidebar from './Sidebar.vue';
</script>

<template>
    <Menubar/>
    <Sidebar/>
</template>

<style>
    * {
        box-sizing: border-box;
    }

    body, html {
        width: 100%;
        min-height: 100vh;
        padding: 0;
        margin: 0;
        background-color: #d6d6d6;
    }
</style>