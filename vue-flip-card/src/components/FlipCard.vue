<template>
  <div class="flip-card-container">
    <!-- 🔥 Chữ hướng dẫn -->
    <p class="hint">
      {{ isFlipped ? "✅ Bấm xem xong để chuyển đến người tiếp theo" : "👉 Bấm vào lá bài để lật lên" }}
    </p>

    <div class="flip-card" @click="flipCard" :class="roleBorderClass">
      <div class="flip-card-inner" :class="{ flipped: isFlipped }">
        <!-- Mặt úp -->
        <div class="flip-card-front">
          <span class="back-icon">🎴</span>
        </div>
        <!-- Mặt ngửa -->
        <div class="flip-card-back">
          <span class="role-icon">{{ role.icon }}</span>
          <p class="role-name">{{ role.name }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  role: Object
});
const emit = defineEmits(["flipped", "next"]);

const isFlipped = ref(false);

function flipCard() {
  if (!isFlipped.value) {
    isFlipped.value = true;
    emit("flipped");
  } else {
    isFlipped.value = false;
    emit("next");
  }
}

const roleBorderClass = computed(() => {
  if (!props.role) return "";
  if (props.role.team === "wolf") return "wolf-border";
  if (props.role.team === "villager") return "villager-border";
  return "";
});
</script>

<style scoped>
.flip-card-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  font-family: "Charm", cursive; /* 🔥 đổi toàn bộ sang Charm */
}

.hint {
  font-size: 1rem;
  color: #aaa;
  text-align: center;
  animation: blink 1.5s infinite;
  margin-bottom: 10px;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.flip-card {
  width: 230px;
  height: 310px;
  perspective: 1000px;
  margin: auto;
  cursor: pointer;
  border-radius: 14px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.4);
  transition: box-shadow 0.3s ease;
}

.flip-card:hover {
  box-shadow: 0 0 15px rgba(255, 255, 100, 0.6);
}

.flip-card-inner {
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.6s ease, scale 0.3s ease;
}

.flip-card-inner.flipped {
  transform: rotateY(180deg) scale(1.1);
}

.flip-card-front,
.flip-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
}

.flip-card-front {
  background: linear-gradient(135deg, #222, #444);
  color: white;
  overflow: hidden;
}

.flip-card-back {
  background: linear-gradient(135deg, #ff4b1f, #1f1c18);
  color: white;
  transform: rotateY(180deg);
  flex-direction: column;
}

.role-icon {
  font-size: 6rem;
}

.role-name {
  margin-top: 10px;
  font-size: 1.8rem;
  font-family: "Charm", cursive; /* 🔥 vẫn giữ Charm riêng cho role */
  text-shadow: 1px 1px 3px rgba(0,0,0,0.6);
  text-align: center;
}

/* Emoji 🎴 fill full card */
.back-icon {
  position: absolute;
  inset: 0;
  font-size: 300px;
  line-height: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 🔥 Border theo phe */
.wolf-border {
  border: 4px solid red;
  box-shadow: 0 0 12px rgba(255,0,0,0.6);
}
.villager-border {
  border: 4px solid gold;
  box-shadow: 0 0 12px rgba(255,215,0,0.6);
}
</style>
