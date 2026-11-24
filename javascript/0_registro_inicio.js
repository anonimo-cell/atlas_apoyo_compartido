let tipoUsuarioRegistroInicio = null;
let registroPendienteInicio = null;
let temporizadorReenvioInicio = null;

function mostrarVistaRegistroInicio(vista) {
    document.getElementById('form-registro-inicio').hidden = vista !== 'formulario';
    document.getElementById('registro-verificacion-inicio').hidden = vista !== 'verificacion';
    document.getElementById('registro-exito-inicio').hidden = vista !== 'exito';
}

function abrirRegistroInicio() {
    mostrarVistaRegistroInicio(registroPendienteInicio ? 'verificacion' : 'formulario');
    abrirModal('modal-registro-inicio');
    if (!registroPendienteInicio) {
        document.getElementById('registro-nombre-inicio').focus();
    } else {
        document.getElementById('codigo-verificacion-inicio').focus();
    }
}

function mostrarErrorRegistroInicio(campoId, mensajeId, texto) {
    const campo = document.getElementById(campoId);
    const mensaje = document.getElementById(mensajeId);
    if (campo) campo.classList.add('campo-error');
    if (mensaje) {
        mensaje.textContent = texto;
        mensaje.hidden = false;
    }
}

function limpiarErroresRegistroInicio() {
    document.querySelectorAll('#form-registro-inicio .campo-error').forEach(campo => {
        campo.classList.remove('campo-error');
    });
    document.querySelectorAll('#form-registro-inicio .mensaje-error-campo').forEach(mensaje => {
        mensaje.textContent = '';
        mensaje.hidden = true;
    });
}

async function correoRegistradoEnInicio(correo) {
    try {
        const { data, error } = await window.supabase.rpc('correo_registrado', {
            correo: correo.trim()
        });
        if (error) throw error;
        return data === true;
    } catch (error) {
        console.warn('No se pudo comprobar si el correo ya existe:', error);
        return false;
    }
}

async function usuarioRegistradoEnInicio(nombre) {
    const { data, error } = await window.supabase.rpc('usuario_registrado', {
        nombre_usuario: nombre.trim()
    });
    if (error) {
        console.error('No se pudo comprobar si el nombre de usuario ya existe:', error);
        const errorComprobacion = new Error('No se pudo comprobar la disponibilidad del nombre de usuario.');
        errorComprobacion.code = error.code === 'PGRST202'
            ? 'username_check_not_configured'
            : 'username_check_failed';
        throw errorComprobacion;
    }
    return data === true;
}

async function registrarCuentaInicio(evento) {
    evento.preventDefault();
    limpiarErroresRegistroInicio();

    const nombre = document.getElementById('registro-nombre-inicio');
    const email = document.getElementById('registro-email-inicio');
    const password = document.getElementById('registro-password-inicio');
    const repetirPassword = document.getElementById('registro-password-repite-inicio');
    const fundacion = document.getElementById('registro-fundacion-inicio');
    const boton = document.getElementById('btn-crear-cuenta-inicio');
    const mensajeGeneral = document.getElementById('mensaje-error-registro-inicio');
    const errores = [];

    const nombreValor = nombre.value.trim();
    const emailValor = email.value.trim().toLowerCase();
    const passwordValor = password.value.trim();
    const repetirPasswordValor = repetirPassword.value.trim();

    if (!nombreValor) {
        mostrarErrorRegistroInicio(nombre.id, 'error-registro-nombre-inicio', 'Escribe un nombre de usuario.');
        errores.push(nombre);
    } else if (nombreValor.length < 4) {
        mostrarErrorRegistroInicio(nombre.id, 'error-registro-nombre-inicio', 'El nombre de usuario debe tener al menos 4 caracteres.');
        errores.push(nombre);
    } else if (nombreValor.includes('@')) {
        mostrarErrorRegistroInicio(nombre.id, 'error-registro-nombre-inicio', 'El nombre de usuario no puede llevar "@".');
        errores.push(nombre);
    }

    if (!emailValor) {
        mostrarErrorRegistroInicio(email.id, 'error-registro-email-inicio', 'Escribe tu correo electrónico.');
        errores.push(email);
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValor)) {
        mostrarErrorRegistroInicio(email.id, 'error-registro-email-inicio', 'Escribe un correo electrónico válido.');
        errores.push(email);
    }

    const erroresPassword = [];
    if (!passwordValor) erroresPassword.push('Escribe una contraseña.');
    else if (passwordValor.length < 6) erroresPassword.push('La contraseña debe tener al menos 6 caracteres.');
    if (!repetirPasswordValor) erroresPassword.push('Repite la contraseña.');
    else if (passwordValor && passwordValor !== repetirPasswordValor) erroresPassword.push('Las contraseñas no coinciden.');
    if (erroresPassword.length) {
        mostrarErrorRegistroInicio(password.id, 'error-registro-password-inicio', erroresPassword.join(' '));
        repetirPassword.classList.add('campo-error');
        errores.push(password);
    }

    if (!tipoUsuarioRegistroInicio) {
        const botonTipoUsuario = document.querySelector('#modal-registro-inicio [data-tipo-usuario]');
        mostrarErrorRegistroInicio(botonTipoUsuario.id, 'error-registro-tipo-usuario-inicio', 'Selecciona tu tipo de usuario.');
        document.querySelectorAll('#modal-registro-inicio [data-tipo-usuario]').forEach(botonTipo => {
            botonTipo.classList.add('campo-error');
        });
        errores.push(botonTipoUsuario);
    }

    const botonesDiscapacidad = Array.from(document.querySelectorAll('#modal-registro-inicio [data-discapacidad]'));
    const discapacidadesSeleccionadas = botonesDiscapacidad
        .filter(botonDiscapacidad => botonDiscapacidad.getAttribute('aria-pressed') === 'true')
        .map(botonDiscapacidad => botonDiscapacidad.dataset.discapacidad);
    if (!discapacidadesSeleccionadas.length) {
        const primerBotonDiscapacidad = botonesDiscapacidad[0];
        mostrarErrorRegistroInicio(
            primerBotonDiscapacidad.id,
            'error-registro-discapacidad-inicio',
            'Selecciona al menos una discapacidad.'
        );
        botonesDiscapacidad.forEach(botonDiscapacidad => {
            botonDiscapacidad.classList.add('campo-error');
        });
        errores.push(primerBotonDiscapacidad);
    }

    if (errores.length) {
        mensajeGeneral.textContent = 'Revisa los campos señalados para continuar.';
        mensajeGeneral.hidden = false;
        errores[0].focus();
        return;
    }

    if (!window.supabase || !window.supabase.auth) {
        console.error('El cliente de Supabase no está disponible.');
        mensajeGeneral.textContent = 'No se pudo conectar con el servicio de registro. Inténtalo más tarde.';
        mensajeGeneral.hidden = false;
        return;
    }

    const textoOriginal = boton.textContent;
    boton.disabled = true;
    try {
        boton.textContent = 'Comprobando datos...';

        if (await usuarioRegistradoEnInicio(nombreValor)) {
            mostrarErrorRegistroInicio(nombre.id, 'error-registro-nombre-inicio', 'Ese nombre de usuario ya existe. Elige otro.');
            nombre.focus();
            return;
        }
        if (await correoRegistradoEnInicio(emailValor)) {
            mostrarErrorRegistroInicio(email.id, 'error-registro-email-inicio', 'Ese correo ya tiene una cuenta. Inicia sesión o usa otro correo.');
            email.focus();
            return;
        }

        const perfil = {
            nombre: nombreValor,
            contacto: emailValor,
            tipo_usuario: tipoUsuarioRegistroInicio,
            // Conserva relacion para compatibilidad con los registros anteriores.
            relacion: tipoUsuarioRegistroInicio,
            discapacidad: discapacidadesSeleccionadas,
            fundacion: fundacion.value.trim(),
            fecha_envio: new Date().toISOString()
        };

        boton.textContent = 'Creando cuenta...';
        const { data, error } = await window.supabase.auth.signUp({
            email: emailValor,
            password: passwordValor,
            options: { data: perfil }
        });
        if (error) throw error;
        if (data.user && Array.isArray(data.user.identities) && data.user.identities.length === 0) {
            const errorCuentaExistente = new Error('La cuenta ya existe.');
            errorCuentaExistente.code = 'user_already_exists';
            throw errorCuentaExistente;
        }

        registroPendienteInicio = { email: emailValor, perfil };
        document.getElementById('email-verificacion-inicio').textContent = emailValor;
        mostrarVistaRegistroInicio('verificacion');
        document.getElementById('codigo-verificacion-inicio').focus();
        esperarReenvioCodigoInicio(60);

        nombre.value = '';
        email.value = '';
        password.value = '';
        repetirPassword.value = '';
        fundacion.value = '';
        tipoUsuarioRegistroInicio = null;
        document.querySelectorAll('#modal-registro-inicio [data-tipo-usuario]').forEach(botonTipo => {
            botonTipo.classList.remove('activ-cate', 'campo-error');
            botonTipo.setAttribute('aria-pressed', 'false');
        });
        document.querySelectorAll('#modal-registro-inicio [data-discapacidad]').forEach(botonDiscapacidad => {
            botonDiscapacidad.classList.remove('activ-cate', 'campo-error');
            botonDiscapacidad.setAttribute('aria-pressed', 'false');
        });
    } catch (error) {
        console.error('Error al crear la cuenta:', error);
        if (error.code === 'username_check_not_configured') {
            mostrarErrorRegistroInicio(
                nombre.id,
                'error-registro-nombre-inicio',
                'No se puede comprobar si el nombre ya está usado. Ejecuta supabase/usuarios_login.sql en Supabase.'
            );
            nombre.focus();
        } else if (error.code === 'username_check_failed') {
            mostrarErrorRegistroInicio(
                nombre.id,
                'error-registro-nombre-inicio',
                'No se pudo comprobar si el nombre está disponible. Inténtalo de nuevo más tarde.'
            );
            nombre.focus();
        } else if (error.code === 'user_already_exists' || /already registered/i.test(error.message || '')) {
            mostrarErrorRegistroInicio(email.id, 'error-registro-email-inicio', 'Ese correo ya tiene una cuenta. Inicia sesión o usa otro correo.');
            email.focus();
        } else if (/database error saving new user|usuario_repetido/i.test(error.message || '')) {
            mostrarErrorRegistroInicio(nombre.id, 'error-registro-nombre-inicio', 'Ese nombre de usuario ya existe. Elige otro.');
            nombre.focus();
        } else if (error.code === 'weak_password') {
            mensajeGeneral.textContent = 'La contraseña es demasiado débil: usa al menos 6 caracteres.';
            mensajeGeneral.hidden = false;
        } else if (error.code === 'over_email_send_rate_limit' || error.status === 429) {
            mensajeGeneral.textContent = 'Se han enviado demasiados correos. Espera un rato y vuelve a intentarlo.';
            mensajeGeneral.hidden = false;
        } else if (/sending confirmation email/i.test(error.message || '')) {
            mensajeGeneral.textContent = 'No hemos podido enviar el correo con el código. Inténtalo más tarde.';
            mensajeGeneral.hidden = false;
        } else if (error.code === 'email_address_not_authorized') {
            mensajeGeneral.textContent = 'Ahora mismo no podemos enviar correos a esta dirección. Prueba con otro correo.';
            mensajeGeneral.hidden = false;
        } else {
            mensajeGeneral.textContent = 'No se ha podido crear la cuenta. Inténtalo de nuevo.';
            mensajeGeneral.hidden = false;
        }
    } finally {
        boton.textContent = textoOriginal;
        boton.disabled = false;
    }
}

function esperarReenvioCodigoInicio(segundos) {
    const boton = document.getElementById('btn-reenviar-codigo-inicio');
    clearInterval(temporizadorReenvioInicio);
    boton.disabled = true;
    boton.textContent = `Reenviar en ${segundos} s`;

    temporizadorReenvioInicio = window.setInterval(() => {
        segundos -= 1;
        if (segundos > 0) {
            boton.textContent = `Reenviar en ${segundos} s`;
            return;
        }
        clearInterval(temporizadorReenvioInicio);
        temporizadorReenvioInicio = null;
        boton.disabled = false;
        boton.textContent = 'Reenviar código';
    }, 1000);
}

async function confirmarCuentaInicio() {
    const codigo = document.getElementById('codigo-verificacion-inicio');
    const mensajeError = document.getElementById('error-codigo-verificacion-inicio');
    const boton = document.getElementById('btn-confirmar-cuenta-inicio');
    const codigoValor = codigo.value.replace(/\s+/g, '');
    mensajeError.hidden = true;
    codigo.classList.remove('campo-error');

    if (!registroPendienteInicio) {
        mostrarErrorRegistroInicio(codigo.id, mensajeError.id, 'Vuelve a registrarte para recibir un código.');
        return;
    }
    if (!/^\d{6,10}$/.test(codigoValor)) {
        mostrarErrorRegistroInicio(codigo.id, mensajeError.id, 'Escribe el código de números que te hemos enviado al correo.');
        codigo.focus();
        return;
    }

    boton.disabled = true;
    const textoOriginal = boton.textContent;
    boton.textContent = 'Comprobando...';
    try {
        const { data, error } = await window.supabase.auth.verifyOtp({
            email: registroPendienteInicio.email,
            token: codigoValor,
            type: 'signup'
        });
        if (error) throw error;

        let session = data.session;
        if (!session) {
            const { data: sessionData, error: sessionError } = await window.supabase.auth.getSession();
            if (sessionError) throw sessionError;
            session = sessionData.session;
        }
        if (session) actualizarEstadoSesion(session);

        const mensajeExito = session
            ? 'Tu cuenta se ha confirmado y has iniciado sesión.'
            : 'Tu cuenta se ha confirmado. Ya puedes iniciar sesión.';
        document.getElementById('texto-exito-registro-inicio').textContent = mensajeExito;
        registroPendienteInicio = null;
        clearInterval(temporizadorReenvioInicio);
        temporizadorReenvioInicio = null;
        mostrarVistaRegistroInicio('exito');
        anunciar(mensajeExito);
    } catch (error) {
        console.error('Error al confirmar la cuenta:', error);
        mostrarErrorRegistroInicio(codigo.id, mensajeError.id, /expired/i.test(error.message || '')
            ? 'El código ha caducado. Pulsa "Reenviar código" para recibir otro.'
            : 'El código no es correcto. Revísalo e inténtalo de nuevo.');
        codigo.focus();
    } finally {
        boton.textContent = textoOriginal;
        boton.disabled = false;
    }
}

async function reenviarCodigoInicio() {
    const boton = document.getElementById('btn-reenviar-codigo-inicio');
    const codigo = document.getElementById('codigo-verificacion-inicio');
    const mensajeError = document.getElementById('error-codigo-verificacion-inicio');
    const estadoReenvio = document.getElementById('estado-reenvio-codigo-inicio');

    mensajeError.hidden = true;
    estadoReenvio.hidden = true;
    if (!registroPendienteInicio) {
        mostrarErrorRegistroInicio(codigo.id, mensajeError.id, 'Vuelve a registrarte para recibir un código.');
        return;
    }

    boton.disabled = true;
    try {
        const { error } = await window.supabase.auth.resend({
            type: 'signup',
            email: registroPendienteInicio.email
        });
        if (error) throw error;
        estadoReenvio.textContent = 'Te hemos enviado un código nuevo.';
        estadoReenvio.hidden = false;
        esperarReenvioCodigoInicio(60);
    } catch (error) {
        console.error('Error al reenviar el código:', error);
        const espera = /after (\d+) seconds?/i.exec(error.message || '');
        if (espera) {
            estadoReenvio.textContent = `Ya te hemos enviado un código hace poco. Podrás pedir otro en ${espera[1]} segundos.`;
            estadoReenvio.hidden = false;
            esperarReenvioCodigoInicio(parseInt(espera[1], 10));
        } else if (error.code === 'over_email_send_rate_limit' || error.status === 429) {
            mostrarErrorRegistroInicio(codigo.id, mensajeError.id, 'Se han enviado demasiados correos. Espera un rato y vuelve a intentarlo.');
            boton.disabled = false;
        } else {
            mostrarErrorRegistroInicio(codigo.id, mensajeError.id, 'No hemos podido enviar el código. Inténtalo más tarde.');
            boton.disabled = false;
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form-registro-inicio');
    const modal = document.getElementById('modal-registro-inicio');
    const campos = [
        ['registro-nombre-inicio', 'error-registro-nombre-inicio'],
        ['registro-email-inicio', 'error-registro-email-inicio'],
        ['registro-password-inicio', 'error-registro-password-inicio'],
        ['registro-password-repite-inicio', 'error-registro-password-inicio']
    ];

    form.addEventListener('submit', registrarCuentaInicio);
    document.getElementById('btn-confirmar-cuenta-inicio').addEventListener('click', confirmarCuentaInicio);
    document.getElementById('btn-reenviar-codigo-inicio').addEventListener('click', reenviarCodigoInicio);

    campos.forEach(([campoId, mensajeId]) => {
        const campo = document.getElementById(campoId);
        campo.addEventListener('input', () => {
            campo.classList.remove('campo-error');
            const mensaje = document.getElementById(mensajeId);
            mensaje.hidden = true;
        });
    });

    document.querySelectorAll('#modal-registro-inicio [data-password-toggle]').forEach(boton => {
        boton.addEventListener('click', () => {
            const campo = document.getElementById(boton.dataset.passwordToggle);
            const mostrar = campo.type === 'password';
            campo.type = mostrar ? 'text' : 'password';
            boton.firstChild.textContent = mostrar ? 'Ocultar' : 'Mostrar';
        });
    });

    document.querySelectorAll('#modal-registro-inicio [data-tipo-usuario]').forEach(boton => {
        boton.addEventListener('click', () => {
            tipoUsuarioRegistroInicio = boton.dataset.tipoUsuario;
            document.querySelectorAll('#modal-registro-inicio [data-tipo-usuario]').forEach(botonTipo => {
                const seleccionado = botonTipo === boton;
                botonTipo.classList.toggle('activ-cate', seleccionado);
                botonTipo.classList.remove('campo-error');
                botonTipo.setAttribute('aria-pressed', seleccionado ? 'true' : 'false');
            });
            document.getElementById('error-registro-tipo-usuario-inicio').hidden = true;
        });
    });

    document.querySelectorAll('#modal-registro-inicio [data-discapacidad]').forEach(boton => {
        boton.addEventListener('click', () => {
            const seleccionado = boton.getAttribute('aria-pressed') !== 'true';
            boton.classList.toggle('activ-cate', seleccionado);
            boton.setAttribute('aria-pressed', seleccionado ? 'true' : 'false');
            document.querySelectorAll('#modal-registro-inicio [data-discapacidad]').forEach(botonDiscapacidad => {
                botonDiscapacidad.classList.remove('campo-error');
            });
            document.getElementById('error-registro-discapacidad-inicio').hidden = true;
        });
    });

    document.getElementById('codigo-verificacion-inicio').addEventListener('input', evento => {
        evento.currentTarget.classList.remove('campo-error');
        document.getElementById('error-codigo-verificacion-inicio').hidden = true;
    });

    modal.addEventListener('close', () => {
        const submit = document.getElementById('btn-crear-cuenta-inicio');
        submit.disabled = false;
    });
});
