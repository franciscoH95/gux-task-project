
import logo from '../../../public/logo.svg';

interface props {
    className?: string
}

export default function AppLogoIcon({className}:props) {
    return (
        <img className={className} src={logo} alt="logo" />
    );
}
