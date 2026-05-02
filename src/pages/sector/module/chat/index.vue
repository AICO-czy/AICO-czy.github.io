<template>
  <q-dialog v-model="alert" seamless>
    <div class="chat-box">
      <!-- 标题 -->
      <div class="chat-title">
        交通智能助手
      </div>
      <!-- 关闭按钮 -->
      <div class="chat-close" @click="close">
      </div>
      <!-- 聊天界面主体 -->
      <div class="chat-content">
        <!-- 消息滚动区 -->
        <div class="message-list" ref="listRef">
          <!-- 机器人欢迎语 -->
          <div class="msg-row bot">
            <div class="avatar bot-avatar"></div>
            <div class="bubble bot-bubble">小承为您服务，请向小承提问吧。</div>
          </div>

          <!-- 历史消息 -->
          <div
            v-for="(m, i) in messages"
            :key="i"
            class="msg-row"
            :class="m.role"
          >
            <div class="avatar" :class="m.role === 'bot' ? 'bot-avatar' : 'user-avatar'"></div>
            <div class="bubble" :class="m.role === 'bot' ? 'bot-bubble' : 'user-bubble'">
              {{ m.text }}
            </div>
          </div>
        </div>

        <!-- 输入与发送区 -->
        <div class="composer">
          <label for="chat-input" class="sr-only">指令输入</label>
          <input
          v-model="inputText"
          type="text"
          name="chatCommand"
          id="chat-input"
          class="composer-input"
          placeholder="请输入想要操作的指令"
          @keyup.enter="handleSend"
          />
          <button class="composer-send" @click="handleSend">发送</button>
        </div>
      </div>

      <!-- 机器人立牌 -->
      <div class="robot-stand"></div>
    </div>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue'

type ChatMessage = { role: 'bot' | 'user'; text: string }

const alert = ref(false)

const messages = ref<ChatMessage[]>([])
const inputText = ref('')
const listRef = ref<HTMLDivElement | null>(null)

function scrollToBottom() {
  nextTick(() => {
    const el = listRef.value
    if (!el) return
    el.scrollTop = el.scrollHeight
  })
}

function handleSend() {
  const text = inputText.value.trim()
  if (!text) return
  messages.value.push({ role: 'user', text })
  inputText.value = ''
  scrollToBottom()

  // 机器人占位回复（稍后你可替换为真实接口）
  setTimeout(() => {
    messages.value.push({ role: 'bot', text: `收到：${text}` })
    scrollToBottom()
  }, 400)
}

const open = () => {
  alert.value = true
}

const close = () => {
  alert.value = false
}

defineExpose({
  open,
  close
})
</script>

<style scoped lang="scss">
.q-dialog__inner--minimized > div {
  max-width: 872px !important;
  overflow: none !important;
  min-height: 1315px !important;
}
.q-dialog__inner > div {
  overflow: visible !important;
}
.chat-box {
  width: 872px !important;
  height: 1315px !important;
  position: absolute;
  left: 2037px;
  bottom: 214px;
  background: url('assets/image/lefty/chat_bg.png') no-repeat 100%/100%;
  padding: 125px 50px 70px 50px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  z-index: 9999; /* 保证在最上层可点击 */
  pointer-events: auto;
  .chat-title {
    font-family: AlibabaPuHuiTiRegular;
    font-weight: 700;
    font-size: 50px;
    line-height: 69px;
    text-align: left;
    font-style: normal;
    text-transform: none;
    position: absolute;
    left: 60px;
    top: 12px;
    color: #fff;
    letter-spacing: 10px;
    // 文字倾斜
    transform: skewX(-10deg);
  }
  .chat-close {
    width: 42px;
    height: 42px;
    background: url('assets/image/lefty/close-btn.png') no-repeat 100%/100%;
    position: absolute;
    right: 30px;
    top: 48px;
  }
  .chat-content {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
    z-index: 2;
    min-height: 0; /* 关键：允许子项在剩余空间内收缩，避免溢出 */
    overflow: hidden; /* 防止内部内容绘制到容器之外 */
  }

  /* 消息列表区域（可滚动） */
  .message-list {
    flex: 1;
    overflow-y: auto;
    padding-right: 6px;
    /* 隐藏滚动条 */
    &::-webkit-scrollbar {
      display: none;
    }
    min-height: 0; /* 关键：在flex容器内启用滚动而非撑开 */
  }

  .msg-row {
    display: flex;
    align-items: flex-start;
    gap: 16px;
    margin-bottom: 20px;
  }

  .msg-row.user {
    flex-direction: row-reverse;
  }

  .avatar {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: rgba(255,255,255,0.2);
    flex: 0 0 56px;
  }

  .bot-avatar { background: url('assets/image/lefty/chatBot-icon.png') no-repeat center/contain; }
  .user-avatar { background: url('assets/image/lefty/chat-user.png') no-repeat center/contain; }

  .bubble {
    max-width: 540px;
    padding: 18px 20px;
    border-radius: 12px;
    font-size: 28px;
    line-height: 40px;
    color: #d7edff;
    box-sizing: border-box;
  }

  .bot-bubble {
    background: rgba(24, 66, 104, 0.6);
    border: 1px solid rgba(132, 197, 255, 0.35);
  }

  .user-bubble {
    background: rgba(19, 54, 84, 0.6);
    border: 1px solid rgba(132, 197, 255, 0.35);
  }

  /* 输入区 */
  .composer {
    display: flex;
    gap: 12px;
    margin-top: 12px;
    flex: 0 0 80px; /* 固定输入区高度，避免与消息区竞争高度 */
  }

  .composer-input {
    flex: 1;
    height: 64px;
    border-radius: 10px;
    border: 1px solid rgba(132, 197, 255, 0.4);
    background: rgba(10, 28, 46, 0.4);
    color: #cfe9ff;
    font-size: 24px;
    padding: 0 16px;
    outline: none;
  }

  .composer-send {
    width: 140px;
    height: 64px;
    border-radius: 10px;
    background: rgba(46, 140, 234, 0.85);
    color: #fff;
    border: none;
    font-size: 26px;
    cursor: pointer;
  }

  .robot-stand {
    width: 240px;
    height: 378px;
    position: absolute;
    background: url('assets/image/lefty/bot-icon.png') no-repeat 100%/100%;
    left: -279px;
    top: 1074px;
    pointer-events: none; /* 不拦截点击，避免遮挡输入框 */
    z-index: 1;
  }

  /* 无障碍隐藏但可供屏幕阅读器读取 */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0,0,0,0);
    white-space: nowrap;
    border: 0;
  }
}

</style>
