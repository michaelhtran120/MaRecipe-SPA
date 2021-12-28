import { useEffect } from "react";
import { useLocation } from "react-router";

type Props = {
    children: JSX.Element | JSX.Element[];
};

const ScrollToTop = (props: Props) => {
    const location = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    return <>{props.children}</>;
};

export default ScrollToTop;
