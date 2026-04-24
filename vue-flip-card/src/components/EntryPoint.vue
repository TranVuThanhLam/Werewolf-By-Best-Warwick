<template>
  <div class="entry-container">
    <!-- Hệ thống hạt ma thuật (Particles) -->
    <div class="particles-container">
      <div v-for="n in 12" :key="n" :class="'particle p' + n"></div>
    </div>

    <!-- Nền rừng huyền bí -->
    <div class="forest-bg"></div>

    <!-- 💎 Crystal Top Nav -->
    <nav class="top-nav">
      <button class="nav-btn" @click="showAbout = true">
        <span class="nav-icon">ℹ️</span>
        <span class="nav-text">About</span>
      </button>
      <button class="nav-btn" @click="showGuide = true">
        <span class="nav-icon">📜</span>
        <span class="nav-text">Hướng dẫn</span>
      </button>
      <button class="nav-btn donate" @click="showDonate = true">
        <span class="nav-icon">☕</span>
        <span class="nav-text">Donate</span>
      </button>
    </nav>

    <div class="content-overlay">
      <div class="hero-header">
        <div class="brand-badge">THE CHOSEN ONE</div>
        <h1 class="main-title">WEREWOLF</h1>
        <div class="title-glow"></div>
        <p class="subtitle">Định mệnh của bạn nằm trong bóng tối...</p>
      </div>

      <div class="menu-grid">
        <!-- Chế độ Offline - Tông Đỏ/Cam -->
        <div class="menu-item fire" @click="$emit('selectMode', 'single')">
          <div class="item-inner">
            <div class="icon-box">🐺</div>
            <div class="text-box">
              <h3>SĂN MỒI</h3>
              <p>Chơi Offline (5-20 người)</p>
            </div>
          </div>
          <div class="item-visual fire-flare"></div>
        </div>

        <!-- Chế độ Online - Tông Tím/Teal -->
        <div class="menu-item spirit" @click="$emit('selectMode', 'multi')">
          <div class="item-inner">
            <div class="icon-box">🔮</div>
            <div class="text-box">
              <h3>LIÊN MINH</h3>
              <p>Chơi Trực Tuyến (Coming Soon)</p>
            </div>
          </div>
          <div class="item-visual spirit-flare"></div>
        </div>
      </div>

      <footer class="footer-bar">
        <div class="footer-line"></div>
        <div class="footer-text">WARWICK • MYSTIC EDITION • 2026</div>
      </footer>
    </div>
  </div>
</template>

<script>
export default { 
  name: "EntryPoint",
  emits: ['selectMode'],
  data() {
    return {
      showAbout: false,
      showGuide: false,
      showDonate: false,
    }
  }
};
</script>

<style scoped>
/* 🌌 Tổng thể nền đa sắc */
.entry-container {
  flex: 1;
  width: 100%;
  padding: env(safe-area-inset-top) 20px env(safe-area-inset-bottom);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: radial-gradient(circle at center, #1a0b2e 0%, #0c0c1e 60%, #050510 100%);
  position: relative;
  overflow: hidden;
}

/* 💎 Nebula Top Header */
.top-nav {
  position: absolute;
  top: max(15px, calc(env(safe-area-inset-top) + 10px));
  display: flex;
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 50px;
  padding: 6px;
  z-index: 100;
  box-shadow: 0 10px 40px rgba(0,0,0,0.4);
}

.nav-btn {
  display: flex;
  flex-direction: column; /* Icon trên, chữ dưới cho rõ ràng */
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 10px 20px;
  background: transparent;
  border: none;
  border-radius: 40px;
  color: #aaa;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  min-width: 90px;
}

.nav-icon {
  font-size: 1.4rem;
  filter: drop-shadow(0 0 5px rgba(255,255,255,0.2));
  transition: transform 0.3s ease;
}

.nav-text {
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  opacity: 0.8;
}

/* Hiệu ứng riêng cho từng nút */
.nav-btn:hover {
  color: #fff;
  background: rgba(255, 255, 255, 0.05);
}

.nav-btn:hover .nav-icon {
  transform: translateY(-3px) scale(1.1);
}

/* Nút About - Blue Glow */
.nav-btn:nth-child(1):hover .nav-icon { filter: drop-shadow(0 0 10px #4da6ff); }

/* Nút Hướng dẫn - Amber Glow */
.nav-btn:nth-child(2):hover .nav-icon { filter: drop-shadow(0 0 10px #ffda4d); }

/* Nút Donate - Pink Glow */
.nav-btn.donate:hover .nav-icon { filter: drop-shadow(0 0 10px #ff4da6); }
.nav-btn.donate { border-left: 1px solid rgba(255,255,255,0.05); border-radius: 0 40px 40px 0; }

.nav-btn:active {
  transform: scale(0.95);
  background: rgba(255, 255, 255, 0.1);
}

@media (max-width: 600px) {
  .top-nav { width: 92%; justify-content: space-around; }
  .nav-btn { min-width: 80px; padding: 8px 10px; }
  .nav-text { font-size: 0.65rem; }
}

/* 🌲 Bóng rừng rậm */
.forest-bg {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 40%;
  background: linear-gradient(to top, rgba(12, 45, 12, 0.4) 0%, transparent 100%);
  mask-image: url('https://www.transparenttextures.com/patterns/black-thread.png');
  pointer-events: none;
}

/* ✨ Ma trận hạt đa sắc */
.particles-container {
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.particle {
  position: absolute;
  border-radius: 50%;
  filter: blur(2px);
  animation: floatUp infinite ease-in-out;
}

.p1, .p4, .p7 { background: rgba(255, 77, 77, 0.4); width: 6px; height: 6px; }
.p2, .p5, .p8 { background: rgba(125, 77, 255, 0.4); width: 8px; height: 8px; }
.p3, .p6, .p9 { background: rgba(77, 255, 218, 0.3); width: 4px; height: 4px; }

.p1 { left: 10%; bottom: -10%; animation-duration: 15s; }
.p2 { left: 40%; bottom: -5%; animation-duration: 20s; animation-delay: 2s; }
.p3 { left: 80%; bottom: -12%; animation-duration: 18s; animation-delay: 5s; }
.p4 { left: 20%; bottom: -8%; animation-duration: 22s; }
.p5 { left: 60%; bottom: -15%; animation-duration: 25s; }

@keyframes floatUp {
  0% { transform: translateY(0) rotate(0deg); opacity: 1; }
  100% { transform: translateY(-120vh) rotate(360deg); opacity: 0; }
}

/* 🎭 Hero Header */
.hero-header {
  text-align: center;
  margin-bottom: 50px;
  position: relative;
}

.brand-badge {
  display: inline-block;
  padding: 4px 16px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  font-size: 0.7rem;
  letter-spacing: 4px;
  color: #ffda4d;
  margin-bottom: 20px;
}

.main-title {
  font-family: 'Charm', cursive;
  font-size: clamp(3.5rem, 15vw, 6rem);
  font-weight: 700;
  letter-spacing: 12px;
  margin: 0;
  background: linear-gradient(to right, #fff, #ff4d4d, #7d4dff, #fff);
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shineTitle 8s linear infinite;
}

@keyframes shineTitle {
  to { background-position: 200% center; }
}

.title-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 120%;
  height: 100%;
  background: radial-gradient(circle, rgba(125, 77, 255, 0.15), transparent 70%);
  z-index: -1;
  filter: blur(20px);
}

.subtitle {
  font-size: 0.95rem;
  color: #8a8aa3;
  margin-top: 15px;
  letter-spacing: 1px;
}

/* 🧭 Menu Grid */
.content-overlay {
  z-index: 10;
  width: 100%;
  max-width: 440px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 60px; /* Chừa chỗ cho top-nav */
}

.menu-grid {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.menu-item {
  position: relative;
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  padding: 22px;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
  overflow: hidden;
}

.item-inner {
  display: flex;
  align-items: center;
  gap: 20px;
  position: relative;
  z-index: 2;
}

.icon-box {
  width: 54px;
  height: 54px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
}

.text-box h3 {
  margin: 0;
  font-size: 1.2rem;
  font-weight: 700;
  letter-spacing: 1px;
}

.text-box p {
  margin: 4px 0 0;
  font-size: 0.8rem;
  color: #72728f;
}

/* Biến thể màu sắc cho từng nút */
.fire h3 { color: #ff6e6e; }
.fire .item-visual { background: radial-gradient(circle at right, rgba(255, 77, 77, 0.2), transparent 70%); }

.spirit h3 { color: #a481ff; }
.spirit .item-visual { background: radial-gradient(circle at right, rgba(12, 45, 12, 0.4), transparent 70%); }

.item-visual {
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.menu-item:hover {
  transform: translateX(8px);
  background: rgba(255, 255, 255, 0.06);
  border-color: rgba(255, 255, 255, 0.2);
}

.menu-item.disabled {
  opacity: 0.5;
  filter: grayscale(0.8);
  cursor: not-allowed;
}

/* 📋 Footer */
.footer-bar {
  margin-top: 50px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}

.footer-line {
  width: 40px;
  height: 2px;
  background: #ff4d4d;
  box-shadow: 0 0 10px #ff4d4d;
}

.footer-text {
  font-size: 0.7rem;
  letter-spacing: 5px;
  color: #3b3b52;
}

@media (max-width: 600px) {
  .main-title { font-size: 4rem; letter-spacing: 6px; }
  .menu-item { padding: 18px; }
  .nav-text { display: none; } /* Mobile: chỉ hiện icon cho gọn */
  .nav-btn { padding: 8px 12px; }
}
</style>
