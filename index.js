const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

// Cria um novo cliente utilizando LocalAuth para armazenar a sessão localmente
const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: { 
    headless: false, // Altere para true se não quiser ver o navegador
    args: ['--no-sandbox']
  }
});

// Geração do QR Code para autenticação
client.on('qr', (qr) => {
  qrcode.generate(qr, { small: true });
  console.log('⚠️ Escaneie o QR Code com o WhatsApp');
});

// Quando estiver pronto, mostra que o bot está conectado
client.on('ready', () => {
  console.log('✅ Bot conectado ao WhatsApp!');
});

// Responde às mensagens recebidas
client.on('message', async (msg) => {
  const chatId = msg.from;
  const texto = msg.body.trim().toLowerCase();

  console.log('📩 Mensagem recebida:', msg.body);
  
  // Exemplo de resposta para mensagem "menu"
  if (texto === 'menu') {
    await client.sendMessage(chatId, 
      `*Menu de Atendimento - RAV Digital:*\n\n` +
      `1️⃣ - Ver Planos\n` +
      `2️⃣ - Teste Grátis\n` +
      `3️⃣ - Falar com Atendente\n\n` +
      `Responda com o número da opção desejada.`
    );
  }

  // Aqui você pode adicionar outros comandos
  if (texto === '1') {
    await client.sendMessage(chatId,
      `*Planos Disponíveis:*\n\n` +
      `*Plano Essencial – R$ 39/mês*\n` +
      `- Bot com respostas básicas\n` +
      `- Até 5 comandos personalizados\n` +
      `- 2 ajustes mensais\n\n` +
      `*Plano Profissional – R$ 69/mês*\n` +
      `- Menu interativo\n` +
      `- 4 ajustes mensais\n` +
      `- Suporte técnico prioritário\n\n` +
      `*Plano Avançado – R$ 99/mês*\n` +
      `- Ajustes ilimitados\n` +
      `- Catálogo digital\n` +
      `- Suporte emergencial\n\n` +
      `Digite #contratar para assinar um plano.`
    );
  }
  
  if (texto === '2') {
    await client.sendMessage(chatId,
      'Perfeito! Vamos iniciar seu teste grátis de 3 dias. Digite #testarbot para continuar.'
    );
  }
  
  if (texto === '3') {
    await client.sendMessage(chatId,
      'Beleza! Um atendente vai te chamar em instantes...'
    );
  }
});

// Inicializa o cliente
client.initialize();
