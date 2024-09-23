<template>
    <div class="w-1/4 bg-white shadow-md rounded-lg p-4">
      <h2 class="text-xl font-semibold mb-4">Usuarios en la sala</h2>
      <ul class="space-y-2">
        <li
          v-for="(user, index) in users"
          :key="index"
          class="p-2 bg-gray-200 rounded-lg hover:bg-blue-100"
        >
          {{ user.displayName }}
        </li>
      </ul>
    </div>
  </template>
  
  <script setup lang="ts">
import type { User } from '@/types/types';

  const props = defineProps<{
    users: User[];
  }>(); 
  
  </script>
  