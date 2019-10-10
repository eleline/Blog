<template>
  <div>
    <header class="header">
      <nuxt-link to="/">
        <h1 class="logo">Logo</h1>
      </nuxt-link>
    </header>
    <div class="container">
      <main class="main">
        <nuxt />
      </main>
      <div class="side">サイド要素</div>
    </div>
    <footer class="footer">
      <p class="copyright">©eleline 2019</p>
    </footer>
  </div>
</template>

<style lang="scss">
.container {
  display: flex;
  min-height: 90vh;
}
</style>
