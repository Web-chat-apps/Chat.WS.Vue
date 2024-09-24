<template>
  
 <div v-if="initialized" class="container mx-auto max-w-7xl p-4">
    <h1 class="text-2xl font-semibold mb-4">Chat</h1>
    <div class="flex gap-4">
      <ChatTabs :rooms="rooms" :activeRoom="activeRoom" @switch-room="switchRoom" />
      <ChatWindow :messages="rooms[activeRoom].messages" :activeRoom="activeRoom" @send-message="" />
      <UserList :users="rooms[activeRoom].users" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ChatMessageType, Room, User } from '@/types/types';
import { ref, watch } from 'vue';
import { wsSocket } from '@/wsClientApi';
import ChatTabs from './ChatTabs.vue';
import ChatWindow from './ChatWindow.vue';
import UserList from './UserList.vue';

const myid = ref(wsSocket.id)
const activeRoom = ref('lobby')
const rooms = ref<Record<string, Room>>({'lobby': {messages:[], users:[]}} as Record<string,Room>) 
//const rooms = ref<Record<string, Room>>({} as Record<string,Room>) 
const newMessage = ref('')
const initialized = ref(false)

wsSocket.on('onMessage', (x:{user:{displayName:string, socket_id:string}, message: string, room_id: string})=>{
  console.log(x);
  rooms.value[x.room_id].messages.push({sender:x.user.displayName, senderId:x.user.socket_id, text: x.message, isCurrentUser: x.user.socket_id === myid.value, time:''})
  
    
})

wsSocket.on('onAnyJoinRoom', (x)=>{
    if(x.id === myid.value) return
    rooms.value[x.room_id].users.push({displayName:x.displayName, socket_id:x.id})
    
})

wsSocket.on('onAnyLeaveRoom', (x)=>{
    const index = rooms.value[x.room_id].users.findIndex((u)=>u.socket_id === x.id)
    if(index === -1) return
    rooms.value[x.room_id].users.splice(index, 1)

})

wsSocket.on('onUserDisconnect', (x)=>{
    const index = rooms.value[x.room_id].users.findIndex((u)=>u.socket_id === x.id)
    if(index === -1) return
    rooms.value[x.room_id].users.splice(index, 1)
  })


wsSocket.on('onJoinRoom', (x:{room_id: string, users: User[]})=>{
  
  if(!rooms.value[x.room_id]){
    rooms.value[x.room_id] = {messages:[], users:[]}
  }
  else{
    rooms.value[x.room_id].users = []
  }
  
  rooms.value[x.room_id].users.push(... x.users)
})

wsSocket.on('connect',()=>{
  if(wsSocket.recovered){

  }
  else{
    myid.value =wsSocket.id
    
    wsSocket.emit('joinRoom', {room_id: activeRoom.value})
    wsSocket.emit('joinRoom', {room_id: 'prueba'})
    initialized.value = true
  }
    
})
function switchRoom(room: string) {
  activeRoom.value = room;
}



</script>

