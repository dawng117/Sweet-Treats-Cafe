import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useNotificationStore = defineStore('notification', () => {
  const notifications = ref([])
  let defaultDuration = 3000 // Default to 3 seconds
  const timeouts = {} // Store timeout IDs to cancel if needed
  
  function setDefaultDuration(duration) {
    defaultDuration = duration
  }
  
  function addNotification(message, type = 'info', duration = defaultDuration) {
    const id = Date.now()
    const createdAt = Date.now()
    
    // Add notification with creation timestamp
    notifications.value.push({
      id,
      message,
      type, // 'success', 'error', 'info', 'warning'
      duration,
      createdAt,
      style: { '--duration': `${duration}ms` }
    })
    
    // Set up the timeout to remove the notification
    timeouts[id] = setTimeout(() => {
      removeNotification(id)
    }, duration)
    
    return id
  }
  
  function removeNotification(id) {
    // Clear timeout if it exists
    if (timeouts[id]) {
      clearTimeout(timeouts[id])
      delete timeouts[id]
    }
    
    // Remove notification from the list
    notifications.value = notifications.value.filter(notification => notification.id !== id)
  }
  
  function clearAllNotifications() {
    // Clear all timeouts
    Object.keys(timeouts).forEach(id => {
      clearTimeout(timeouts[id])
      delete timeouts[id]
    })
    
    notifications.value = []
  }
  
  return {
    notifications,
    addNotification,
    removeNotification,
    clearAllNotifications,
    setDefaultDuration
  }
})