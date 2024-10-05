

export function InputValidators () {
    return {
        string: (value: string) => {
            if (value.length < 3) {
                return 'El campo no cumple con los requisitos';
            }   
        },
        email: (value: string) => {
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!regex.test(value)) {
                return 'Ingresa un correo electrónico válido';
            }
        },
        phone: (value: string) => {
            const regex = /^\d{10}$/;
            if (!regex.test(value)) {
                return 'Ingresa un número de teléfono válido';
            }
        },

        date: (value: string) => {
            const regex = /^\d{4}-\d{2}-\d{2}$/;
            if (!regex.test(value)) {
                return 'Ingresa una fecha válida';
            }
        },

        time: (value: string) => {
            const regex = /^\d{2}:\d{2}$/;
            if (!regex.test(value)) {
                return 'Ingresa una hora válida';
            }
        },

        number: (value: string) => {
            const regex = /^\d+$/;
            if (!regex.test(value)) {
                return 'Campo no válido';
            }
        },

        
    };
}