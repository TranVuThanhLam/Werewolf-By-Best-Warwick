<template>
  <div class="app-container">
    <!-- 🌫️ Hiệu ứng nền toàn cục -->
    <div class="global-atmosphere">
      <div class="vignette"></div>
    </div>

    <div class="page-container">
      <Transition name="fade" mode="out-in">
        <div :key="step" class="transition-wrapper">
          <EntryPoint 
            v-if="step === 'entry'" 
            @selectMode="handleSelectMode" 
          />
          <MultiplayerMenu 
            v-if="step === 'multi_menu'"
            @back="handleBack"
            @create="handleCreateRoom"
            @join="handleJoinRoom"
          />
          <Lobby 
            v-if="step === 'lobby'"
            :roomCode="roomCode"
            @back="handleBack"
          />
          <RoleSelector 
            v-if="step === 'roles'" 
            @back="handleBack"
            @next="handleRolesSelected"
          />
          <NameInput 
            v-if="step === 'names'"
            :playerCount="selectedRoles.length"
            @back="handleBackToRoles"
            @done="handleDone"
          />
          <RevealRoles 
            v-if="step === 'reveal'"
            :players="players"
            :roles="selectedRoles"
            @finish="handleFinishReveal"
          />
        </div>
      </Transition>
    </div>

    <footer class="footer">
      Thực hiện bởi <span class="author">Trần Vũ Thanh Lâm</span>
    </footer>
  </div>
</template>

<script setup>
import { ref } from "vue";
import EntryPoint from './components/EntryPoint.vue';
import RoleSelector from './components/RoleSelector.vue';
import NameInput from './components/NameInput.vue';
import RevealRoles from './components/RevealRoles.vue';
import MultiplayerMenu from './components/MultiplayerMenu.vue'; // Mới
import Lobby from './components/Lobby.vue';             // Mới

const step = ref("entry");
const selectedRoles = ref([]); 
const players = ref([]);      
const roomCode = ref("");      // Mã phòng

const handleSelectMode = (mode) => {
  if (mode === "single") step.value = "roles";
  if (mode === "multi") step.value = "multi_menu";
};

const handleCreateRoom = (code) => {
  roomCode.value = code;
  step.value = "lobby";
};

const handleJoinRoom = (code) => {
  roomCode.value = code;
  step.value = "lobby";
};

const handleBack = () => step.value = "entry";
const handleRolesSelected = (roles) => {
  selectedRoles.value = roles;
  step.value = "names";
};
const handleBackToRoles = () => step.value = "roles";

const handleDone = (playersWithNames) => {
  players.value = playersWithNames;
  step.value = "reveal";
};

const handleFinishReveal = () => {
  step.value = "entry";
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Charm:wght@400;700&family=Outfit:wght@300;400;600&display=swap');

:root {
  --primary-red: #ff4d4d;
  --dark-bg: #050505;
}

/* 🛠️ Fix Box Sizing & Overflows */
*, *::before, *::after {
  box-sizing: border-box;
}

html, body, #app {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  overflow: hidden; /* Chặn hoàn toàn scroll ngoài ý muốn */
  background: var(--dark-bg);
  color: white;
  font-family: 'Outfit', sans-serif;
}

.app-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  height: 100dvh; /* Ưu tiên dvh cho mobile */
  position: relative;
  overflow: hidden; /* Đảm bảo không có gì thoát ra ngoài container chính */
}

.global-atmosphere {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: none;
  overflow: hidden;
}

.vignette {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle, transparent 20%, rgba(0,0,0,0.95) 100%);
}

.page-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  z-index: 2;
  position: relative;
  overflow: hidden; /* Chặn scroll trong từng trang */
}

.transition-wrapper {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
}

/* Transition Animations */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.fade-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.footer {
  z-index: 3;
  text-align: center;
  padding: 20px;
  font-size: 0.65rem;
  background: transparent;
  color: rgba(255, 255, 255, 0.2);
  font-family: 'Outfit', sans-serif;
  letter-spacing: 3px;
  text-transform: uppercase;
  transition: all 0.5s ease;
  pointer-events: none; /* Tránh cản trở thao tác vuốt màn hình */
}

.footer:hover {
  color: rgba(255, 255, 255, 0.6);
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
}

.author {
  color: var(--primary-red);
  font-weight: 700;
  margin-left: 5px;
  opacity: 0.6;
}
</style>
