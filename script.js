const API_LISTAR = "http://127.0.0.1:3000/eventos/listar";

const API_CADASTRAR = "http://127.0.0.1:3000/eventos/cadastrar";

const API_EXCLUIR = "http://127.0.0.1:3000/eventos/excluir";



const eventosContainer = document.getElementById("eventos");

async function carregarEventos() {

    if (!eventosContainer) return;

    try {

        const response = await fetch(API_LISTAR);

        const eventos = await response.json();

        console.log(eventos);

        eventosContainer.innerHTML = "";

        eventos.forEach((evento) => {

            eventosContainer.innerHTML += `

            <div class="glass-card rounded-xl overflow-hidden group">

                <div class="p-6">

                    <h2 class="text-2xl font-bold mb-4">
                        ${evento.titulo}
                    </h2>

                    <p class="text-gray-300 mb-4">
                        ${evento.descricao}
                    </p>

                    <div class="flex flex-col gap-2 text-gray-400 mb-6">

                        <span>
                             ${new Date(evento.data_evento).toLocaleString()}
                        </span>

                        <span>
                             ${evento.local}
                        </span>

                        <span>
                             ${evento.capacidade_max}
                        </span>

                        <span>
                             ${evento.status}
                        </span>

                    </div>

                    <!-- BOTÕES -->

                    <div class="flex gap-4">

                        <button
                            onclick="excluirEvento(${evento.id})"
                            class="bg-red-600 hover:bg-red-700 transition px-4 py-2 rounded-lg font-bold"
                        >
                            Excluir
                        </button>

                    </div>

                </div>

            </div>

            `;

        });

    } catch (error) {

        console.log("Erro ao carregar eventos:", error);

    }

}

carregarEventos();




const formEvento = document.getElementById("formEvento");

if (formEvento) {

    formEvento.addEventListener("submit", async function (e) {

        e.preventDefault();

        const novoEvento = {

            titulo: document.getElementById("titulo").value,

            descricao: document.getElementById("descricao").value,

            data_evento: document.getElementById("data_evento").value,

            local: document.getElementById("local").value,

            capacidade_max: Number(document.getElementById("capacidade_max").value)

        };

        try {

            const response = await fetch(API_CADASTRAR, {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(novoEvento)

            });

            const resultado = await response.json();

            console.log(resultado);

            if (response.ok) {

                alert("Evento cadastrado!");

                formEvento.reset();

                window.location.href = "pagina1.html";

            } else {

                alert("Erro ao cadastrar");

            }

        } catch (error) {

            console.log("Erro:", error);

        }

    });

}



async function excluirEvento(id) {

    const confirmar = confirm("Deseja excluir este evento?");

    if (!confirmar) return;

    try {

        const response = await fetch(`${API_EXCLUIR}/${id}`, {

            method: "DELETE"

        });

        if (response.ok) {

            alert("Evento excluído!");

            carregarEventos();

        } else {

            alert("Erro ao excluir");

        }

    } catch (error) {

        console.log(error);

    }

}
