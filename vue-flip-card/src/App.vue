<template>
  <div class="app-container">
    <!-- Nội dung trang -->
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
    </div>


    <!-- Footer -->
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

const step = ref("entry");
const selectedRoles = ref([]); // danh sách role đã chọn

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
  console.log("Danh sách người chơi:", playersWithNames);
  // 👉 ở đây bạn có thể chuyển sang màn khác (ví dụ chơi game)
};
</script>


<style>
html, body, #app {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  overflow: hidden; /* 🚀 Khóa toàn bộ scroll */
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
  padding: 10px;
  font-size: 0.9rem;
  color: #aaa;
  border-top: 1px solid #333;
  background: #0d0d0d;
}

.author {
  color: #ff4b1f;
  font-weight: bold;
}
</style>
