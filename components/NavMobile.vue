<template>
  <div class="fixed z-10 flex items-center w-full bg-white bg-opacity-30 md:hidden backdrop-blur-lg">
    <div class="flex items-end w-full py-8 mt-12 border-b shadow-sm">
      <Container class="flex flex-col items-center justify-between gap-4">
        <template v-if="$auth.loggedIn">
          <ul class="flex gap-4 text-gray-400">
            <li @click="$root.$emit('toggleMenu')">
              <NuxtLink active-class="text-primary-500" to="/dashboard">Dashboard</NuxtLink>
            </li>
          </ul>
        </template>
        <template v-if="$auth.loggedIn">
          <ul class="flex flex-col items-center justify-center gap-5 text-lg text-gray-400">
            <li @click="$root.$emit('toggleMenu')">
              <a href="#" @click.prevent class="font-semibold">{{$auth.user.name}}</a>
            </li>
            <li @click="$root.$emit('toggleMenu')">
              <a
                href="#"
                @click.prevent="$root.$emit('logout')"
                class="btn-primary-outline btn-sm"
              >Logout</a>
            </li>
          </ul>
        </template>
        <template v-else>
          <ul>
            <li @click="$root.$emit('toggleMenu')">
              <NuxtLink to="/login" class="btn-primary btn-sm">Login</NuxtLink>
            </li>
          </ul>
        </template>
      </Container>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavMobile",
};
</script>

<style>
</style>