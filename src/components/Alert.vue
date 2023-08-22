<template>
    <div v-if="alert" class="container justify-content-center ml-5">
        <div class="row m-3">
            <div class="alert alert-dismissable mx-auto" :class="alert.type">
                {{alert.message}}
                <button @click="alertStore.clear()" class="btn btn-link close" style="float: right">&times;</button>
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