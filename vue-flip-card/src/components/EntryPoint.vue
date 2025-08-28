<template>
  <div class="entry-container">
    <div class="header">
      <h1 class="title">Werewolf-By-Best-Warwick</h1>
      <p class="subtitle">Bạn chơi 1 thiết bị hay nhiều thiết bị?</p>
    </div>

    <div class="button-container">
      <button class="option top" @click="$emit('selectMode', 'single')">
        1 Thiết bị
      </button>
      <button class="option bottom" disabled>
        Nhiều thiết bị
      </button>
    </div>
  </div>
</template>

<script>
export default { name: "EntryPoint" };
</script>

<style>
.entry-container {
  display: flex;
  flex-direction: column;
  flex: 1;         /* 🚀 chiếm trọn page-container */
  min-height: 0;   /* cho phép nội dung co giãn */
}

.header {
  padding: 12px 16px;
}
.title {
  text-align: center;
  font-size: 1.6rem;
  font-weight: bold;
  margin: 0;
  padding-bottom: 8px;
  color: #ff4b1f;
  text-shadow: 2px 2px 5px #1f1c18;
  border-bottom: 2px solid #ff4b1f;
}
.subtitle {
  text-align: center;
  font-size: 1.2rem;
  margin: 10px 0 0;
  color: #ddd;
}

.button-container {
  flex: 1; /* chiếm hết chỗ còn lại */
  display: flex;
  flex-direction: column;
  padding: 10px;
}
.option {
  flex: 1;
  margin: 8px 0;
  border: none;
  border-radius: 20px;
  font-size: 1.8rem;
  font-weight: bold;
  cursor: pointer;
  color: white;
  transition: 0.2s;
}
.option:active { transform: scale(0.95); }
.top { background: linear-gradient(135deg, #ff4b1f, #1f1c18); }
.bottom { background: linear-gradient(135deg, #4b134f, #2c003e); opacity: 0.95; cursor: not-allowed; }
</style>
