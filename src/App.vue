<script setup>
import useDeviceOrientation from "@/use/useDeviceOrientation";
import { onBeforeUnmount, onMounted, onUnmounted, ref } from "vue";

const {
    orientation,
    orientationEventNotGranted,
    requestDeviceOrientationPermission,
    unregisterDeviceOrientationListener,
} = useDeviceOrientation();

onMounted(() => {
    requestDeviceOrientationPermission();
});

onBeforeUnmount(() => {
    unregisterDeviceOrientationListener();
});
</script>

<template>
    <div class="p-8 dark:bg-gray-800 rounded text-black dark:text-white shadow-xl">
        <template v-if="!orientationEventNotGranted">
            <span class="pb-4 text-xl block">Device is pointing</span>
            <div class="h-[64px] w-full">
                <span class="pt-2 text-4xl bold block text-center text-shadow"
                    >{{ orientation?.alpha?.toFixed(0) }}°</span
                >
            </div>
        </template>
        <template v-else>
            <button
                @click.prevent="requestDeviceOrientationPermission"
                class="pt-2 px-4 text-xl block bg-gray-700 rounded"
            >
                Request orientation permission from device
            </button>
        </template>
    </div>
    <pre class="overflow-x-scroll pt-8 pb-2 w-full">
debug:&nbsp;{{ JSON.stringify(orientation) }}</pre
    >
</template>
