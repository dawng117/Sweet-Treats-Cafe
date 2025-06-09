<template>
  <div class="fixed top-4 right-4 z-50 flex flex-col gap-2">
    <transition-group name="notification">
      <div
        v-for="notification in notifications"
        :key="notification.id"
        :class="[
          'notification py-3 px-4 rounded-lg shadow-lg max-w-md transform transition-all duration-300 flex items-center',
          {
            'bg-gradient-to-r from-green-50 to-green-100 border-l-4 border-green-500 text-green-700': notification.type === 'success',
            'bg-gradient-to-r from-red-50 to-red-100 border-l-4 border-red-500 text-red-700': notification.type === 'error',
            'bg-gradient-to-r from-blue-50 to-blue-100 border-l-4 border-blue-500 text-blue-700': notification.type === 'info',
            'bg-gradient-to-r from-yellow-50 to-yellow-100 border-l-4 border-yellow-500 text-yellow-700': notification.type === 'warning'
          }
        ]"
        :style="notification.style"
      >
        <!-- Icon based on notification type -->
        <div class="mr-3 flex-shrink-0">
          <svg v-if="notification.type === 'success'" class="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
          </svg>
          <svg v-else-if="notification.type === 'error'" class="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
          </svg>
          <svg v-else-if="notification.type === 'info'" class="h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
          </svg>
          <svg v-else-if="notification.type === 'warning'" class="h-5 w-5 text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
          </svg>
        </div>
        
        <!-- Notification content -->
        <div class="flex-grow">
          <p class="text-sm font-medium">{{ notification.message }}</p>
        </div>
        
        <!-- Close button -->
        <button 
          @click="removeNotification(notification.id)" 
          class="ml-4 flex-shrink-0 text-gray-400 hover:text-gray-500 focus:outline-none"
        >
          <span class="sr-only">Đóng</span>
          <svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>
    </transition-group>
  </div>
</template>

<script setup>
import { computed, onMounted, onBeforeUnmount } from 'vue'
import { useNotificationStore } from '../stores/notification'

const notificationStore = useNotificationStore()

// Get notifications from the store
const notifications = computed(() => notificationStore.notifications)

// Remove notification
const removeNotification = (id) => {
  notificationStore.removeNotification(id)
}

// Set up a cleanup interval to ensure notifications are removed
onMounted(() => {
  // Set default duration
  notificationStore.setDefaultDuration(1800)
  
  // Check for stale notifications every second
  const interval = setInterval(() => {
    const now = Date.now()
    notifications.value.forEach(notification => {
      if (notification.createdAt && (now - notification.createdAt > notification.duration + 500)) {
        removeNotification(notification.id)
      }
    })
  }, 1000)
  
  // Clean up interval when component unmounts
  onBeforeUnmount(() => {
    clearInterval(interval)
  })
})
</script>

<style scoped>
.notification-enter-active,
.notification-leave-active {
  transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.notification-enter-from {
  opacity: 0;
  transform: translateX(50px) scale(0.9);
}

.notification-leave-to {
  opacity: 0;
  transform: translateX(50px) scale(0.9);
}

.notification {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  backdrop-filter: blur(8px);
  border-radius: 8px;
  overflow: hidden;
  position: relative;
}

.notification::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3px;
  background: linear-gradient(to right, 
    var(--progress-color, #10B981), 
    var(--progress-color, #10B981)
  );
  width: 100%;
  animation: progress-shrink linear forwards;
  animation-duration: var(--duration, 3000ms);
}

.notification[class*="success"]::after {
  --progress-color: #10B981;
}

.notification[class*="error"]::after {
  --progress-color: #EF4444;
}

.notification[class*="info"]::after {
  --progress-color: #3B82F6;
}

.notification[class*="warning"]::after {
  --progress-color: #F59E0B;
}

@keyframes slide-in {
  0% {
    transform: translateX(30px);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes progress-shrink {
  0% {
    width: 100%;
  }
  100% {
    width: 0%;
  }
}
</style>