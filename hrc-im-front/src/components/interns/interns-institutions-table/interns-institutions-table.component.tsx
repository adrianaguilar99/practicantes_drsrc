import { InstitutionsCard } from "./interns-institutions-card.component"

export const universities = [
    {
        name: 'UNIVERSIDAD POLITECNICA DE QUINTANA ROO',
        phone: '1234567890'
    },
    {
        name: 'UNIVERSIDAD DEL CARIBE',
        phone: '1234567890'
    },
    {
        name: 'UNIVERSIDAD AUTONOMA DE BAJA CALIFORNIA',
        phone: '1234567890'
    },
    {
        name: 'UNIVERSIDAD TECNOLOGICA DEL NORTE',
        phone: '1234567890'
    }
]

export const InstitutionsTable = () => {

    return (
        <div>
            <div className="table-headers">
                <span>Nombre de institución</span>
                <span>Teléfono</span>
                <span>Acciones</span>
            </div>
            <div className="interns-institutions-table">
                {
                    universities.map((university, index) => (
                        <InstitutionsCard
                            key={index}
                            name={university.name}
                            phone={university.phone}
                            onEdit={() => {}}
                            onDelete={() => {}}
                        />
                    ))
                }
            </div>
        </div>
    )
}