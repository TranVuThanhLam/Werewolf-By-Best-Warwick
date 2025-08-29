<template>
  <div class="role-selector">
    <h1 class="title">⚔️ Chọn Vai Trò</h1>
    <p class="subtitle">Ánh trăng máu soi sáng số phận...</p>

    <!-- Scroll container với viền bao quanh -->
    <div class="roles-wrapper">
      <div class="roles-container">
        <div class="roles-grid">
          <!-- Dân Làng -->
          <div class="role-card strong">
            <div class="role-name">👥 Dân Làng</div>
            <div class="counter">
              <button class="btn-circle" @click="decrease('Dân Làng')">−</button>
              <span>{{ counts['Dân Làng'] }}</span>
              <button class="btn-circle" @click="increase('Dân Làng')">+</button>
            </div>
          </div>

          <!-- Sói -->
          <div class="role-card strong">
            <div class="role-name">🐺 Sói</div>
            <div class="counter">
              <button class="btn-circle" @click="decrease('Sói')">−</button>
              <span>{{ counts['Sói'] }}</span>
              <button class="btn-circle" @click="increase('Sói')">+</button>
            </div>
          </div>

          <!-- Role đặc biệt -->
          <div
            v-for="role in specialRoles"
            :key="role"
            class="role-card"
            :class="{ selected: counts[role] === 1 }"
            @click="toggleRole(role)"
          >
            <span>{{ role }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Luôn nằm dưới màn hình -->
    <div class="actions">
      <button class="btn back" @click="$emit('back')">⬅ Quay lại</button>
      <button class="btn next" @click="confirmRoles">Xác nhận ➡</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
const emit = defineEmits(["back", "next"]);

const counts = ref({
  "Dân Làng": 1,
  "Sói": 1,
});

// Khai báo tất cả role đặc biệt
const specialRoles = [
  "🔮 Tiên Tri",
  "🛡️ Bảo Vệ",
  "🧪 Phù Thủy",
  "🏹 Thợ Săn",
  "💘 Cupid",
  "🧙‍♂️ Già Làng",
  "🦊 Sói Con",
  "❤️ Cặp Đôi",
  "🃏 Kẻ Phản Bội",
  "👑 Trưởng Làng",
  "🦉 Thầy Đồng",
  "🤡 Đồ Ngốc",
];

// Khởi tạo state đếm cho role đặc biệt = 0
specialRoles.forEach(role => {
  counts.value[role] = 0;
});

const increase = (role) => counts.value[role]++;
const decrease = (role) => {
  if (counts.value[role] > 0) counts.value[role]--;
};

// Toggle role đặc biệt: 0 <-> 1
const toggleRole = (role) => {
  counts.value[role] = counts.value[role] === 1 ? 0 : 1;
};

const confirmRoles = () => {
  let finalRoles = [];

  for (let i = 0; i < counts.value["Dân Làng"]; i++) finalRoles.push("Dân Làng");
  for (let i = 0; i < counts.value["Sói"]; i++) finalRoles.push("Sói");

  specialRoles.forEach((role) => {
    if (counts.value[role] === 1) finalRoles.push(role);
  });

  if (finalRoles.length > 0) {
    emit("next", finalRoles);
  } else {
    alert("Hãy chọn ít nhất 1 vai trò!");
  }
};
</script>

<style scoped>
/* giữ nguyên style như trước */
.role-selector {
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  text-align: center;
  color: #ddd;
  background: radial-gradient(circle at center, #2a0000, #0d0d0d 80%);
  overflow: hidden;
}

.role-selector::before {
  content: "";
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at center, rgba(255, 60, 60, 0.25), transparent 80%);
  animation: pulse 6s ease-in-out infinite alternate;
  z-index: 0;
}

@keyframes pulse {
  from { opacity: 0.1; }
  to   { opacity: 0.6; }
}

.title,
.subtitle,
.roles-wrapper,
.actions {
  position: relative;
  z-index: 1;
}

.title {
  font-size: 2.5rem;
  margin-bottom: 8px;
  color: #ff3b3b;
  text-shadow: 0 0 20px rgba(255, 60, 60, 0.9);
}

.subtitle {
  font-size: 1.2rem;
  color: #aaa;
  margin-bottom: 20px;
  font-style: italic;
}

.roles-wrapper {
  flex: 1;
  width: 100%;
  max-width: 800px;
  border: 2px solid rgba(255, 60, 60, 0.6);
  border-radius: 18px;
  box-shadow: 0 0 20px rgba(255, 60, 60, 0.2), inset 0 0 15px rgba(255, 0, 0, 0.15);
  padding: 12px;
}
.roles-wrapper:hover {
  border-color: rgba(255, 60, 60, 0.9);
  box-shadow: 0 0 25px rgba(255, 60, 60, 0.5), inset 0 0 20px rgba(255, 0, 0, 0.25);
}

.roles-container {
  max-height: 400px;
  overflow-y: auto;
  padding-right: 8px;
}

.roles-container::-webkit-scrollbar {
  width: 0px;
}
.roles-container {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.roles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 20px;
  width: 100%;
}

.role-card {
  background: linear-gradient(145deg, #1a1a1a, #2b2b2b);
  border: 2px solid #333;
  border-radius: 16px;
  padding: 20px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: inset 0 0 12px rgba(0,0,0,0.6);
}

.role-card.selected {
  border-color: #ff3b3b;
  background: linear-gradient(145deg, #440000, #220000);
  color: #fff;
  box-shadow: 0 0 25px rgba(255, 60, 60, 0.8);
}

.role-card.strong {
  border: 2px solid #555;
  font-weight: bold;
}

.counter {
  margin-top: 12px;
  display: flex;
  justify-content: center;
  gap: 15px;
  align-items: center;
}

.btn-circle {
  width: 38px;
  height: 38px;
  border-radius: 8px;
  border: none;
  background: #333;
  color: #fff;
  font-size: 1.4rem;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: 0.3s;
}
.btn-circle:hover {
  background: #ff3b3b;
  box-shadow: 0 0 12px rgba(255, 60, 60, 0.6);
}

.actions {
  position: sticky;
  bottom: 0;
  padding: 20px 0;
  background: linear-gradient(to top, rgba(13,13,13,0.95), rgba(13,13,13,0));
  display: flex;
  justify-content: center;
  gap: 20px;
  z-index: 2;
}

.btn {
  padding: 12px 24px;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  cursor: pointer;
  color: #fff;
  transition: all 0.3s;
}

.btn.back {
  background: #444;
}
.btn.back:hover {
  background: #666;
}

.btn.next {
  background: linear-gradient(135deg, #ff3b3b, #b30000, #660000);
  box-shadow: 0 0 16px rgba(255, 60, 60, 0.7);
}
.btn.next:hover {
  box-shadow: 0 0 25px rgba(255, 60, 60, 1);
  transform: scale(1.07);
}
</style>
