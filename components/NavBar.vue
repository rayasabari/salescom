<template>
  <header
    class="fixed top-0 left-0 right-0 z-50 w-full py-4 bg-white bg-opacity-75 shadow backdrop-blur-lg"
  >
    <Container class="flex items-center justify-between">
      <div class="flex items-center gap-6">
        <NuxtLink to="/" class="flex items-center gap-2 text-xl font-medium">
          <span>Salescom</span>
          <span class="px-1 text-sm border rounded-md border-primary-500 text-primary-500">2.0</span>
        </NuxtLink>
        <template v-if="$auth.loggedIn">
          <ul class="flex gap-4 text-sm text-gray-400">
            <li>
              <NuxtLink active-class="text-primary-500" to="/dashboard">Dashboard</NuxtLink>
            </li>
          </ul>
        </template>
      </div>
      <nav class="font-medium">
        <template v-if="$auth.loggedIn">
          <ul class="flex gap-4 text-sm text-gray-400">
            <li>
              <a href="#" @click.prevent="">{{$auth.user.name}}</a>
            </li>
            <li>
              <a href="#" @click.prevent="logout">Logout</a>
            </li>
          </ul>
        </template>
        <template v-else>
          <NuxtLink to="/login">Login</NuxtLink>
        </template>
      </nav>
    </Container>
  </header>
</template>

<script>
export default {
  name: "NavBar",
  methods: {
    async logout() {
      try {
        await this.$auth.logout();
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style>
</style>