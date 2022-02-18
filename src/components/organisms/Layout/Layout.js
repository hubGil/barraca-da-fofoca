import SiteHead from "../../molecules/Head/Head";
import { Footer } from "../Footer";
import { Header } from "../Header";


const Layout = ({ children }) => {
    return (
        // Fragment (empty tag <>)
        <>
            <SiteHead children={children}/>
            <div className="content">
                <Header />
                { children }
                <Footer />
            </div>
        </>
    );
}
 
export default Layout;