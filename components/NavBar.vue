<template>
  <header
    class="fixed top-0 left-0 right-0 z-50 w-full py-4 bg-white bg-opacity-75 shadow-sm backdrop-blur-lg"
  >
    <Container class="flex items-center justify-between">
      <NuxtLink to="/" class="flex items-center gap-2 text-xl font-medium">
        <span>Salescom</span>
        <span class="px-1 text-sm border rounded-md border-primary-500 text-primary-500">2.0</span>
      </NuxtLink>
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