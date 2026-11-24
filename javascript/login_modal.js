// =========================================================================
// INICIO DE SESIÓN EN EL MODAL FLOTANTE
// =========================================================================
async function simularInicioSesionModal() {
    const campoUsuario = document.getElementById('login-usuario-modal');
    const campoPass = document.getElementById('login-password-modal');
    const usuarioInput = campoUsuario.value.trim();
    const pass = campoPass.value.trim();
    const mensajeError = document.getElementById('mensaje-error-login-modal');

    // Campos vacíos: marcamos en rojo los que faltan y avisamos debajo,
    // sin cerrar el diálogo
    campoUsuario.classList.toggle('campo-error', !usuarioInput);
    campoPass.classList.toggle('campo-error', !pass);

    if (!usuarioInput || !pass) {
        if (mensajeError) {
            mensajeError.innerText = !usuarioInput && !pass
                ? "Falta rellenar el correo o usuario y la contraseña"
                : !usuarioInput
                    ? "Falta rellenar el correo o usuario"
                    : "Falta rellenar la contraseña";
            mensajeError.style.display = 'block';
        }
        (!usuarioInput ? campoUsuario : campoPass).focus();
        return;
    }

    if (mensajeError) mensajeError.style.display = 'none';

    try {
        // Se entra con el correo o con el nombre de usuario. Si no lleva "@"
        // es un nombre: Supabase nos da el correo de esa cuenta, pero solo si
        // la contraseña es correcta (función correo_de_usuario, ver
        // supabase/usuarios_login.sql). También sirve para las cuentas antiguas.
        let email = usuarioInput.toLowerCase();
        if (!usuarioInput.includes('@')) {
            const { data: correo, error: errorCorreo } = await supabase.rpc('correo_de_usuario', {
                nombre_usuario: usuarioInput,
                contrasena: pass
            });
            if (errorCorreo) throw errorCorreo;
            if (!correo) throw { code: 'invalid_credentials', message: 'Usuario o contraseña incorrectos' };
            email = correo;
        }

        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: pass
        });

        if (error) {
            throw error;
        }

        localStorage.setItem('sesionIniciada', '1');

        // Nombre visible del usuario: el que puso al registrarse
        localStorage.setItem('nombreUsuario', nombreVisibleDe(data.user) || usuarioInput);

        // PINTAMOS EL BOTÓN AL INSTANTE
        if (typeof pintarBotonLogin === 'function') {
            pintarBotonLogin();
        }

        if (mensajeError) {
            mensajeError.style.display = 'none';
        }

        cerrarModal('modal-login');

        // Si venía de pulsar "bajo coste" o "comercializado", abrimos ese formulario
        if (typeof subidaPendienteTrasLogin !== 'undefined' && subidaPendienteTrasLogin) {
            const destino = subidaPendienteTrasLogin;
            subidaPendienteTrasLogin = null;
            cambiarEstadoslider(destino);
        }


    } catch (e) {
        console.error("Error de inicio de sesión:", e.message);
        if (mensajeError) {
            const rpcUsuarioNoConfigurada = !usuarioInput.includes('@') && (
                e.code === 'PGRST202'
                || e.code === '42883'
                || /correo_de_usuario|schema cache/i.test(e.message || '')
            );
            mensajeError.style.display = 'block';
            mensajeError.innerText = (e.code === 'email_not_confirmed' || /not confirmed/i.test(e.message || ''))
                ? "Todavía no has confirmado tu correo. Revisa tu bandeja de entrada."
                : rpcUsuarioNoConfigurada
                    ? "El acceso con nombre de usuario no está configurado. Ejecuta supabase/usuarios_login.sql en Supabase o inicia sesión con tu correo."
                : usuarioInput.includes('@')
                    ? "Correo o contraseña incorrectos"
                    : "Usuario o contraseña incorrectos";
        }
    }
}

// Nombre que se muestra del usuario ("Subido por ..."): el nombre de usuario
// guardado al registrarse; en cuentas antiguas, la parte del correo antes de la @
function nombreVisibleDe(user) {
    if (!user) return '';
    return (user.user_metadata && user.user_metadata.nombre) || (user.email || '').split('@')[0];
}

// Si el usuario cierra el diálogo sin iniciar sesión, olvidamos el formulario
// pendiente (para que un inicio de sesión posterior no le lleve allí por sorpresa)
document.addEventListener('DOMContentLoaded', () => {
    const modalLogin = document.getElementById('modal-login');
    if (!modalLogin) return;
    modalLogin.addEventListener('close', () => {
        if (typeof subidaPendienteTrasLogin !== 'undefined' && localStorage.getItem('sesionIniciada') !== '1') subidaPendienteTrasLogin = null;
        // Al volver a abrirlo no debe quedar nada en rojo
        modalLogin.querySelectorAll('.campo-error').forEach(campo => campo.classList.remove('campo-error'));
        const avisoLogin = document.getElementById('mensaje-error-login-modal');
        if (avisoLogin) avisoLogin.style.display = 'none';
    });
});

// Al escribir en un campo del inicio de sesión se quita su error
document.addEventListener('input', evento => {
    const campo = evento.target;
    if (!campo.closest('#modal-login')) return;
    if (campo.value.trim()) campo.classList.remove('campo-error');
    const aviso = document.getElementById('mensaje-error-login-modal');
    if (aviso && !document.querySelector('#modal-login .campo-error')) aviso.style.display = 'none';
});
