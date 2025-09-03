<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center p-4">
    <div class="max-w-lg w-full bg-white rounded-lg shadow-lg p-8 text-center">
      <h1 class="text-3xl font-bold text-gray-900 mb-8">Onam Unplugged Admin</h1>
      
      <div class="space-y-4">
        <NuxtLink 
          to="/qr-code"
          class="block w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          QR Code Scanner
        </NuxtLink>
        
        <div class="mt-8">
          <h2 class="text-lg font-semibold text-gray-700 mb-4">Test QR Codes:</h2>
          <div class="space-y-2">
            <NuxtLink 
              to="/scan/qr123"
              class="block w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
            >
              Test Scan: qr123 (New Visitor)
            </NuxtLink>
            <NuxtLink 
              to="/scan/qr456"
              class="block w-full bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700 transition-colors"
            >
              Test Scan: qr456 (Already Scanned)
            </NuxtLink>
            <NuxtLink 
              to="/scan/invalid"
              class="block w-full bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
            >
              Test Scan: invalid (Error Case)
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Set page title
useHead({
  title: 'Onam Unplugged Admin - Dashboard'
})
</script>
