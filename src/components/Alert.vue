<template>
    <div v-if="alert" class="container justify-content-center">
        <div class="row m-3">
            <div class="alert alert-dismissable" :class="alert.type">
                {{alert.message}}
                <button @click="alertStore.clear()" class="btn btn-link close">&times;</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useAlertStore } from '@/stores';

const alertStore = useAlertStore();
const { alert } = storeToRefs(alertStore);
</script>