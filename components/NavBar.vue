<template>
  <header
    class="fixed top-0 left-0 right-0 z-50 w-full py-5 bg-white bg-opacity-75 shadow-sm backdrop-blur-lg"
  >
    <Container class="flex items-center justify-between">
      <NuxtLink to="/" class="text-2xl font-medium">Salescom</NuxtLink>
      <nav>
        <NuxtLink to="/login">Login</NuxtLink>
      </nav>
    </Container>
  </header>
</template>

<script>
export default {};
</script>

<style>
</style>