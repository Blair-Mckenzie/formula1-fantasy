import { AuthForm, authFormSchema } from "./auth-form";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/app/firebase-config";
import { FirebaseError } from "firebase/app";
import { getMessageFromErrorCode } from "@/lib/helpers/auth-error-code-mapper";
import { z } from "zod";
import { createNewUser } from "@/lib/helpers/api-request-helper";
import { useRouter } from "next/navigation";

export const SignupForm = () => {
    const router = useRouter();
    const onSubmit = async (data: z.infer<typeof authFormSchema>) => {
        try {
            const { user } = await createUserWithEmailAndPassword(auth, data.email, data.password);
            const idToken = await user.getIdToken();
            await createNewUser(idToken, `${data.firstName} ${data.lastName}`, data.email);
            router.push("/home");
        } catch (error) {
            throw new Error(error instanceof FirebaseError ? getMessageFromErrorCode(error.code) : "Signup failed");
        }
    };
    return <AuthForm type="signup" onSubmit={onSubmit} />;
};
