<template>
  <div>
    <DarkModeSwitcher />
    <!-- <Dashboard></Dashboard> -->

    <div class="container">
      <div class="block xl:grid grid-cols-2 gap-4">
        <!-- BEGIN: Login Info -->
        <div class="hidden xl:flex flex-col min-h-screen">
          <a href="" class="-intro-x flex items-center pt-5">
            <!-- <img
              alt="unreal-capital"
              style="margin-left: 4rem"
              class="w-64 h-full"
              src="@/assets/images/uc/uc-light.png"
            /> -->
          </a>
          <div class="my-auto">
            <img
              alt="unreal-capital"
              class="
                -intro-x
                opacity-5
                m-auto
                ml-20
                lg:w-3/5
                xl:w-4/5 xl:-ml-24 xl:-mt-12
                globe__spin
              "
              src="@/assets/images/uc/globe-removebg-preview.png"
            />
          </div>
        </div>
        <!-- END: Login Info -->
        <!-- BEGIN: Login Form -->
        <div
          class="h-screen xl:h-auto flex flex-col py-5 xl:py-0 my-10 xl:my-0"
        >
          <a href="" class="logo -intro-x lg:hidden">
            <img
              alt="unreal-capital"
              class="logo__image w-32 mx-auto"
              src="@/assets/images/uc/uc-light.png"
            />
          </a>
          <div
            class="
              my-12
              lg:my-auto
              mx-auto
              bg-white
              dark:bg-darkmode-600
              xl:bg-transparent
              px-5
              sm:px-8
              py-8
              xl:p-0
              rounded-md
              shadow-md
              xl:shadow-none
              w-full
              sm:w-3/4
              md:w-2/4
              xl:w-8/12
              2xl:w-9/12
            "
          >
            <h2
              class="
                intro-x
                font-bold
                text-2xl
                xl:text-3xl
                2xl:text-4xl
                text-center
                pb-4
                xl:text-left
              "
            >
              Login
            </h2>
            <div class="intro-x text-center md:text-left text-slate-400">
              Login your Account
            </div>

            <form @submit.prevent="onSubmit" class="validate-form pt-4">
              <div
                class="
                  input-form
                  relative
                  rounded-lg
                  my-5
                  h-16
                  appearance-none
                  label-floating
                "
              >
                <input
                  class="
                    login__input
                    bg-input
                    h-14
                    form-control
                    w-full
                    py-2
                    px-4
                    text-sm
                    2xl:text-xl
                    font-sans
                    leading-normal
                    rounded-lg
                  "
                  id="username"
                  type="email"
                  placeholder="Email"
                  required
                  v-model="email"
                />
                <i
                  data-lucide="mail"
                  class="ml-auto -mt-10 pt-1 mr-4 cursor-pointer"
                ></i>
                <label
                  name="email"
                  class="
                    form-label
                    absolute
                    block
                    text-green-darker
                    font-semibold font-sans
                    w-full
                    px-4
                    py-2
                    leading-normal
                    label-float
                  "
                  for="username"
                >
                  Email
                </label>
              </div>
              <div
                class="
                  input-form
                  relative
                  rounded-lg
                  my-5
                  h-16
                  appearance-none
                  label-floating
                "
              >
                <input
                  id="showPassword"
                  class="
                    login__input
                    bg-input
                    h-14
                    form-control
                    cursor-pointer
                    w-full
                    py-2
                    px-4
                    text-sm
                    2xl:text-xl
                    font-sans
                    leading-normal
                    rounded-lg
                  "
                  type="password"
                  placeholder="Password"
                  minlength="8"
                  required
                  v-model="password"
                />
                <i
                  data-lucide="eye"
                  id="toggler"
                  class="eye-show ml-auto -mt-10 pt-1 mr-4 cursor-pointer"
                ></i>
                <label
                  name="password"
                  class="
                    form-label
                    absolute
                    block
                    text-green-darker
                    font-semibold font-sans
                    w-full
                    px-4
                    py-2
                    leading-normal
                    label-float
                  "
                  for="showPassword"
                >
                  Password
                </label>
              </div>

              <div
                class="
                  intro-x
                  flex
                  text-slate-600
                  dark:text-slate-500
                  text-xs
                  sm:text-sm
                  2xl:text-base
                  mt-6
                "
              >
                <router-link to="/forgot-password">
                  Forgot Password?
                </router-link>
              </div>
              <div
                class="
                  intro-x
                  mt-5
                  xl:mt-8
                  text-center
                  xl:text-left
                  flex flex-col-reverse
                  lg:flex-row
                  gap-4
                "
              >
                <router-link to="/register" class="w-full">
                  <button
                    type="button"
                    class="
                      btn btn-outline-primary
                      text-sm
                      2xl:text-base
                      py-3
                      px-4
                      w-full
                      rounded-full
                      xl:mt-0
                      align-top
                    "
                  >
                    Create an Account
                  </button>
                </router-link>
                <button
                  type="submit"
                  class="
                    btn btn-primary
                    text-sm
                    2xl:text-base
                    py-3
                    px-4
                    w-full
                    lg:w-56
                    rounded-full
                    align-top
                  "
                >
                  Login
                </button>
              </div>

              <!-- END: Validation Form -->
            </form>
          </div>
        </div>
        <!-- END: Login Form -->
      </div>
    </div>
  </div>
</template>

<script>
import { useAuthUserStore } from "../stores/auth";
import { mapActions } from "pinia";
import DarkModeSwitcher from "@/components/dark-mode-switcher/Main.vue";
import dom from "@left4code/tw-starter/dist/js/dom";
// import Dashboard from '../crypto-dashboard/views/Dashboard.vue'
export default {
  name: "LoginPage",
  components: {
    DarkModeSwitcher,
    // Dashboard
  },
  data: () => ({
    email: "",
    password: "",
  }),
  methods: {
    ...mapActions(useAuthUserStore, ["login"]),
    onSubmit() {
      this.login({ email: this.email, password: this.password }).then((res) => {
        let { success, isUserVerificationRequired } = res["data"];
        if (success) {
          if (isUserVerificationRequired) {
            this.showToast("warning", "Please verify 2-step authentication");
          } else {
            this.showToast("success", "Login Successful");
          }
        }
      });
    },
    showToast(type = "success", content = "") {
      this.$toast.show(content, { type: type });
    },
  },
  mounted() {
    dom("body").removeClass("main").removeClass("error-page").addClass("login");
  },
};
</script>
