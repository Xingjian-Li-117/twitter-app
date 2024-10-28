import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useFollow = () => {
    const queryClient = useQueryClient();
    const { mutate: follow, isPending } = useMutation({
        mutationFn: async (userId) => {
            try {
                const res = await fetch(`/api/users/follow/${userId}`, {
                    method: 'POST',
                });

                const data = await res.json();
                if (!res.ok) {
                    throw new Error(data.error || 'Something went wrong');
                }
            } catch (error) {
                throw new Error(error.message);
            }
        },
        onSuccess: () => {
            Promise.allSettled([
                // follow from suggested users
                queryClient.invalidateQueries(['suggestedUsers']),
                // follow from profile page. The follow button should be updated to unfollow
                queryClient.invalidateQueries(['authUser']),
            ]);

            toast.success('Followed successfully');
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });
    return { follow, isPending };
}

export default useFollow;