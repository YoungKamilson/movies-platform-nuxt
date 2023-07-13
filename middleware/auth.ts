

export default defineNuxtRouteMiddleware((to, from) => {
   const user = useSupabaseUser()

   if (process.server) {
      if(user.value == null && to.path !== '/register' || to.path !== '/login') return navigateTo('/register')
      else return navigateTo(to.path)
    }
})