import {useLocation} from 'react-router-dom';
import {useState, useEffect} from 'react';

const useHomepage = () => {
    const [isHomepage, setIsHomepage] = useState(false);
    const location = useLocation();

    useEffect(() => {
        location.pathname === '/' ? setIsHomepage(true) : setIsHomepage(false);
    }, [location]);

    return isHomepage;
};

export default useHomepage;