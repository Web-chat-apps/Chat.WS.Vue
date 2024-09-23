<template>
    <div class="flex m-auto">
        <input v-model="currentText" type="text" name="" id="">
        <button v-on:click="sendText()" :disabled="currentText===''">Enviar</button>
    </div>

</template>


<script setup lang="ts">
import { wsSocket } from '@/wsClientApi';
import { ref } from 'vue';

const props = defineProps<{
    room_id:string
}>()
const currentText = ref('')
function sendText(){
    if(currentText.value !== ''){
        
    wsSocket.emit('sendPublicChat', {text:currentText.value,room_id:props.room_id})
    currentText.value = ''
    
    }
}


</script>