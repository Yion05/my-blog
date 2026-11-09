/** Static raised edges keep depth without an offset layer appearing on hover. */
export default function ProfileDepth({ children, variant = 'profile' }) {
    return <div className={variant === 'profile' ? 'profile-depth-stage' : 'card-depth-stage'}>
        <div className={variant === 'profile' ? 'profile-depth-card p-6 md:p-8 flex flex-col md:flex-row items-center gap-8' : 'card-depth-body'}>
            {children}
        </div>
    </div>
}
