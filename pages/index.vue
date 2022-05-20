<template>
  <div class="flex items-center justify-center min-h-screen py-20 bg-white">
    <Container>
      <div class="flex items-center justify-center gap-3 text-5xl">
        <span class="font-medium">Salescomp</span>
        <span class="px-2 py-1 text-2xl text-white rounded-lg bg-primary-500">2.0</span>
      </div>
      <div
        class="mt-1 text-center text-gray-400 text-md md:text-xl"
      >Standalone and Integrated Working Paper</div>
      <div class="flex justify-center mt-6">
        <NuxtLink to="/dashboard" class="btn-primary-outline">Get Started</NuxtLink>
      </div>
    </Container>
  </div>
</template>

<script>
export default {
  auth: false,
  name: "IndexPage",
};
</script>
