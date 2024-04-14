import { useNavigate as useReactNavigate } from "react-router-dom";

export const useNavigate = () => {
    const navigate = useReactNavigate();

    const navigateToLogin = () => {
        navigate("/login", { replace: true });
    };

    const navigateToDashboard = () => {
        navigate("/dashboard", { replace: true });
    };

    const navigateToLesson = (lessonId: string) => {
        navigate(`/dashboard/lesson/`);
    };

    return { navigateToDashboard, navigateToLogin, navigateToLesson};
}
