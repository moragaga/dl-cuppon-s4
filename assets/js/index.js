// Contador estatico para reiniciar pantalla cuando se acaben las cards
let contador_estatico = 0;

// Resetea la pantalla si se elimina el último card
// Obtiene todos los tag imagen 
document.querySelectorAll("img").forEach((elemento)=>{
    // Itera sobre los elementos esperando el evento click
    elemento.addEventListener("click", (e) =>{
        
        // Si llega al último card se recarga la pagina
        if (contador_estatico === 5){
            window.location.reload();
        }
        
        // Muestra una ventana cargando por 2,5 segundos
        Swal.fire({
            title: 'Redirigiendo a página de pago',
            text: 'Espere unos instantes',
            icon: 'info',
            allowOutsideClick: false,
            showConfirmButton: false,
            timer: 2500,
            willOpen: () => {
                Swal.showLoading()
            }
        });

        
        // Ventana que cierra el cargando y se ejecuta a los 2,5 segundos
        setTimeout(() => {
            Swal.fire({
                title: '<div class="text-center">Compra Procesada</div>',
                html: '<div class="text-center">Gracias por su preferencia</div>',
                icon: 'info',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Aceptar',
                allowOutsideClick: false,
            }).then((result) => {
                if (result.isConfirmed) {
                    document.querySelector(`#${e.target.getAttribute('data-value')}`).classList.add("d-none");
                }
            })
        },2500)

        // Aumenta el contador
        contador_estatico++
    })
})

// Obtiene evento submit 
document.querySelector("#frm-cupones").addEventListener("submit", (e) =>{
    
    e.preventDefault()

    // Obtiene formulario
    let form = new FormData(e.target)

    // Muestra toast con datos del formulario por 3 segundos
    const Toast = Swal.mixin({
        toast: true,
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    }) 
    Toast.fire({
        icon: 'success',
        title: `<div class="text-center">Gracias por suscribirse <br><strong>${form.get("nombre")}</strong></div>`,
        html: `<div class="text-center">Un cupón será enviado semanalmente al correo <br><strong>${form.get("correo")}</strong></div>`
    })

    // Reseteo formulario
    e.target.reset();
})
