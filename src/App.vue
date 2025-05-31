<template>
    <div class="wrapper">
        <router-view />
    </div>
</template>

<style>
.wrapper {
  padding: 0 20px 30px;
  background: var(--rose-50);
}
h1 {
  margin-top: 0;
  padding-top: 26px;
}
@media (min-width: 1440px) {
  .wrapper {
    padding: 40px 70px 30px;
  }
}
</style>