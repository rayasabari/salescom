<template>
  <div class="flex items-center min-h-screen bg-gray-50">
    <div class="container flex w-4/12 mx-auto">
      <div class="w-full bg-white rounded-lg shadow">
        <form @submit.prevent="login">
          <div class="p-5">
            <div class="mb-4">
              <label for="email" class="block mb-1 text-gray-400">Email</label>
              <input type="email" id="email" name="email" class="rhr-input" v-model="form.email" />
            </div>
            <div class="mb-4">
              <label for="passowrd" class="block mb-1 text-gray-400">Password</label>
              <input
                type="password"
                id="password"
                name="passowrd"
                class="rhr-input"
                v-model="form.password"
              />
            </div>
          </div>
          <div class="px-5 pb-5">
            <div class="flex justify-end">
              <button type="submit" class="btn-primary">Login</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
    };
  },
  mounted() {},
  methods: {
    login() {
      this.$auth.loginWith("laravelSanctum", {
        data: {
          email: "admin@rhr.co.id",
          password: "123123",
        },
      });
    },
  },
};
</script>

<style>
</style>