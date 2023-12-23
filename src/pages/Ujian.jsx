import FormUjian from "../components/Form/FormUjians";
import FormUjianEx from "../components/Form/FormUjianExample";
import { useAuth } from "../context/useAuth";
import { Helmet } from "react-helmet-async";

const Ujian = () => {
    const { isAuthenticated, token } = useAuth();

    return (
        <div>
            <Helmet>
                <title>Ujian</title>
            </Helmet>
            {/* <FormUjian /> */}
            
      
            
        </div>
    );
};

export default Ujian;
