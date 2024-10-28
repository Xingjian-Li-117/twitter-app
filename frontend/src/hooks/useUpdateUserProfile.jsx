import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";


const useUpdateUserProfile = () => {
    const queryClient = useQueryClient();
    // mutateAsync: after updating image, remove this button
    const { mutateAsync: updateProfile, isPending: isUpdatingProfile } = useMutation({
        // pass formData not into the hook, but into the mutation function
        mutationFn: async (formData) => {
            try {
                const res = await fetch(`/api/users/update`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                })
                const data = await res.json();
                if (!res.ok) {
                    throw new Error(data.error || "Something went wrong");
                }
            } catch (error) {
                throw new Error(error);
            }
        },
        onSuccess: () => {
            toast.success("Profile updated successfully");
            // Promise means to wait for all the promises to resolve
            // Without promise, the second query will be fired before the first one is completed,
            // so the second query will not have the updated data
            Promise.all([
                queryClient.invalidateQueries({ queryKey: ["authUser"] }),
                queryClient.invalidateQueries({ queryKey: ["userProfile"] }),
            ])
        },
        onError: (error) => {
            toast.error(error.message);
        }
    });
    return { updateProfile, isUpdatingProfile };
}

export default useUpdateUserProfile;