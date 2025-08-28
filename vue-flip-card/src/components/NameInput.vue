<template>
  <div class="name-container">
    <h2 class="title">Nhập tên từng người chơi</h2>
    <p class="subtitle">Tổng số: {{ playerCount }}</p>

    <div class="players-list">
      <div 
        v-for="(n, index) in playerCount" 
        :key="index" 
        class="player-item"
      >
        <span class="player-label">Người {{ index + 1 }}</span>
        <input 
          v-model="names[index]" 
          class="name-input" 
          type="text" 
          :placeholder="'Tên người chơi ' + (index + 1)" 
        />
      </div>
    </div>

    <div class="actions">
      <button class="back-btn" @click="$emit('back')">⬅ Trở về</button>
      <button class="next-btn" @click="submit">Hoàn tất</button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  playerCount: { type: Number, required: true }
});

const emit = defineEmits(["back", "done"]);

const names = ref([]);

// Khởi tạo mảng tên theo số lượng người chơi
watch(() => props.playerCount, (count) => {
  names.value = Array(count).fill("");
}, { immediate: true });

const submit = () => {
  const players = names.value.map((name, idx) => 
    name || `Người ${idx+1}`  // nếu chưa nhập thì auto tạo tên mặc định
  );
  emit("done", players);
};
</script>

<style scoped>
.name-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #111;
  color: white;
  padding: 16px;
  box-sizing: border-box;
}

.title {
  text-align: center;
  font-size: 1.6rem;
  margin-bottom: 6px;
  color: #ff4b1f;
}
.subtitle {
  text-align: center;
  font-size: 1.1rem;
  margin-bottom: 16px;
  color: #ccc;
}

.players-list {
  flex: 1;
  overflow-y: auto;
}

.player-item {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
}
.player-label {
  min-width: 100px;
  font-weight: bold;
}
.name-input {
  flex: 1;
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid #444;
  background: #1e1e1e;
  color: white;
}

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
