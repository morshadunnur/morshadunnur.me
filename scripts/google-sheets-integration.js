// This script should be deployed as a Google Apps Script Web App
// 1. Go to https://script.google.com/
// 2. Create a new project
// 3. Copy and paste this code
// 4. Deploy as a web app (accessible to anyone, even anonymous)
// 5. Copy the web app URL and use it in your contact.astro file

// Load environment variables from Properties Service
function getConfig() {
  const scriptProperties = PropertiesService.getScriptProperties();
  return {
    SHEET_ID: scriptProperties.getProperty('SHEET_ID'),
    SHEET_NAME: scriptProperties.getProperty('SHEET_NAME'),
    DISCORD_WEBHOOK_URL: scriptProperties.getProperty('DISCORD_WEBHOOK_URL')
  };
}

function doPost(e) {
  try {
    // Get configuration
    const config = getConfig();
    
    // Parse the JSON data from the request
    const data = JSON.parse(e.postData.contents);
    
    // Validate the data
    validateData(data);
    
    // Open the spreadsheet and get the sheet
    const ss = SpreadsheetApp.openById(config.SHEET_ID);
    let sheet = ss.getSheetByName(config.SHEET_NAME);
    
    // If the sheet doesn't exist, create it with headers
    if (!sheet) {
      sheet = ss.insertSheet(config.SHEET_NAME);
      sheet.appendRow(['Timestamp', 'Name', 'Email', 'Subject', 'Message']);
      sheet.getRange('A1:E1').setFontWeight('bold');
    }
    
    // Append the form data to the sheet
    sheet.appendRow([
      new Date().toISOString(),
      data.name,
      data.email,
      data.subject,
      data.message
    ]);
    
    // Send notification to Discord if webhook URL is configured
    if (config.DISCORD_WEBHOOK_URL) {
      sendDiscordNotification(data, config.DISCORD_WEBHOOK_URL);
    }
    
    // Return success response
    return ContentService.createTextOutput(JSON.stringify({
      result: 'success',
      message: 'Data added to Google Sheets'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    // Log the error
    logError(error, e?.postData?.contents);
    
    // Return error response
    return ContentService.createTextOutput(JSON.stringify({
      result: 'error',
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService.createTextOutput(JSON.stringify({
    result: 'error',
    message: 'This web app requires a POST request'
  })).setMimeType(ContentService.MimeType.JSON);
}

// Utility function to validate the incoming data
function validateData(data) {
  if (!data.name || !data.email || !data.subject || !data.message) {
    throw new Error('Missing required fields');
  }
  
  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    throw new Error('Invalid email format');
  }
  
  return true;
}

// Function to send notification to Discord
function sendDiscordNotification(data, webhookUrl) {
  try {
    const payload = {
      embeds: [{
        title: "New Contact Form Submission",
        color: 3447003, // Blue color
        fields: [
          {
            name: "Name",
            value: data.name,
            inline: true
          },
          {
            name: "Email",
            value: data.email,
            inline: true
          },
          {
            name: "Subject",
            value: data.subject
          },
          {
            name: "Message",
            value: data.message
          }
        ],
        timestamp: new Date().toISOString()
      }]
    };
    
    const options = {
      method: "post",
      contentType: "application/json",
      payload: JSON.stringify(payload)
    };
    
    UrlFetchApp.fetch(webhookUrl, options);
  } catch (error) {
    console.error("Failed to send Discord notification:", error);
  }
}

// Function to log errors to a separate sheet for debugging
function logError(error, data) {
  try {
    const config = getConfig();
    const ss = SpreadsheetApp.openById(config.SHEET_ID);
    let errorSheet = ss.getSheetByName('Error Logs');
    
    if (!errorSheet) {
      errorSheet = ss.insertSheet('Error Logs');
      errorSheet.appendRow(['Timestamp', 'Error Message', 'Request Data']);
      errorSheet.getRange('A1:C1').setFontWeight('bold');
    }
    
    errorSheet.appendRow([
      new Date().toISOString(),
      error.toString(),
      JSON.stringify(data || {})
    ]);
  } catch (e) {
    // Silent fail if error logging itself fails
    console.error('Failed to log error:', e);
  }
}