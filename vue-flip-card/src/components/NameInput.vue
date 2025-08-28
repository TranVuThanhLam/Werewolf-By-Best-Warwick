<template>
  <div class="name-input">
    <h1 class="title">📝 Nhập Tên Người Chơi</h1>
    <p class="subtitle">Có {{ players.length }} người tham gia trò chơi</p>

    <!-- Danh sách nhập tên -->
    <div class="players-wrapper">
      <div class="players-container">
        <div
          v-for="(player, index) in players"
          :key="index"
          class="player-item"
        >
          <input
            v-model="players[index]"
            :placeholder="`Người chơi ${index + 1}`"
            class="player-input"
            :ref="el => playerInputs[index] = el"
            @keyup.enter="focusNext(index)"
          />
        </div>
      </div>
    </div>

    <!-- Action buttons -->
    <div class="actions">
      <button class="btn back" @click="$emit('back')">⬅ Quay lại</button>
      <button class="btn next" @click="confirmPlayers">Xác nhận ➡</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const props = defineProps({
  playerCount: {
    type: Number,
    required: true
  }
});
const emit = defineEmits(["back", "done"]);

const players = ref([]);
const playerInputs = ref([]);

onMounted(() => {
  players.value = Array.from({ length: props.playerCount }, (_, i) => "");
});

const focusNext = (index) => {
  if (index + 1 < playerInputs.value.length) {
    playerInputs.value[index + 1].focus();
  }
};

const confirmPlayers = () => {
  const validPlayers = players.value.map((p, i) => p.trim() || `Người chơi ${i + 1}`);
  emit("done", validPlayers);
};
</script>

<style scoped>
.name-input {
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  text-align: center;
  color: #ddd;
  background: radial-gradient(circle at center, #1a0000, #0d0d0d 80%);
  overflow: hidden;
}

.name-input::before {
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
.players-wrapper,
.actions {
  position: relative;
  z-index: 1;
}

.title {
  font-size: 2.3rem;
  margin-bottom: 8px;
  color: #ff3b3b;
  text-shadow: 0 0 18px rgba(255, 60, 60, 0.9);
}

.subtitle {
  font-size: 1.1rem;
  color: #aaa;
  margin-bottom: 20px;
  font-style: italic;
}

.players-wrapper {
  flex: 1;
  width: 100%;
  max-width: 600px;
  border: 2px solid rgba(255, 60, 60, 0.6);
  border-radius: 16px;
  box-shadow: 0 0 15px rgba(255, 60, 60, 0.2), inset 0 0 12px rgba(255, 0, 0, 0.15);
  padding: 16px;
  margin-bottom: 20px;
  background: rgba(0,0,0,0.4);
}

.players-container {
  max-height: 320px;
  overflow-y: auto;
  padding-right: 6px;
}

.players-container::-webkit-scrollbar {
  width: 0px;
}
.players-container {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.player-item {
  margin-bottom: 14px; /* cách nhau rõ hơn */
}

.player-input {
  width: 100%;
  padding: 14px 18px; /* input to hơn */
  border-radius: 12px;
  border: 2px solid #333;
  background: #1a1a1a;
  color: #fff;
  font-size: 1.1rem;
  outline: none;
  transition: 0.3s;
}
.player-input:focus {
  border-color: #ff3b3b;
  box-shadow: 0 0 12px rgba(255, 60, 60, 0.7);
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
