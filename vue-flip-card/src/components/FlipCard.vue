<template>
  <div class="screen">
    <div class="card-container" @click="toggleFlip">
      <div :class="['card', { 'is-flipped': isFlipped }]">
        
        <!-- Mặt sau -->
        <div class="card-face card-back">
          <span class="card-icon">🂠</span>
        </div>
        
        <!-- Mặt trước -->
        <div class="card-face card-front">
          <span class="card-icon">{{ role.icon }}</span>
          <span class="card-name">{{ role.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const isFlipped = ref(false);
const toggleFlip = () => {
  isFlipped.value = !isFlipped.value;
};

const role = {
  name: "Sói",
  icon: "🐺"
};
</script>

<style scoped>
/* Full màn hình, canh giữa tuyệt đối */
.screen {
  position: fixed;
  inset: 0; /* top:0; right:0; bottom:0; left:0 */
  display: flex;
  justify-content: center;
  align-items: center;
  background: #0f172a; /* nền tối */
  overflow: hidden;
}

/* Container lá bài */
.card-container {
  perspective: 1200px;
  width: 65vw;
  max-width: 280px;
  aspect-ratio: 2 / 3;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Lá bài */
.card {
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.6s ease-in-out;
  transform-origin: center center;
  cursor: pointer;
}

.card.is-flipped {
  transform: rotateY(180deg);
}

/* Mặt lá bài */
.card-face {
  position: absolute;
  top: 0; left: 0;
  width: 100%;
  height: 100%;
  border-radius: 16px;
  backface-visibility: hidden;
  box-shadow: 0 0 25px rgba(255, 255, 255, 0.25);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.card-icon {
  font-size: clamp(4rem, 15vw, 7rem);
}

.card-name {
  margin-top: 12px;
  font-size: clamp(1.2rem, 4vw, 1.8rem);
  font-weight: bold;
  color: white;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
}

.card-front {
  background: linear-gradient(135deg, #1e293b, #334155);
  color: white;
}

.card-back {
  background: linear-gradient(135deg, #475569, #64748b);
  transform: rotateY(180deg);
  color: white;
}
</style>

<style>
html, body, #app {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  overflow: hidden; /* chặn scroll */
}
</style>
