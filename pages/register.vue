<template>
   <div class="w-full h-screen text-text flex flex-col items-center justify-center pb-[20%]">
      <div>
         <h2 class="text-[64px] font-semibold">Sign Up</h2>
         <p class="text-lesstext">Create a new account</p>
         <form @submit.prevent class="mt-24 flex flex-col items-start gap-3">
         <label for="email">Email address</label>
         <input v-model="email" autocomplete required id="email" type="email" placeholder="johndee@email.com" class="w-full h-[44px] p-[12px] rounded-[8px] bg-black border-[1px] border-secondary placeholder:text-lesstext text-text placeholder:text-[15px] placeholder:font-[400] mb-[16px]">

         <label for="password">Password</label>
         <input v-model='password' autocomplete required minlength="8" id="password" type="password" placeholder="Your password" class="w-full h-[44px] p-[12px] rounded-[8px] bg-black border-[1px] border-secondary placeholder:text-lesstext text-text placeholder:text-[15px] placeholder:font-[400] mb-[16px]">
         <p v-if="error" class="text-primary">{{ error }}</p>
         <p class="text-lesstext">You already have an account? <nuxt-link to="/login" class="text-primary">Sign In here</nuxt-link>
         </p>
         <Button class="mt-12 w-full" @click="register">Sign Up</Button>
      </form>
      </div>
      </div>

</template>

<script setup>
definePageMeta({
  layout: "clean"
});

const modalStore = useModalsStore()

onMounted(() => {
   modalStore.saveToListModal = false
   modalStore.createNewListModal = false
})


const password = ref()
const email = ref()
const error = ref()

const client = useSupabaseAuthClient()


async function register(){
   const {data: signUpData, error: signUpError} = await client.auth.signUp({
      email: email.value,
      password: password.value
   })
   if(signUpError) handleError('User already registered.');console.log(signUpError)

   if(signUpData?.session){
         console.log(signUpData)
         navigateTo('/')
   }
}

function handleError(errorMessage){
   error.value = errorMessage
}
</script>
