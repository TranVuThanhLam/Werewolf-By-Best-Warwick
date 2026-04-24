<template>
  <div class="lobby-container">
    <header class="lobby-header">
      <button class="back-link" @click="$emit('back')">Hủy phòng</button>
      <div class="room-info">
        <p class="room-label">MÃ PHÒNG</p>
        <h2 class="room-code">{{ roomCode }}</h2>
      </div>
    </header>

    <div class="players-section">
      <div class="section-title">
        <span>NGƯỜI CHƠI ({{ players.length }}/20)</span>
        <div class="pulse-dot"></div>
      </div>

      <div class="players-grid">
        <div v-for="player in players" :key="player.id" class="player-card" :class="{ ready: player.ready }">
          <div class="player-avatar">
            <span class="avatar-icon">{{ player.avatar }}</span>
            <div v-if="player.isHost" class="host-badge">👑</div>
          </div>
          <div class="player-name">{{ player.name }}</div>
          <div class="player-status">
            {{ player.ready ? 'SẴN SÀNG' : 'ĐANG CHỜ...' }}
          </div>
        </div>

        <!-- Slot trống để mời thêm -->
        <div class="player-card invite" @click="copyCode">
          <div class="invite-plus">+</div>
          <div class="player-name">MỜI BẠN</div>
        </div>
      </div>
    </div>

    <div class="lobby-footer">
      <div class="game-settings-preview">
        <span class="setting-item">🐺 x 2</span>
        <span class="setting-item">👁️ x 1</span>
        <span class="setting-item">🧙 x 1</span>
      </div>
      <button class="start-btn" :class="{ 'not-host': !isHost }">
        {{ isHost ? 'BẮT ĐẦU VÁN ĐẤU' : 'CHỜ CHỦ PHÒNG...' }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Lobby",
  props: ['roomCode'],
  emits: ['back'],
  data() {
    return {
      isHost: true, // Giả lập bạn là chủ phòng
      players: [
        { id: 1, name: "Thanh Lâm", avatar: "👤", ready: true, isHost: true },
        { id: 2, name: "Vân Anh", avatar: "🦊", ready: true, isHost: false },
        { id: 3, name: "Hoàng Duy", avatar: "🦅", ready: false, isHost: false }
      ]
    }
  },
  methods: {
    copyCode() {
      navigator.clipboard.writeText(this.roomCode);
      alert("Đã sao chép mã phòng: " + this.roomCode);
    }
  }
}
</script>

<style scoped>
.lobby-container {
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: env(safe-area-inset-top) 20px env(safe-area-inset-bottom);
}

.lobby-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
  position: relative;
}

.back-link {
  position: absolute;
  left: 0;
  top: 0;
  background: transparent;
  border: none;
  color: #666;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
}

.room-info {
  text-align: center;
  background: rgba(255, 255, 255, 0.05);
  padding: 15px 40px;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  margin-top: 20px;
}

.room-label {
  font-size: 0.65rem;
  letter-spacing: 4px;
  color: #ff4d4d;
  margin: 0 0 5px 0;
}

.room-code {
  font-size: 2.2rem;
  font-family: monospace;
  letter-spacing: 6px;
  margin: 0;
  color: #fff;
  text-shadow: 0 0 15px rgba(255, 255, 255, 0.3);
}

.players-section {
  flex: 1;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 30px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  padding: 20px;
  overflow-y: auto;
}

.section-title {
  font-size: 0.75rem;
  letter-spacing: 2px;
  color: #888;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.pulse-dot {
  width: 6px;
  height: 6px;
  background: #4dffda;
  border-radius: 50%;
  animation: pulseColor 2s infinite;
}

@keyframes pulseColor {
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.5); opacity: 0.5; }
  100% { transform: scale(1); opacity: 1; }
}

.players-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
}

.player-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  transition: all 0.3s ease;
}

.player-card.ready {
  border-color: #4dffda;
  background: rgba(77, 255, 218, 0.05);
  box-shadow: inset 0 0 15px rgba(77, 255, 218, 0.05);
}

.player-avatar {
  width: 60px;
  height: 60px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  margin-bottom: 12px;
  position: relative;
}

.host-badge {
  position: absolute;
  top: -5px;
  right: -5px;
  font-size: 1rem;
}

.player-name {
  font-size: 0.95rem;
  font-weight: 600;
  color: #fff;
}

.player-status {
  font-size: 0.65rem;
  margin-top: 5px;
  color: #555;
  letter-spacing: 1px;
}

.ready .player-status { color: #4dffda; }

.player-card.invite {
  border-style: dashed;
  opacity: 0.5;
  cursor: pointer;
}

.invite-plus {
  font-size: 2rem;
  color: #888;
  margin-bottom: 5px;
}

.lobby-footer {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.game-settings-preview {
  display: flex;
  justify-content: center;
  gap: 15px;
}

.setting-item {
  background: rgba(255, 255, 255, 0.05);
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.75rem;
  color: #777;
}

.start-btn {
  width: 100%;
  padding: 20px;
  background: #ff4d4d;
  color: #fff;
  border: none;
  border-radius: 20px;
  font-weight: 700;
  letter-spacing: 2px;
  box-shadow: 0 10px 30px rgba(255, 77, 77, 0.2);
  cursor: pointer;
}

.start-btn.not-host {
  background: rgba(255, 255, 255, 0.05);
  color: #555;
  box-shadow: none;
  cursor: not-allowed;
}

@media (max-width: 600px) {
  .players-grid { grid-template-columns: repeat(2, 1fr); }
}
</style>
