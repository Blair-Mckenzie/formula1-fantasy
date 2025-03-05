import { LabelInputContainer } from "./label-input-container";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { BottomGradient, SubmitButton } from "./submit-button";
import { IconBrandGoogle } from "@tabler/icons-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/app/firebase-config";


export const SignupForm = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
            const user = userCredential.user;

            const idToken = await user.getIdToken();
            await fetch("/api/v1/formula1/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${idToken}`,
                },
                body: JSON.stringify({
                    name: formData.firstName + " " + formData.lastName,
                    email: formData.email
                }),
            });
            router.push("/home");
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError("An unknown error occurred.");
            }
        }
    };

    const handleGoogleSignIn = async () => {
        setError(null);
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
            router.push("/home");
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError("An unknown error occurred.");
            }
        }
    };

    return (
        <form className="my-8" onSubmit={handleSubmit}>
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
                <LabelInputContainer>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="Lewis" type="text" onChange={handleChange} />
                </LabelInputContainer>
                <LabelInputContainer>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Hamilton" type="text" onChange={handleChange} />
                </LabelInputContainer>
            </div>
            <LabelInputContainer className="mb-4">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" placeholder="email@address.com" type="email" onChange={handleChange} />
            </LabelInputContainer>
            <LabelInputContainer className="mb-4">
                <Label htmlFor="password">Password</Label>
                <Input id="password" placeholder="••••••••••••••••" type="password" onChange={handleChange} />
            </LabelInputContainer>
            <LabelInputContainer className="mb-4">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input id="confirmPassword" placeholder="••••••••••••••••" type="password" onChange={handleChange} />
            </LabelInputContainer>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <SubmitButton text="Sign up →" />
            <div className="flex flex-col space-y-4">
                <button
                    className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
                    type="button"
                    onClick={handleGoogleSignIn}
                >
                    <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
                    <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                        Sign in with Google
                    </span>
                    <BottomGradient />
                </button>
            </div>
        </form>
    );
};