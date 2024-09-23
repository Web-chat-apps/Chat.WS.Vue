<template>
    <div class="bg-white p-4 shadow-md rounded-lg mt-4 w-3/4">
      <div class="bg-blue-600 p-4 text-white rounded-t-lg">
        <h2 class="text-xl font-semibold">Chat - {{ activeRoom }}</h2>
      </div>
  
      <div class="bg-gray-50 p-4 h-96 overflow-y-auto border-t border-gray-200">
        <div
          v-for="(message, index) in messages"
          :key="index"
          :class="['mb-4', message.isCurrentUser ? 'text-right' : 'text-left']"
        >
          <span
            :class="['text-sm', message.isCurrentUser ? 'text-blue-600' : 'text-gray-500', 'font-semibold']"
          >
            {{ message.sender }}:
          </span>
          <p
            :class="['p-2 rounded-lg inline-block', message.isCurrentUser ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black']"
          >
            {{ message.text }}
          </p>
          <span class="text-xs text-gray-500">{{ message.time }}</span>
        </div>
      </div>
  
      <div class="bg-gray-100 p-4 border-t border-gray-300 rounded-b-lg">
        <div class="flex">
          <input
            v-model="newMessage"
            type="text"
            placeholder="Escribe un mensaje..."
            class="flex-grow border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
          />
          <button type="button" class="ml-2 bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition" @click="sendMessage()">
            Enviar
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { wsSocket } from '@/wsClientApi';
import { ref } from 'vue';
  
  const props = defineProps<{
    messages: Array<{
      sender: string;
      text: string;
      isCurrentUser: boolean;
      time: string;
    }>;
    activeRoom: string;
  }>();
  
  const emit = defineEmits<{
    (e: 'send-message', message: string): void;
  }>();
  
  const newMessage = ref('');
  
  function sendMessage() {
    if (newMessage.value.trim() !== '') {
      
      
      wsSocket.emit('sendPublicChat', { message: newMessage.value, room_id: props.activeRoom });
      //emit('send-message', newMessage.value);
      newMessage.value = '';
    }
  }
  </script>
  