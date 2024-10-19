import { Link } from 'react-router-dom';
import { Home } from '@mui/icons-material';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
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
                    <span key={index} className="breadcrumb-item">
                        {index < breadcrumbItems.length - 1 ? (
                            <>
                                <Link
                                    className="breadcrumb-link"
                                    to={to}
                                    onClick={() => {
                                        if (segment === 'home') {
                                            resetIndexIfHome();
                                        }
                                    }}
                                >
                                    {index === 0 ? (
                                        <div className='breadcrumb-home-segment'>
                                        <Home className="breadcrumb-icon" />
                                        <p>home</p>
                                        </div>
                                        
                                        
                                    ) : (
                                        segment
                                    )}
                                </Link>
                                <ArrowForwardIosRoundedIcon className="separator-icon" />
                            </>
                        ) : (
                            <p className='active-segment'>{segment}</p>
                        )}
                    </span>
                );
            })}
        </div>
    );
};
