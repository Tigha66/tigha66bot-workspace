const { ImapSimple, connect } = require('imap-simple');

const config = {
  imap: {
    user: 'tigha66@gmail.com',
    password: 'yqtb kdyx vtom lsmm',
    host: 'imap.gmail.com',
    port: 993,
    tls: true,
    tlsOptions: { rejectUnauthorized: false }
  }
};

connect(config).then((connection) => {
  return connection.openBox('INBOX').then(() => {
    const searchCriteria = ['UNSEEN'];
    const fetchOptions = { bodies: ['HEADER', 'TEXT'], markSeen: false };
    
    return connection.search(searchCriteria, fetchOptions).then((results) => {
      if (results.length === 0) {
        console.log('📭 No new email responses yet');
        connection.end();
        process.exit(0);
      }
      
      console.log(`📬 Found ${results.length} new response(s):\n`);
      
      results.forEach((msg) => {
        const headers = msg.parts.find(p => p.which === 'HEADER');
        const body = msg.parts.find(p => p.which === 'TEXT');
        
        if (headers && headers.body) {
          const from = headers.body.from || 'Unknown';
          const subject = headers.body.subject || 'No Subject';
          const date = headers.body.date || 'Unknown';
          
          console.log(`---`);
          console.log(`FROM: ${from}`);
          console.log(`SUBJECT: ${subject}`);
          console.log(`DATE: ${date}`);
          console.log(`---\n`);
        }
      });
      
      connection.end();
      process.exit(0);
    });
  });
}).catch((err) => {
  console.log('❌ Error checking email:', err.message);
  process.exit(1);
});
