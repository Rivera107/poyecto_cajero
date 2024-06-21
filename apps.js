const cuentas = {
    Mali: { contraseña: "1234", saldo: 200 },
    Gera: { contraseña: "5678", saldo: 290 },
    Fanny: { contraseña: "7895", saldo: 539 },
    Vero: { contraseña: "8832", saldo: 900 },
    Ale: { contraseña: "6731", saldo: 777 },
    Jesus: { contraseña: "2408", saldo: 989 },
    Maui: { contraseña: "9101", saldo: 67 }
};

let usuarioActual = null;

function iniciarSesion() {
    const cuentaSeleccionada = document.getElementById("cuentaSeleccionada").value;
    const contraseña = document.getElementById("contraseña").value;
    const mensajeInicioSesion = document.getElementById("mensajeInicioSesion");

    if (cuentas[cuentaSeleccionada].contraseña === contraseña) {
        usuarioActual = cuentaSeleccionada;
        document.getElementById("inicioSesion").style.display = "none";
        document.getElementById("operaciones").style.display = "block";
        document.getElementById("nombreUsuario").innerText = usuarioActual;
        mensajeInicioSesion.innerText = "";
    } else {
        mensajeInicioSesion.innerText = "Contraseña incorrecta. Intenta de nuevo.";
    }
}

function consultarSaldo() {
    document.getElementById("mensajeOperacion").innerText = `Tu saldo es $${cuentas[usuarioActual].saldo}`;
    document.getElementById("formularioTransaccion").style.display = "none";
}

function mostrarFormularioDeposito() {
    document.getElementById("mensajeOperacion").innerText = "";
    document.getElementById("montoTransaccion").value = ""; 
    document.getElementById("formularioTransaccion").style.display = "block";
    document.getElementById("confirmarTransaccion").onclick = depositar;
}

function mostrarFormularioRetiro() {
    document.getElementById("mensajeOperacion").innerText = "";
    document.getElementById("montoTransaccion").value = ""; 
    document.getElementById("formularioTransaccion").style.display = "block";
    document.getElementById("confirmarTransaccion").onclick = retirar;
}

function depositar() {
    const monto = parseFloat(document.getElementById("montoTransaccion").value);
    
    if (monto > 0) {
        if (cuentas[usuarioActual].saldo + monto <= 990) {
            cuentas[usuarioActual].saldo += monto;
            document.getElementById("mensajeOperacion").innerText = `Has depositado $${monto}. Tu nuevo saldo es $${cuentas[usuarioActual].saldo}`;
        } else {
            document.getElementById("mensajeOperacion").innerText = "El monto del depósito excede el límite máximo de saldo de $990.";
        }
    } else {
        document.getElementById("mensajeOperacion").innerText = "Monto inválido. Ingresa un número positivo.";
    }

    document.getElementById("formularioTransaccion").style.display = "none";
    document.getElementById("montoTransaccion").value = ""; 
}

function retirar() {
    const monto = parseFloat(document.getElementById("montoTransaccion").value);
    
    if (monto > 0) {
        if (cuentas[usuarioActual].saldo - monto >= 10) {
            cuentas[usuarioActual].saldo -= monto;
            document.getElementById("mensajeOperacion").innerText = `Has retirado $${monto}. Tu nuevo saldo es $${cuentas[usuarioActual].saldo}`;
        } else {
            document.getElementById("mensajeOperacion").innerText = "El monto del retiro excede el límite mínimo de saldo de $10.";
        }
    } else {
        document.getElementById("mensajeOperacion").innerText = "Monto inválido. Ingresa un número positivo.";
    }

    document.getElementById("formularioTransaccion").style.display = "none";
    document.getElementById("montoTransaccion").value = ""; 
}

function cerrarSesion() {
    usuarioActual = null;
    document.getElementById("inicioSesion").style.display = "block";
    document.getElementById("operaciones").style.display = "none";
    document.getElementById("contraseña").value = "";
    document.getElementById("montoTransaccion").value = "";
}