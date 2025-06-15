import Swal from "sweetalert2";

export const sweetDelete = (textDele, dataNames, onDelete) => {
  Swal.fire({
    title: `¿Seguro que quieres eliminar ${textDele} ${dataNames}?`,
    text: "¡Esta acción no se puede deshacer!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, ¡eliminar!',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      onDelete();
      Swal.fire(
        'Eliminado!',
        'Tu archivo ha sido eliminado.',
        'success'
      );
    }
  });
};




