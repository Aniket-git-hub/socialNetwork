<template>
  <section
    class="w-full h-screen flex justify-center content-center"
  >
    <form
      @submit.prevent="login"
      ref="loginForm"
      class="rounded bg-white w-fit h-fit p-6 shadow-md"
    >
      <h1 class="text-2xl mb-4">Social Network | Login</h1>

      <div class="mb-4">
        <label for="email" class="block text-gray-700 text-sm font-bold mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          v-model="email"
          required
          class="w-full border border-gray-300 rounded px-2 py-1"
        />
      </div>
      <div class="mb-4">
        <label
          for="password"
          class="block text-gray-700 text-sm font-bold mb-2"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          v-model="password"
          required
          class="w-full border border-gray-300 rounded px-2 py-1"
        />
      </div>
      <div class="mt-4 mb-2 flex justify-center">
        <button
          type="submit"
          name="submit"
          class="btn-submit"
          :disabled="loading"
        >
          <span v-if="!loading">Login</span>
          <TheSpinner v-else text="Please wait..."></TheSpinner>
        </button>
      </div>
      <p>
        Don't have account?
        <router-link class="text-blue-600" to="/create-account"
          >Create Account</router-link
        >
      </p>
    </form>
    <TheAlertSnackbar ref="alertSnackbar" />
  </section>
</template>

<script>
import TheSpinner from "../components/utils/TheSpinner.vue";
import TheAlertSnackbar from "../components/utils/TheAlertSnackbar.vue";
export default {
  name: "LoginView",
  data() {
    return {
      email: "",
      password: "",
      loading: false,
    };
  },
  methods: {
    async login() {
      try {
        this.loading = true;
        const user = {
          email: this.email,
          password: this.password,
        };
        await this.$store.dispatch("login", user)
        this.clearInputs();
        this.loading = false;
        this.$refs.alertSnackbar.show("success", "Login Successful");
        this.$router.push("/");
      } catch (error) {
        this.loading = false;
        this.clearInputs();
        this.$refs.alertSnackbar.show("error", error.response.data.message);  
      }

    },
    clearInputs() {
      this.email = "";
      this.password = "";
    },
  },
  components: { TheSpinner, TheAlertSnackbar },
};
</script>

<style></style>
