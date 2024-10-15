import '../components.css';
import UFO from '../../assets/images/ufo_7480327.png';

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



export const NothingToSee = () => {
    return (
        <div className="nothing-to-see">
            <img src={UFO} alt="UFO" />
            <h1>Ups, parece que no hay nada que ver aquí.</h1>
        </div>
    );
}