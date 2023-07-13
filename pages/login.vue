<template>
   <div class="w-full h-screen text-text flex flex-col items-center justify-center pb-[20%]">
      <div>
         <h2 class="text-[64px] font-semibold">Sign In</h2>
         <p class="text-lesstext">Log In to your account to explore movies!</p>
         <form @submit.prevent="" class="mt-24 flex flex-col items-start gap-3">
         <label for="email">Email address</label>
         <input v-model="email" required autocomplete id="email" type="email" placeholder="johndee@email.com" class="w-full h-[44px] p-[12px] rounded-[8px] bg-black border-[1px] border-secondary placeholder:text-lesstext text-text placeholder:text-[15px] placeholder:font-[400] mb-[16px]">

         <label for="password">Password</label>
         <input v-model="password" required  autocomplete id="password" type="password" placeholder="Your password" class="w-full h-[44px] p-[12px] rounded-[8px] bg-black border-[1px] border-secondary placeholder:text-lesstext text-text placeholder:text-[15px] placeholder:font-[400] mb-[16px]">
         <p v-if="error" class="text-primary">{{ error }}</p>
         <p class="text-lesstext">You don't have an account? <nuxt-link to="/register" class="text-primary">Sign Up here</nuxt-link>
         </p>
         
         <Button class="mt-12 w-full" @click="logIn">Sign In</Button>
      </form>
      </div>
      </div>

</template>

<script setup>

const password = ref()
const email = ref()
const error = ref()

definePageMeta({
  layout: "clean",
});

const modalStore = useModalsStore()

onMounted(() => {
   modalStore.saveToListModal = false
   modalStore.createNewListModal = false
})

const client = useSupabaseAuthClient()

async function logIn(){
   const {data: singInData, error: singInError} = await client.auth.signInWithPassword({
      email: email.value,
      password: password.value
   })

   if(singInError) handleError('Invalid email or password.');console.log(singInError)

   if(singInData?.session){
         console.log(singInData)
         navigateTo('/')
   }
}

function handleError(errorMessage){
   error.value = errorMessage
}
</script>
