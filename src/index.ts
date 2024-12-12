const main = async () => {
  const fs = require('fs'); 
  const fetch = require("node-fetch");
  let rawdata = fs.readFileSync('./response.json');
  let data = JSON.parse(rawdata);

  data.messages.forEach(async message => {
    const response = await fetch(message.file.url, {
      method: 'GET',
      headers: {
          "api-token": `token`
      }
    });

    if (response.status != 200) { 
      console.error(response.status)      
    }

    
    const arrayBuffer = await response.arrayBuffer();
    var buf = Buffer.from(arrayBuffer);
    var fileName = await response.headers.get('content-disposition').split('filename="')[1].split('"; filename')[0];
    fs.writeFile(`./downloads/${fileName}`, buf, (err) => { 
      if (err) throw err;
      console.log(`Arquivo ${fileName} baixado com sucesso!`);
    });    
  });
};

main();
