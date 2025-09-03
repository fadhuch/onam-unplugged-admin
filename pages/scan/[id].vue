<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center p-4">
    <div class="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
      <!-- Loading State -->
      <div v-if="loading" class="text-center">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p class="text-gray-600">Scanning QR Code...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center">
        <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </div>
        <h2 class="text-xl font-semibold text-gray-900 mb-2">Scan Failed</h2>
        <p class="text-red-600 mb-4">{{ error }}</p>
        <button 
          @click="retryScan"
          class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
        >
          Try Again
        </button>
      </div>

      <!-- Success State -->
      <div v-else-if="visitor" class="text-center">
        <!-- Scan Count Badge -->
        <div 
          class="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold"
          :class="scanCount === 1 ? 'bg-green-500' : 'bg-red-500'"
        >
          {{ scanCount }}
        </div>

        <!-- Status Message -->
        <h2 
          class="text-2xl font-semibold mb-2"
          :class="scanCount === 1 ? 'text-green-600' : 'text-red-600'"
        >
          {{ scanCount === 1 ? 'Welcome!' : 'Multiple Scans Detected' }}
        </h2>

        <!-- Visitor Info -->
        <div class="bg-gray-50 rounded-lg p-4 mb-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ visitor.name }}</h3>
          <p class="text-sm text-blue-600 font-mono mb-2">ID: {{ visitor.qrId }}</p>
          <p class="text-sm text-gray-600 mb-1">Status: 
            <span class="capitalize font-medium" :class="getStatusColor(visitor.status)">
              {{ visitor.status }}
            </span>
          </p>
          <p class="text-sm text-gray-600">Total Scans: 
            <span 
              class="font-bold"
              :class="scanCount === 1 ? 'text-green-600' : 'text-red-600'"
            >
              {{ scanCount }}
            </span>
          </p>
          <p v-if="visitor.lastScannedAt" class="text-xs text-gray-500 mt-2">
            Last scanned: {{ formatDate(visitor.lastScannedAt) }}
          </p>
        </div>

        <!-- Action Message -->
        <div 
          class="p-4 rounded-lg mb-4"
          :class="scanCount === 1 ? 'bg-green-100 border border-green-300' : 'bg-red-100 border border-red-300'"
        >
          <p 
            class="text-sm font-medium"
            :class="scanCount === 1 ? 'text-green-800' : 'text-red-800'"
          >
            {{ scanCount === 1 
              ? 'This is the first scan. Visitor has been checked in successfully.' 
              : `Warning: This QR code has been scanned ${scanCount} times. Please verify with security.` 
            }}
          </p>
        </div>

        <!-- Back Button -->
        <button 
          @click="goBack"
          class="w-full bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Visitor {
  qrId: string
  name: string
  status: string
  scanCount: number
  lastScannedAt: string
}

// Reactive data
const loading = ref(true)
const error = ref<string | null>(null)
const visitor = ref<Visitor | null>(null)
const scanCount = ref(0)

// Get the route parameter
const route = useRoute()
const router = useRouter()

// Methods
const scanQRCode = async (qrId: string) => {
  try {
    loading.value = true
    error.value = null
    
    const { useVisitorApi } = await import('~/composables/useVisitorApi')
    const api = useVisitorApi()
    const response = await api.scanQRCode(qrId)
    
    visitor.value = response.data.visitor
    scanCount.value = response.data.visitor.scanCount
    
  } catch (err: any) {
    console.error('Error scanning QR code:', err)
    if (err.status === 404) {
      error.value = 'Visitor not found. Invalid QR code.'
    } else {
      error.value = 'Failed to scan QR code. Please try again.'
    }
  } finally {
    loading.value = false
  }
}

const retryScan = async () => {
  const qrId = route.params.id as string
  if (qrId) {
    await scanQRCode(qrId)
  }
}

const goBack = () => {
  router.push('/qr-code')
}

const getStatusColor = (status: string) => {
  const colors: Record<string, string> = {
    'pending': 'text-yellow-600',
    'checked-in': 'text-green-600',
    'checked-out': 'text-gray-600'
  }
  return colors[status] || 'text-gray-600'
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// On mounted - call API when page loads
onMounted(async () => {
  const qrId = route.params.id as string
  if (qrId) {
    await scanQRCode(qrId)
  } else {
    error.value = 'Invalid QR code'
    loading.value = false
  }
})
</script>
