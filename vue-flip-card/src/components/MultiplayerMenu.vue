<template>
  <div class="menu-container">
    <header class="header">
      <button class="back-btn" @click="$emit('back')">← QUAY LẠI</button>
      <h1 class="title">LIÊN MINH</h1>
      <p class="subtitle">Kết nối linh hồn, săn lùng bóng đêm</p>
    </header>

    <div class="options-stack">
      <!-- Nút Tạo Phòng -->
      <div v-if="!showJoinInput" class="menu-option create" @click="createRoom">
        <div class="option-glow"></div>
        <div class="option-content">
          <span class="option-icon">🔮</span>
          <div class="option-text">
            <h3>TẠO PHÒNG MỚI</h3>
            <p>Trở thành Quản Trò & Host ván đấu</p>
          </div>
        </div>
      </div>

      <!-- Nút Tham Gia -->
      <div v-if="!showJoinInput" class="menu-option join" @click="showJoinInput = true">
        <div class="option-content">
          <span class="option-icon">🔑</span>
          <div class="option-text">
            <h3>THAM GIA PHÒNG</h3>
            <p>Nhập mã để vào hội nghị linh hồn</p>
          </div>
        </div>
      </div>

      <!-- Khu vực nhập mã (Xuất hiện khi chọn Tham Gia) -->
      <div v-if="showJoinInput" class="join-zone">
        <p class="join-label">NHẬP MÃ PHÒNG (6 KÝ TỰ)</p>
        <div class="code-input-group">
          <input 
            v-model="inputCode" 
            type="text" 
            maxlength="6" 
            placeholder="......"
            class="code-input"
            @input="inputCode = inputCode.toUpperCase()"
          />
        </div>
        <div class="join-actions">
          <button class="confirm-btn" :disabled="inputCode.length !== 6" @click="joinRoom">
            XÁC NHẬN NHẬP PHÒNG
          </button>
          <button class="cancel-link" @click="showJoinInput = false">Hủy bỏ</button>
        </div>
      </div>
    </div>

    <footer class="connection-status">
      <span class="status-dot green"></span> SERVER: MYSTIC NORTH-1 • LOW LATENCY
    </footer>
  </div>
</template>

<script>
export default {
  name: "MultiplayerMenu",
  emits: ['back', 'create', 'join'],
  data() {
    return {
      showJoinInput: false,
      inputCode: ""
    }
  },
  methods: {
    createRoom() {
      // Logic sinh mã phòng ngẫu nhiên
      const characters = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
      let result = '';
      for (let i = 0; i < 6; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
      }
      this.$emit('create', result);
    },
    joinRoom() {
      if (this.inputCode.length === 6) {
        this.$emit('join', this.inputCode);
      }
    }
  }
}
</script>

<style scoped>
.menu-container {
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: env(safe-area-inset-top) 24px env(safe-area-inset-bottom);
  align-items: center;
  justify-content: center;
}

.header {
  text-align: center;
  margin-bottom: 40px;
  width: 100%;
}

.back-btn {
  background: transparent;
  border: none;
  color: #ff4d4d;
  font-weight: 700;
  letter-spacing: 2px;
  font-size: 0.8rem;
  margin-bottom: 20px;
  cursor: pointer;
}

.title {
  font-family: 'Charm', cursive;
  font-size: 3rem;
  letter-spacing: 8px;
  margin: 0;
  color: #a481ff;
  text-shadow: 0 0 20px rgba(164, 129, 255, 0.4);
}

.subtitle {
  color: #72728f;
  font-size: 0.9rem;
  letter-spacing: 1px;
}

.options-stack {
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.menu-option {
  position: relative;
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 24px;
  padding: 24px;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  overflow: hidden;
}

.menu-option:active { transform: scale(0.96); }

.menu-option.create {
  border-left: 5px solid #a481ff;
  background: rgba(164, 129, 255, 0.05);
}

.option-glow {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(164, 129, 255, 0.1), transparent);
  animation: sweep 4s infinite;
}

@keyframes sweep { to { left: 100%; } }

.option-content {
  display: flex;
  align-items: center;
  gap: 20px;
}

.option-icon { font-size: 2.2rem; }

.option-text h3 {
  margin: 0;
  font-size: 1.2rem;
  font-weight: 700;
  color: #fff;
}

.option-text p {
  margin: 4px 0 0;
  font-size: 0.8rem;
  color: #72728f;
}

/* 🎫 Join Zone Styles */
.join-zone {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  padding: 30px 20px;
  text-align: center;
  animation: fadeIn 0.4s ease-out;
}

@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

.join-label {
  font-size: 0.75rem;
  letter-spacing: 3px;
  color: #4dffda;
  margin-bottom: 20px;
  font-weight: 700;
}

.code-input {
  background: rgba(0,0,0,0.3);
  border: 2px solid rgba(77, 255, 218, 0.2);
  border-radius: 12px;
  padding: 15px;
  width: 100%;
  text-align: center;
  font-size: 2rem;
  letter-spacing: 12px;
  color: #4dffda;
  font-family: monospace;
  margin-bottom: 25px;
  outline: none;
  transition: all 0.3s;
}

.code-input:focus {
  border-color: #4dffda;
  box-shadow: 0 0 20px rgba(77, 255, 218, 0.2);
}

.confirm-btn {
  width: 100%;
  padding: 16px;
  background: #4dffda;
  color: #000;
  border: none;
  border-radius: 12px;
  font-weight: 700;
  letter-spacing: 1px;
  cursor: pointer;
}

.confirm-btn:disabled { opacity: 0.3; cursor: not-allowed; }

.cancel-link {
  background: transparent;
  border: none;
  color: #555;
  margin-top: 15px;
  font-size: 0.85rem;
  cursor: pointer;
}

.connection-status {
  margin-top: 40px;
  font-size: 0.65rem;
  color: #444;
  letter-spacing: 1px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.status-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
}
.green { background: #4dffda; box-shadow: 0 0 5px #4dffda; }
</style>
