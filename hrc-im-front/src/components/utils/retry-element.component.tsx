interface RetryElementProps {
    onClick: () => void;
}
export const RetryElement: React.FC<RetryElementProps> = ({onClick}) => {
    return (
        <div  className="retry-getdata">
        <h1>Ocurrio un error</h1>
        <button onClick={onClick}>Reintentar</button>
        </div>
    );
}