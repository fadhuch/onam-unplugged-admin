export const useVisitorApi = () => {
  // Use runtime config for base URL, fallback to direct URL
  const config = useRuntimeConfig?.() 
  const baseURL = config?.public?.apiBaseUrl || 'https://api.cartiquestore.com'
  
  const scanQRCode = async (qrId: string) => {
    try {
      const { data } = await $fetch(`${baseURL}/api/visitors/scan/${qrId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      
      return {
        data: {
          visitor: {
            qrId: data.visitor.qrId,
            name: data.visitor.name,
            status: data.visitor.status,
            scanCount: data.visitor.scanCount,
            lastScannedAt: data.visitor.lastScannedAt
          }
        }
      }
    } catch (error) {
      console.error('API Error:', error)
      throw error
    }
  }
  
  const getVisitor = async (id: string) => {
    try {
      const { data } = await $fetch(`${baseURL}/api/visitors/${id}`)
      return { data }
    } catch (error) {
      console.error('API Error:', error)
      throw error
    }
  }
  
  const updateVisitorStatus = async (id: string, status: string) => {
    try {
      const { data } = await $fetch(`${baseURL}/api/visitors/${id}`, {
        method: 'PATCH',
        body: { status }
      })
      return { data }
    } catch (error) {
      console.error('API Error:', error)
      throw error
    }
  }
  
  return {
    scanQRCode,
    getVisitor,
    updateVisitorStatus
  }
}
