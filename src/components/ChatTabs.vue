<template>
    <div>
      <ul class="flex flex-wrap -mb-px border-b border-gray-200">
        <li v-for="(room, index) in Object.keys(rooms)" :key="index" class="mr-2">
          <button
            @click="() => switchRoom(room)"
            :class="['inline-block p-4 rounded-t-lg border-b-2', activeRoom === room ? 'border-blue-600 text-blue-600' : 'border-transparent hover:text-gray-600 hover:border-gray-300']"
          >
            {{ room }}
          </button>
        </li>
      </ul>
    </div>
  </template>
  
  <script setup lang="ts">
  import { defineProps, defineEmits } from 'vue';
  
  const props = defineProps<{
    rooms: Record<string, any>;
    activeRoom: string;
  }>();
  
  const emit = defineEmits<{
    (e: 'switch-room', room: string): void;
  }>();
  
  function switchRoom(room: string) {
    emit('switch-room', room);
  }
  </script>
  