const LoadingSpinner = ({ size = "md" }) => {
    // size can be adjusted
    const sizeClass = `loading-${size}`;

    return <span className={`loading loading-spinner ${sizeClass}`} />;
};
export default LoadingSpinner;