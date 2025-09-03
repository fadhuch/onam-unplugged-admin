<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center p-4">
    <div class="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
      <h1 class="text-2xl font-bold text-gray-900 mb-8">QR Code Scanner</h1>
      
      <div class="space-y-6">
        <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p class="text-blue-800 text-sm">
            In a real implementation, this would contain a QR code scanner component.
            For now, you can use the test links on the dashboard.
          </p>
        </div>
        
        <NuxtLink 
          to="/"
          class="block w-full bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors"
        >
          Back to Dashboard
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'QR Code Scanner - Onam Unplugged Admin'
})
</script>
