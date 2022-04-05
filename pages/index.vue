<template>
  <div class="flex items-center justify-center h-screen py-20">
    <Container>
      <div class="text-4xl">
        Welcome to
        <span class="font-semibold text-teal-500">Salescom 2.0</span>
      </div>
      <div class="flex justify-center mt-5">
        <NuxtLink to="/list" class=" btn-primary">Get Started</NuxtLink>
      </div>
    </Container>
  </div>
</template>

<script>
export default {
  name: "IndexPage",
};
</script>
