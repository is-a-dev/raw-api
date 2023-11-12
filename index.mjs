import fetch from 'node-fetch';
import { promises as fsPromises } from 'fs';
import path from 'path';

const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);

const directoryPath = path.join(__dirname, 'is-a-dev/domains');
let combinedArray = [];

(async () => {
  try {
    // Fetch domains from the external API
    const response = await fetch('https://hosts.is-a.dev/api/getall');
    const data = await response.json();
    
    // Amend ".is-a.dev" suffix to all external domains
    const externalDomains = data.domains.map(domain => domain + '.is-a.dev');

    // Read files from the local directory
    const files = await fsPromises.readdir(directoryPath);

    for (const file of files) {
      const filePath = path.join(directoryPath, file);
      const fileContent = await fsPromises.readFile(filePath, 'utf8');
      const dataArray = [JSON.parse(fileContent)];

      for (const item of dataArray) {
        item.domain = path.parse(file).name + '.is-a.dev';
        item.subdomain = path.parse(file).name;

        // Add a 'useHosting' field and set it to true for matched domains
        item.useHosting = externalDomains.includes(item.domain);
        
        if (item.owner.email) item.owner.email = item.owner.email.replace(/@/, ' (at) ');
      }

      combinedArray = combinedArray.concat(dataArray);
    }

    // Print or do something with the matched domains
    const matchedDomains = combinedArray.filter(item => item.useHosting);
    console.log('Matched Domains:', matchedDomains);

    // Write the combined data to "index.json"
    await fsPromises.writeFile('index.json', JSON.stringify(combinedArray));
  } catch (error) {
    console.error('Error:', error);
  }
})();
