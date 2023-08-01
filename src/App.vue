<template>
  <div class="app-container">
    <Nav />
    <div class="container pt-4 pb-4">
      <router-view/>
    </div>
  </div>
</template>

<script setup>
import { Nav } from '@/components';
</script>

<style>
@import './assets/base.css';
</style>
