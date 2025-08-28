<template>
  <div class="reveal-container">
    <transition :name="transitionName" mode="out-in">
      <!-- View 1: Handover -->
      <div v-if="phase === 'handover'" key="handover" class="handover">
        <h2>Đưa điện thoại cho:</h2>
        <p class="player-name">
          {{ currentIndex < playerList.length ? currentPlayer.name : 'Quản trò' }}
        </p>
        <button @click="startTurn">OK</button>
      </div>

      <!-- View 2: Lật bài -->
      <div v-else key="card" class="card-view">
        <FlipCard 
          v-if="currentIndex < playerList.length"
          :role="currentPlayer.role" 
          @flipped="handleFlipped" 
        />
        <button 
          class="done-btn" 
          :disabled="!hasFlipped"
          @click="nextPlayer"
        >
          Xem xong
        </button>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import FlipCard from "./FlipCard.vue";

const props = defineProps({
  players: Array,
  roles: Array
});
const emit = defineEmits(["finish"]);

const shuffledRoles = [...props.roles].sort(() => Math.random() - 0.5);
const playerList = props.players.map((name, idx) => ({
  name,
  role: { name: shuffledRoles[idx], icon: getIcon(shuffledRoles[idx]) }
}));

const currentIndex = ref(0);
const phase = ref("handover"); 
const hasFlipped = ref(false);
const direction = ref("forward"); // forward = sang trái, backward = sang phải

const currentPlayer = computed(() => playerList[currentIndex.value]);
const transitionName = computed(() => direction.value === "forward" ? "slide-left" : "slide-right");

function handleFlipped() {
  hasFlipped.value = true;
}
function startTurn() {
  direction.value = "forward";
  if (currentIndex.value < playerList.length) {
    phase.value = "card";
  } else {
    emit("finish");
  }
}
function nextPlayer() {
  direction.value = "forward";
  hasFlipped.value = false;
  currentIndex.value++;
  phase.value = "handover";
}
function getIcon(roleName) {
  switch (roleName) {
    case "Sói": return "🐺";
    case "Dân làng": return "👨‍🌾";
    case "Phù thủy": return "🧙‍♀️";
    case "Tiên tri": return "🔮";
    case "Bảo vệ": return "🛡️";
    case "Thợ săn": return "🏹";
    case "Đồ ngốc": return "🤡";
    default: return "❓";
  }
}
</script>

<style scoped>
.reveal-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #111;
  color: white;
  justify-content: center;
  align-items: center;
  overflow: hidden; /* tránh lộ nội dung khi slide */
}
.handover {
  text-align: center;
}
.player-name {
  font-size: 2rem;
  font-weight: bold;
  color: #ff4b1f;
}
.card-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin-top: 20px;
}
.done-btn {
  padding: 12px 20px;
  font-size: 1.2rem;
  font-weight: bold;
  border: none;
  border-radius: 12px;
  background: linear-gradient(135deg, #ff4b1f, #1f1c18);
  color: white;
  cursor: pointer;
}
.done-btn:disabled {
  background: #555;
  cursor: not-allowed;
}

/* 🔥 Hiệu ứng slide ngang */
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.4s ease;
  position: absolute;
  width: 100%;
}

.slide-left-enter-from {
  transform: translateX(100%);
  opacity: 0;
}
.slide-left-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}

.slide-right-enter-from {
  transform: translateX(-100%);
  opacity: 0;
}
.slide-right-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
</style>
