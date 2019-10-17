<template>
  <div>
    <header class="header">
      <nuxt-link to="/">
        <h1 class="logo">ELELINE</h1>
      </nuxt-link>
    </header>
    <div class="container">
      <nuxt />
    </div>
    <footer class="footer">
      <p class="copyright">©eleline 2019</p>
    </footer>
  </div>
</template>

<style lang="scss">
.container {
  display: flex;
}
.logo {
  font-family: Quicksand;
}
</style>
