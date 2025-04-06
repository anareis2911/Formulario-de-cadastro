document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("formCadastro");
    const tabela = document.querySelector("#tabelaUsuarios tbody");
    const inputBusca = document.getElementById("busca");
  
    // CADASTRO - index.html
    if (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
  
        const nome = document.getElementById("nome").value;
        const email = document.getElementById("email").value;
        const idade = document.getElementById("idade").value;
  
        fetch("http://localhost:3000/usuarios", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ nome, email, idade })
        })
        .then(response => response.json())
        .then(() => {
          alert("Usuário cadastrado com sucesso!");
          form.reset();
        })
        .catch(err => console.error("Erro ao cadastrar:", err));
      });
    }
  
    // EXIBIÇÃO - descricao.html
    if (tabela) {
      fetchUsuarios();
  
      // Busca dinâmica
      if (inputBusca) {
        inputBusca.addEventListener("input", (e) => {
          const termo = e.target.value.toLowerCase();
          const linhas = tabela.querySelectorAll("tr");
          linhas.forEach(linha => {
            const texto = linha.innerText.toLowerCase();
            linha.style.display = texto.includes(termo) ? "" : "none";
          });
        });
      }
    }
  });
  
  // Função para buscar usuários do db.json
  function fetchUsuarios() {
    fetch("http://localhost:3000/usuarios")
      .then(res => res.json())
      .then(usuarios => {
        const tbody = document.querySelector("#tabelaUsuarios tbody");
        tbody.innerHTML = "";
  
        usuarios.forEach(user => {
          const tr = document.createElement("tr");
          tr.innerHTML = `
            <td>${user.nome}</td>
            <td>${user.email}</td>
            <td>${user.idade}</td>
            <td>
              <button class="btn btn-sm btn-secondary" onclick="editarUsuario(${user.id})">Editar</button>
            </td>
          `;
          tbody.appendChild(tr);
        });
      });
  }
  
  // Editar usuário via prompt
  function editarUsuario(id) {
    fetch(`http://localhost:3000/usuarios/${id}`)
      .then(res => res.json())
      .then(usuario => {
        const novoNome = prompt("Novo nome:", usuario.nome);
        const novoEmail = prompt("Novo email:", usuario.email);
        const novaIdade = prompt("Nova idade:", usuario.idade);
  
        if (novoNome && novoEmail && novaIdade) {
          fetch(`http://localhost:3000/usuarios/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              nome: novoNome,
              email: novoEmail,
              idade: parseInt(novaIdade)
            })
          })
          .then(() => fetchUsuarios());
        }
      });
  }
  