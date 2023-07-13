import {defineStore} from 'pinia'

export const useModalsStore = defineStore({
   id: 'modals-store',
   state: () => ({
      saveToListModal: false,
      createNewListModal: false,
      infoModal: {
         active: false,
         message: ''
      }
   })
})