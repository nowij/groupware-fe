<template>
    <nav>
        <div>
            <router-link to="/">Home</router-link> |
            <router-link to="/binding">마이페이지</router-link> | 
            <router-link to="/employee/list">정보조회</router-link> | 
            <router-link to="/b">게시판</router-link> | 
            <router-link to="/c">전자결재</router-link>
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