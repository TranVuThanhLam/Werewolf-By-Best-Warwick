<template>
  <div class="role-container">
    <div class="header">
      <h2 class="title">Chọn số lượng từng vai trò</h2>
      <p class="total">Tổng số người chơi: <span>{{ totalPlayers }}</span></p>
    </div>

    <!-- Danh sách role -->
    <div class="roles-list">
      <div
        v-for="role in roles"
        :key="role.name"
        class="role-item"
        @click="toggle(role)"
        :class="{ selected: role.selected }"
      >
        <span class="role-name">{{ role.name }}</span>

        <!-- Nếu là Sói hoặc Dân làng thì có counter -->
        <div v-if="role.type === 'counter'" class="counter" @click.stop>
          <button class="btn-circle minus" @click="decrease(role)">−</button>
          <span class="count">{{ role.count }}</span>
          <button class="btn-circle plus" @click="increase(role)">+</button>
        </div>

        <!-- Nếu là toggle role -->
        <div v-else class="checkmark">
          <span v-if="role.selected">✔</span>
        </div>
      </div>
    </div>

    <!-- Nút điều hướng -->
    <div class="actions">
      <button class="back-btn" @click="$emit('back')">
        ⬅ Trở về
      </button>
      <button class="next-btn" @click="goNext">
        Tiếp tục
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const emit = defineEmits(["next", "back"]);

const roles = ref([
  { name: "Sói", count: 1, type: "counter" },
  { name: "Dân làng", count: 3, type: "counter" },
  { name: "Phù thủy", selected: false, type: "toggle" },
  { name: "Tiên tri", selected: false, type: "toggle" },
  { name: "Bảo vệ", selected: false, type: "toggle" },
  { name: "Thợ săn", selected: false, type: "toggle" },
  { name: "Đồ ngốc", selected: false, type: "toggle" },
]);

const increase = (role) => { role.count++; };
const decrease = (role) => { if (role.count > 0) role.count--; };
const toggle = (role) => {
  if (role.type === "toggle") {
    role.selected = !role.selected;
  }
};

const totalPlayers = computed(() =>
  roles.value.reduce((sum, r) => {
    if (r.type === "counter") return sum + r.count;
    if (r.type === "toggle" && r.selected) return sum + 1;
    return sum;
  }, 0)
);

const goNext = () => {
  const selectedRoles = [];
  roles.value.forEach((r) => {
    if (r.type === "counter") {
      selectedRoles.push(...Array(r.count).fill(r.name));
    } else if (r.type === "toggle" && r.selected) {
      selectedRoles.push(r.name);
    }
  });
  console.log("Danh sách role:", selectedRoles);
  emit("next", selectedRoles);
};
</script>

<style scoped>
.role-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #111;
  color: white;
  padding: 16px;
  box-sizing: border-box;
}

.header {
  flex-shrink: 0;
  text-align: center;
  margin-bottom: 10px;
}
.title {
  font-size: 1.6rem;
  margin-bottom: 6px;
}
.total {
  font-size: 1.1rem;
  color: #ccc;
}
.total span {
  color: #ff4b1f;
  font-weight: bold;
}

/* danh sách scroll riêng */
.roles-list {
  flex: 1;
  overflow-y: auto;
}

.role-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  margin: 8px 0;
  border: 1px solid #444;
  border-radius: 12px;
  background: #1e1e1e;
  cursor: pointer;
}
.role-item.selected {
  border-color: #ff4b1f;
  background: #2a1a1a;
}
.role-name {
  font-size: 1.2rem;
}

/* Counter */
.counter {
  display: flex;
  align-items: center;
  gap: 8px;
}
.btn-circle {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: none;
  font-size: 1.4rem;
  font-weight: bold;
  cursor: pointer;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.2s;
}
.btn-circle.minus {
  background: #444;
}
.btn-circle.plus {
  background: #ff4b1f;
}
.count {
  min-width: 24px;
  text-align: center;
  font-size: 1.2rem;
}

/* Checkmark toggle */
.checkmark {
  font-size: 1.4rem;
  color: #ff4b1f;
}

/* Action buttons */
.actions {
  flex-shrink: 0;
  display: flex;
  gap: 10px;
  margin-top: 12px;
}
.back-btn, .next-btn {
  flex: 1;
  padding: 14px;
  border: none;
  border-radius: 14px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  color: white;
}
.back-btn {
  background: #444;
}
.next-btn {
  background: linear-gradient(135deg, #ff4b1f, #1f1c18);
}
</style>
