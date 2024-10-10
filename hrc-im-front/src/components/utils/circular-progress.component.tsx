import '../components.css';

interface CircularProgressProps {
    title?: string;
    type?: string;
}

export const CircularProgress: React.FC<CircularProgressProps> = ({ title, type }) => {
    return (
        <div className={`loading-spinner ${type === 'secondary' ? 'secondary' : ''}`}>
            <div className={`loader-container ${type === 'secondary' ? 'secondary' : ''}`}>
                <span className={`loader ${type === 'secondary' ? 'loader-secondary' : ''}`} />
                {type != 'secondary' && <h1 >{title || 'Cargando...'}</h1>}
            </div>
        </div>
    );
}
