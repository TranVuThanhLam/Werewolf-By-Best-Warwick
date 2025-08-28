<template>
  <div class="entry-container">
    <div class="moon"></div>
    <div class="header">
      <h1 class="title">Werewolf by Best Warwick</h1>
      <p class="subtitle">Chọn cách bạn muốn tham gia trò chơi</p>
    </div>

    <div class="button-container">
      <button class="option single" @click="$emit('selectMode', 'single')">
        🐺 1 Thiết bị
      </button>
      <button class="option multi" disabled>
        🌑 Nhiều Thiết bị <span class="coming">(sắp có)</span>
      </button>
    </div>
  </div>
</template>

<script>
export default { name: "EntryPoint" };
</script>

<style scoped>
.entry-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: radial-gradient(circle at bottom, #2b2b2b 0%, #1a1a1a 60%, #0a0a0a 100%);
  color: white;
  text-align: center;
  padding: 20px;
  position: relative;
  overflow: hidden;
}

/* 🌕 Trăng máu */
.moon {
  position: absolute;
  top: 40px;
  right: 60px;
  width: 140px;
  height: 140px;
  background: radial-gradient(circle, #ff4d4d 40%, #b30000 75%, #660000 90%, transparent 100%);
  border-radius: 50%;
  box-shadow: 0 0 50px rgba(255, 50, 50, 0.8),
              0 0 80px rgba(255, 100, 50, 0.6);
  z-index: 0;
}

.header {
  margin-bottom: 50px;
  z-index: 1;
}

.title {
  font-family: "Charm", cursive;
  font-size: 2.8rem;
  font-weight: bold;
  margin: 0;
  background: linear-gradient(120deg, #bbb, #eee, #999, #ff4444, #b30000);
  background-size: 300% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shimmer 5s ease-out 1;
  text-shadow: 
    0 0 15px rgba(255,80,80,0.6),
    0 0 25px rgba(200,0,0,0.6),
    0 0 35px rgba(255,150,100,0.5);
}

@keyframes shimmer {
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
}

.subtitle {
  font-size: 1.2rem;
  margin-top: 12px;
  color: #ffae7a; /* cam vàng rõ nét */
  text-shadow: 0 0 10px rgba(255,100,50,0.8),
               0 0 18px rgba(200,50,0,0.6);
}

.button-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  max-width: 320px;
  z-index: 1;
}

.option {
  padding: 18px;
  border: none;
  border-radius: 14px;
  font-size: 1.4rem;
  font-family: "Charm", cursive;
  font-weight: bold;
  cursor: pointer;
  color: white;
  transition: all 0.3s ease;
  box-shadow: 0 6px 14px rgba(0,0,0,0.6);
}

/* 🔥 Nút đỏ máu */
.option.single {
  background: linear-gradient(135deg, #ff3b3b, #b30000, #660000, #444);
  color: #fff;
  border: 1px solid #ff4d4d;
  text-shadow: 0 0 6px rgba(0,0,0,0.8);
}
.option.single:hover {
  transform: scale(1.07);
  box-shadow: 0 0 25px rgba(255,60,60,0.9),
              0 0 40px rgba(200,0,0,0.7);
}

/* 🌑 Nút xám sói */
.option.multi {
  background: linear-gradient(135deg, #555, #333, #222);
  border: 1px solid rgba(255,80,80,0.4);
  opacity: 0.7;
  cursor: not-allowed;
}
.coming {
  display: block;
  font-size: 0.85rem;
  color: #ff6666;
  margin-top: 4px;
  font-style: italic;
}
</style>
