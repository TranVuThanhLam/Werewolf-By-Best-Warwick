<template>
  <div class="flip-card" @click="flipCard">
    <div class="flip-card-inner" :class="{ flipped: isFlipped }">
      <!-- Mặt úp -->
      <div class="flip-card-front">
        <span class="card-back">🎴</span>
      </div>
      <!-- Mặt ngửa -->
      <div class="flip-card-back">
        <span class="role-icon">{{ role.icon }}</span>
        <p class="role-name">{{ role.name }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  role: Object
});
const emit = defineEmits(["flipped"]);

const isFlipped = ref(false);

function flipCard() {
  if (!isFlipped.value) {
    isFlipped.value = true;
    emit("flipped");
  } else {
    // Cho phép lật lại úp nếu cần
    isFlipped.value = false;
  }
}
</script>

<style scoped>
.flip-card {
  width: 200px;
  height: 300px;
  perspective: 1000px;
  margin: auto;
}

.flip-card-inner {
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.6s;
}

.flip-card-inner.flipped {
  transform: rotateY(180deg);
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
}

.flip-card-back {
  background: linear-gradient(135deg, #ff4b1f, #1f1c18);
  color: white;
  transform: rotateY(180deg);
  flex-direction: column;
}

.role-icon {
  font-size: 3rem;
}

.role-name {
  margin-top: 10px;
  font-size: 1.4rem;
  font-weight: bold;
}
</style>
