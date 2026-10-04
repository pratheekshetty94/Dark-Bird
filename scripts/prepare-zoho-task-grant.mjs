// Prints the exact narrow scope set for a private Zoho India OAuth grant.
// No credentials, network requests, token exchange, or files are used.
const scopes = Object.freeze([
  'ZohoCRM.org.READ',
  'ZohoCRM.modules.contacts.READ',
  'ZohoSearch.securesearch.READ',
  'ZohoCRM.modules.tasks.READ',
  'ZohoCRM.modules.tasks.CREATE',
  'ZohoCRM.modules.tasks.UPDATE',
])

console.log(scopes.join(','))
console.log('Generate a new grant for the existing client in the Zoho India production org.')
console.log('Enter and submit authorization codes and tokens only in your private Zoho/Vercel setup.')
console.log('Keep all booking sync flags off. Do not reuse or reset the quarantined booking claim.')
