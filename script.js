document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("formCadastro");
    const btnLimpar = document.getElementById("btnLimpar");

    // Só executa lógica de cadastro se estiver na página de cadastro
    if (form && btnLimpar) {
        btnLimpar.addEventListener("click", () => {
            form.reset();
        });

        form.addEventListener("submit", (e) => {
            e.preventDefault();

            const nome = document.getElementById("nome").value.trim();
            const email = document.getElementById("email").value.trim();
            const idade = document.getElementById("idade").value.trim();

            if (!nome || !email || !idade) {
                alert("Por favor, preencha todos os campos.");
                return;
            }

            const novoUsuario = { nome, email, idade };
            const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");

            usuarios.push(novoUsuario);
            localStorage.setItem("usuarios", JSON.stringify(usuarios));

            alert("Cadastro realizado com sucesso!");
            form.reset();
        });
    }

    // Exibe dados se estiver na página descricao.html
    const tabela = document.querySelector("#tabelaUsuarios tbody");
    if (tabela) {
        const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");

        if (usuarios.length === 0) {
            tabela.innerHTML = "<tr><td colspan='3'>Nenhum usuário cadastrado.</td></tr>";
            return;
        }

        usuarios.forEach(usuario => {
            const linha = document.createElement("tr");
            linha.innerHTML = `
                <td>${usuario.nome}</td>
                <td>${usuario.email}</td>
                <td>${usuario.idade}</td>
            `;
            tabela.appendChild(linha);
        });
    }
});
