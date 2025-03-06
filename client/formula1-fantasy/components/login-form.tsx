import { AuthForm, authFormSchema } from "./auth-form";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/app/firebase-config";
import { FirebaseError } from "firebase/app";
import { getMessageFromErrorCode } from "@/lib/helpers/auth-error-code-mapper";
import { z } from "zod";
import { useRouter } from "next/navigation";

export const LoginForm = () => {
  const router = useRouter();
  const onSubmit = async (data: z.infer<typeof authFormSchema>) => {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      router.push("/home")
    } catch (error) {
      throw new Error(error instanceof FirebaseError ? getMessageFromErrorCode(error.code) : "Login failed");
    }
  };

  return <AuthForm type="login" onSubmit={onSubmit} />;
};
