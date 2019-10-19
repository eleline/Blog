<template>
  <div>
    <header class="header">
      <nuxt-link to="/" class="flex">
        <img class="logo__img" src="~/assets/img/eleline-logo.svg" alt="E" />
        <h1 class="logo">LELINE</h1>
      </nuxt-link>
    </header>
    <div class="body">
      <nuxt />
    </div>
    <footer class="footer">
      <p class="copyright">©eleline 2019</p>
    </footer>
  </div>
</template>

<style lang="scss">
.body {
  display: flex;
}
.logo {
  font-weight: normal;
}
.flex {
  display: flex;
  align-items: center;
}
</style>
