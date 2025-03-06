import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { SubmitButton } from "./submit-button";
import { Input } from "@/components/ui/input";
import { IconBrandGoogle } from "@tabler/icons-react";
import { BottomGradient } from "./submit-button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/app/firebase-config";
import { getAdditionalUserInfo, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { createNewUser } from "@/lib/helpers/api-request-helper";

export const authFormSchema = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email(),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Confirm Password must be at least 6 characters").optional(),
}).refine((data) => data.password === data.confirmPassword || !data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

type AuthFormProps = {
    type: "login" | "signup";
    onSubmit: (data: z.infer<typeof authFormSchema>) => Promise<void>;
};

export const AuthForm = ({ type, onSubmit }: AuthFormProps) => {
    const form = useForm<z.infer<typeof authFormSchema>>({
        resolver: zodResolver(authFormSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleGoogleSignIn = async () => {
        setError(null);
        try {
            const provider = new GoogleAuthProvider();
            const userCredential = await signInWithPopup(auth, provider);
            const isNewUser = getAdditionalUserInfo(userCredential)?.isNewUser || false;
            const idToken = await userCredential.user.getIdToken();
            if(isNewUser){
                await createNewUser(idToken, userCredential.user.displayName || "", userCredential.user.email!);
            }
            router.push("/home");
        } catch (error) {
            setError(error instanceof Error ? error.message : "An unknown error occurred.");
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {type === "signup" && (
                    <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4 mt-4">
                        <FormField control={form.control} name="firstName" render={({ field }) => (
                            <FormItem className="flex-1">
                                <FormLabel>First Name</FormLabel>
                                <FormControl><Input placeholder="Lewis" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="lastName" render={({ field }) => (
                            <FormItem className="flex-1">
                                <FormLabel>Last Name</FormLabel>
                                <FormControl><Input placeholder="Hamilton" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                    </div>
                )}
                <FormField control={form.control} name="email" render={({ field }) => (
                    <FormItem className="mb-4">
                        <FormLabel>Email</FormLabel>
                        <FormControl><Input placeholder="email@address.com" {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
                <FormField control={form.control} name="password" render={({ field }) => (
                    <FormItem className="mb-4">
                        <FormLabel>Password</FormLabel>
                        <FormControl><Input type="password" placeholder="••••••••" {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
                {type === "signup" && (
                    <FormField control={form.control} name="confirmPassword" render={({ field }) => (
                        <FormItem className="mb-4">
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl><Input type="password" placeholder="••••••••" {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                )}
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <SubmitButton text={type === "signup" ? "Sign up →" : "Login →"} />
                <button
                    className="relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900"
                    type="button"
                    onClick={handleGoogleSignIn}
                >
                    <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
                    <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                        {type === "signup" ? "Sign up with Google" : "Sign in with Google"}
                    </span>
                    <BottomGradient />
                </button>
            </form>
        </Form>
    );
};
