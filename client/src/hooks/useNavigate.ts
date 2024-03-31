import { useNavigate as useReactNavigate } from "react-router-dom";

export const useNavigate = () => {
    const navigate = useReactNavigate();

    const navigateToDashboard = () => {
        navigate("/dashboard", { replace: true });
    };

    const navigateToLogin = () => {
        navigate("/login", { replace: true });
    };

    return { navigateToDashboard, navigateToLogin };
}
