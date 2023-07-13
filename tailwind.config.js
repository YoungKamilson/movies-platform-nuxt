module.exports = {
   content: [
     "./components/**/*.{js,vue,ts}",
     "./layouts/**/*.vue",
     "./pages/**/*.vue",
     "./plugins/**/*.{js,ts}",
     "./nuxt.config.{js,ts}",
   ],
   theme: {
     extend: {
      colors: {
         bg1: '#080808',
         bg2: '#0D0D0D',
         text:'#EAEAEA',
         primary: '#F33F3F',
         secondary: '#1F1F1F',
         lesstext: '#5C5C5C',
         lesstext2: '#9A9A9A'
      }
     },
   }
 }