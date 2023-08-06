<template>
  <div class="app-container">
    <Nav />
    <Alert />
    <div id="main">
      <router-view />
    </div>  
  </div>
</template>

<script setup>
import { Nav, Alert } from '@/components';
</script>

<style>
@import '@/assets/style.css';
</style>
