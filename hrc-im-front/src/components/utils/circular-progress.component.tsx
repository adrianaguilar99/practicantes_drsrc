import '../components.css';
interface CircularProgressProps {
    title?: string;
}
export const CircularProgress: React.FC<CircularProgressProps> = ({ title}) => {
    return (
        <div className="loading-spinner">
            <div className="loader-container">
            <span className="loader"/>
            <h1>{title || 'Cargando...'}</h1>
            </div>
            
        </div>
    );
}