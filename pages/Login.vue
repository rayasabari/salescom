<template>
  <div class="flex items-center min-h-screen bg-slate-100">
    <Container class="flex justify-center">
      <div
        class="w-full px-4 bg-white rounded-lg shadow sm:px-0 md:w-6/12 sm:w-6/12 2xl:w-3/12 lg:w-4/12"
      >
        <form @submit.prevent="login">
          <div class="p-2 md:p-5">
            <div class="flex flex-col items-center justify-center mt-2 mb-5 md:mb-6 md:mt-1">
              <h2 class="mb-1 text-xl font-semibold">Login</h2>
              <p class="text-sm text-gray-400">with your registered RIS account</p>
            </div>
            <div class="mb-4">
              <label for="email" class="rhr-label">Email</label>
              <input type="email" id="email" name="email" class="rhr-input" v-model="form.email" />
              <transition name="fade">
                <span class="mt-1 text-xs text-rose-400" v-if="errors.email">{{errors.email[0]}}</span>
              </transition>
            </div>
            <div class="mb-4">
              <label for="passowrd" class="rhr-label">Password</label>
              <input
                type="password"
                id="password"
                name="passowrd"
                class="rhr-input"
                v-model="form.password"
              />
              <transition name="fade">
                <span
                  class="mt-1 text-xs text-rose-400"
                  v-if="errors.password"
                >{{errors.password[0]}}</span>
              </transition>
            </div>
          </div>
          <div class="px-5 pb-5">
            <div class="flex justify-end">
              <button type="submit" class="btn-primary">Continue</button>
            </div>
          </div>
        </form>
      </div>
    </Container>
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
      errors: [],
    };
  },
  mounted() {},
  methods: {
    login() {
      this.$auth
        .loginWith("laravelSanctum", {
          data: this.form,
        })
        .then((response) => {
          // console.log(response);
        })
        .catch((e) => {
          // console.log(e.response);
          this.errors = e.response.data.errors;
        });
    },
  },
};
</script>

<style>
</style>