// Enhanced logging middleware for Manifest backend
const express = require('express');

const loggingMiddleware = (req, res, next) => {
  const timestamp = new Date().toISOString();
  const method = req.method;
  const url = req.url;
  const userAgent = req.get('User-Agent') || 'Unknown';
  const appId = req.get('X-App-ID') || 'Unknown';
  
  console.log(`🔍 [BACKEND] ${timestamp} - ${method} ${url}`);
  console.log(`🔍 [BACKEND] App ID: ${appId}`);
  console.log(`🔍 [BACKEND] User-Agent: ${userAgent}`);
  console.log(`🔍 [BACKEND] Headers:`, req.headers);
  
  if (req.body && Object.keys(req.body).length > 0) {
    console.log(`🔍 [BACKEND] Request Body:`, req.body);
  }
  
  // Log response
  const originalSend = res.send;
  res.send = function(data) {
    console.log(`✅ [BACKEND] ${timestamp} - ${method} ${url} - Status: ${res.statusCode}`);
    if (data && typeof data === 'string' && data.length < 1000) {
      console.log(`✅ [BACKEND] Response Data:`, data);
    }
    originalSend.call(this, data);
  };
  
  next();
};

module.exports = loggingMiddleware;