<template>
  <div class="role-selector">
    <h1 class="title">⚔️ Chọn Vai Trò</h1>
    <p class="subtitle">Ánh trăng máu soi sáng số phận...</p>

    <!-- Tổng số lá bài -->
    <div class="total-count">
      Tổng số lá bài: <span>{{ totalCount }}</span>
    </div>

    <!-- Danh sách roles -->
    <div class="roles-wrapper">
      <div class="roles-container">
        <div class="roles-grid">
          <!-- Dân Làng -->
          <div class="role-card strong" :class="{ selected: counts['Dân Làng'] > 0 }">
            <div class="role-name">👥 Dân Làng</div>
            <div class="counter">
              <button @click="decrease('Dân Làng')">−</button>
              <span>{{ counts['Dân Làng'] }}</span>
              <button @click="increase('Dân Làng')">+</button>
            </div>
          </div>

          <!-- Sói -->
          <div class="role-card strong" :class="{ selected: counts['Sói'] > 0 }">
            <div class="role-name">🐺 Sói</div>
            <div class="counter">
              <button @click="decrease('Sói')">−</button>
              <span>{{ counts['Sói'] }}</span>
              <button @click="increase('Sói')">+</button>
            </div>
          </div>

          <!-- Role đặc biệt -->
          <div
            v-for="role in specialRoles"
            :key="role"
            class="role-card"
            :class="{ selected: counts[role] > 0 }"
            @click="toggleRole(role)"
          >
            <span>{{ role }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Hành động -->
    <div class="actions">
      <button class="btn back" @click="$emit('back')">⬅ Quay lại</button>
      <button class="btn next" @click="confirmRoles">Xác nhận ➡</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
const emit = defineEmits(["back", "next"]);

const counts = ref({
  "Dân Làng": 1,
  "Sói": 1,
});

const specialRoles = [
  "🔮 Tiên Tri", "🛡️ Bảo Vệ", "🧪 Phù Thủy", "🏹 Thợ Săn",
  "💘 Cupid", "🧙‍♂️ Già Làng", "🦊 Sói Con", "❤️ Cặp Đôi",
  "🃏 Kẻ Phản Bội", "👑 Trưởng Làng", "🦉 Thầy Đồng", "🤡 Đồ Ngốc",
];

specialRoles.forEach(role => { counts.value[role] = 0; });

const increase = (role) => counts.value[role]++;
const decrease = (role) => { if (counts.value[role] > 0) counts.value[role]--; };
const toggleRole = (role) => { counts.value[role] = counts.value[role] === 1 ? 0 : 1; };

const totalCount = computed(() => {
  return Object.values(counts.value).reduce((a, b) => a + b, 0);
});

const confirmRoles = () => {
  let finalRoles = [];
  for (let i = 0; i < counts.value["Dân Làng"]; i++) finalRoles.push("Dân Làng");
  for (let i = 0; i < counts.value["Sói"]; i++) finalRoles.push("Sói");
  specialRoles.forEach(role => { if (counts.value[role] === 1) finalRoles.push(role); });

  if (finalRoles.length > 0) emit("next", finalRoles);
  else alert("Hãy chọn ít nhất 1 vai trò!");
};
</script>

<style scoped>
.role-selector {
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 20px;
  text-align: center;
  color: #ddd;
  background: radial-gradient(circle at center, #2a0000, #0d0d0d 80%);
  box-sizing: border-box;
}

.title { font-size: 2rem; margin-bottom: 8px; }
.subtitle { font-size: 1rem; margin-bottom: 10px; }
.total-count {
  font-size: 1.2rem;
  margin-bottom: 14px;
  color: #ffae7a;
  font-weight: bold;
}

.roles-wrapper {
  flex: 1;
  width: 100%;
  border: 2px solid rgba(255, 60, 60, 0.6);
  border-radius: 14px;
  padding: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.roles-container {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding-right: 4px;
}
.roles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 16px;
}

.role-card {
  padding: 20px;
  border-radius: 16px;
  font-size: 1.05rem;
  cursor: pointer;
  background: rgba(255, 255, 255, 0.07);
  transition: all 0.25s ease;
  border: 2px solid transparent;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.role-card:hover { background: rgba(255, 255, 255, 0.15); }
.role-card.selected {
  border-color: #ff4444;
  background: rgba(255, 60, 60, 0.25);
  box-shadow: 0 0 12px rgba(255, 60, 60, 0.6);
}

/* Counter */
.strong .counter {
  margin-top: 10px;
  display: flex;
  gap: 10px;
}
.strong .counter button {
  width: 36px;
  height: 36px;
  font-size: 1.3rem;
  border: none;
  border-radius: 8px;
  background: rgba(255,255,255,0.1);
  color: #fff;
  cursor: pointer;
}
.strong .counter button:hover {
  background: rgba(255,255,255,0.2);
}
.strong .counter span {
  min-width: 24px;
  text-align: center;
  font-weight: bold;
  font-size: 1.1rem;
}

/* Actions */
.actions {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 14px;
  padding-top: 10px;
  border-top: 1px solid rgba(255,255,255,0.1);
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

@media (max-width: 480px) {
  .title { font-size: 1.6rem; }
  .subtitle { font-size: 0.9rem; }
  .roles-grid { grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 12px; }
  .role-card { font-size: 0.95rem; padding: 16px; }
  .btn { font-size: 0.9rem; padding: 10px 16px; }
}
</style>
