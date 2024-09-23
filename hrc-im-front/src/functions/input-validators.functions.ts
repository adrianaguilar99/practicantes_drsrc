interface InputValidator {
    STRING: (value: string) => string | undefined;
    email: (value: string) => string | undefined;
    phone: (value: string) => string | undefined;
}

export function InputValidators() {
    return {
        name: (value: string) => {
            if (value.length < 3) {
                return 'E';
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
    };
}