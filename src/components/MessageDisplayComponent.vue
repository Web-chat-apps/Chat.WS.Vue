<template>
    <div class="chat">
        <div :class="calculateDataTime(message) + ' ' +calculateClass(message)" v-for="message in props.messages">
            {{ message.message }}
        </div>
    </div>
    {{ props.myid }}


</template>

<script setup lang="ts">
import type { ChatMessageType } from '@/types/types';


const props = defineProps<{ myid:string|undefined,room_id:string, messages:ChatMessageType[] | undefined}>()

function calculateDataTime(m:ChatMessageType){
    if(isMine(m.uuid)){
        return m.time
    }
    else{
        return '--' + m.time
    }
}

function calculateClass(m:ChatMessageType){
    if(isMine(m.uuid)){
        return 'msg sent'
    }
    return 'msg rcvd'

}

function isMine(messageid:string){
    return messageid === props.myid
}
</script>

<style lang="css" scoped>
/* QuickReset */ * {margin: 0; box-sizing: border-box;}

.chat {
  --rad: 20px;
  --rad-sm: 3px;
  font: 16px/1.5 sans-serif;
  display: flex;
  flex-direction: column;
  padding: 20px;
  max-width: 500px;
  margin: auto;
}

.msg {
  position: relative;
  max-width: 75%;
  padding: 7px 15px;
  margin-bottom: 2px;
}

.msg.sent {
  border-radius: var(--rad) var(--rad-sm) var(--rad-sm) var(--rad);
  background: #42a5f5;
  color: #fff;
  /* moves it to the right */
  margin-left: auto;
}

.msg.rcvd {
  border-radius: var(--rad-sm) var(--rad) var(--rad) var(--rad-sm);
  background: #f1f1f1;
  color: #555;
  /* moves it to the left */
  margin-right: auto;
}

/* Improve radius for messages group */

.msg.sent:first-child,
.msg.rcvd+.msg.sent {
  border-top-right-radius: var(--rad);
}

.msg.rcvd:first-child,
.msg.sent+.msg.rcvd {
  border-top-left-radius: var(--rad);
}


/* time */

.msg::before {
  content: attr(data-time);
  font-size: 0.8rem;
  position: absolute;
  bottom: 100%;
  color: #888;
  white-space: nowrap;
  /* Hidden by default */
  display: none;
}

.msg.sent::before {
  right: 15px;
}

.msg.rcvd::before {
  left: 15px;
}


/* Show time only for first message in group */

.msg:first-child::before,
.msg.sent+.msg.rcvd::before,
.msg.rcvd+.msg.sent::before {
  /* Show only for first message in group */
  display: block;
}
</style>