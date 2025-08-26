<template>
  <div class="scene" @click="toggleFlip">
    <div class="card" :class="{ flipped: isFlipped }">
      <div class="card-face card-front">
        <h2>Mặt Trước</h2>
      </div>
      <div class="card-face card-back">
        <h2>Mặt Sau</h2>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FlipCard",
  data() {
    return {
      isFlipped: false
    }
  },
  methods: {
    toggleFlip() {
      this.isFlipped = !this.isFlipped
    }
  }
}
</script>

<style scoped>
.scene {
  width: 200px;
  height: 260px;
  perspective: 1000px;
  cursor: pointer;
}

.card {
  width: 100%;
  height: 100%;
  position: relative;
  transition: transform 0.8s;
  transform-style: preserve-3d;
}

.card.flipped {
  transform: rotateY(180deg);
}

.card-face {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 22px;
  border: 2px solid #333;
  border-radius: 12px;
}

.card-front {
  background: #fef08a;
}

.card-back {
  background: #60a5fa;
  transform: rotateY(180deg);
}
</style>
