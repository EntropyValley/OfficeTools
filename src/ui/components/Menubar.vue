<script setup>
    import { onBeforeMount } from 'vue';
    import { storeToRefs } from 'pinia';
    import useMetadataStore from '../stores/useMetadataStore';

    const metadataStore = useMetadataStore();
    const { platform } = storeToRefs(metadataStore);

    onBeforeMount(async () => {
        await (metadataStore.populate());
    });
</script>

<template>
    <div class="menubar">
    </div>
</template>

<style scoped>
    .menubar {
        position: fixed;
        top: 0;
        left: 0;
        height: 40px;
        width: 100%;
        background-color: #002E5D;
        -webkit-app-region: drag;
    }
</style>