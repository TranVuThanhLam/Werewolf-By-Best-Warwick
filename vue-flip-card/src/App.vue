<template>
  <div class="app-container">
    <div class="page-container">
      <EntryPoint 
        v-if="step === 'entry'" 
        @selectMode="handleSelectMode" 
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

      <!-- 👉 Thêm RevealRoles -->
      <RevealRoles 
        v-if="step === 'reveal'"
        :players="players"
        :roles="selectedRoles"
        @finish="handleFinishReveal"
      />
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

const step = ref("entry");
const selectedRoles = ref([]); 
const players = ref([]);      

const handleSelectMode = (mode) => {
  if (mode === "single") step.value = "roles";
};

const handleBack = () => step.value = "entry";
const handleRolesSelected = (roles) => {
  selectedRoles.value = roles;
  step.value = "names";
};
const handleBackToRoles = () => step.value = "roles";

const handleDone = (playersWithNames) => {
  players.value = playersWithNames;
  step.value = "reveal";   // 👉 chuyển sang chia bài
};

const handleFinishReveal = () => {
  alert("Tất cả đã xem xong!"); 
  step.value = "entry"; // hoặc sang màn quản trò
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Charm:wght@400;700&display=swap');

html, body, #app {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  overflow: hidden; /* 🚀 Khóa toàn bộ scroll */
  font-family: "Charm", cursive; /* 🔥 Áp dụng Charm toàn bộ */
}

.app-container {
  display: flex;
  flex-direction: column;
  height: 93%;   /* 🚀 full màn hình, không còn 90vh */
  background: #0d0d0d;
}

.page-container {
  flex: 1; /* chiếm hết phần trên footer */
  display: flex;
  flex-direction: column;
  min-height: 0; /* quan trọng để con có thể co giãn */
  overflow: hidden; /* 🚀 không cho container này scroll */
}

.footer {
  flex-shrink: 0;
  text-align: center;
  padding: 12px;
  font-size: 0.95rem;
  background: linear-gradient(180deg, #1a1a1a, #0d0d0d, #2a0000);
  color: #bbb; /* xám bạc */
  border-top: 2px solid #660000; /* đỏ sẫm */
  letter-spacing: 0.5px;
  text-shadow: 0 0 6px rgba(0,0,0,0.7);
}

.author {
  color: #ff3b3b;
  font-weight: bold;
  text-shadow: 0 0 8px rgba(255,60,60,0.8), 
               0 0 15px rgba(180,0,0,0.7);
}
</style>
