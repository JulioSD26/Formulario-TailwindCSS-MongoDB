document.getElementById("registrationForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const email = document.getElementById("email").value;
    const telefono = document.getElementById("telefono").value;
    const direccion = document.getElementById("direccion").value;
    const contrasena = document.getElementById("contrasena").value;

    try {
        const response = await fetch("http://localhost:3000/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nombre, email, telefono, direccion, contrasena }),
        });

        if (!response.ok) {
            throw new Error("Error en el registro. Verifica los datos e inténtalo de nuevo.");
        }

        const data = await response.json();

        document.getElementById("responseMessage").innerHTML = `
            <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                <strong class="font-bold">¡Registro exitoso!</strong>
                <span class="block sm:inline">${data.message}</span>
            </div>`;
    } catch (error) {
        document.getElementById("responseMessage").innerHTML = `
            <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <strong class="font-bold">¡Error!</strong>
                <span class="block sm:inline">${error.message}</span>
            </div>`;
    }
});