import { el } from "date-fns/locale";


export function InputValidators () {
    return {
        string: (value: string) => {
            if(value === ""){
                return 'Rellena este campo';
            }
            if (value.length < 3) {
                return 'El campo no cumple con los requisitos';
            }   
            else if (value.length > 150) {
                return 'El campo no cumple con los requisitos';
            }
        },
        email: (value: string) => {
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if(value === ""){
                return 'Rellena este campo';
            }
            if (!regex.test(value)) {
                return 'Ingresa un correo electrónico válido';
            }
            else if (value.length > 100) {
                return 'Ingresa un correo electrónico válido';
            }
        },
        phone: (value: string) => {
            const regex = /^\d{10}$/;
            if(value === ""){
                return 'Rellena este campo';
            }
            if (!regex.test(value)) {
                return 'Ingresa un número de teléfono válido';
            }
            else if (value.length > 10) {
                if (isNaN(parseInt(value))) {
                    return 'Ingresa un número de teléfono válido';
                }
            }
            else if (isNaN(parseInt(value))) {
                return 'Ingresa un número de teléfono válido';
            }
        },

        date: (value: string) => {
            const regex = /^\d{4}-\d{2}-\d{2}$/;
            if(value === ""){
                return 'Rellena este campo';
            }
            if (!regex.test(value)) {
                return 'Ingresa una fecha válida';
            }
        },

        time: (value: string) => {
            const regex = /^\d{2}:\d{2}$/;
            if(value === ""){
                return 'Rellena este campo';
            }
            if (!regex.test(value)) {
                return 'Ingresa una hora válida';
            }
        },

        number: (value: string) => {
            const regex = /^\d+$/;
            if(value === ""){
                return 'Rellena este campo';
            }
            if (!regex.test(value)) {
                return 'Campo no válido';
            }
        },

        fileImage: (value: string | File) => {
            const regex = /\.(jpg|jpeg|png)$/i;
            const fileName = value instanceof File ? value.name : value;
            if (fileName === "") {
                return 'Rellena este campo';
            }
            if (!regex.test(fileName)) {
                return 'Ingresa una imagen válida (jpg, jpeg o png)';
            }
        },

        filePDF: (value: string | File) => {
            const regex = /\.pdf$/i;
            const fileName = value instanceof File ? value.name : value;
            if (fileName === "") {
                return 'Rellena este campo';
            }
            if (!regex.test(fileName)) {
                return 'Ingresa un archivo PDF válido';
            }
        },

        password : (value: string) => {
            const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
            if (!regex.test(value)) {
                return 'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un caracter especial';
            }
        },

        
    };
}