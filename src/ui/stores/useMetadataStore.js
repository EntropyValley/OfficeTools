import { ref } from "vue";
import { defineStore } from "pinia";

const useMetadataStore = defineStore("metadata", () => {
    const populated = ref(false);
    const platform = ref(null);

    const populate = async () => {
        if (!populated.value) {
            const metadata = await window.electronAPI.requestSystemMetadata();
            platform.value = metadata.platform;
            populated.value = true;
        }
    }

    return {
        populated,
        platform,
        populate
    }
});

export default useMetadataStore;