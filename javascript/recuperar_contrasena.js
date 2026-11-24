let codigoRecuperacionEnviado = false;

function limpiarEstadoRecuperacion() {
    const mensajeError = document.getElementById('mensaje-recuperar-contrasena');
    const estado = document.getElementById('estado-recuperar-contrasena');

    mensajeError.textContent = '';
    mensajeError.hidden = true;
    estado.textContent = '';
    estado.hidden = true;
}

function mostrarErrorRecuperacion(mensajeId, texto) {
    const mensaje = document.getElementById(mensajeId);
    mensaje.textContent = texto;
    mensaje.hidden = false;
}

function prepararDialogoRecuperacion(correoInicial = '') {
    const formulario = document.getElementById('form-recuperar-contrasena');
    const correo = document.getElementById('recuperar-email');
    const codigo = document.getElementById('codigo-recuperacion');

    formulario.reset();
    codigoRecuperacionEnviado = false;
    correo.value = correoInicial;
    correo.readOnly = false;
    codigo.required = false;
    document.getElementById('grupo-codigo-recuperacion').hidden = true;
    document.getElementById('btn-enviar-recuperacion').textContent = 'Enviar código';
    limpiarEstadoRecuperacion();
}

function mostrarDialogoNuevaContrasena() {
    const modalRecuperacion = document.getElementById('modal-recuperar-contrasena');
    const modalNuevaContrasena = document.getElementById('modal-nueva-contrasena');

    if (modalRecuperacion.open) cerrarModal(modalRecuperacion);
    if (!modalNuevaContrasena.open) abrirModal(modalNuevaContrasena.id);
    document.getElementById('nueva-contrasena').focus();
}

async function procesarRecuperacion(evento) {
    evento.preventDefault();

    const correo = document.getElementById('recuperar-email');
    const codigo = document.getElementById('codigo-recuperacion');
    const boton = document.getElementById('btn-enviar-recuperacion');
    const estado = document.getElementById('estado-recuperar-contrasena');
    limpiarEstadoRecuperacion();

    if (!window.supabase || !window.supabase.auth) {
        mostrarErrorRecuperacion('mensaje-recuperar-contrasena', 'No se pudo conectar. Inténtalo de nuevo más tarde.');
        return;
    }

    boton.disabled = true;
    try {
        if (!codigoRecuperacionEnviado) {
            const { error } = await window.supabase.auth.resetPasswordForEmail(correo.value.trim());
            if (error) throw error;

            codigoRecuperacionEnviado = true;
            correo.readOnly = true;
            codigo.required = true;
            document.getElementById('grupo-codigo-recuperacion').hidden = false;
            boton.textContent = 'Confirmar código';
            estado.textContent = 'Si el correo corresponde a una cuenta, recibirás un código. Revisa también la carpeta de correo no deseado.';
            estado.hidden = false;
            codigo.focus();
            return;
        }

        const token = codigo.value.replace(/\s+/g, '');
        if (!/^\d{6,10}$/.test(token)) {
            mostrarErrorRecuperacion('mensaje-recuperar-contrasena', 'Escribe el código numérico que te hemos enviado al correo.');
            codigo.focus();
            return;
        }

        const { error } = await window.supabase.auth.verifyOtp({
            email: correo.value.trim(),
            token,
            type: 'recovery'
        });
        if (error) throw error;
        mostrarDialogoNuevaContrasena();
    } catch (error) {
        console.error('No se pudo completar la recuperación de contraseña:', error);
        mostrarErrorRecuperacion(
            'mensaje-recuperar-contrasena',
            codigoRecuperacionEnviado
                ? 'El código no es válido o ha caducado. Compruébalo e inténtalo de nuevo.'
                : 'No se pudo enviar el código. Comprueba la dirección e inténtalo de nuevo más tarde.'
        );
    } finally {
        boton.disabled = false;
    }
}

async function guardarNuevaContrasena(evento) {
    evento.preventDefault();

    const contrasena = document.getElementById('nueva-contrasena');
    const repetirContrasena = document.getElementById('repite-nueva-contrasena');
    const mensaje = document.getElementById('mensaje-nueva-contrasena');
    const estado = document.getElementById('estado-nueva-contrasena');
    const boton = document.getElementById('btn-guardar-nueva-contrasena');

    mensaje.textContent = '';
    mensaje.hidden = true;
    estado.textContent = '';
    estado.hidden = true;

    if (contrasena.value.length < 6) {
        mostrarErrorRecuperacion('mensaje-nueva-contrasena', 'La contraseña debe tener al menos 6 caracteres.');
        contrasena.focus();
        return;
    }

    if (contrasena.value !== repetirContrasena.value) {
        mostrarErrorRecuperacion('mensaje-nueva-contrasena', 'Las contraseñas no coinciden.');
        repetirContrasena.focus();
        return;
    }

    if (!window.supabase || !window.supabase.auth) {
        mostrarErrorRecuperacion('mensaje-nueva-contrasena', 'No se pudo conectar. Inténtalo de nuevo más tarde.');
        return;
    }

    boton.disabled = true;
    try {
        const { error } = await window.supabase.auth.updateUser({ password: contrasena.value });
        if (error) throw error;

        estado.textContent = 'Tu contraseña se ha cambiado correctamente.';
        estado.hidden = false;
        contrasena.value = '';
        repetirContrasena.value = '';
        window.setTimeout(() => cerrarModal('modal-nueva-contrasena'), 1800);
    } catch (error) {
        console.error('No se pudo cambiar la contraseña:', error);
        mostrarErrorRecuperacion(
            'mensaje-nueva-contrasena',
            'No se pudo cambiar la contraseña. Es posible que el código haya caducado; solicita uno nuevo e inténtalo de nuevo.'
        );
    } finally {
        boton.disabled = false;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const botonRecuperacion = document.getElementById('btn-recuperar-contrasena');
    const modalRecuperacion = document.getElementById('modal-recuperar-contrasena');
    const campoCorreo = document.getElementById('recuperar-email');

    botonRecuperacion.addEventListener('click', () => {
        const usuario = document.getElementById('login-usuario-modal').value.trim();
        prepararDialogoRecuperacion(usuario.includes('@') ? usuario : '');
        cerrarModal('modal-login');
        abrirModal('modal-recuperar-contrasena');
        campoCorreo.focus();
    });

    document.getElementById('form-recuperar-contrasena')
        .addEventListener('submit', procesarRecuperacion);
    document.getElementById('form-nueva-contrasena')
        .addEventListener('submit', guardarNuevaContrasena);

    modalRecuperacion.addEventListener('close', () => {
        prepararDialogoRecuperacion();
    });

    if (!window.supabase || !window.supabase.auth) {
        console.error('No está disponible la autenticación para recuperar la contraseña.');
        return;
    }

    window.supabase.auth.onAuthStateChange(evento => {
        if (evento === 'PASSWORD_RECOVERY') {
            mostrarDialogoNuevaContrasena();
        }
    });
});
