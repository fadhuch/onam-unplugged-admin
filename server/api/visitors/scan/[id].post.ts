// Mock data for demonstration
const mockVisitors: Record<string, any> = {
  'qr123': {
    qrId: 'qr123',
    name: 'John Doe',
    status: 'pending',
    scanCount: 0,
    lastScannedAt: null
  },
  'qr456': {
    qrId: 'qr456',
    name: 'Jane Smith',
    status: 'checked-in',
    scanCount: 2,
    lastScannedAt: '2024-01-15T10:30:00Z'
  }
}

export default defineEventHandler(async (event) => {
  const qrId = getRouterParam(event, 'id')
  
  if (!qrId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'QR ID is required'
    })
  }
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  const visitor = mockVisitors[qrId]
  
  if (!visitor) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Visitor not found'
    })
  }
  
  // Increment scan count and update last scanned time
  visitor.scanCount += 1
  visitor.lastScannedAt = new Date().toISOString()
  visitor.status = 'checked-in'
  
  return {
    visitor: {
      qrId: visitor.qrId,
      name: visitor.name,
      status: visitor.status,
      scanCount: visitor.scanCount,
      lastScannedAt: visitor.lastScannedAt
    }
  }
})
