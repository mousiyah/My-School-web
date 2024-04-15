import { useNavigate as useReactNavigate } from "react-router-dom";

export const useNavigate = () => {
    const navigate = useReactNavigate();

    const navigateToLogin = () => {
        navigate("/login", { replace: true });
    };

    const navigateToDashboard = () => {
        navigate("/dashboard", { replace: true });
    };

    const navigateToDiary = () => {
        navigate(`/dashboard/diary`);
    };

    const navigateToHomeworks = () => {
        navigate(`/dashboard/homeworks`);
    };

    const navigateToSubjects = () => {
        navigate(`/dashboard/subjects`);
    };

    const navigateToAnnouncements = () => {
        navigate(`/dashboard/announcements`);
    };

    const navigateToInbox = () => {
        navigate(`/dashboard/inbox`);
    };

    const navigateToLessonDetails = (lessonId: string) => {
        navigate(`/dashboard/lesson/${lessonId}/details`);
    };

    const navigateToLessonEdit = (lessonId: string) => {
        navigate(`/dashboard/lesson/${lessonId}/edit`);
    };

    const navigateToLessonStudents = (lessonId: string) => {
        navigate(`/dashboard/lesson/${lessonId}/students`);
    };

    const navigateToLessonMyWork = (lessonId: string) => {
        navigate(`/dashboard/lesson/${lessonId}/my-work`);
    };

    return { 
        navigateToDashboard, 
        navigateToLogin, 
        navigateToDiary,
        navigateToHomeworks,
        navigateToSubjects,
        navigateToAnnouncements,
        navigateToInbox,
        navigateToLessonDetails,
        navigateToLessonEdit,
        navigateToLessonStudents,
        navigateToLessonMyWork,
    };
}
