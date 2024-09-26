import { Link } from 'react-router-dom';
import { resetIndexIfHome } from '../../functions/utils.functions';
import '../components.css';

export const Breadcrumb = () => {
    const path = window.location.pathname;
    const segments = path.split('/').filter(Boolean);
    const breadcrumbItems = ['home', ...segments];

    return (
        <div className='breadcrumb'>
            {breadcrumbItems.map((segment, index) => {
                if (segment === 'intern-information') {
                    breadcrumbItems.length = index + 1;
                }

                const to = index === 0 ? '/home' : `/${breadcrumbItems.slice(1, index + 1).join('/')}`;

                return (
                    <span key={index}>
                        {index < breadcrumbItems.length - 1 ? (
                            <Link
                                className="breadcrumb-link"
                                to={to}
                                onClick={() => {
                                    if (segment === 'home') {
                                        resetIndexIfHome();
                                    }
                                }}
                            >
                                {segment}
                            </Link>
                        ) : (
                            <p className='active-segment'>{segment}</p>
                        )}
                    </span>
                );
            })}
        </div>
    );
};
