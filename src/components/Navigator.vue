<template>
    <nav>
        <div>
            <router-link to="/">Home</router-link> |
            <router-link to="/binding">Binding</router-link>
        </div>
    </nav>
</template>

<style>
nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>