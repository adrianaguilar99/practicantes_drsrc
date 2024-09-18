import { Link } from 'react-router-dom';
import { resetIndexIfHome } from '../../functions/utils.functions';

export const Breadcrumb = () => {
    const path = window.location.pathname;
    const segments = path.split('/').filter(Boolean);
    const breadcrumbItems = ['home', ...segments];

    return (
        <div>
            {breadcrumbItems.map((segment, index) => {
                const to = index === 0 ? '/home' : `/${breadcrumbItems.slice(1, index + 1).join('/')}`;

                return (
                    <span key={index}>
                        {index < breadcrumbItems.length - 1 ? (
                            <>
                                <Link
                                    to={to}
                                    onClick={() => {
                                        if (segment === 'home') {
                                            resetIndexIfHome();
                                        }
                                    }}
                                >
                                    {segment}
                                </Link>
                                {' > '}
                            </>
                        ) : (
                            <span className='active-segment'>{segment}</span>
                        )}
                    </span>
                );
            })}
        </div>
    );
};
