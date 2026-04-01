
  async function buscarCEP() {
    const cep = document.getElementById("cepInput").value.replace(/\D/g, '');
    const resultado = document.getElementById("cepResultado");
    const risco = document.getElementById("riscoMensagem");

    resultado.innerHTML = "";
    risco.innerHTML = "";

    if (cep.length !== 8) {
      resultado.innerHTML = "❌ CEP inválido. Digite 8 números.";
      resultado.style.color = "red";
      return;
    }

    resultado.innerHTML = "🔎 Buscando...";
    resultado.style.color = "black";

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();

      if (data.erro) {
        resultado.innerHTML = "⚠️ CEP não encontrado.";
        resultado.style.color = "orange";
      } else {
        resultado.innerHTML = `
          <strong>Logradouro:</strong> ${data.logradouro}<br>
          <strong>Bairro:</strong> ${data.bairro}<br>
          <strong>Cidade:</strong> ${data.localidade}<br>
          <strong>Estado:</strong> ${data.uf}
        `;
        resultado.style.color = "green";

        // Exemplo de mensagem adicional
        risco.innerHTML = "⚠️ Atenção: área com histórico de ocorrências.";
        risco.style.color = "darkred";
      }
    } catch (error) {
      resultado.innerHTML = "❌ Erro ao buscar CEP.";
      resultado.style.color = "red";
    }
  }

  document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("contatoForm").addEventListener("submit", function(e) {
    e.preventDefault();
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const mensagem = document.getElementById("mensagem").value;

    document.getElementById("resposta").innerHTML =
      `✅ Obrigado, ${nome}! Sua mensagem foi registrada.<br>
       📧 Email: ${email}<br>
       📝 Mensagem: ${mensagem}`;

       document.getElementById("contatoForm").reset();
  });
});