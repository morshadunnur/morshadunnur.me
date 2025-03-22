// Discord Webhook Integration
// This script can be used to test the Discord webhook locally before deploying

const DISCORD_WEBHOOK_URL = 'YOUR_DISCORD_WEBHOOK_URL';

async function sendDiscordNotification(formData) {
  try {
    const response = await fetch(DISCORD_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        content: `New contact form submission from ${formData.name}!`,
        embeds: [{
          title: formData.subject,
          description: formData.message,
          color: 5814783, // Teal color
          fields: [
            {
              name: 'Name',
              value: formData.name,
              inline: true
            },
            {
              name: 'Email',
              value: formData.email,
              inline: true
            },
            {
              name: 'Timestamp',
              value: new Date().toLocaleString(),
              inline: false
            }
          ],
          footer: {
            text: 'Sent from morshadunnur.com contact form'
          }
        }]
      })
    });
    
    if (!response.ok) {
      throw new Error(`Discord API error: ${response.status}`);
    }
    
    return { success: true };
  } catch (error) {
    console.error('Error sending Discord notification:', error);
    return { success: false, error: error.message };
  }
}

// For testing purposes
// Uncomment and run with Node.js to test the webhook
/*
sendDiscordNotification({
  name: 'Test User',
  email: 'test@example.com',
  subject: 'Test Subject',
  message: 'This is a test message from the Discord webhook script.'
}).then(result => {
  console.log('Result:', result);
});
*/

export { sendDiscordNotification };