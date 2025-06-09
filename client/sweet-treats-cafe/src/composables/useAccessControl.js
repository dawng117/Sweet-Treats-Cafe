const useAccessControl = () => {
  const router = useRouter()
  const authStore = useAuthStore()

  const checkAccess = (requiresAuth = false, requiresAdmin = false) => {
    if (requiresAuth && !authStore.isAuthenticated) {
      router.push('/login')
      return false
    }

    if (requiresAdmin && !authStore.isAdmin) {
      router.push('/access-denied')
      return false
    }

    return true
  }

  return {
    checkAccess
  }
}

export default useAccessControl